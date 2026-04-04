import { Router } from "express";
import { validate } from "../middleware/validate";
import { travelSearchSchema } from "../validation/trvValidation";
import { searchTravel } from "../controllers/trvController";

const travelRouter = Router();

travelRouter.get('/flights', validate(travelSearchSchema), searchTravel);
travelRouter.get('/trains', validate(travelSearchSchema), searchTravel);

export default travelRouter;