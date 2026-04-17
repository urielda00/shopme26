import multer from 'multer';
import path from 'path';

/**
 * Configures Multer storage logic.
 * Generates secure, collision-resistant filenames using timestamps and random suffixes.
 */
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, `${file.fieldname}-${uniqueSuffix}${path.extname(file.originalname)}`);
  }
});

/**
 * Restricts file uploads to specific image formats (JPEG, JPG, PNG).
 * Validates both file extensions and MIME types to prevent malicious file uploads.
 */
const fileFilter = (req, file, cb) => {
  const allowedExtensions = /jpeg|jpg|png/;
  const allowedMimeTypes = /image\/jpeg|image\/jpg|image\/png/;

  const extension = allowedExtensions.test(path.extname(file.originalname).toLowerCase());
  const mimeType = allowedMimeTypes.test(file.mimetype);

  if (extension && mimeType) {
    cb(null, true);
  } else {
    cb(new Error('Invalid file type. Only JPEG, JPG, and PNG are allowed!'), false);
  }
};

/**
 * Centralized Multer configuration applying storage rules, file filters, 
 * and a strict 5MB file size limit to prevent abuse.
 */
const uploadConfig = {
  storage: storage,
  fileFilter: fileFilter,
  limits: {
    fileSize: 1024 * 1024 * 5,
  },
};

const upload = multer(uploadConfig);

export const singleUpload = upload.single('image');
export const multipleUpload = upload.array('images', 5); 

export default upload;