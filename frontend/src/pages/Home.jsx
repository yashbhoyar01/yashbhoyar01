import { Link } from 'react-router-dom';
import { useContext } from 'react';
import AuthContext from '../context/AuthContext';
import { motion } from 'framer-motion';
import './Home.css';

const Home = () => {
    const { user } = useContext(AuthContext);

    return (
        <div className="home-container">
            <div className="container">
                <motion.div
                    className="hero-content"
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                >
                    <motion.div
                        className="badge mb-3"
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.2 }}
                    >
                        ✨ AI-Powered Career Guidance
                    </motion.div>

                    <h1 className="hero-title">
                        Find Your Perfect
                        <br />
                        <span className="text-gradient">Career Path</span>
                    </h1>

                    <p className="hero-description">
                        Take our smart assessment to discover the career that matches your skills,
                        mindset, and goals. Get personalized roadmaps to success.
                    </p>

                    <motion.div
                        className="hero-cta"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.6 }}
                    >
                        {user ? (
                            <Link to="/dashboard" className="btn-primary btn-large">
                                Go to Dashboard →
                            </Link>
                        ) : (
                            <Link to="/login" className="btn-primary btn-large">
                                Get Started Free →
                            </Link>
                        )}
                    </motion.div>

                    <motion.div
                        className="hero-stats"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.8 }}
                    >
                        <div className="stat-item">
                            <div className="stat-number">6</div>
                            <div className="stat-label">Career Paths</div>
                        </div>
                        <div className="stat-divider"></div>
                        <div className="stat-item">
                            <div className="stat-number">12</div>
                            <div className="stat-label">Smart Questions</div>
                        </div>
                        <div className="stat-divider"></div>
                        <div className="stat-item">
                            <div className="stat-number">100%</div>
                            <div className="stat-label">Personalized</div>
                        </div>
                    </motion.div>
                </motion.div>
            </div>

            {/* Background decoration */}
            <div className="bg-decoration"></div>
        </div>
    );
};

export default Home;
