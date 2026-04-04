import {Router} from 'express';
import {validate} from '../middleware/validate';
import {movieSearchSchema, concertSearchSchema} from '../validation/entValidation';
import {searchMovie, searchConcert} from '../controllers/entController';

const entRouter = Router();

entRouter.get('/movies', validate(movieSearchSchema), searchMovie);
entRouter.get('/concerts', validate(concertSearchSchema), searchConcert);

export default entRouter;
