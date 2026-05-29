import { NavLink } from 'react-router-dom'
import './Navigation.css'
import { useCurrentSeason } from '../../utils/getCurrentSeason'

const Navigation = () => {
  const currentSeason = useCurrentSeason()
  return (
    <nav className='nav'>
      <NavLink to='/'>
        <span>League</span>
      </NavLink>
      <NavLink to={`/standings/${currentSeason}`}>
        <span>Standings</span>
      </NavLink>
    </nav>
  )
}

export default Navigation