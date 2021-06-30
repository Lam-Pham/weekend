import { Link } from 'react-router-dom'

export default function Header () {

        return (
            <div class="grid grid-cols-3">
                <Link to="/"><p class="col-span-1 text-xl tracking-widest">SUNDAY SCRIBBLES</p></Link>
                <div class="space-x-4 col-start-3 flex flex-row-reverse gap-8">
                    <Link to="/projects">Projects</Link>
                    <Link to="/about">About</Link>
                </div>
            </div>
        )
    
}
