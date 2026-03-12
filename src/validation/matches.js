import { z } from 'zod';

// Constant for match statuses
export const MATCH_STATUS = {
    SCHEDULED: 'scheduled',
    LIVE: 'live',
    FINISHED: 'finished',
};

// Validates an optional limit as a coerced positive integer with a max of 100
export const listMatchesQuerySchema = z.object({
    limit: z.coerce.number().int().positive().max(100).optional(),
});

// Validates a required id as a coerced positive integer
export const matchIdParamSchema = z.object({
    id: z.coerce.number().int().positive(),
});

// Validates the payload for creating a new match
export const createMatchSchema = z.object({
    sport: z.string().trim().min(1, { message: 'Sport cannot be empty' }),
    homeTeam: z.string().trim().min(1, { message: 'Home team cannot be empty' }),
    awayTeam: z.string().trim().min(1, { message: 'Away team cannot be empty' }),

    // Using a custom refinement to verify valid ISO date strings
    startTime: z.string().refine((val) => !isNaN(Date.parse(val)), {
        message: 'startTime must be a valid ISO date string',
    }),
    endTime: z.string().refine((val) => !isNaN(Date.parse(val)), {
        message: 'endTime must be a valid ISO date string',
    }),

    homeScore: z.coerce.number().int().nonnegative().optional(),
    awayScore: z.coerce.number().int().nonnegative().optional(),
}).superRefine((data, ctx) => {
    // Check if both dates exist and are valid before comparing
    if (data.startTime && data.endTime) {
        const start = new Date(data.startTime).getTime();
        const end = new Date(data.endTime).getTime();

        if (!isNaN(start) && !isNaN(end) && end <= start) {
            ctx.addIssue({
                code: z.ZodIssueCode.custom,
                message: 'endTime must be chronologically after startTime',
                path: ['endTime'],
            });
        }
    }
});

// Validates the payload for updating scores
export const updateScoreSchema = z.object({
    homeScore: z.coerce.number().int().nonnegative(),
    awayScore: z.coerce.number().int().nonnegative(),
});