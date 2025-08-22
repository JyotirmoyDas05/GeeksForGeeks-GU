"use client"

import ReactLenis from "lenis/react";
import TextAnimation from "@/components/text-animation";

export default function Home() {
  return (
    <>
      <ReactLenis root>
        <div className="container">
          <div className="page-header">
          <TextAnimation>
          <h1
            style={{
              fontSize: "clamp(8rem, 12vw, 4rem)",
              maxWidth: "100%",
            }}
          >
            GeeksforGeeks
          </h1>
          </TextAnimation>
        </div>
      </div>
      </ReactLenis>
      </>
    );
  }
