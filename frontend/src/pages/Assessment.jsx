import { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import AuthContext from '../context/AuthContext';
import { questions } from '../data/quizData';
import { motion, AnimatePresence } from 'framer-motion';
import './Assessment.css';

const Assessment = () => {
    const { updateProfile } = useContext(AuthContext);
    const navigate = useNavigate();

    const [step, setStep] = useState('quiz');
    const [qIndex, setQIndex] = useState(0);
    const [scores, setScores] = useState({});
    const [levelInputs, setLevelInputs] = useState({ logic: 3, skill: 3, consistency: 3 });

    const handleQuizAnswer = (answer) => {
        if (answer) {
            const field = questions[qIndex].field;
            setScores(prev => ({ ...prev, [field]: (prev[field] || 0) + 1 }));
        }

        if (qIndex < questions.length - 1) {
            setQIndex(qIndex + 1);
        } else {
            setStep('level');
        }
    };

    const handleLevelSubmit = async (e) => {
        e.preventDefault();

        const field = Object.keys(scores).reduce((a, b) =>
            (scores[a] || 0) > (scores[b] || 0) ? a : b,
            Object.keys(scores)[0] || 'skills'
        );

        const total = parseInt(levelInputs.logic) + parseInt(levelInputs.skill) + parseInt(levelInputs.consistency);
        let level = "beginner";
        let phase = 1;
        if (total > 12) { level = "expert"; phase = 3; }
        else if (total > 7) { level = "intermediate"; phase = 2; }

        const assessmentData = {
            careerField: field,
            assessment: {
                ...levelInputs,
                totalScore: total,
                level,
                phase,
                completedAt: new Date()
            }
        };

        try {
            await updateProfile(assessmentData);
            navigate('/dashboard');
        } catch (err) {
            console.error(err);
            alert('Failed to save assessment');
        }
    };

    const progress = ((qIndex + 1) / questions.length) * 100;

    return (
        <div className="assessment-container">
            <div className="container">
                <AnimatePresence mode="wait">
                    {step === 'quiz' ? (
                        <motion.div
                            key="quiz"
                            className="assessment-card"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20 }}
                        >
                            <div className="progress-bar">
                                <div className="progress-fill" style={{ width: `${progress}%` }}></div>
                            </div>

                            <div className="question-header">
                                <span className="question-number">Question {qIndex + 1} of {questions.length}</span>
                                <span className="badge">{Math.round(progress)}% Complete</span>
                            </div>

                            <h2 className="question-text">{questions[qIndex].text}</h2>

                            <div className="answer-buttons">
                                <motion.button
                                    onClick={() => handleQuizAnswer(true)}
                                    className="btn-answer btn-yes"
                                    whileHover={{ scale: 1.02 }}
                                    whileTap={{ scale: 0.98 }}
                                >
                                    <span className="answer-icon">✓</span>
                                    Yes
                                </motion.button>
                                <motion.button
                                    onClick={() => handleQuizAnswer(false)}
                                    className="btn-answer btn-no"
                                    whileHover={{ scale: 1.02 }}
                                    whileTap={{ scale: 0.98 }}
                                >
                                    <span className="answer-icon">✗</span>
                                    No
                                </motion.button>
                            </div>
                        </motion.div>
                    ) : (
                        <motion.div
                            key="level"
                            className="assessment-card"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                        >
                            <h2 className="section-title">Self Assessment</h2>
                            <p className="section-description">
                                Rate yourself honestly on these key areas (1 = Beginner, 5 = Expert)
                            </p>

                            <form onSubmit={handleLevelSubmit} className="level-form">
                                <div className="input-group">
                                    <label>Problem Solving & Logic</label>
                                    <div className="slider-container">
                                        <input
                                            type="range"
                                            min="1"
                                            max="5"
                                            value={levelInputs.logic}
                                            onChange={e => setLevelInputs({ ...levelInputs, logic: e.target.value })}
                                            className="slider"
                                        />
                                        <div className="slider-labels">
                                            <span>1</span>
                                            <span>2</span>
                                            <span>3</span>
                                            <span>4</span>
                                            <span>5</span>
                                        </div>
                                        <div className="slider-value">{levelInputs.logic}</div>
                                    </div>
                                </div>

                                <div className="input-group">
                                    <label>Technical Execution</label>
                                    <div className="slider-container">
                                        <input
                                            type="range"
                                            min="1"
                                            max="5"
                                            value={levelInputs.skill}
                                            onChange={e => setLevelInputs({ ...levelInputs, skill: e.target.value })}
                                            className="slider"
                                        />
                                        <div className="slider-labels">
                                            <span>1</span>
                                            <span>2</span>
                                            <span>3</span>
                                            <span>4</span>
                                            <span>5</span>
                                        </div>
                                        <div className="slider-value">{levelInputs.skill}</div>
                                    </div>
                                </div>

                                <div className="input-group">
                                    <label>Consistency & Discipline</label>
                                    <div className="slider-container">
                                        <input
                                            type="range"
                                            min="1"
                                            max="5"
                                            value={levelInputs.consistency}
                                            onChange={e => setLevelInputs({ ...levelInputs, consistency: e.target.value })}
                                            className="slider"
                                        />
                                        <div className="slider-labels">
                                            <span>1</span>
                                            <span>2</span>
                                            <span>3</span>
                                            <span>4</span>
                                            <span>5</span>
                                        </div>
                                        <div className="slider-value">{levelInputs.consistency}</div>
                                    </div>
                                </div>

                                <button type="submit" className="btn-primary btn-large w-full">
                                    Get My Career Path →
                                </button>
                            </form>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </div>
    );
};

export default Assessment;