import './PlayerPhoto.css';

const Photo = "/defaultPhoto.png"

const PlayerPhoto = ({ photoUrl, altText = 'Player Photo' }) => {
  return (
    <div className="player-photo-container">
      <img src={photoUrl || Photo} alt={altText} className="player-photo"
        onError={(e) => {
          e.currentTarget.src = Photo;
        }}
      />
    </div>
  );
};

export default PlayerPhoto;
