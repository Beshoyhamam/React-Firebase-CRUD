import { useNavigate, Link } from "react-router-dom";
import "./Navbar.css"
import Logo from "/public/images/logo.png"

const Navbar = () => {
    const navigate = useNavigate()

    return (
        <div className="nav-bar">
            <div className="main-container">
                <Link to="/" className="logo">
                    <img src={Logo} alt="Logo" />
                </Link>

                <div className="heading">
                    <h3>CRUD USERS</h3>
                </div>

                <div className="btn">
                    <button onClick={() => navigate("/add")}>
                        Add User
                    </button>
                </div>
            </div>
        </div>
    );
}

export default Navbar;