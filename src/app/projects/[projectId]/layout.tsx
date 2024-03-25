import SideNav from "@/components/global/SideNav";




export default function ProjectsSection(props: { children: React.ReactNode, params: { projectId: string } }) {
    return (
        <div className="flex">
            <SideNav projectId={props.params.projectId}/>
            {props.children}
        </div>
    );
}