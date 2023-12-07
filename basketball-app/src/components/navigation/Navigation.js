import { NavLink } from 'react-router-dom'
import './Navigation.css'

const Navigation = () => (
  <nav className='nav'>
    <NavLink to='/'>
      <span>League</span>
    </NavLink>
    <NavLink to='/standings/2024'>
      <span>Standings</span>
    </NavLink>
  </nav>
)

export default Navigation