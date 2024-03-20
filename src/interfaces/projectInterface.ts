export default interface ProjectI {
    name: string;
    description: string;
    image?: string;
    orgId: string;
    userId: string;
    progress?: string;
    tasks?: TaskI[];
}

export interface TaskI {
    name: string;
    description: string;
    completed: boolean;
}


