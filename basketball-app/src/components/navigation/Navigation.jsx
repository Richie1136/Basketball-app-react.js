import { NavLink } from 'react-router-dom'
import './Navigation.css'
import { getCurrentSeason } from '../../utils/getCurrentSeason'

const Navigation = () => {
  const currentSeason = getCurrentSeason()
  return (
    <nav className='nav'>
      <NavLink to='/' className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}>
        <span>League</span>
      </NavLink>
      <NavLink to={`/standings/${currentSeason}`} className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}>
        <span>Standings</span>
      </NavLink>
    </nav>
  )
}

export default Navigation