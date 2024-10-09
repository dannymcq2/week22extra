import {
  UPDATE_PRODUCTS,
  ADD_TO_CART,
  UPDATE_CART_QUANTITY,
  REMOVE_FROM_CART,
  ADD_MULTIPLE_TO_CART,
  UPDATE_CATEGORIES,
  UPDATE_CURRENT_CATEGORY,
  CLEAR_CART,
  TOGGLE_CART,
} from './actions';

// The reducer function updates the state of the application based on the action dispatched.
// The state and action parameters represent the current state and the action object (which contains a type and payload).
export const reducer = (state, action) => {
  switch (action.type) {
    // UPDATE_PRODUCTS:
    // This action updates the products array in the state. The payload, which is action.products,
    // replaces the current products state, ensuring the latest products data is stored.
    case UPDATE_PRODUCTS:
      return {
        ...state, // Preserve the existing state
        products: [...action.products], // Update the products array in the state
      };

    // ADD_TO_CART:
    // This action adds a new product to the cart array and ensures the cart is visible (cartOpen: true).
    case ADD_TO_CART:
      return {
        ...state,
        cartOpen: true, // Open the cart
        cart: [...state.cart, action.product], // Add the product to the cart array
      };

    // ADD_MULTIPLE_TO_CART:
    // This action adds multiple products to the cart. It merges the existing cart array
    // with the new array of products coming from the action payload.
    case ADD_MULTIPLE_TO_CART:
      return {
        ...state,
        cart: [...state.cart, ...action.products], // Add multiple products to the cart
      };

    // UPDATE_CART_QUANTITY:
    // This action updates the quantity of a specific product in the cart.
    // It loops over the cart array and updates the quantity of the product with the matching _id.
    case UPDATE_CART_QUANTITY:
      return {
        ...state,
        cartOpen: true, // Keep the cart open
        cart: state.cart.map((product) => {
          if (action._id === product._id) {
            product.purchaseQuantity = action.purchaseQuantity; // Update the quantity of the product
          }
          return product; // Return the updated product
        }),
      };

    // REMOVE_FROM_CART:
    // This action removes a product from the cart by filtering out the product with the matching _id.
    // If there are no products left in the cart, it will also close the cart (cartOpen: false).
    case REMOVE_FROM_CART:
      let newState = state.cart.filter((product) => {
        return product._id !== action._id; // Filter out the product with the matching ID
      });

      return {
        ...state,
        cartOpen: newState.length > 0, // Close the cart if it's empty
        cart: newState, // Update the cart with the remaining products
      };

    // CLEAR_CART:
    // This action clears the entire cart by setting the cart array to an empty array
    // and closing the cart (cartOpen: false).
    case CLEAR_CART:
      return {
        ...state,
        cartOpen: false, // Close the cart
        cart: [], // Empty the cart array
      };

    // TOGGLE_CART:
    // This action toggles the visibility of the cart. If the cart is open, it will close, and vice versa.
    case TOGGLE_CART:
      return {
        ...state,
        cartOpen: !state.cartOpen, // Toggle the cartOpen state
      };

    // UPDATE_CATEGORIES:
    // This action updates the categories array in the state with the new array of categories provided by the action.
    case UPDATE_CATEGORIES:
      return {
        ...state,
        categories: [...action.categories], // Update the categories array in the state
      };

    // UPDATE_CURRENT_CATEGORY:
    // This action sets the currentCategory to the value provided by the action.
    case UPDATE_CURRENT_CATEGORY:
      return {
        ...state,
        currentCategory: action.currentCategory, // Set the currentCategory to the value in the action
      };

    // Default case:
    // The default case is called if none of the action types match.
    // It simply returns the current state, ensuring no changes are made to the state.
    case default:
      return state;
  }
}