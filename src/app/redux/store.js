import { configureStore } from "@reduxjs/toolkit";
import { jwtDecode } from "jwt-decode";
import usersReducer, {
  AllProduct,
  addCategoryWithProductRedux,
  addOrderHistory,
  filterCategory,
  filterOfferProduct,
  setUserInfo,
  setUserPhone,
} from "./userSlice";

// Configure store
export const store = configureStore({
  reducer: {
    users: usersReducer,
  },
  // middleware: (getDefaultMiddleware) => getDefaultMiddleware(),
});

const autoCall = async () => {
  // Dispatch action to set user info after store is configured
  // const token = localStorage.getItem("token");

  // autoCallGlobal()

  // // ? get all product
  // await getAllCategoryWithProductFunc();

  fetch("http://localhost:8000/getAllCategoryWithProducts")
    .then((response) => response.json())
    .then((data) => {
      store.dispatch(addCategoryWithProductRedux(data.data));
      store.dispatch(filterCategory(data.data));
      store.dispatch(AllProduct(data.data));
      store.dispatch(filterOfferProduct(data.data));
    })

    .catch((error) => console.error("Error fetching categories:", error));

  if (typeof window !== "undefined") {
    const token = localStorage.getItem("token");

    if (token) {
      document.cookie = `token=${token}`;

      try {
        const userInfo = jwtDecode(token);

        const fetchUserInfo = async (userId) => {
          const response = await fetch("http://localhost:8000/getTheUser", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ id: userId }),
          });

          if (!response.ok) {
            throw new Error("Failed to fetch user info");
          }

          return response.json();
        };

        const fetchUser = await fetchUserInfo(userInfo.id);

        if (fetchUser) {
          store.dispatch(setUserInfo(fetchUser.user));
          store.dispatch(setUserPhone(fetchUser.user.phone));
          store.dispatch(addOrderHistory(fetchUser.orderHistory));
        }
      } catch (error) {
        console.error("Error decoding token:", error);
      }
    }
  }
};

autoCall();
