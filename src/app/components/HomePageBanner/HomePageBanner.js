import Image from "next/image";

export default function HomePageBanner() {
  return (
    <div className="row mt-1 mx-0 mb-2 ">
      <div className="mt-3">
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
              src="https://i.ibb.co/ZXsv66y/BLACK-FRIDAY-SPLASH-BANNER-01.jpg" // Change to local image if needed
              alt="Moto Logo"
              layout="responsive"
              width={100}
              height={100}
              objectFit="contain"
              placeholder="blur"
              blurDataURL="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAwIiBoZWlnaHQ9IjEwMCIgdmlld0JveD0iMCAwIDEwMCAxMDAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PHJlY3Qgd2lkdGg9IjEwMCIgaGVpZ2h0PSIxMDAiIGZpbGw9ImJsdWUiIC8+PC9zdmc+" // Blue placeholder
              loading="lazy" // Ensure lazy loading for performance
              priority={false} // Not above the fold, so no need to preload
              quality={75} // Adjust image quality for better performance
            />
          </div>
        </div>
      </div>
    </div>
  );
}
