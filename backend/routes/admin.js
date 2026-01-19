const router = require('express').Router();
const Code = require('../models/Code');

// Simple admin login (username/password hardcoded)
const ADMIN_USER = process.env.ADMIN_USER || 'admin';
const ADMIN_PASS = process.env.ADMIN_PASS || 'adminler2005';

router.post('/login', (req,res) => {
    const { username, password } = req.body;
    if(username === ADMIN_USER && password === ADMIN_PASS) {
        return res.json({ message: 'Admin login successful' });
    }
    res.status(400).json({ message: 'Wrong credentials' });
});

// Generate code
router.post('/generate', async (req,res) => {
    const { amount } = req.body;
    function generateRandomCode(){
        const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
        return ${chars.charAt(Math.floor(Math.random()*chars.length))}${chars.charAt(Math.floor(Math.random()*chars.length))}${chars.charAt(Math.floor(Math.random()*chars.length))}${chars.charAt(Math.floor(Math.random()*chars.length))}-${chars.charAt(Math.floor(Math.random()*chars.length))}${chars.charAt(Math.floor(Math.random()*chars.length))}${chars.charAt(Math.floor(Math.random()*chars.length))}${chars.charAt(Math.floor(Math.random()*chars.length))}-${chars.charAt(Math.floor(Math.random()*chars.length))}${chars.charAt(Math.floor(Math.random()*chars.length))}${chars.charAt(Math.floor(Math.random()*chars.length))}${chars.charAt(Math.floor(Math.random()*chars.length))};
    }
    const codeStr = generateRandomCode();
    const code = new Code({ code: codeStr, amount });
    await code.save();
    res.json({ message: 'Kod yaradıldı', code: codeStr });
});

module.exports = router;
