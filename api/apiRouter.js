const router = require('express').Router();

// import routers
const loginRouter = require('../routes/auth/login-router.js');
const registerRouter = require('../routes/auth/register-router.js');
const notesRouter = require('../routes/notes-router.js');


// so to use the register and login router we need to access /api first
// ie - /api/register - /api/login
router.use('/register', registerRouter);
router.use('/login', loginRouter);

// notes router
router.use('/notes', notesRouter);


module.exports = router;