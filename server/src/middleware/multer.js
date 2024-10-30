// uploadConfig.js
import multer from 'multer';
import path from 'path';

// Configure storage for Multer
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads'); // Set destination folder for uploads
  },
  filename: function (req, file, cb) {
    const fileType = file.mimetype.split('/')[1];
    cb(null, `${file.fieldname}-${Date.now()}.${fileType}`);
  }
});

// Initialize Multer with storage configuration
const upload = multer({ storage });

export default upload;


