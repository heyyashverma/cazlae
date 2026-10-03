"use client";

import { useRef, useState, useActionState } from "react";
import { subscribe } from "../actions/subscribe";

const initialState = { success: false, error: null };

const INVALID_EMAIL = "Enter a valid email address.";
const GENERIC_ERROR = "Something went wrong. Please try again.";

// The server action's wording is left untouched; map it to the brand copy here.
function serverErrorCopy(error: string | null) {
  if (!error) return null;
  return /valid email/i.test(error) ? INVALID_EMAIL : GENERIC_ERROR;
}

export default function EmailForm() {
  const [state, formAction, isPending] = useActionState(subscribe, initialState);
  const [email, setEmail] = useState("");
  const [consent, setConsent] = useState(false);
  const [clientError, setClientError] = useState<string | null>(null);
  const emailRef = useRef<HTMLInputElement>(null);
  const consentRef = useRef<HTMLInputElement>(null);

  const error = clientError ?? serverErrorCopy(state.error);
  const emailInvalid = error === INVALID_EMAIL;

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    setClientError(null);
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
      event.preventDefault();
      setClientError(INVALID_EMAIL);
      emailRef.current?.focus();
      return;
    }
    if (!consent) {
      event.preventDefault();
      consentRef.current?.reportValidity();
    }
  }

  return (
    <div>
      {!state.success && (
        <form action={formAction} onSubmit={handleSubmit} noValidate>
          <label htmlFor="email" className="type-small block font-medium">
            Email address
          </label>
          <input
            ref={emailRef}
            id="email"
            type="email"
            name="email"
            required
            autoComplete="email"
            placeholder="you@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            aria-invalid={emailInvalid}
            aria-describedby="email-error"
            className={`type-body mt-3 block h-[54px] w-full rounded-none bg-transparent px-6 text-ivory placeholder:text-ivory/60 ${
              emailInvalid ? "border-2 border-ivory" : "border border-stone"
            }`}
          />
          <div id="email-error" aria-live="polite">
            {error && (
              // --error fails contrast on estate-green, so it sits on an ivory chip
              <p className="type-small mt-3 inline-block bg-ivory px-3 py-1.5 text-error">
                {error}
              </p>
            )}
          </div>

          {/* TODO: consent wording to be confirmed by @OPS (CASL) */}
          <label className="type-caption mt-5 flex cursor-pointer items-start gap-3">
            <input
              ref={consentRef}
              type="checkbox"
              name="consent"
              required
              checked={consent}
              onChange={(e) => setConsent(e.target.checked)}
              className="consent-box"
            />
            <span>
              I agree to receive emails from Cazlae about Drop 01 and future
              releases. Unsubscribe anytime.
            </span>
          </label>

          <button
            type="submit"
            disabled={isPending}
            className="type-button mt-7 h-[54px] cursor-pointer rounded-none bg-ivory px-8 text-estate-green transition-colors duration-200 hover:bg-stone disabled:cursor-not-allowed disabled:bg-stone disabled:text-espresso"
          >
            {isPending ? "Joining…" : "Join the waitlist"}
          </button>
        </form>
      )}

      <div aria-live="polite">
        {state.success && (
          <p className="type-body-l">
            You&apos;re on the list. We&apos;ll be in touch before Drop 01.
          </p>
        )}
      </div>
    </div>
  );
}
