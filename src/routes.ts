import { Router } from 'express';
import multer from 'multer';
import authMiddleware from './app/middlewares/auth';

import multerConfig from './config/multer';

import SessionController from './app/controllers/SessionController';
import RecipientsController from './app/controllers/RecipientsController';
import FileController from './app/controllers/FileController';

const routes = Router();
const upload = multer(multerConfig);

routes.get('/', (req, res) => res.json({ msg: 'oi' }));

routes.post('/sessions', SessionController.store);

routes.use(authMiddleware);

routes.get('/recipients', RecipientsController.index);
routes.get('/recipients/:id', RecipientsController.show);
routes.post('/recipients', RecipientsController.store);
routes.put('/recipients/:id', RecipientsController.update);
routes.delete('/recipients/:id', RecipientsController.delete);

routes.post('/files', upload.single('file'), FileController.store);

export default routes;
