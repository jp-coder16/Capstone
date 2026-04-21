let users = []

// REGISTER / SIGNUP
exports.signup = (req, res) => {
  const { name, email, password, role } = req.body

  if (!name || !email || !password) {
    return res.status(400).json({ message: 'All fields required' })
  }

  const existingUser = users.find(u => u.email === email)
  if (existingUser) {
    return res.status(400).json({ message: 'User already exists' })
  }

  const user = {
    id: Date.now(),
    name,
    email,
    password,
    role: role || 'user'
  }

  users.push(user)

  res.status(200).json({
    token: 'demo-token',
    user
  })
}

// LOGIN
exports.login = (req, res) => {
  const { email, password } = req.body

  const user = users.find(u => u.email === email && u.password === password)

  if (!user) {
    return res.status(400).json({ message: 'Invalid credentials' })
  }

  res.status(200).json({
    token: 'demo-token',
    user
  })
}

// PROFILE
exports.getProfile = (req, res) => {
  res.json({ message: 'Profile data' })
}