//! Routing refers to determining how an applicaction responds to a client request to a particular endpoint.

const express = require('express');
const router = express.Router();

//! Multer
const multer = require('multer');
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, "src/public/uploads"),
  filename: (req, file, cb) => cb(null, Date.now() + "_" + file.originalname)
});

const uploadFile = multer({storage});


const controller = require('../controllers/usersController');

router.get('/create', controller.create);
router.post('/', uploadFile.single("image"), controller.store);

router.get('/', controller.index);
router.get('/:id', controller.show);





module.exports = router;