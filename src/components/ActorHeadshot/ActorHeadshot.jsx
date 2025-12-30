// Assets
import profilePic from "../../assets/profile-placeholder.jpg";

// Utilities
import { obscureString } from "../../utilities";

// Styles
import "./ActorHeadshot.scss";

// Variables
const IMG_BASE = process.env.REACT_APP_TMDB_IMG_BASE;

/**
 * Component to display an actor's headshot and name.
 * @param {object} actor Actor data object from TMDB.
 * @param {boolean} revealCharNamesVisible Whether to reveal character names or obscure them.
 * @returns
 */
const ActorHeadshot = ({ actor, revealCharNamesVisible }) => {
  return (
    <div key={actor.id} className="headshotbox">
      <img
        className={"headshot"}
        src={
          actor.profile_path ? `${IMG_BASE}${actor.profile_path}` : profilePic
        }
        alt={actor.name}
      />
      <p className="actorname">{`${actor.name}`}</p>
      <p className="actorname actorname--as">as</p>
      {
        <p className="actorname actorname--char">
          {revealCharNamesVisible
            ? actor.sanitizedCharacter
            : obscureString(actor.sanitizedCharacter)}
        </p>
      }
    </div>
  );
};

export default ActorHeadshot;
