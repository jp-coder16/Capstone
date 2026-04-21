const express = require('express');
const { verifyToken } = require('../middleware/authMiddleware');
const { roleCheck } = require('../middleware/roleMiddleware');
const { uploadData, deleteData, getAllUsers } = require('../controllers/adminController');
const multer = require('multer');
const upload = multer({ dest: 'uploads/' });
const router = express.Router();

router.post('/upload-data', verifyToken, roleCheck('admin'), upload.single('file'), uploadData);
router.delete('/delete-data', verifyToken, roleCheck('admin'), deleteData);
router.get('/users', verifyToken, roleCheck('admin'), getAllUsers);

module.exports = router;