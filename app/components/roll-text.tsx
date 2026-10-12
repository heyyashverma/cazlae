// Nav link hover: the label rolls up and a copy rolls in from below
// (y −100%, 0.35s). The motion itself is CSS (.roll in globals.css).
export default function RollText({ children }: { children: string }) {
  return (
    <span className="roll">
      <span className="roll-inner" data-text={children}>
        {children}
      </span>
    </span>
  );
}
