import Image from "next/image";
import { useRouter } from "next/navigation";
import { useSelector } from "react-redux";
import styles from "./NewArrivalsUiSection.module.css"; // Assuming you use CSS modules

export default function NewArrivalsUiSection() {
  let AllProduct = useSelector((state) => state.users.AllProduct);

  AllProduct = AllProduct.slice(0, 6);

  const router = useRouter();

  return (
    <div>
      <div className={styles.titleContainer}>
        <hr className={styles.titleLine} />
        <span className={styles.titleText}>পপুলার পণ্য</span>
        <hr className={styles.titleLine} />
      </div>

      <div
        className="row m-0 p-0 "
        style={{ marginTop: "10px", padding: "0px", margin: "0px" }}
      >
        {AllProduct &&
          AllProduct.map((p, index) => (
            <div
              key={index}
              className="col-6 col-md-4 col-lg-3 col-xl-2"
              style={{
                padding: "10px",
              }}
            >
              <div
                className={styles.productCard}
                onClick={() => router.push(`/product/${p._id}`)}
              >
                <div className={styles.imageContainer}>
                  <Image
                    unoptimized
                    src={p.images[0]}
                    alt={p.productName}
                    layout="responsive"
                    width={200}
                    height={200}
                    style={{
                      width: "100%",
                      height: "auto",
                      //  borderRadius: "10px 10px 0px 0px",
                    }}
                  />
                  <div className={styles.quickViewOverlay}>QUICK VIEW</div>
                </div>
                <div className={styles.productInfo}>
                  <h5 className={styles.productName}>{p.productName}</h5>

                  <div className={styles.priceContainer}>
                    {p.productOffer > 0 ? (
                      <div>
                        <span>
                          ৳
                          {Math.round(
                            p.productRegularPrice -
                              p.productRegularPrice * (p.productOffer / 100)
                          )}
                        </span>
                        <span className={styles.originalPrice}>
                          ৳{p.productRegularPrice}
                        </span>
                      </div>
                    ) : (
                      <span>৳{p.productRegularPrice}</span>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
}
