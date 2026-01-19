const router = require('express').Router();
const User = require('../models/User');
const Code = require('../models/Code');

// Get user data
router.get('/:id', async (req,res) => {
    const user = await User.findById(req.params.id);
    res.json(user);
});

// Apply code
router.post('/:id/apply-code', async (req,res) => {
    const { code } = req.body;
    const user = await User.findById(req.params.id);
    const codeDoc = await Code.findOne({ code });

    if(!codeDoc) return res.status(400).json({ message: 'Kod tapılmadı' });
    if(codeDoc.used) return res.status(400).json({ message: 'Kod artıq istifadə olunub' });

    user.balance += codeDoc.amount;
    codeDoc.used = true;
    codeDoc.usedBy = user._id;
    codeDoc.usedAt = new Date();

    await user.save();
    await codeDoc.save();

    res.json({ message: 'Kod tətbiq edildi', balance: user.balance });
});

module.exports = router;
