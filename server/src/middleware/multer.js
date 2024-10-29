import multer from 'multer';
import path from 'path';

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, '../uploads')); 
  },
  filename: function (req, file, cb) {
    const fileType = file.mimetype.split('/')[1];
    cb(null, `${file.fieldname}-${Date.now()}-${Math.random().toString(36).substring(7)}.${fileType}`);
  },
});

const upload = multer({ storage });

export default upload;
