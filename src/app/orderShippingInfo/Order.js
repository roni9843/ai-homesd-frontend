"use client";

import CreditScoreIcon from "@mui/icons-material/CreditScore";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import PendingActionsIcon from "@mui/icons-material/PendingActions";
import ViewQuiltIcon from "@mui/icons-material/ViewQuilt";
import Stack from "@mui/material/Stack";
import Step from "@mui/material/Step";
import StepConnector, {
  stepConnectorClasses,
} from "@mui/material/StepConnector";
import StepLabel from "@mui/material/StepLabel";
import Stepper from "@mui/material/Stepper";
import { styled } from "@mui/material/styles";
import Image from "next/image";
import PropTypes from "prop-types";
import {
  blackColor,
  redColor,
  whiteColor,
  whiteColor_v_3,
} from "../../../color";

const ColorlibConnector = styled(StepConnector)(({ theme }) => ({
  [`&.${stepConnectorClasses.alternativeLabel}`]: {
    top: 22,
  },
  [`&.${stepConnectorClasses.active}`]: {
    [`& .${stepConnectorClasses.line}`]: {
      backgroundImage: redColor,
    },
  },
  [`&.${stepConnectorClasses.completed}`]: {
    [`& .${stepConnectorClasses.line}`]: {
      backgroundImage: redColor,
    },
  },
  [`& .${stepConnectorClasses.line}`]: {
    height: 3,
    border: 0,
    backgroundColor: whiteColor_v_3,
    borderRadius: 1,
  },
}));

const ColorlibStepIconRoot = styled("div")(({ theme, ownerState }) => ({
  backgroundColor: ownerState.active ? blackColor : whiteColor_v_3,
  zIndex: 1,
  color: ownerState.active ? whiteColor : blackColor,
  width: 50,
  height: 50,
  display: "flex",
  borderRadius: "50%",
  justifyContent: "center",
  alignItems: "center",
  ...(ownerState.active && {
    backgroundImage: "#eee",
    boxShadow: `0 4px 10px 0 ${blackColor}`,
  }),
  ...(ownerState.completed && {
    backgroundImage: "#eee",
  }),
}));

function ColorlibStepIcon(props) {
  const { active, completed, className } = props;

  const icons = {
    1: <PendingActionsIcon />,
    2: <ViewQuiltIcon />,
    3: <LocalShippingIcon />,
    4: <CreditScoreIcon />,
  };

  return (
    <ColorlibStepIconRoot
      ownerState={{ completed, active }}
      className={className}
    >
      {icons[String(props.icon)]}
    </ColorlibStepIconRoot>
  );
}

ColorlibStepIcon.propTypes = {
  active: PropTypes.bool,
  className: PropTypes.string,
  completed: PropTypes.bool,
  icon: PropTypes.node,
};

const steps = ["Pending", "Processing", "Shipped", "Delivered"];

export default function Order({ orderDetails, userInfo }) {
  if (!orderDetails) {
    return <div>No order details available</div>;
  }

  const getActiveStep = (status) => {
    switch (status) {
      case "Pending":
        return 0;
      case "Processing":
        return 1;
      case "Shipped":
        return 2;
      case "Delivered":
        return 3;
      default:
        return 0;
    }
  };

  <style jsx>{`
    @media (min-width: 576px) {
      .product-grid {
        grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
      }
    }

    @media (min-width: 768px) {
      .product-grid {
        grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
      }
    }

    @media (min-width: 992px) {
      .product-grid {
        grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
      }
    }
  `}</style>;

  return (
    <div style={{ padding: "20px", maxWidth: "1200px", margin: "0 auto" }}>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <div style={{ padding: "10px", textAlign: "center" }}>
          <span style={{ fontSize: "24px" }}>
            Shipping <span style={{ fontWeight: "bold" }}>Information</span>
          </span>
        </div>
        <div style={{ fontSize: "12px", textAlign: "center" }}>
          <span>
            Order date: {new Date(orderDetails.orderDate).toLocaleDateString()}
          </span>
          <br />
          <span>
            Estimated delivery:{" "}
            {new Date(
              new Date(orderDetails.orderDate).setDate(
                new Date(orderDetails.orderDate).getDate() + 7
              )
            ).toLocaleDateString()}
          </span>
          <br />
          <span>
            Order Id:{" "}
            <span style={{ fontWeight: "bold" }}>{orderDetails.orderId}</span>
          </span>
        </div>

        <div
          style={{
            padding: "10px",
            margin: "10px",
            backgroundColor: whiteColor_v_3,
            borderRadius: "5px",
            fontSize: "13px",
            width: "100%",
            boxSizing: "border-box",
          }}
        >
          <div>
            <span style={{ fontSize: "15px", fontWeight: "bold" }}>
              Order Details
            </span>
          </div>
          <div>
            <span>Name: {userInfo.username}</span>
          </div>
          <div>
            <span>Email: {userInfo.email}</span>
          </div>
          <div>
            <span>Phone: {userInfo.phoneNumber}</span>
          </div>
          <div>
            <span>Address: {orderDetails.address}</span>
          </div>
          <div>
            <span style={{ fontWeight: "bold" }}>
              Payment Method: {orderDetails.paymentMethod}
            </span>
          </div>
          <div
            style={{
              //textAlign: "left",
              fontWeight: "bold",
              fontSize: "15px",
              marginTop: "20px",
            }}
          >
            Total: ৳{orderDetails.totalAmount}
          </div>
        </div>
      </div>

      {orderDetails.status === "Cancelled" ? (
        <div style={{ textAlign: "center", color: redColor }}>
          This order was Cancelled
        </div>
      ) : (
        <Stack sx={{ width: "100%" }} spacing={4}>
          <Stepper
            alternativeLabel
            activeStep={getActiveStep(orderDetails.status)}
            connector={<ColorlibConnector />}
          >
            {steps.map((label, index) => (
              <Step key={label}>
                <StepLabel
                  StepIconComponent={ColorlibStepIcon}
                  StepIconProps={{ icon: index + 1 }}
                >
                  {label}
                </StepLabel>
              </Step>
            ))}
          </Stepper>
        </Stack>
      )}

      <div style={{ padding: "20px", maxWidth: "1000px", margin: "0 auto" }}>
        <h4>Products</h4>
        <div className="row">
          {orderDetails.products.map((item, index) => (
            <div key={index} className="col-6 col-md-3 col-lg-3 ">
              <Image
                unoptimized
                src={item.product.images[0]}
                alt={item.product.productName}
                height={100}
                width={100}
                style={{
                  width: "100px",
                  height: "100px",
                  objectFit: "cover",
                  borderRadius: "8px",
                }}
              />
              <div style={{ textAlign: "center" }}>
                <div style={{ fontSize: "14px" }}>
                  {item.product.productName}
                </div>
                <div style={{ fontSize: "11px", color: "#888" }}>
                  Qty: {item.qty}
                </div>
                <div style={{ fontWeight: "bold", fontSize: "16px" }}>
                  ৳{item.product.productRegularPrice.toFixed(2)}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

Order.propTypes = {
  orderDetails: PropTypes.shape({
    orderDate: PropTypes.string.isRequired,
    orderId: PropTypes.string.isRequired,
    status: PropTypes.string.isRequired,
    totalAmount: PropTypes.number.isRequired,
    paymentMethod: PropTypes.string.isRequired,
    address: PropTypes.string.isRequired,
    products: PropTypes.arrayOf(
      PropTypes.shape({
        product: PropTypes.shape({
          productName: PropTypes.string.isRequired,
          productRegularPrice: PropTypes.number.isRequired,
          images: PropTypes.arrayOf(PropTypes.string).isRequired,
        }).isRequired,
        qty: PropTypes.number.isRequired,
      })
    ).isRequired,
  }),
};
