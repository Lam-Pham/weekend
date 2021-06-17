import Collection from "./Collection"

export default function Landing (props) {
    
    return (
        <div class="grid grid-cols-2 mt-48 mb-96 space-x-24">
            <p class="col-span-1 font-bold text-5xl">Make art for Long Beach small businesses ♥</p>
            <div class="space-y-4">
                <p class="text-3xl">featured</p>
                <Collection collection={props.latestCollection}/>
            </div>
            
        </div>
    )
}