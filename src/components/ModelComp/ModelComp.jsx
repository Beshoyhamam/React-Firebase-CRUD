/* eslint-disable react/prop-types */
import "./ModelComp.css"

const ModelComp = ({ userData, handleDelete, closeInfo }) => {
    return (
        <div className="model-comp">
            <div className="info">
                <h2>Uset details</h2>

                <div className="info-content">
                    <div className="img-user">
                        <img src={userData.data().photo} alt={userData.name} />
                    </div>

                    <div className="content">
                        <p><span>Name:</span> {userData.data().name}</p>
                        <p><span>Email:</span> {userData.data().email}</p>
                        <p><span>Info:</span> {userData.data().info}</p>
                        <p><span>Contact:</span> {userData.data().contact}</p>
                    </div>
                </div>

                <div className="btn">
                    <button onClick={() => handleDelete(userData.id, userData.data().photo)}>Delete</button>
                    <button onClick={closeInfo}>Cancel</button>
                </div>
            </div>
        </div>
    );
}

export default ModelComp;