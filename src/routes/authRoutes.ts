import {Router} from 'express';
import { validate } from '../middleware/validate';
import { signupSchema, loginSchema } from '../validation/userValidation';
import { signup, login } from '../controllers/authController';

const authRouter = Router();

authRouter.post('/signup', validate(signupSchema), signup);
authRouter.post('/login', validate(loginSchema), login);

export default authRouter;