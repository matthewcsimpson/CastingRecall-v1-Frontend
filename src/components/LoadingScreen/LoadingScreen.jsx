// Assets
import loading from "../../assets/loading-25.gif";

function LoadingScreen() {
  return (
    <div className="loading--box">
      <img className="loading--gif" src={loading} alt="loading" />
    </div>
  );
}

export default LoadingScreen;
