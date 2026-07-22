import { useState, useEffect } from 'react'
import './League.css'
import { prefixedUrl } from '../../utils/prefixUrl'
import TeamCard from '../teamCard/TeamCard'

const League = () => {

  const [leagueData, setLeagueData] = useState([])
  const [initialTeams, setIntialTeams] = useState("ALL Teams")
  const [searchTerm, setSearchTerm] = useState("")
  const [standings, setStandings] = useState([]);

  const API_BASE_URL = import.meta.env.VITE_APP_API_BASE_URL;

  useEffect(() => {
    const wakeUpBackend = async () => {
      if (!API_BASE_URL) return
      try {
        await fetch(`${API_BASE_URL}/`)
      } catch (error) {
        console.log("Backend wake-up failed", error)
      }
    }
    wakeUpBackend()
  }, [])

  useEffect(() => {
    const leagueData = async () => {
      try {
        const response = await fetch(`${prefixedUrl}/teams`)
        const leagueInfo = await response.json()
        setLeagueData(leagueInfo)
      } catch (error) {
        console.log(error)
      }
    }
    leagueData()
  }, [])

  useEffect(() => {
    const getStandings = async () => {
      try {
        const data = await fetch(`${prefixedUrl}/standings?season=2026`);
        const response = await data.json();

        const easternConference = response
          .filter(team => team.Conference === "Eastern")
          .sort((a, b) => b.Percentage - a.Percentage)
          .map((team, index) => ({
            ...team,
            rank: index + 1
          }));

        const westernConference = response
          .filter(team => team.Conference === "Western")
          .sort((a, b) => b.Percentage - a.Percentage)
          .map((team, index) => ({
            ...team,
            rank: index + 1
          }));

        setStandings([...easternConference, ...westernConference]);
      } catch (error) {
        console.log(error);
      }
    };

    getStandings();
  }, []);

  const allTeams = leagueData

  const sortByKey = (teams) => [...(teams ?? [])].sort((a, b) => a.Key.localeCompare(b.Key))

  const sortTeams = sortByKey(leagueData)

  const Eastern = sortByKey(leagueData?.filter((team) => team.Conference === 'Eastern'))
  const Atlantic = sortByKey(Eastern?.filter((team) => team.Division === 'Atlantic'))
  const Central = sortByKey(Eastern?.filter((team) => team.Division === 'Central'))
  const Southeast = sortByKey(Eastern?.filter((team) => team.Division === 'Southeast'))

  const Western = sortByKey(leagueData?.filter((team) => team.Conference === 'Western'))
  const Southwest = sortByKey(Western?.filter((team) => team.Division === 'Southwest'))
  const Northwest = sortByKey(Western?.filter((team) => team.Division === 'Northwest'))
  const Pacific = sortByKey(Western?.filter((team) => team.Division === 'Pacific'))

  const filterMap = {
    "ALL Teams": sortTeams,
    Eastern,
    Atlantic,
    Central,
    Southeast,
    Western,
    Southwest,
    Northwest,
    Pacific
  }

  const displayData = filterMap[initialTeams] || allTeams;


  const handleChange = (event) => {
    setIntialTeams(event.target.value)
  }

  const filteredTeams = displayData?.filter((team) => {
    return `${team.City} ${team.Name}`.toLowerCase().includes(searchTerm.toLowerCase())
  })

  const handleClear = () => {
    setSearchTerm("")
  }

  return (
    <div className='container'>
      <div className='select-container'>
        <div className='search-wrapper'>
          <input className='term-search' type='text' placeholder='🔍 Search teams...' value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />
          {searchTerm && <button className='clear-search' onClick={handleClear}>×</button>}
        </div>
        <label>
          <select value={initialTeams} onChange={handleChange}>
            <option value={"ALL Teams"}>ALL Teams</option>
            <option value={"Eastern"}>Eastern Conference</option>
            <option value={"Atlantic"}>Atlantic Division</option>
            <option value={"Central"}>Central Division</option>
            <option value={"Southeast"}>Southeast Division</option>
            <option value={"Western"}>Western Conference</option>
            <option value={"Northwest"}>Northwest Division</option>
            <option value={"Pacific"}>Pacific Division</option>
            <option value={"Southwest"}>Southwest Division</option>
          </select>
        </label>
      </div>

      <div className='cards-wrapper'>
        {filteredTeams?.map(({ ...prop }) => {
          const teamStandings = standings?.find(standing => standing.Key === prop.Key);
          return (
            <TeamCard teamStandings={teamStandings} singleTeam={prop} />
          )
        })}
        {filteredTeams?.length === 0 && <h2>No teams matched {searchTerm}</h2>}
      </div>
    </div>
  )
}

export default League