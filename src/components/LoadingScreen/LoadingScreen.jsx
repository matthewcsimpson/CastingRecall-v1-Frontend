// Styles
import "./LoadingScreen.scss";

// Assets
import loading from "../../assets/loading-25.gif";

const LoadingScreen = () => {
  return (
    <div className="loading--box">
      <img className="loading--gif" src={loading} alt="loading" />
    </div>
  );
};

export default LoadingScreen;
