
export default function Art ({ art }) {

  return (
    <li className='art'>
      {art.piece} - {art.description} 
    </li>
  )
}