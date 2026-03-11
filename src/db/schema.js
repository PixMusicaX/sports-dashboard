import {
    pgTable,
    pgEnum,
    uuid,
    varchar,
    integer,
    timestamp,
    text,
    jsonb,
} from 'drizzle-orm/pg-core';

// -----------------------------------------------------------------------------
// Enums
// -----------------------------------------------------------------------------

export const matchStatusEnum = pgEnum('match_status', [
    'scheduled',
    'live',
    'finished',
]);

// -----------------------------------------------------------------------------
// Tables
// -----------------------------------------------------------------------------

export const matches = pgTable('matches', {
    id: uuid('id').primaryKey().defaultRandom(),
    sport: varchar('sport', { length: 50 }).notNull(),
    homeTeam: varchar('home_team', { length: 100 }).notNull(),
    awayTeam: varchar('away_team', { length: 100 }).notNull(),
    status: matchStatusEnum('status').default('scheduled').notNull(),
    startTime: timestamp('start_time'),
    endTime: timestamp('end_time'),
    homeScore: integer('home_score').default(0).notNull(),
    awayScore: integer('away_score').default(0).notNull(),
    createdAt: timestamp('created_at').defaultNow().notNull(),
});

export const commentary = pgTable('commentary', {
    id: uuid('id').primaryKey().defaultRandom(),
    matchId: uuid('match_id')
        .references(() => matches.id, { onDelete: 'cascade' })
        .notNull(),
    minute: integer('minute'),
    sequence: integer('sequence').notNull(),
    period: varchar('period', { length: 50 }),
    eventType: varchar('event_type', { length: 50 }),
    actor: varchar('actor', { length: 100 }),
    team: varchar('team', { length: 100 }),
    message: text('message').notNull(),
    metadata: jsonb('metadata'),
    // Utilizing PostgreSQL arrays for tags
    tags: text('tags').array(),
    createdAt: timestamp('created_at').defaultNow().notNull(),
});