import TeamRoster from "./teamroster/TeamRoster";
import League from "./league/League";
import Player from "./player/Player"
import { Routes, Route } from 'react-router-dom'
import Navigation from "./navigation/Navigation";
import Standings from "./standings/Standings";

const AllRoutes = () => (
  <>
    <Navigation />
    <Routes>
      <Route path='/' element={<League />} />
      <Route path='/:team' element={<TeamRoster />} />
      <Route path="/player/:playerid" element={<Player />} />
      <Route path='/standings' element={<Standings />} />
    </Routes>
  </>
)

export default AllRoutes