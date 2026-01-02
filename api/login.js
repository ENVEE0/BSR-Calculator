export default async function handler(req, res) {
  // Only allow POST requests
  if (req.method !== 'POST') {
    return res.status(405).json({ 
      success: false, 
      message: 'Method not allowed' 
    });
  }

  try {
    const { password } = req.body;
    const correctPassword = process.env.ADMIN_PASSWORD || 'admin';

    if (password === correctPassword) {
      return res.status(200).json({ 
        success: true, 
        message: 'Login successful' 
      });
    } else {
      return res.status(401).json({ 
        success: false, 
        message: 'Incorrect password' 
      });
    }
  } catch (error) {
    return res.status(500).json({ 
      success: false, 
      message: 'Server error' 
    });
  }
}
