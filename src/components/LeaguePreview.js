
export default function LeaguePreview ({league}) {
    
    return (
        <div class="border-4 py-4 px-8 border-black bg-white rounded-xl space-y-4 font-bold text-2xl">
            <p>{league.name}</p>
            <p>{league.location} – {league.time}</p>
            <button class="rounded-full border-2 border-black hover:bg-yellow-300 py-2 px-4">View league</button>
        </div>
    )
}