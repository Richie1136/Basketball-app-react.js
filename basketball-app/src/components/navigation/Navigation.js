import { NavLink } from 'react-router-dom'
import './Navigation.css'

const Navigation = () => {
  return (
    <nav className='nav'>
      <NavLink to='/'>
        <span>League</span>
      </NavLink>
      <NavLink to='/standings'>
        <span>Standings</span>
      </NavLink>
    </nav>
  )
}

export default Navigation