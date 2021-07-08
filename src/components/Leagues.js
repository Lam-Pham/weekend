import LeaguePreview from "./LeaguePreview"
import { Link } from 'react-router-dom'

export default function Leagues (props) {

    return(
        <div class="mt-24 space-y-8">
            <h1 class="font-bold text-5xl">Leagues</h1>
            <div class="grid grid-cols-3 gap-8">
                {props.leagues.map(league => <Link to={`/leagues/${league.url}`}><LeaguePreview league={league} /></Link>)}
            </div>
        </div>
        

    )
}