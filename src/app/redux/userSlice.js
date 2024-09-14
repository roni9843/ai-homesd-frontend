import { createSlice } from "@reduxjs/toolkit";
import Cookies from "js-cookie"; // Import js-cookie

export const usersSlice = createSlice({
  name: "users",
  initialState: {
    userInfo: null,
    userPhone: null,
    cart: [],
    orderHistory: [],
    allCategoryWithProduct: [],
    filterCategory: [],
    filterOfferProduct: [],
    AllProduct: [],
  },
  reducers: {
    setUserInfo: (state, action) => {
      state.userInfo = action.payload;
    },
    setUserPhone: (state, action) => {
      state.userPhone = action.payload;
    },
    addToCart: (state, action) => {
      const existingProduct = state.cart.find(
        (item) => item._id === action.payload._id
      );
      if (existingProduct) {
        existingProduct.quantity += 1;
      } else {
        state.cart.push({ ...action.payload, quantity: 1 });
      }
    },
    removeFromCart: (state, action) => {
      state.cart = state.cart.filter((item) => item._id !== action.payload);
    },
    increaseQuantity: (state, action) => {
      const product = state.cart.find((item) => item._id === action.payload);
      if (product) {
        product.quantity += 1;
      }
    },
    decreaseQuantity: (state, action) => {
      const product = state.cart.find((item) => item._id === action.payload);
      if (product && product.quantity > 1) {
        product.quantity -= 1;
      }
    },
    addCategoryWithProductRedux: (state, action) => {
      function shuffle(array) {
        for (let i = array.length - 1; i > 0; i--) {
          const j = Math.floor(Math.random() * (i + 1));
          [array[i], array[j]] = [array[j], array[i]];
        }
        return array;
      }

      const shuffledProducts = shuffle(action.payload);

      state.allCategoryWithProduct = shuffledProducts;
    },
    filterCategory: (state, action) => {
      const categoriesWithProducts = action.payload.filter(
        (item) => item.products.length > 0
      );

      function shuffle(array) {
        for (let i = array.length - 1; i > 0; i--) {
          const j = Math.floor(Math.random() * (i + 1));
          [array[i], array[j]] = [array[j], array[i]];
        }
        return array;
      }

      const shuffledProducts = shuffle(categoriesWithProducts);

      state.filterCategory = shuffledProducts;
    },
    AllProduct: (state, action) => {
      const allProducts = action.payload.flatMap((item) => item.products);

      function shuffle(array) {
        for (let i = array.length - 1; i > 0; i--) {
          const j = Math.floor(Math.random() * (i + 1));
          [array[i], array[j]] = [array[j], array[i]];
        }
        return array;
      }

      const shuffledProducts = shuffle(allProducts);

      state.AllProduct = shuffledProducts;
    },
    filterOfferProduct: (state, action) => {
      const offerProducts = action.payload.reduce((acc, category) => {
        const filteredProducts = category.products.filter(
          (product) => product.productOffer > 0
        );
        return acc.concat(filteredProducts);
      }, []);

      function shuffle(array) {
        for (let i = array.length - 1; i > 0; i--) {
          const j = Math.floor(Math.random() * (i + 1));
          [array[i], array[j]] = [array[j], array[i]];
        }
        return array;
      }

      const shuffledProducts = shuffle(offerProducts);

      state.filterOfferProduct = shuffledProducts;
    },
    clearCart: (state) => {
      state.cart = [];
    },
    addOrderHistory: (state, action) => {
      state.orderHistory.push(action.payload);
    },

    logOut: (state) => {
      // Clear the user's information from Redux state
      state.userInfo = null;
      state.userPhone = null;
      state.cart = [];
      state.orderHistory = [];

      // Remove token from cookies
      Cookies.remove("token");

      // Remove token and other relevant data from localStorage
      localStorage.removeItem("token");
      localStorage.removeItem("userInfo");
      localStorage.removeItem("userPhone");
      localStorage.removeItem("cart");
      localStorage.removeItem("orderHistory");
    },
  },
});

export const {
  setUserInfo,
  setUserPhone,
  addToCart,
  removeFromCart,
  increaseQuantity,
  decreaseQuantity,
  clearCart,
  addOrderHistory,
  logOut,
  addCategoryWithProductRedux,
  filterCategory,
  AllProduct,
  filterOfferProduct,
} = usersSlice.actions;

export default usersSlice.reducer;
