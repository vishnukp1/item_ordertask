import multer from 'multer';
import path from 'path';

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads'); 
  },
  filename: function (req, file, cb) {
    const fileType = file.mimetype.split('/')[1];
    cb(null, `${file.fieldname}-${Date.now()}.${fileType}`);
  }
});

const upload = multer({ storage });

export default upload;


