import { useContext } from 'react';
import AuthContext from '../context/AuthContext';
import { roadmaps, careerNames } from '../data/quizData';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import './Roadmap.css';

const Roadmap = () => {
    const { user } = useContext(AuthContext);

    if (!user || !user.careerField) return (
        <div className="roadmap-container">
            <div className="container">
                <div className="empty-state">
                    <div className="empty-icon">🗺️</div>
                    <h2>No Roadmap Found</h2>
                    <p>Complete the assessment first to get your personalized career roadmap</p>
                    <Link to="/assessment" className="btn-primary btn-large">
                        Take Assessment →
                    </Link>
                </div>
            </div>
        </div>
    );

    const field = user.careerField;
    const level = user.assessment.level;
    const currentRoadmap = roadmaps[field]?.[level] || [];

    const levelInfo = {
        beginner: { color: '#10b981', label: 'Foundation Phase' },
        intermediate: { color: '#f59e0b', label: 'Growth Phase' },
        expert: { color: '#6366f1', label: 'Mastery Phase' }
    };

    return (
        <div className="roadmap-container">
            <div className="container">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                >
                    <div className="roadmap-header">
                        <div className="roadmap-title-section">
                            <h1>
                                <span className="text-gradient">{careerNames[field]}</span> Roadmap
                            </h1>
                            <div className="level-indicator" style={{ borderColor: levelInfo[level].color }}>
                                <span className="level-dot" style={{ background: levelInfo[level].color }}></span>
                                {levelInfo[level].label}
                            </div>
                        </div>
                        <p className="roadmap-description">
                            Follow these steps to progress in your {careerNames[field]} journey
                        </p>
                    </div>

                    <div className="roadmap-steps">
                        {currentRoadmap.map((step, index) => (
                            <motion.div
                                key={index}
                                className="roadmap-step"
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: index * 0.1 }}
                            >
                                <div className="step-number" style={{ background: levelInfo[level].color }}>
                                    {index + 1}
                                </div>
                                <div className="step-content">
                                    <h3>{step}</h3>
                                    <div className="step-checkbox">
                                        <input type="checkbox" id={`step-${index}`} />
                                        <label htmlFor={`step-${index}`}>Mark as complete</label>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>

                    <motion.div
                        className="roadmap-footer"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.5 }}
                    >
                        <div className="footer-card">
                            <h3>🎯 Ready for the Next Level?</h3>
                            <p>Complete these steps and retake the assessment to unlock the next phase</p>
                            <Link to="/assessment" className="btn-outline">
                                Retake Assessment
                            </Link>
                        </div>
                    </motion.div>
                </motion.div>
            </div>
        </div>
    );
};

export default Roadmap;
