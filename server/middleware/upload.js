import multer from 'multer';
import path from 'path';

// Configure storage logic
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    // Creating a unique filename: fieldname-timestamp-random.extension
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, `${file.fieldname}-${uniqueSuffix}${path.extname(file.originalname)}`);
  }
});

// Refined file filter logic
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

// Centralized configuration
const uploadConfig = {
  storage: storage,
  fileFilter: fileFilter,
  limits: {
    fileSize: 1024 * 1024 * 5, // 5MB limit
  },
};

const upload = multer(uploadConfig);

// Specific exports for single and multiple uploads using the same config
export const singleUpload = upload.single('image');
export const multipleUpload = upload.array('images', 5); // Limit to 5 files

export default upload;