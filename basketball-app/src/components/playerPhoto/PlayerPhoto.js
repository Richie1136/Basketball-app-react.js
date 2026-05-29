import './PlayerPhoto.css';

const PlayerPhoto = ({ photoUrl, altText = 'Player Photo' }) => {
  return (
    <div className="player-photo-container">
      <img src={photoUrl} alt={altText} className="player-photo" />
    </div>
  );
};

export default PlayerPhoto;
