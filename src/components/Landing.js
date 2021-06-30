import Collection from "./Collection"
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
  } from 'react-router-dom'

export default function Landing (props) {
    
    return (
        <div class="grid grid-cols-2 mt-48 mb-96 space-x-24">
            <div class="space-y-12">
                <p class="col-span-1 font-bold text-5xl">Make art for Long Beach small businesses ♥</p>
                <div class="text-3xl space-y-4">
                    <div>
                        <p class="inline">Small businesses → </p>
                        <button class="text-2xl rounded-full border-2 border-black hover:bg-yellow-300 py-2 px-4">Create a Project</button>
                    </div>
                    <div>
                        <p class="inline">Artists → </p>
                        <Router><Link to="/projects"><button class="text-2xl rounded-full border-2 border-black hover:bg-yellow-300 py-2 px-4">View Projects</button></Link></Router>
                    </div>
                </div>

            </div>
            
            <div class="space-y-4">
                <p class="text-3xl">featured</p>
                <Collection collection={props.latestCollection}/>
            </div>
            
        </div>
    )
}