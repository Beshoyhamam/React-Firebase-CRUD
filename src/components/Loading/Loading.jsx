import "./Loading.css";
import loadar from "/public/images/loading-loader.png";

const Loading = () => {
    return (
        <div className="loading">
            <img src={loadar} alt="loader" />
        </div>
    );
}

export default Loading;