import Collection from "./Collection"

export default function Projects (props) {

    return(
        <div class="mt-24 space-y-8">
            <h1 class="font-bold text-5xl">Projects</h1>
            <div class="grid grid-cols-2 gap-8">
                {props.projects.map(project => <Collection collection={project} />)}
            </div>
        </div>
        

    )
}