"use node";

import { v } from "convex/values";
import Stripe from "stripe";

import { action, internalAction } from "./_generated/server";
import { internal } from "./_generated/api";
import { Id } from "./_generated/dataModel";

type Metadata = {
  userId: string;
};

export const pay = action({
  args: { productId: v.string(), plan_name: v.string()},
  handler: async (ctx, args) => {
    const user = await ctx.auth.getUserIdentity();
    if (!user) {
      throw new Error("you must be logged in to subscribe");
    }

    if (!user.emailVerified) {
      throw new Error("you must have a verified email to subscribe");
    }

    const domain = process.env.HOSTING_URL ?? "http://localhost:3000";
    const stripe = new Stripe(process.env.STRIPE_KEY!, {
      apiVersion: "2023-10-16",
    });
    const session = await stripe.checkout.sessions.create({
      line_items: [{ price: args.productId, quantity: 1 }],
      customer_email: user.email,
      metadata: {
        userId: user.subject,
        plan_name: args.plan_name,
      },
      mode: "subscription",
      success_url: `${domain}`,
      cancel_url: `${domain}`,
    });

    return session.url!;
  },
});

export const fulfill = internalAction({
  args: { signature: v.string(), payload: v.string() },
  handler: async (ctx, args) => {
    const stripe = new Stripe(process.env.STRIPE_KEY!, {
      apiVersion: "2023-10-16",
    });

    const webhookSecret = process.env.STRIPE_WEBHOOKS_SECRET!;
    try {
      const event = stripe.webhooks.constructEvent(
        args.payload,
        args.signature,
        webhookSecret
      );

      const completedEvent = event.data.object as Stripe.Checkout.Session & {
        metadata: Metadata;
      };

      if (event.type === "checkout.session.completed") {
        const subscription = await stripe.subscriptions.retrieve(
          completedEvent.subscription as string
        );

        const userId = completedEvent.metadata.userId as Id<"users">;
        const plan_name = completedEvent.metadata.plan_name as string;

        await ctx.runMutation(internal.users.updateSubscription, {
          userId,
          customer_id: subscription.customer as string,
          subscriptionId: subscription.id,
          endsOn: subscription.current_period_end * 1000,
          sub_status: subscription.status,
          plan_name,
        });
      }

      /*       if (event.type === "invoice.payment_succeeded") {
        const subscription = await stripe.subscriptions.retrieve(
          completedEvent.subscription as string
        );

        await ctx.runMutation(internal.users.updateSubscriptionBySubId, {
          subscriptionId: subscription.items.data[0]?.price.id,
          endsOn: subscription.current_period_end * 1000,
        });
      } */

      if (event.type === "customer.subscription.deleted") {
        const subscription = await stripe.subscriptions.retrieve(
          completedEvent.id as string
        );

        await ctx.runMutation(internal.users.cancel, {
          subscriptionId: subscription.id,
          sub_status: subscription.status,
        });
      }

      return { success: true };
    } catch (err) {
      console.error(err);
      return { success: false, error: (err as { message: string }).message };
    }
  },
});

export const cancel = action({
  args: { subscriptionId: v.string() },
  handler: async (ctx, args) => {
    const stripe = new Stripe(process.env.STRIPE_KEY!, {
      apiVersion: "2023-10-16",
    });
    try {
      await stripe.subscriptions.cancel(args.subscriptionId);

      return { success: true };
    } catch (err) {
      console.error(err);
      return { success: false, error: (err as { message: string }).message };
    }
  },
});
