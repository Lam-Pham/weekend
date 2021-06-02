
export default function Spot ({ spot }) {

  return (
    <li className='spot'>
      {spot.activity} at {spot.location} 
    </li>
  )
}