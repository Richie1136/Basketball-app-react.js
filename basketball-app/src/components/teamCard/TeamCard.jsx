import Card from '../card/Card'
import { Link } from 'react-router-dom'


const TeamCard = ({ teamStandings, singleTeam }) => {

    const defaultPhoto = '/defaultTeam.png'

    const { Wins, Losses, rank } = teamStandings ?? {}
    const { City, HeadCoach, TertiaryColor, WikipediaLogoUrl, Name, Key, PrimaryColor, SecondaryColor, Division, Conference } = singleTeam ?? {}

    return (
        <Card key={Key} style={{ backgroundColor: Name === 'Jazz' ? '#' + PrimaryColor : '#' + TertiaryColor }}>
            <div className='league-info' style={{ 'backgroundColor': Name === 'Jazz' ? '#' + TertiaryColor : '#' + PrimaryColor }}>
                {teamStandings && (
                    <div>
                        <p className='team-record'>
                            {Wins} - {Losses}
                        </p>
                        <p className='team-rank'>#{rank} {Conference} Conference</p>
                        <p className='team-rank'>{Division} Division</p>
                    </div>
                )}
                <h2><Link style={{ 'color': '#' + SecondaryColor }} to={`/${Key}`}>{City} {Name}</Link></h2>
                <h2 style={{ 'color': '#' + SecondaryColor, backgroundColor: Name === 'Jazz' ? '#' + TertiaryColor : '#' + PrimaryColor }}>Head Coach: {HeadCoach !== null ? HeadCoach : 'N/A'}</h2>
                <img className='team-photo' src={WikipediaLogoUrl || defaultPhoto} alt={`${City} ${Name} logo`} onError={(e) => {
                    e.currentTarget.src = defaultPhoto;
                }} />
            </div>
        </Card>
    )
}

export default TeamCard