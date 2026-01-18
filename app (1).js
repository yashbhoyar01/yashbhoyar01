console.log("🚀 Skill2Career Starting...");

/* ---------------- AUTH STATE ---------------- */
let currentUser = JSON.parse(localStorage.getItem("currentUser"));
const users = JSON.parse(localStorage.getItem("users")) || [];

/* ---------------- DOM ELEMENTS ---------------- */
const loginBtn = document.getElementById("login-btn");
const logoutBtn = document.createElement("button");
logoutBtn.id = "logout-btn";
logoutBtn.textContent = "Logout";
logoutBtn.style.display = "none";
// Insert Logout button after Login button in the DOM if possible, or in Navbar
if (loginBtn) {
    loginBtn.parentElement.appendChild(logoutBtn);
}

const authModal = document.getElementById("auth-modal");
const closeBtn = document.querySelector(".close-btn");
const authForm = document.getElementById("auth-form");
const modalTitle = document.getElementById("modal-title");
const modalBtn = document.getElementById("modal-btn");
const toggleAuth = document.getElementById("toggle-auth");
const usernameInput = document.getElementById("username");
const passwordInput = document.getElementById("password");

let isLoginMode = true;

/* ---------------- AUTH FUNCTIONS ---------------- */
function updateUI() {
    if (currentUser) {
        if (loginBtn) loginBtn.style.display = "none";
        logoutBtn.style.display = "inline-block";
        console.log("Welcome back, " + currentUser.username);
        loadUserDashboard();
    } else {
        if (loginBtn) loginBtn.style.display = "inline-block";
        logoutBtn.style.display = "none";
    }
}

function handleAuth(e) {
    e.preventDefault();
    const username = usernameInput.value.trim();
    const password = passwordInput.value.trim();

    if (!username || !password) {
        alert("Please fill in all fields");
        return;
    }

    if (isLoginMode) {
        // LOGIN
        const user = users.find(u => u.username === username && u.password === password);
        if (user) {
            currentUser = user;
            localStorage.setItem("currentUser", JSON.stringify(currentUser));
            alert("Login Successful!");
            closeModal();
            updateUI();
        } else {
            alert("Invalid username or password");
        }
    } else {
        // REGISTER
        const userExists = users.some(u => u.username === username);
        if (userExists) {
            alert("Username already taken");
        } else {
            const newUser = { username, password, assessment: null };
            users.push(newUser);
            localStorage.setItem("users", JSON.stringify(users));
            
            currentUser = newUser;
            localStorage.setItem("currentUser", JSON.stringify(currentUser));
            
            alert("Registration Successful!");
            closeModal();
            updateUI();
        }
    }
    
    // Reset form
    usernameInput.value = "";
    passwordInput.value = "";
}

function logout() {
    currentUser = null;
    localStorage.removeItem("currentUser");
    alert("Logged out successfully");
    updateUI();
    // Optional: reload page to clear states
    window.location.reload();
}

/* ---------------- MODAL FUNCTIONS ---------------- */
function openModal() {
    authModal.style.display = "flex";
}

function closeModal() {
    authModal.style.display = "none";
}

function toggleAuthMode() {
    isLoginMode = !isLoginMode;
    if (isLoginMode) {
        modalTitle.textContent = "Login";
        modalBtn.textContent = "Login";
        toggleAuth.textContent = "Don't have an account? Register";
    } else {
        modalTitle.textContent = "Register";
        modalBtn.textContent = "Register";
        toggleAuth.textContent = "Already have an account? Login";
    }
}

/* ---------------- EVENT LISTENERS ---------------- */
if (loginBtn) loginBtn.addEventListener("click", openModal);
if (logoutBtn) logoutBtn.addEventListener("click", logout);
if (closeBtn) closeBtn.addEventListener("click", closeModal);
if (authForm) authForm.addEventListener("submit", handleAuth);
if (toggleAuth) toggleAuth.addEventListener("click", toggleAuthMode);

// Close modal if clicking outside
window.addEventListener("click", (e) => {
    if (e.target === authModal) closeModal();
});

/* ---------------- DASHBOARD LOGIC (Adapted to HTML) ---------------- */
const assessmentBtn = document.getElementById("assessment-btn");
const scoreDisplay = document.getElementById("score-display");
const levelDisplay = document.getElementById("level-display");
const phaseDisplay = document.getElementById("phase-display");
const gapsDisplay = document.getElementById("gaps-display");
const progressText = document.getElementById("progress-text");
const progressCircle = document.querySelector(".progress-ring__circle");

function loadUserDashboard() {
    if (!currentUser || !currentUser.assessment) return;
    
    const data = currentUser.assessment;
    if (scoreDisplay) scoreDisplay.textContent = data.totalScore;
    if (levelDisplay) levelDisplay.textContent = data.level;
    if (phaseDisplay) phaseDisplay.textContent = "Phase " + data.phase;
    if (gapsDisplay) gapsDisplay.textContent = "None"; // Placeholder
    
    const percentage = Math.round((data.totalScore / 15) * 100);
    if (progressText) progressText.textContent = `${percentage}%`;
    
    if (progressCircle) {
        const radius = progressCircle.r.baseVal.value;
        const circumference = radius * 2 * Math.PI;
        const offset = circumference - (percentage / 100) * circumference;
        progressCircle.style.strokeDashoffset = offset;
    }
}

function handleAssessment() {
    if (!currentUser) {
        alert("Please login first to save your assessment!");
        openModal();
        return;
    }

    const logic = parseInt(document.getElementById("logic").value) || 0;
    const skill = parseInt(document.getElementById("skill").value) || 0;
    const consistency = parseInt(document.getElementById("consistency").value) || 0;

    const totalScore = logic + skill + consistency;
    let level = "Beginner";
    let phase = 1;

    if (totalScore > 12) {
        level = "Expert";
        phase = 3;
    } else if (totalScore > 7) {
        level = "Intermediate";
        phase = 2;
    }

    const assessmentResult = {
        logic, skill, consistency, totalScore, level, phase,
        date: new Date().toISOString()
    };

    // Save to current user
    currentUser.assessment = assessmentResult;
    localStorage.setItem("currentUser", JSON.stringify(currentUser));

    // Update users array
    const userIndex = users.findIndex(u => u.username === currentUser.username);
    if (userIndex !== -1) {
        users[userIndex] = currentUser;
        localStorage.setItem("users", JSON.stringify(users));
    }

    alert(`Assessment Complete! You are at ${level} Level.`);
    loadUserDashboard();
    
    // Scroll to dashboard
    document.getElementById("dashboard-section").scrollIntoView({ behavior: "smooth" });
}

if (assessmentBtn) {
    assessmentBtn.addEventListener("click", handleAssessment);
}

// Initial UI Check
updateUI();