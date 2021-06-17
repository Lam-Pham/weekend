
export default function Collection ({collection}) {
    
    return (
        <div class="border-4 py-4 px-8 border-black bg-white rounded-xl space-y-4">
            <p>who 👋🏼<br/><span class="font-bold">{collection.title}</span></p>
            <p>what 👀<br/><span class="font-bold">{collection.description}</span></p>
            <p>commission 🎉<br/><span class="font-bold">{collection.commission}</span></p>
            <button class="rounded-full bg-yellow-200 hover:bg-yellow-300 py-2 px-4">View project</button>
        </div>
    )
}