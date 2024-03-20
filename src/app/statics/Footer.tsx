import Link from "next/link";

const Footer = () => {
  return (
    <>
      <footer className=" w-full border-t border-slate-400 mx-auto">
        <div className="mt-8 w-11/12 mx-auto flex justify-evenly items-center mb-8">
          <p className="text-center">
            Copyright © FrontEnderAI, 2024. <br /> All rights reserved.
          </p>
          <div className="text-center flex flex-col">
            <Link
              href="/about"
              className="p-2 hover:text-slate-400 hover:transition-all"
            >
              Dashboard
            </Link>
            <Link
              href="/about"
              className="p-2 hover:text-slate-400 hover:transition-all"
            >
              Pricing
            </Link>
          </div>
          <div className="text-center flex flex-col">
            <Link
              href="/about"
              className="p-2 hover:text-slate-400 hover:transition-all"
            >
              Contact Us
            </Link>
            <Link
              href="/about"
              className="p-2 hover:text-slate-400 hover:transition-all"
            >
              Feedback
            </Link>
          </div>
          <div className="text-center flex flex-col">
            <Link
              href="/about"
              className="p-2 hover:text-slate-400 hover:transition-all"
            >
              Terms of Service
            </Link>
            <Link
              href="/about"
              className="p-2 hover:text-slate-400 hover:transition-all"
            >
              Privacy Policy
            </Link>
          </div>
        </div>
      </footer>
      <div className="w-9/12 mx-auto mt-8 text-center border-t border-slate-400 mb-8 pt-8">
        <Link href="/" className="text-2xl">
          &lt;/FrontEnder&gt; <sub>.ai</sub>
        </Link>
      </div>
    </>
  );
};

export default Footer;
