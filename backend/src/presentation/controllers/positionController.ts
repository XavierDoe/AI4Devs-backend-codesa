import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const getCandidatesByPositionId = async (req: Request, res: Response) => {
    try {
        const positionId = parseInt(req.params.id);

        // Validate positionId
        if (isNaN(positionId)) {
            return res.status(400).json({ error: 'Invalid position ID format' });
        }

        // Check if the position exists
        const positionExists = await prisma.position.findUnique({
            where: { id: positionId },
        });

        if (!positionExists) {
            return res.status(404).json({ error: 'Position not found' });
        }

        // Retrieve candidates associated with the position
        const candidates = await prisma.application.findMany({
            where: { positionId },
            include: {
                candidate: true,
                interviews: true,
            },
        });

        // Transform data to match the response requirements
        const result = candidates.map((application) => {
            const averageScore =
                application.interviews.length > 0
                    ? application.interviews.reduce((sum, interview) => sum + (interview.score || 0), 0) /
                      application.interviews.length
                    : 0;

            return {
                fullName: `${application.candidate.firstName} ${application.candidate.lastName}`,
                currentInterviewStep: application.currentInterviewStep,
                averageScore,
            };
        });

        // Sort by averageScore in descending order
        result.sort((a, b) => b.averageScore - a.averageScore);

        res.json(result);
    } catch (error) {
        console.error('Error retrieving candidates:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};