import { Link } from 'react-router-dom';
import { useContext } from 'react';
import AuthContext from '../context/AuthContext';
import './Navbar.css'; // We can define specific styles here or use index.css

const Navbar = () => {
    const { user, logout } = useContext(AuthContext);

    return (
        <nav className="navbar">
            <div className="container nav-content">
                <Link to="/" className="logo">CAREERPATH AI</Link>
                <ul className="nav-links">
                    <li><Link to="/">Home</Link></li>
                    {user ? (
                        <>
                            <li><Link to="/dashboard">Dashboard</Link></li>
                            <li><Link to="/roadmap">Roadmap</Link></li>
                            <li><button onClick={logout} className="btn-outline">Logout</button></li>
                        </>
                    ) : (
                        <li><Link to="/login" className="btn-primary">Login</Link></li>
                    )}
                </ul>
            </div>
        </nav>
    );
};

export default Navbar;
