import { useContext } from 'react';
import AuthContext from '../context/AuthContext';
import { Link } from 'react-router-dom';
import { careerNames } from '../data/quizData';
import { motion } from 'framer-motion';
import './Dashboard.css';

const Dashboard = () => {
    const { user } = useContext(AuthContext);

    if (!user) return (
        <div className="dashboard-container">
            <div className="spinner"></div>
        </div>
    );

    const hasAssessment = user.assessment && user.careerField;

    return (
        <div className="dashboard-container">
            <div className="container">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                >
                    <div className="dashboard-header">
                        <div>
                            <h1>Welcome back, <span className="text-gradient">{user.username}</span></h1>
                            <p>Here's your career journey overview</p>
                        </div>
                    </div>

                    {!hasAssessment ? (
                        <motion.div
                            className="empty-state"
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                        >
                            <div className="empty-icon">🎯</div>
                            <h2>Start Your Journey</h2>
                            <p>Take our smart assessment to discover your perfect career path and get a personalized roadmap.</p>
                            <Link to="/assessment" className="btn-primary btn-large">
                                Take Assessment →
                            </Link>
                        </motion.div>
                    ) : (
                        <div className="dashboard-grid">
                            <motion.div
                                className="stat-card primary-card"
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.1 }}
                            >
                                <div className="stat-icon">🎯</div>
                                <div className="stat-content">
                                    <h3>Career Path</h3>
                                    <div className="stat-value">{careerNames[user.careerField] || user.careerField}</div>
                                </div>
                            </motion.div>

                            <motion.div
                                className="stat-card"
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.2 }}
                            >
                                <div className="stat-icon">📊</div>
                                <div className="stat-content">
                                    <h3>Readiness Level</h3>
                                    <div className="stat-value capitalize">{user.assessment.level}</div>
                                    <div className="level-badge">{user.assessment.totalScore}/15 Points</div>
                                </div>
                            </motion.div>

                            <motion.div
                                className="stat-card"
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.3 }}
                            >
                                <div className="stat-icon">🚀</div>
                                <div className="stat-content">
                                    <h3>Current Phase</h3>
                                    <div className="stat-value">Phase {user.assessment.phase}</div>
                                    <div className="phase-progress">
                                        <div className="phase-bar">
                                            <div className="phase-fill" style={{ width: `${(user.assessment.phase / 3) * 100}%` }}></div>
                                        </div>
                                    </div>
                                </div>
                            </motion.div>

                            <motion.div
                                className="action-card"
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.4 }}
                            >
                                <h3>Your Next Steps</h3>
                                <p>View your personalized roadmap to achieve your career goals</p>
                                <Link to="/roadmap" className="btn-primary">
                                    View Roadmap →
                                </Link>
                            </motion.div>
                        </div>
                    )}
                </motion.div>
            </div>
        </div>
    );
};

export default Dashboard;
