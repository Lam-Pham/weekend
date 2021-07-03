
export default function League ({league}) {
    
    return (
        <div class="border-4 py-4 px-8 border-black bg-white rounded-xl space-y-4">
            <p>What 👋🏼<br/><span class="font-bold">{league.name}</span></p>
            <p>Where 👀<br/><span class="font-bold">{league.location}</span></p>
            <p>When 🎉<br/><span class="font-bold">{league.time}</span></p>
            <p>Info 🎉<br/><span class="font-bold">{league.details}</span></p>
            <button class="rounded-full border-2 border-black hover:bg-yellow-300 py-2 px-4">View project</button>
        </div>
    )
}