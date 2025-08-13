import Image from "next/image";
import { ReactLenis } from "lenis/react";

function page() {
  return (
    <>
      <ReactLenis root />
      <div className="container">
        <div className="page-header">
          <h1>Gallery</h1>
        </div>
        <div className="gallery">
          <Image
            src="/img_(1).jpg"
            alt="Gallery Image 1"
            width={400}
            height={300}
          />
          <Image
            src="/img_(2).jpg"
            alt="Gallery Image 2"
            width={400}
            height={300}
          />
          <Image
            src="/img_(3).jpg"
            alt="Gallery Image 3"
            width={400}
            height={300}
          />
          <Image
            src="/img_(4).jpg"
            alt="Gallery Image 4"
            width={400}
            height={300}
          />
        </div>
      </div>
    </>
  );
}

export default page;
