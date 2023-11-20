import { Routes, Route } from 'react-router-dom'
import { TeamRoster, League, Player, Navigation, Standings } from './index'

const AllRoutes = () => (
  <>
    <Navigation />
    <Routes>
      <Route path='/' element={<League />} />
      <Route path='/:team' element={<TeamRoster />} />
      <Route path="/player/:playerid" element={<Player />} />
      <Route path='/standings/:season' element={<Standings />} />
    </Routes>
  </>
)

export default AllRoutes