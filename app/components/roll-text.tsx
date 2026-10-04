// Hover text for links: each letter rolls up and a copy rolls in from below,
// one after another. The motion itself is CSS (.roll in globals.css).
export default function RollText({ children }: { children: string }) {
  return (
    <>
      <span className="sr-only">{children}</span>
      <span className="roll" aria-hidden="true">
        {Array.from(children).map((char, index) => (
          <span
            key={index}
            className="roll-char"
            data-char={char}
            style={{ "--i": index } as React.CSSProperties}
          >
            {char}
          </span>
        ))}
      </span>
    </>
  );
}
