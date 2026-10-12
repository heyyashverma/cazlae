"use client";

import { useActionState, useRef, useState } from "react";
import Link from "next/link";
import { AnimatePresence } from "motion/react";
import * as m from "motion/react-m";
import { subscribe } from "../actions/subscribe";

const initialState = { success: false, error: null };

const INVALID_EMAIL = "Enter a valid email address.";
const GENERIC_ERROR = "Something went wrong. Please try again.";
const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// The server action's wording is left untouched; map it to the brand copy here.
function serverErrorCopy(error: string | null) {
  if (!error) return null;
  return /valid email/i.test(error) ? INVALID_EMAIL : GENERIC_ERROR;
}

export default function EmailForm() {
  const [state, formAction, isPending] = useActionState(subscribe, initialState);
  const [email, setEmail] = useState("");
  const [clientError, setClientError] = useState<string | null>(null);
  const emailRef = useRef<HTMLInputElement>(null);

  const error = clientError ?? serverErrorCopy(state.error);

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    setClientError(null);
    if (!EMAIL_PATTERN.test(email.trim())) {
      event.preventDefault();
      setClientError(INVALID_EMAIL);
      emailRef.current?.focus();
    }
  }

  return (
    // Form and success message share one grid cell, so the crossfade never
    // moves the layout.
    <div className="grid">
      <m.form
        action={formAction}
        onSubmit={handleSubmit}
        noValidate
        className="col-start-1 row-start-1"
        animate={{ opacity: state.success ? 0 : 1 }}
        transition={{ duration: 0.5 }}
        aria-hidden={state.success || undefined}
        inert={state.success || undefined}
      >
        <div className="flex items-end gap-[1.125rem] md:gap-7">
          <div className="field relative min-w-0 flex-1 md:max-w-[23.75rem]">
            <label htmlFor="email" className="sr-only">
              Email address
            </label>
            <input
              ref={emailRef}
              id="email"
              type="email"
              name="email"
              required
              autoComplete="email"
              inputMode="email"
              placeholder="Email address"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                if (clientError) setClientError(null);
              }}
              aria-invalid={error === INVALID_EMAIL}
              aria-describedby="email-error consent-note"
              className="type-body block h-[2.875rem] w-full rounded-none bg-transparent text-ivory outline-none"
            />
            <span aria-hidden="true" className="field-line" />
          </div>
          <button
            type="submit"
            disabled={isPending}
            className="type-small link-under relative flex h-[2.875rem] shrink-0 cursor-pointer items-center gap-2 text-ivory disabled:cursor-wait disabled:opacity-60"
          >
            <span className="md:hidden">{isPending ? "Joining" : "Join"}</span>
            <span className="hidden md:inline">
              {isPending ? "Joining" : "Join the list"}
            </span>
            <span aria-hidden="true" className="arrow">
              →
            </span>
          </button>
        </div>

        {/* Quiet inline error, under the line */}
        <div id="email-error" aria-live="polite" className="min-h-[1.625rem]">
          <AnimatePresence>
            {error && (
              <m.p
                className="type-fine pt-2 text-ivory"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
              >
                {error}
              </m.p>
            )}
          </AnimatePresence>
        </div>

        {/* Honeypot — hidden from people and assistive tech; see subscribe.ts */}
        <div aria-hidden="true" className="hidden">
          <label htmlFor="company">Company</label>
          <input id="company" type="text" name="company" tabIndex={-1} autoComplete="off" />
        </div>

        {/* Submitting is the consent action (CASL). Wording to be confirmed by @OPS. */}
        <input type="hidden" name="consent" value="on" />
        <p
          id="consent-note"
          className="type-fine mt-1 max-w-[30rem] text-ivory/75"
        >
          By joining, you agree to receive emails from cazlae. Unsubscribe at
          any time.{" "}
          <br className="hidden md:inline" />
          <Link href="/privacy" className="link-under">
            Privacy
          </Link>
        </p>
      </m.form>

      <m.p
        role="status"
        className="type-body col-start-1 row-start-1 self-center text-ivory"
        initial={false}
        animate={{ opacity: state.success ? 1 : 0 }}
        transition={{ duration: 0.5, delay: state.success ? 0.2 : 0 }}
        aria-hidden={!state.success || undefined}
      >
        {state.success ? "You’re on the list." : ""}
      </m.p>
    </div>
  );
}
