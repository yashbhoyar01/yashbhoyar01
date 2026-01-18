// Firebase v12.8.0 Modular SDK - Your Config
import { initializeApp } from 'https://www.gstatic.com/firebasejs/12.8.0/firebase-app.js';
import { getAuth, signInWithPopup, GoogleAuthProvider, signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut, onAuthStateChanged } from 'https://www.gstatic.com/firebasejs/12.8.0/firebase-auth.js';
import { getFirestore, doc, setDoc, getDoc, serverTimestamp } from 'https://www.gstatic.com/firebasejs/12.8.0/firebase-firestore.js';

const firebaseConfig = {
    apiKey: "AIzaSyCkwDYL5pbnYHFDvB7pdnlnTLQVhj6xiO4",
    authDomain: "careerpath-ai-5fc3a.firebaseapp.com",
    projectId: "careerpath-ai-5fc3a",
    storageBucket: "careerpath-ai-5fc3a.firebasestorage.app",
    messagingSenderId: "415965626787",
    appId: "1:415965626787:web:756f384dc9d699f9961a16",
    measurementId: "G-74SDC57PSZ"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

// Career Assessment Data (unchanged)
const careerQuestions = [
    { text: "Do you enjoy solving maths & logic problems?", field: "engineering" },
    { text: "Do you like biology or helping patients?", field: "medical" },
    { text: "Are you interested in business, money, or management?", field: "commerce" },
    { text: "Do you enjoy creativity, design, or media work?", field: "arts" },
    { text: "Do you want a government job?", field: "government" },
    { text: "Do you want to start earning early with skills?", field: "skills" },
    { text: "Are you comfortable with competitive exams?", field: "government" },
    { text: "Do you like computers & technology?", field: "engineering" },
    { text: "Do you enjoy leading teams or managing people?", field: "commerce" },
    { text: "Are you curious about scientific research?", field: "medical" },
    { text: "Do you want to serve the public/community?", field: "government" },
    { text: "Do you prefer practical, hands-on work?", field: "skills" }
];

const careerRoadmaps = {
    engineering: {
        beginner: ["Learn programming basics (Python/JavaScript)", "Practice math & logic problems daily (30 mins)", "Build 3 simple projects (calculator, to-do app)", "Join online coding communities", "Prepare for college entrance exams"],
        intermediate: ["Master Data Structures & Algorithms", "Build 5 complex projects (web/mobile apps)", "Contribute to open source", "Get internships/freelance work", "Specialize in AI/ML or Web Dev"],
        expert: ["Build production-ready portfolio", "Network with industry professionals", "Apply for top tech companies", "Consider specialized certifications"]
    },
    medical: {
        beginner: ["Focus on Biology & Chemistry fundamentals", "Volunteer at hospitals/clinics", "Practice MCAT/NEET prep questions", "Join science clubs", "Maintain excellent academic record"],
        intermediate: ["Take advanced biology courses", "Shadow doctors/get clinical experience", "Prepare for medical entrance exams", "Research medical programs", "Build strong recommendation letters"],
        expert: ["Apply to top medical colleges", "Prepare for residency matching", "Consider medical research opportunities"]
    },
    commerce: {
        beginner: ["Learn basic accounting & finance", "Practice business case studies", "Develop communication skills", "Join commerce clubs", "Understand market trends"],
        intermediate: ["Master financial modeling", "Get business internships", "Learn digital marketing", "Prepare for MBA/CFA entrance", "Build professional network"],
        expert: ["Launch your own business", "Pursue MBA from top B-schools", "Target investment banking/consulting"]
    },
    arts: {
        beginner: ["Practice your creative skill daily", "Build online portfolio (Behance/Dribbble)", "Take online courses (Skillshare)", "Join creative communities", "Participate in contests"],
        intermediate: ["Create professional portfolio", "Freelance/get client projects", "Network with industry professionals", "Learn business of creative work", "Specialize in niche area"],
        expert: ["Launch personal brand", "Exhibit/work with agencies", "Teach/mentor others"]
    },
    government: {
        beginner: ["Understand exam pattern & syllabus", "Build strong general knowledge", "Practice previous year papers", "Improve speed & accuracy", "Stay consistent with preparation"],
        intermediate: ["Join test series/mock exams", "Focus on weak subjects", "Current affairs daily", "Time management practice", "Physical fitness training"],
        expert: ["Advanced mock test analysis", "Personality development", "Interview preparation", "Apply for multiple services"]
    },
    skills: {
        beginner: ["Choose 1 high-demand skill", "Follow structured learning path", "Practice 2 hours daily", "Build showcase projects", "Create LinkedIn profile"],
        intermediate: ["Get freelance clients", "Build complex projects", "Create online courses", "Network with professionals", "Optimize portfolio"],
        expert: ["Scale your freelance business", "Launch digital products", "Mentor beginners", "Speak at conferences"]
    }
};

// App State
let currentUser = null;
let currentQuestion = 0;
let userAnswers = {};
let fieldScores = { engineering: 0, medical: 0, commerce: 0, arts: 0, government: 0, skills: 0 };

// DOM Elements
const elements = {
    loadingScreen: document.getElementById('loadingScreen'),
    navBar: document.getElementById('navBar'),
    pages: document.querySelectorAll('.page'),
    startAssessmentBtn: document.getElementById('startAssessmentBtn'),
    loginBtn: document.getElementById('loginBtn'),
    dashboardBtn: document.getElementById('dashboardBtn'),
    roadmapBtn: document.getElementById('roadmapBtn'),
    logoutBtn: document.getElementById('logoutBtn'),
    loginPage: document.getElementById('loginPage'),
    assessmentPage: document.getElementById('assessmentPage'),
    dashboardPage: document.getElementById('dashboardPage'),
    roadmapPage: document.getElementById('roadmapPage'),
    googleLoginBtn: document.getElementById('googleLoginBtn'),
    emailLoginForm: document.getElementById('emailLoginForm'),
    createAccountBtn: document.getElementById('createAccountBtn'),
    emailInput: document.getElementById('emailInput'),
    passwordInput: document.getElementById('passwordInput'),
    questionProgress: document.getElementById('questionProgress'),
    questionTitle: document.getElementById('questionTitle'),
    questionText: document.getElementById('questionText'),
    yesBtn: document.getElementById('yesBtn'),
    noBtn: document.getElementById('noBtn'),
    resultsPreview: document.getElementById('resultsPreview'),
    readinessBadge: document.getElementById('readinessBadge'),
    primaryCareerCard: document.getElementById('primaryCareerCard'),
    primaryCareerTitle: document.getElementById('primaryCareerTitle'),
    primaryScoreCircle: document.getElementById('primaryScoreCircle'),
    primaryScorePercent: document.getElementById('primaryScorePercent'),
    totalProgress: document.getElementById('totalProgress'),
    careerScores: document.getElementById('careerScores'),
    viewRoadmapBtn: document.getElementById('viewRoadmapBtn'),
    roadmapTitle: document.getElementById('roadmapTitle'),
    roadmapSubtitle: document.getElementById('roadmapSubtitle'),
    roadmapSteps: document.getElementById('roadmapSteps'),
    backToDashboardBtn: document.getElementById('backToDashboardBtn'),
    restartAssessmentBtn: document.getElementById('restartAssessmentBtn')
};

// Initialize App
document.addEventListener('DOMContentLoaded', function() {
    hideLoading();
    setupEventListeners();
    checkAuthState();
});

// Page Management
function showPage(pageId) {
    elements.pages.forEach(page => page.classList.remove('active'));
    document.getElementById(pageId).classList.add('active');
    
    if (pageId === 'dashboardPage' || pageId === 'roadmapPage') {
        elements.navBar.classList.remove('hidden');
        elements.dashboardBtn.classList.remove('hidden');
        elements.roadmapBtn.classList.remove('hidden');
        elements.logoutBtn.classList.remove('hidden');
    } else {
        elements.navBar.classList.add('hidden');
    }
}

function hideLoading() {
    setTimeout(() => {
        elements.loadingScreen.style.opacity = '0';
        setTimeout(() => elements.loadingScreen.style.display = 'none', 500);
        elements.navBar.classList.remove('hidden');
    }, 1500);
}

// Authentication (Updated for v12)
async function signInWithGoogle() {
    try {
        const provider = new GoogleAuthProvider();
        const result = await signInWithPopup(auth, provider);
        currentUser = result.user;
        showAssessment();
    } catch (error) {
        alert('Google Login failed: ' + error.message);
    }
}

async function signInWithEmail(e) {
    e.preventDefault();
    const email = elements.emailInput.value;
    const password = elements.passwordInput.value;
    
    try {
        const result = await signInWithEmailAndPassword(auth, email, password);
        currentUser = result.user;
        showAssessment();
    } catch (error) {
        alert('Email Login failed: ' + error.message);
    }
}

async function createAccount(e) {
    e.preventDefault();
    const email = elements.emailInput.value;
    const password = elements.passwordInput.value;
    
    try {
        const result = await createUserWithEmailAndPassword(auth, email, password);
        currentUser = result.user;
        showAssessment();
    } catch (error) {
        alert('Account creation failed: ' + error.message);
    }
}

function signOut() {
    signOut(auth);
    resetAppState();
    showPage('landingPage');
}

function checkAuthState() {
    onAuthStateChanged(auth, async (user) => {
        currentUser = user;
        if (user) {
            elements.navBar.classList.remove('hidden');
            await loadUserData();
        }
    });
}

// Event Listeners
function setupEventListeners() {
    elements.startAssessmentBtn.addEventListener('click', () => {
        if (currentUser) showAssessment();
        else showPage('loginPage');
    });
    
    elements.loginBtn.addEventListener('click', () => showPage('loginPage'));
    elements.dashboardBtn.addEventListener('click', () => showPage('dashboardPage'));
    elements.roadmapBtn.addEventListener('click', showRoadmap);
    elements.logoutBtn.addEventListener('click', signOut);
    elements.viewRoadmapBtn.addEventListener('click', () => showPage('roadmapPage'));
    elements.backToDashboardBtn.addEventListener('click', () => showPage('dashboardPage'));
    elements.restartAssessmentBtn.addEventListener('click', restartAssessment);
    
    elements.googleLoginBtn.addEventListener('click', signInWithGoogle);
    elements.emailLoginForm.addEventListener('submit', signInWithEmail);
    elements.createAccountBtn.addEventListener('click', toggleCreateAccount);
    
    elements.yesBtn.addEventListener('click', () => answerQuestion(true));
    elements.noBtn.addEventListener('click', () => answerQuestion(false));
}

function toggleCreateAccount() {
    const form = elements.emailLoginForm;
    const submitBtn = form.querySelector('button[type="submit"]');
    
    if (submitBtn.textContent.includes('Continue')) {
        submitBtn.textContent = 'Create Account';
        elements.emailLoginForm.onsubmit = createAccount;
        elements.createAccountBtn.textContent = 'Back to Login';
    } else {
        submitBtn.textContent = 'Continue with Email';
        elements.emailLoginForm.onsubmit = signInWithEmail;
        elements.createAccountBtn.textContent = 'Create New Account';
    }
}

// Assessment Logic (unchanged)
function showAssessment() {
    currentQuestion = 0;
    userAnswers = {};
    resetFieldScores();
    showPage('assessmentPage');
    loadNextQuestion();
}

function loadNextQuestion() {
    if (currentQuestion >= careerQuestions.length) {
        completeAssessment();
        return;
    }
    
    const question = careerQuestions[currentQuestion];
    elements.questionTitle.textContent = `Question ${currentQuestion + 1}/12`;
    elements.questionText.textContent = question.text;
    elements.questionProgress.style.width = `${((currentQuestion) / careerQuestions.length) * 100}%`;
}

function answerQuestion(answer) {
    const question = careerQuestions[currentQuestion];
    userAnswers[`q${currentQuestion + 1}`] = answer;
    
    if (answer) fieldScores[question.field]++;
    
    setTimeout(() => {
        currentQuestion++;
        loadNextQuestion();
    }, 200);
}

function completeAssessment() {
    calculateResults();
    saveUserData();
    showDashboard();
}

function resetFieldScores() {
    fieldScores = { engineering: 0, medical: 0, commerce: 0, arts: 0, government: 0, skills: 0 };
}

function calculateResults() {
    Object.keys(fieldScores).forEach(field => {
        fieldScores[field] = Math.round((fieldScores[field] / 12) * 100);
    });
}

// Dashboard & Roadmap (unchanged)
async function showDashboard() {
    updateDashboardUI();
    showPage('dashboardPage');
}

function updateDashboardUI() {
    const primaryField = Object.keys(fieldScores).reduce((a, b) => fieldScores[a] > fieldScores[b] ? a : b);
    const primaryScore = fieldScores[primaryField];
    
    const fieldNames = {
        engineering: 'Engineering/Tech', medical: 'Medical/Healthcare',
        commerce: 'Business/Commerce', arts: 'Creative Arts',
        government: 'Government Jobs', skills: 'Skill-Based Careers'
    };
    
    elements.primaryCareerTitle.textContent = fieldNames[primaryField];
    elements.primaryScorePercent.textContent = primaryScore + '%';
    elements.primaryScoreCircle.style.background = `conic-gradient(#00d4ff 0deg ${primaryScore * 3.6}deg, rgba(255,255,255,0.1) ${primaryScore * 3.6}deg 360deg)`;
    
    const totalScore = Object.values(fieldScores).reduce((a, b) => a + b, 0) / 6;
    let readiness = 'beginner', readinessText = 'Beginner';
    
    if (totalScore > 70) { readiness = 'expert'; readinessText = 'Expert'; }
    else if (totalScore > 40) { readiness = 'intermediate'; readinessText = 'Intermediate'; }
    
    elements.readinessBadge.textContent = readinessText;
    elements.readinessBadge.className = `readiness-badge readiness-${readiness}`;
    elements.totalProgress.style.width = totalScore + '%';
    
    renderCareerScores();
    
    window.currentCareerData = { primaryField, primaryScore, readiness, fieldScores, totalScore };
}

function renderCareerScores() {
    const fieldNames = { engineering: 'Engineering', medical: 'Medical', commerce: 'Commerce', arts: 'Arts', government: 'Government', skills: 'Skills' };
    elements.careerScores.innerHTML = Object.entries(fieldScores).map(([field, score]) => `
        <div class="score-item">
            <div class="score-label">${fieldNames[field]}</div>
            <div class="score-bar"><div class="score-fill" style="width: ${score}%"></div></div>
            <div class="score-percent">${score}%</div>
        </div>
    `).join('');
}

function showRoadmap() {
    const data = window.currentCareerData;
    const roadmap = careerRoadmaps[data.primaryField][data.readiness];
    
    const fieldNames = { engineering: 'Engineering/Tech', medical: 'Medical/Healthcare', commerce: 'Business/Commerce', arts: 'Creative Arts', government: 'Government Jobs', skills: 'Skill-Based Careers' };
    
    elements.roadmapTitle.textContent = `${fieldNames[data.primaryField]} Career Roadmap`;
    elements.roadmapSubtitle.textContent = `Your ${data.readiness} level action plan (${data.primaryScore}% match)`;
    
    elements.roadmapSteps.innerHTML = roadmap.map((step, index) => `
        <div class="roadmap-step">
            <div class="roadmap-step-content">
                <div class="roadmap-step-number">${index + 1}</div>
                <div class="roadmap-step-text">
                    <h4>${step}</h4>
                </div>
            </div>
        </div>
    `).join('');
    
    showPage('roadmapPage');
}

function restartAssessment() {
    showAssessment();
}

// Firebase Data Operations (Updated for v12)
async function saveUserData() {
    if (!currentUser) return;
    
    try {
        const primaryCareer = Object.keys(fieldScores).reduce((a, b) => fieldScores[a] > fieldScores[b] ? a : b);
        await setDoc(doc(db, 'users', currentUser.uid), {
            assessmentAnswers: userAnswers,
            fieldScores: fieldScores,
            primaryCareer: primaryCareer,
            totalScore: Object.values(fieldScores).reduce((a, b) => a + b, 0),
            lastActive: serverTimestamp(),
            updatedAt: serverTimestamp()
        }, { merge: true });
    } catch (error) {
        console.error('Error saving data:', error);
    }
}

async function loadUserData() {
    if (!currentUser) return;
    
    try {
        const userDoc = await getDoc(doc(db, 'users', currentUser.uid));
        if (userDoc.exists()) {
            const data = userDoc.data();
            userAnswers = data.assessmentAnswers || {};
            fieldScores = data.fieldScores || fieldScores;
            calculateResults();
            updateDashboardUI();
        }
    } catch (error) {
        console.error('Error loading data:', error);
    }
}

function resetAppState() {
    currentQuestion = 0;
    userAnswers = {};
    resetFieldScores();
    window.currentCareerData = null;
}

// Keyboard shortcuts
document.addEventListener('keydown', (e) => {
    if (document.getElementById('assessmentPage').classList.contains('active')) {
        if (e.key === 'y' || e.key === 'Y') answerQuestion(true);
        if (e.key === 'n' || e.key === 'N') answerQuestion(false);
    }
});