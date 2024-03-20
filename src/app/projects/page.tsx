import Projects from "./projectComponent";

export default function ProjectsComponent() {
    return (
        <>
        <Projects />
        </>
    );
}


export const generateMetadata = () => {
    return {
        title: "Projects",
        description: "This is your project section.",
    };
}