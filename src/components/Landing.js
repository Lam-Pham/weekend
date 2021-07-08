import LeaguePreview from "./LeaguePreview"
import { Link } from 'react-router-dom'

export default function Landing (props) {
    
    return (
        <div class="grid grid-cols-2 mt-48 mb-96 space-x-24">
            <div class="space-y-12">
                <p class="font-bold text-5xl">Join a local sports league!</p>
                <div class="text-3xl space-y-4">
                    <p>Cities → Long Beach + Cerritos</p>
                    <p>Sports → Soccer, Flag Football, Spikeball</p>
                    <div><Link to="/leagues"><button class="text-2xl rounded-full border-2 border-black hover:bg-yellow-300 py-2 px-4">View open leagues</button></Link></div>
                </div>

            </div>
            
            <div class="space-y-4">
                <p class="text-3xl">featured</p>
                <LeaguePreview league={props.latestLeague}/>
            </div>
            
        </div>
    )
}