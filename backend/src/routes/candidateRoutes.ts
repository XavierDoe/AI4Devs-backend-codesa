import { Router } from 'express';
import { addCandidate, getCandidateById } from '../presentation/controllers/candidateController';
import { updateCandidateStage } from '../presentation/controllers/stageController';

const router = Router();

router.post('/', async (req, res) => {
  try {
    const result = await addCandidate(req.body);
    res.status(201).send(result);
  } catch (error) {
    if (error instanceof Error) {
      res.status(400).send({ message: error.message });
    } else {
      res.status(500).send({ message: "An unexpected error occurred" });
    }
  }
});

router.get('/:id', getCandidateById);

// Add the PUT endpoint for updating the interview stage
router.put('/:id/stage', updateCandidateStage);

export default router;
