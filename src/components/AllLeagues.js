import League from "./League"

export default function AllLeagues (props) {

    return(
        <div class="mt-24 space-y-8">
            <h1 class="font-bold text-5xl">Leagues</h1>
            <div class="grid grid-cols-2 gap-8">
                {props.leagues.map(league => <League league={league} />)}
            </div>
        </div>
        

    )
}