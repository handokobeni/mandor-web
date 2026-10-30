"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { cn } from "@/lib/utils";
import { Button, Input, NativeSelect } from "@/components/ui";
import {
  NOT_OPEN_YET,
  TEAM_SIZES,
  waitlistSchema,
  type Waitlist,
  type WaitlistInput,
} from "../model/waitlist";

interface WaitlistFormProps {
  /** Unique per form on the page, for label/field ids. */
  idPrefix: string;
  withTeamSize?: boolean;
  className?: string;
}

/**
 * Early access form. There is no sign-up backend yet, so a valid
 * submission only tells the visitor that sign-ups are not open.
 */
export function WaitlistForm({ idPrefix, withTeamSize = false, className }: WaitlistFormProps) {
  const [submitted, setSubmitted] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<WaitlistInput, unknown, Waitlist>({
    resolver: zodResolver(waitlistSchema),
    shouldFocusError: true,
  });
  const emailId = `${idPrefix}-email`;
  const teamId = `${idPrefix}-team`;
  const msgId = `${idPrefix}-msg`;
  const error = errors.email?.message;

  return (
    <form
      noValidate
      onSubmit={handleSubmit(() => setSubmitted(true))}
      className={cn("relative mt-7 flex max-w-[560px] flex-wrap gap-2", className)}
    >
      <label className="sr-only" htmlFor={emailId}>
        Work email
      </label>
      <Input
        id={emailId}
        type="email"
        placeholder="you@company.com"
        autoComplete="email"
        aria-invalid={error ? true : undefined}
        aria-describedby={msgId}
        className="h-11 flex-[1_1_240px] text-[15px]"
        {...register("email", { onChange: () => setSubmitted(false) })}
      />
      {withTeamSize && (
        <>
          <label className="sr-only" htmlFor={teamId}>
            Team size
          </label>
          <NativeSelect
            id={teamId}
            defaultValue=""
            className="h-11 flex-[0_1_150px] text-[15px]"
            {...register("team", { setValueAs: (v: string) => (v === "" ? undefined : v) })}
          >
            <option value="">Team size</option>
            {TEAM_SIZES.map((t) => (
              <option key={t}>{t}</option>
            ))}
          </NativeSelect>
        </>
      )}
      <Button type="submit" size="lg" className="max-sm:flex-[1_1_100%]">
        Join early access
      </Button>
      <p
        id={msgId}
        aria-live="polite"
        className={cn(
          "min-h-[22px] basis-full text-[13px] text-muted-foreground",
          error && "text-status-failed",
        )}
      >
        {error ?? (submitted ? NOT_OPEN_YET : "")}
      </p>
    </form>
  );
}
