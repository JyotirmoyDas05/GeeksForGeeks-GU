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
              <h1>Our Members</h1>
            </TextAnimation>
          </div>
        </div>
      </ReactLenis>
    </>
  );
}

export default page;
