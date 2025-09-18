"use client";

import Image from "next/image";
import ReactLenis from "lenis/react";
import TextAnimation from "@/components/text-animation";

function page() {
  return (
    <>
      <ReactLenis root>
        <div className="container">
          <div className="page-header">
            <TextAnimation>
              <h1 style={{ fontFamily: "Broadway-font" }}>Events</h1>
            </TextAnimation>
          </div>
          <div className="events">
            <Image
              src="/img_(1).jpg"
              alt="Event Image 1"
              width={400}
              height={300}
              className="rounded-lg shadow-lg"
            />
            <Image
              src="/img_(2).jpg"
              alt="Event Image 2"
              width={400}
              height={300}
              className="rounded-lg shadow-lg"
            />
            <Image
              src="/img_(3).jpg"
              alt="Event Image 3"
              width={400}
              height={300}
              className="rounded-lg shadow-lg"
            />
            <Image
              src="/img_(4).jpg"
              alt="Event Image 4"
              width={400}
              height={300}
              className="rounded-lg shadow-lg"
            />
          </div>
        </div>
      </ReactLenis>
    </>
  );
}

export default page;
