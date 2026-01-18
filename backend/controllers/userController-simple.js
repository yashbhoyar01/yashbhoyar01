const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { readDB, writeDB } = require('../server-simple');

const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET || 'secret123', {
        expiresIn: '30d'
    });
};

// @desc    Register new user
// @route   POST /api/users/register
const registerUser = async (req, res) => {
    const { username, password, email } = req.body;

    if (!username || !password) {
        return res.status(400).json({ message: 'Please add all fields' });
    }

    try {
        const db = readDB();

        // Check if user exists
        const userExists = db.users.find(u => u.username === username);
        if (userExists) {
            return res.status(400).json({ message: 'User already exists' });
        }

        // Hash password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // Create user
        const newUser = {
            _id: Date.now().toString(),
            username,
            email: email || '',
            password: hashedPassword,
            careerField: null,
            assessment: null,
            createdAt: new Date().toISOString()
        };

        db.users.push(newUser);
        writeDB(db);

        res.status(201).json({
            _id: newUser._id,
            username: newUser.username,
            token: generateToken(newUser._id)
        });
    } catch (error) {
        console.error('Register error:', error);
        res.status(500).json({ message: error.message });
    }
};

// @desc    Authenticate a user
// @route   POST /api/users/login
const loginUser = async (req, res) => {
    const { username, password } = req.body;

    try {
        const db = readDB();
        const user = db.users.find(u => u.username === username);

        if (user && (await bcrypt.compare(password, user.password))) {
            res.json({
                _id: user._id,
                username: user.username,
                email: user.email,
                careerField: user.careerField,
                assessment: user.assessment,
                token: generateToken(user._id)
            });
        } else {
            res.status(401).json({ message: 'Invalid credentials' });
        }
    } catch (error) {
        console.error('Login error:', error);
        res.status(500).json({ message: error.message });
    }
};

// @desc    Get user data
// @route   GET /api/users/me
const getMe = async (req, res) => {
    try {
        const db = readDB();
        const user = db.users.find(u => u._id === req.user.id);

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        const { password, ...userWithoutPassword } = user;
        res.status(200).json(userWithoutPassword);
    } catch (error) {
        console.error('GetMe error:', error);
        res.status(500).json({ message: error.message });
    }
};

// @desc    Update assessment/career results
// @route   PUT /api/users/update
const updateUser = async (req, res) => {
    try {
        const db = readDB();
        const userIndex = db.users.findIndex(u => u._id === req.user.id);

        if (userIndex === -1) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Update user data
        db.users[userIndex] = {
            ...db.users[userIndex],
            ...req.body,
            updatedAt: new Date().toISOString()
        };

        writeDB(db);

        const { password, ...userWithoutPassword } = db.users[userIndex];
        res.status(200).json(userWithoutPassword);
    } catch (error) {
        console.error('Update error:', error);
        res.status(500).json({ message: error.message });
    }
};

module.exports = {
    registerUser,
    loginUser,
    getMe,
    updateUser
};
