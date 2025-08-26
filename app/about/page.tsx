"use client";

import ReactLenis from "lenis/react";
import TextAnimation from "@/components/text-animation";

function page() {
  return (
    <>
      <ReactLenis root>
        <div className="container">
          <div className="page-header">
            <TextAnimation>
              <h1>About</h1>
            </TextAnimation>
            <p className="mt-6 max-w-prose text-lg text-muted-foreground">
              Welcome to the GeeksForGeeks - GU chapter. This page provides a
              short overview about our chapter, what we do, and how to get
              involved.
            </p>
          </div>
        </div>
      </ReactLenis>
    </>
  );
}

export default page;
