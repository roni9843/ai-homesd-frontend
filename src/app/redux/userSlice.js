import { createSlice } from "@reduxjs/toolkit";

// Initial state setup
export const usersSlice = createSlice({
  name: "users",
  initialState: {
    userInfo: null,
    userPhone: null,
    cart: [], // Initialize an empty cart in Redux state
    orderHistory: [],
    allCategoryWithProduct: [],
    filterCategory: [],
    filterOfferProduct: [],
    AllProduct: [],
  },
  reducers: {
     addToCart: (state, action) => {
      const { _id } = action.payload;

      // Find the index of the existing product in the cart
      const existingProductIndex = state.cart.findIndex(
        (item) => item._id === _id
      );

      if (existingProductIndex !== -1) {
        // If the product exists, update the quantity
        const updatedCart = state.cart.map((item, index) =>
          index === existingProductIndex
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
        state.cart = updatedCart; // Replace the cart with the updated one
      } else {
        // Add the new product to the cart
        state.cart = [...state.cart, { ...action.payload, quantity: 1 }];
      }

      // console.log("cart ---- Updated cart state: ", state.cart); // Debug log
    },
    addToCartFromStorage: (state, action) => {
      state.cart = action.payload;

      // console.log("cart ---- Updated cart state: ", state.cart); // Debug log
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
    clearCart: (state) => {
      state.cart = []; // Clear the cart in Redux state
    },
    setUserInfo: (state, action) => {
      state.userInfo = action.payload;
    },
    setUserPhone: (state, action) => {
      state.userPhone = action.payload;
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
      const liveProducts = allProducts.filter(
        (product) => product.productLive === true
      );

      function shuffle(array) {
        for (let i = array.length - 1; i > 0; i--) {
          const j = Math.floor(Math.random() * (i + 1));
          [array[i], array[j]] = [array[j], array[i]];
        }
        return array;
      }

      const shuffledProducts = shuffle(liveProducts);
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
    addOrderHistory: (state, action) => {
      state.orderHistory.push(action.payload);
    },
    logOut: (state) => {
      state.userInfo = null;
      state.userPhone = null;
      state.cart = [];
      state.orderHistory = [];
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
  addToCartFromStorage
} = usersSlice.actions;

export default usersSlice.reducer;
