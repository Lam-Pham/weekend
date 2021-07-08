
export default function League ({league}) {

    return (
        <div class="border-4 py-4 px-8 border-black bg-white rounded-xl space-y-4 font-bold text-2xl">
            <p>{league.name}</p>
            <p>{league.location} – {league.time}</p>
            <p>{league.details}</p>
            {/* todo: build out details + league contact + join button */}

            <button class="rounded-full border-2 border-black hover:bg-yellow-300 py-2 px-4">View league</button>
        </div>
    )
}