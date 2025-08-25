"use client";
import { useEffect, useRef, useMemo } from "react";
import { gsap } from "gsap";
import { TextPlugin } from "gsap/TextPlugin";

gsap.registerPlugin(TextPlugin);

const SNIPPETS = [
  "console.log('Welcome to GeeksforGeeks GU! 🚀');",
  "SELECT * FROM brains WHERE status='geek' AND club='GU';",
  'git commit -m "fix: solved it at 2AM with chai"',
  "while(!success) { tryAgain(); } // GU never gives up!",
  "['code', 'debug', 'repeat'].forEach(day => enjoy(day));",
  "try { hackathon() } catch(e) { blameWifi(e) }",
  "const sleep = ms => new Promise(r=>setTimeout(r,ms)); await sleep(404); // GU mode",
  "gsap.to('.geek', { knowledge: 'infinite', duration: 1.5 })",
  "Thread.sleep(1000); // GU: Now with 2 bugs!",
  "rm -rf /doubt && echo 'Geeks rule GU!'",
];

export default function SnippetTicker({
  play,
  typeSpeed = 0.02,
  deleteSpeed = 0.016,
  hold = 1.2,
}: {
  play: boolean;
  typeSpeed?: number; // seconds per char
  deleteSpeed?: number; // seconds per char
  hold?: number; // seconds to hold full text
}) {
  const elRef = useRef<HTMLDivElement>(null);
  const cursorRef = useRef<HTMLSpanElement>(null);
  const tlRef = useRef<gsap.core.Timeline | null>(null);

  const snippets = useMemo(() => SNIPPETS, []);

  useEffect(() => {
    if (!elRef.current || !cursorRef.current) return;

    // cursor blink
    gsap.set(cursorRef.current, { opacity: 1 });
    const cursor = gsap.to(cursorRef.current, {
      opacity: 0,
      duration: 0.6,
      ease: "power1.inOut",
      repeat: -1,
      yoyo: true,
    });
    // store cursor tween and leave timeline building to play-effect
    tlRef.current = null;

    return () => {
      cursor.kill();
      if (tlRef.current) {
        tlRef.current.kill();
        tlRef.current = null;
      }
    };
  }, [snippets, typeSpeed, deleteSpeed, hold]);

  useEffect(() => {
    // play a single random snippet each time `play` toggles true
    if (!elRef.current) return;

    const pick = () => snippets[Math.floor(Math.random() * snippets.length)];

    // if play turned off, clear text and kill any running timeline
    if (!play) {
      if (tlRef.current) {
        tlRef.current.kill();
        tlRef.current = null;
      }
      // clear text immediately
      gsap.set(elRef.current, { text: "" });
      return;
    }

    // ensure any previous timeline is cleaned
    if (tlRef.current) {
      tlRef.current.kill();
      tlRef.current = null;
    }

    const text = pick();
    const chars = text.length;

    const tl = gsap.timeline({});

    // type in
    tl.to(elRef.current, {
      duration: Math.max(0.12, chars * typeSpeed),
      ease: "none",
      text: { value: text },
    });

    // hold
    tl.to({}, { duration: hold });

    // delete all
    tl.to(elRef.current, {
      duration: Math.max(0.12, chars * deleteSpeed),
      ease: "none",
      text: { value: "" },
    });

    // cleanup when finished
    tl.add(() => {
      if (tlRef.current) {
        tlRef.current.kill();
        tlRef.current = null;
      }
    });

    tlRef.current = tl;
    tl.play();
  }, [play, snippets, typeSpeed, deleteSpeed, hold]);

  return (
    <div className="snippet-ticker" aria-label="animated code snippets">
      <code className="snippet-line">
        <span ref={elRef} className="snippet-text" />
        <span ref={cursorRef} className="snippet-cursor">
          |
        </span>
      </code>
      <style jsx>{`
        .snippet-ticker {
          margin-top: 12px;
          font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas,
            "Liberation Mono", "Courier New", monospace;
          /* faint green base color with slight glow */
          color: #9feec3;
          font-size: 14px;
          line-height: 1.6;
          opacity: 0.9;
          text-align: center;
          user-select: none;
          white-space: pre-wrap;
          max-width: 80vw;
        }
        .snippet-line {
          /* match surrounding overlay background */
          background: transparent;
          padding: 8px 12px;
          border-radius: 8px;
          display: inline-block;
        }
        .snippet-cursor {
          margin-left: 2px;
          color: #9feec3;
          text-shadow: 0 0 6px rgba(159, 238, 195, 0.25);
        }
        .snippet-text {
          /* subtle green glow across characters */
          color: #9feec3;
          text-shadow: 0 0 6px rgba(159, 238, 195, 0.18);
        }
      `}</style>
    </div>
  );
}
