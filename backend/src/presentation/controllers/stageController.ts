import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const updateCandidateStage = async (req: Request, res: Response) => {
    try {
        const candidateId = parseInt(req.params.id);
        const { currentInterviewStep } = req.body;

        // Validate candidateId
        if (isNaN(candidateId)) {
            return res.status(422).json({ error: 'Invalid candidate ID format' });
        }

        // Validate currentInterviewStep
        if (typeof currentInterviewStep !== 'number' || currentInterviewStep < 0) {
            return res.status(422).json({ error: 'Invalid stage. currentInterviewStep must be a non-negative number.' });
        }

        // Check if the candidate exists in the application table
        const application = await prisma.application.findFirst({
            where: { candidateId },
        });

        if (!application) {
            return res.status(404).json({ error: 'Candidate not found in the application table.' });
        }

        // Update the currentInterviewStep
        const updatedApplication = await prisma.application.update({
            where: { id: application.id },
            data: { currentInterviewStep },
        });

        res.status(200).json({
            message: 'Interview stage updated successfully.',
            data: updatedApplication,
        });
    } catch (error) {
        console.error('Error updating interview stage:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};