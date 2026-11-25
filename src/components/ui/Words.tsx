import { Fragment } from "react";

/**
 * Splits text into masked words so GSAP can reveal them.
 * Use `*word*` to mark an accented (italic gold) word.
 * Words are animated by the global scroll animations when the wrapper has `data-split`.
 */
export function Words({ text, className = "" }: { text: string; className?: string }) {
  const parts = text.split(" ");
  return (
    <span className={className} aria-label={text.replace(/\*/g, "")}>
      {parts.map((p, i) => {
        const accent = p.startsWith("*") && p.endsWith("*") && p.length > 2;
        const clean = accent ? p.slice(1, -1) : p;
        return (
          <Fragment key={i}>
            <span className="word-mask" aria-hidden="true">
              <span className="word">{accent ? <em>{clean}</em> : clean}</span>
            </span>{" "}
          </Fragment>
        );
      })}
    </span>
  );
}
