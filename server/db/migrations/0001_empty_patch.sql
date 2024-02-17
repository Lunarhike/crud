CREATE TABLE IF NOT EXISTS "todos2" (
	"id" serial PRIMARY KEY NOT NULL,
	"task" text NOT NULL,
	"completed" boolean DEFAULT false NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL
);
