const User = require('../Models/User');
const jwt = require('jsonwebtoken');

exports.signup = async (req, res) => {
  const { name, email, password } = req.body;

  // Validate input
  if (!name || !email || !password) {
    return res.status(400).json({ error: 'Name, email, and password are required' });
  }

  try {
    console.log(`📝 Attempting signup for: ${email}`);
    // Check for existing user
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ error: 'Email already exists' });
    }

    // Create user (password hashed in model)
    const user = new User({ name, email, password });
    console.log(`📤 Saving user: ${email}`);
    await user.save();
    console.log(`✅ User created: ${user.email}`);

    // Generate JWT token
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });

    res.status(201).json({ token, user: { id: user._id, name, email } });
  } catch (error) {
    console.error(`❌ Signup error for ${email}:`, error.message, error.stack);
    res.status(500).json({ error: 'Server error', details: error.message });
  }
};

exports.login = async (req, res) => {
  const { email, password } = req.body;

  // Validate input
  if (!email || !password) {
    return res.status(400).json({ error: 'Email and password are required' });
  }

  try {
    console.log(`📝 Attempting login for: ${email}`);
    // Find user
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ error: 'Invalid email or password' });
    }

    // Compare passwords
    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return res.status(400).json({ error: 'Invalid email or password' });
    }

    // Generate JWT
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
    res.json({ token, user: { id: user._id, name: user.name, email } });
  } catch (error) {
    console.error(`❌ Login error for ${email}:`, error.message, error.stack);
    res.status(500).json({ error: 'Server error', details: error.message });
  }
};