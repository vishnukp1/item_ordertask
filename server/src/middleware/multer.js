import multer from 'multer';

const upload = multer({
    storage: multer.diskStorage({
        destination: (req, file, cb) => {
            cb(null, 'uploads');
        },
        filename: (req, file, cb) => {
            const fileType = file.mimetype.split('/')[1];
            cb(null, `${file.fieldname}-${Date.now()}.${fileType}`);
        }
    })
});

export default upload;
