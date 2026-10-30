import { describe, expect, it } from "vitest";
import { waitlistSchema } from "./waitlist";

describe("waitlist schema", () => {
  it("asks for an email when empty", () => {
    const r = waitlistSchema.safeParse({ email: "  " });
    expect(r.success).toBe(false);
    expect(r.error?.issues[0]?.message).toBe("Enter your work email to join.");
  });

  it("rejects an address that does not look right", () => {
    const r = waitlistSchema.safeParse({ email: "budi@" });
    expect(r.error?.issues[0]?.message).toBe("That email does not look right.");
  });

  it("accepts a work email, trimmed, with an optional team size", () => {
    expect(waitlistSchema.parse({ email: " budi@kantor.co.id " })).toEqual({ email: "budi@kantor.co.id" });
    expect(waitlistSchema.parse({ email: "a@b.co", team: "2 to 5" })).toEqual({
      email: "a@b.co",
      team: "2 to 5",
    });
    expect(waitlistSchema.safeParse({ email: "a@b.co", team: "lots" }).success).toBe(false);
  });
});
