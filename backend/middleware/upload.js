import multer from 'multer';
import path from 'path';

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const uploadPath = req.uploadPath || 'uploads/';
    cb(null, uploadPath);
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname));
  }
});

const fileFilter = (req, file, cb) => {
  const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'];
  if (allowedTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new Error('نوع الملف غير مدعوم. يرجى رفع صورة بصيغة JPG, PNG, أو WEBP'), false);
  }
};

export const upload = multer({
  storage,
  fileFilter,
  limits: { fileSize: 5 * 1024 * 1024 }
});

export const uploadProductImages = (req, res, next) => {
  req.uploadPath = 'uploads/products/';
  upload.array('images', 5)(req, res, next);
};

export const uploadAvatar = (req, res, next) => {
  req.uploadPath = 'uploads/avatars/';
  upload.single('avatar')(req, res, next);
};

export const uploadCategoryImage = (req, res, next) => {
  req.uploadPath = 'uploads/categories/';
  upload.single('image')(req, res, next);
};
