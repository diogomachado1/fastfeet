import multer from 'multer';
import crypto from 'crypto';
import { extname, resolve } from 'path';
import BadRequestError from '../app/Error/BadRequestError';

const fileName = (file, cb): any => {
  crypto.randomBytes(16, (err, res) => {
    if (err) return cb(err);

    return cb(null, res.toString('hex') + extname(file.originalname));
  });
};
const storage = multer.diskStorage({
  destination: resolve(__dirname, '..', '..', 'tmp', 'uploads'),
  filename: (req, file, cb) => {
    fileName(file, cb);
  },
});

export default {
  limits: { fileSize: 3 * 1000 * 1000 },
  storage,
  fileFilter: (req, file, cb): any => {
    const isAccepted = ['image/png', 'image/jpg', 'image/jpeg'].find(
      format => format === file.mimetype
    );
    if (!isAccepted) cb(new BadRequestError('Format invalid'));

    return cb(null, true);
  },
};
