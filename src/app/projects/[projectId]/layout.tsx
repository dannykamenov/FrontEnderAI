import SideNav from "@/app/statics/SideNav";




export default function ProjectsSection(props: { children: React.ReactNode, params: { projectId: string } }) {
    return (
        <div className="flex">
            <SideNav projectId={props.params.projectId}/>
            {props.children}
        </div>
    );
}