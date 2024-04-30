const express = require('express');
const router = express.Router();
const { register, login , loadUser, logoutUser} = require('../controller/user.js');
const { bookmarkStory, getAllBookmarks } = require('../controller/BookMarks.js');
const {isAuth} = require('../middleware/authMiddleware.js');

router.route('/register').post(register);
router.route('/login').post(login);
router.get('/load/:username', isAuth,loadUser);
router.post('/logout',logoutUser);

router.post('/bookmark/:id', isAuth , bookmarkStory);
router.get('/bookmarks/:userId', isAuth , getAllBookmarks);

module.exports = router