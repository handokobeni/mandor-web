import { z } from "zod";

export const TEAM_SIZES = ["Just me", "2 to 5", "6 to 15", "More than 15"] as const;

export const waitlistSchema = z.object({
  email: z
    .string()
    .trim()
    .min(1, "Enter your work email to join.")
    .pipe(z.email("That email does not look right.")),
  team: z.enum(TEAM_SIZES).optional(),
});

export type WaitlistInput = z.input<typeof waitlistSchema>;
export type Waitlist = z.output<typeof waitlistSchema>;

/** No backend yet: the form says so instead of pretending to sign people up. */
export const NOT_OPEN_YET =
  "Early access sign-ups are not open yet. Nothing was sent; please check back soon.";
