import Image from "next/image";

export default function HomePageBanner() {
  return (
    <div className="row mt-1 mx-0">
      <div className="col-12 col-md-6 col-lg-6 mt-3">
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",

            width: "100%",
          }}
        >
          <div style={{ width: "100%" }}>
            <Image
              unoptimized
              src="https://i.ibb.co/Fs4SWHj/all-product-web-Cover-1-1400x533.jpg" // Change to local image
              alt="Moto Logo"
              layout="responsive"
              width={100}
              height={100}
              objectFit="contain"
            />
          </div>
        </div>
      </div>

      <div className="col-12 col-md-6 col-lg-6 mt-3">
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",

            width: "100%",
          }}
        >
          <div style={{ width: "100%" }}>
            <Image
              unoptimized
              src="https://i.ibb.co/Fs4SWHj/all-product-web-Cover-1-1400x533.jpg" // Change to local image
              alt="Moto Logo"
              layout="responsive"
              width={100}
              height={100}
              objectFit="contain"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
