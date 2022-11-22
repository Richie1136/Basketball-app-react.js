import TeamRoster from "./teamroster/TeamRoster";
import League from "./league/League";
import Player from "./player/Player"
import { Routes, Route } from 'react-router-dom'
import Navigation from "./navigation/Navigation";


const AllRoutes = () => (
  <>
    <Navigation />
    <Routes>
      <Route path='/' element={<League />} />
      <Route path='/:team' element={<TeamRoster />} />
      <Route path="/player/:PlayerID" element={<Player />} />
    </Routes>
  </>
)

export default AllRoutes