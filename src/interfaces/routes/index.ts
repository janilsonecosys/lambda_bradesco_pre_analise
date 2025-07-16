import express from 'express';
import {BradescoPreAnaliseAdapter} from '../../infrastructure/adapters/BradescoPreAnaliseAdapter';
import {PreAnaliseUseCase} from '../../application/use-cases/PreAnaliseUseCase';
import {PreAnaliseController} from '../controllers/PreAnaliseController';

const router = express.Router();

const preAnaliseAdapter = new BradescoPreAnaliseAdapter();
const preAnaliseUseCase = new PreAnaliseUseCase(preAnaliseAdapter);
const preAnaliseController = new PreAnaliseController(preAnaliseUseCase);

router.post('/', (req, res) => preAnaliseController.handle(req, res));

export default router;
