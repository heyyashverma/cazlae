"use client";

import { useState, useActionState } from "react";
import { subscribe } from "../actions/subscribe";

const initialState = { success: false, error: null };

export default function EmailForm() {
  const [state, formAction, isPending] = useActionState(subscribe, initialState);
  const [focused, setFocused] = useState(false);

  if (state.success) {
    return (
      <p
        className="text-xs tracking-[0.35em] uppercase text-white/60"
        style={{ fontFamily: "var(--font-bricolage)", fontWeight: 300 }}
      >
        You&apos;re on the list.
      </p>
    );
  }

  return (
    <div className="flex flex-col gap-2">
      <form action={formAction} className="flex items-stretch gap-0 w-full max-w-sm">
        <input
          type="email"
          name="email"
          required
          placeholder="your@email.com"
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          className="flex-1 bg-transparent border-b py-2.5 text-sm outline-none transition-colors duration-300 placeholder:text-white/20 text-white/80"
          style={{
            borderColor: focused ? "rgba(255,255,255,0.7)" : "rgba(255,255,255,0.2)",
            fontFamily: "var(--font-bricolage)",
            fontWeight: 300,
            letterSpacing: "0.03em",
          }}
        />
        <button
          type="submit"
          disabled={isPending}
          className="group ml-4 flex items-center gap-2 rounded-full bg-white px-5 py-2.5 text-[10px] tracking-[0.2em] uppercase text-black transition-all duration-300 hover:bg-white/85 hover:shadow-[0_0_20px_rgba(255,255,255,0.25)] active:scale-95 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
          style={{ fontFamily: "var(--font-bricolage)", fontWeight: 400 }}
        >
          {isPending ? "Sending…" : "Notify me"}
          {!isPending && (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="12"
              height="12"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden
              className="transition-transform duration-300 group-hover:translate-x-1"
            >
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          )}
        </button>
      </form>
      {state.error && (
        <p
          className="text-[11px] text-red-400/80"
          style={{ fontFamily: "var(--font-bricolage)", fontWeight: 300 }}
        >
          {state.error}
        </p>
      )}
    </div>
  );
}
