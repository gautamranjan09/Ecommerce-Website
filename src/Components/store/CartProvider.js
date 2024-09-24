import React, { useEffect, useReducer, useContext } from "react";
import CartContext from "./CartContext";
import AuthContext from "./auth-context";

const initialState = {
  items: [],
  totalAmount: 0,
};

const cartReducer = (state, action) => {
  switch (action.type) {
    case "SET_CART":
      return {
        items: action.payload.items || [],
        totalAmount: action.payload.totalAmount || 0,
      };
    case "ADD_ITEM":
      const existingItemIndex = state.items.findIndex(
        (item) => item.id === action.item.id
      );
      const existingItem = state.items[existingItemIndex];

      let updatedItems;
      if (existingItem) {
        const updatedItem = {
          ...existingItem,
          quantity: existingItem.quantity + 1,
        };
        updatedItems = [...state.items];
        updatedItems[existingItemIndex] = updatedItem;
      } else {
        updatedItems = [...state.items, { ...action.item, quantity: 1 }];
      }

      const updatedTotalAmount = state.totalAmount + action.item.price;
      return { items: updatedItems, totalAmount: updatedTotalAmount };

    case "REMOVE_ITEM":
      const filteredItems = state.items.filter((item) => item.id !== action.id);
      const itemToRemove = state.items.find((item) => item.id === action.id);

      const newTotalAmount =
        state.totalAmount - itemToRemove.quantity * itemToRemove.price;
      return { items: filteredItems, totalAmount: newTotalAmount };

    case "UPDATE_ITEM_QUANTITY":
      const updatedQuantityItems = state.items.map((item) => {
        if (item.id === action.id) {
          return { ...item, quantity: action.quantity };
        }
        return item;
      });

      const totalAmountAfterUpdate = updatedQuantityItems.reduce(
        (total, item) => total + item.price * item.quantity,
        0
      );
      return {
        items: updatedQuantityItems,
        totalAmount: totalAmountAfterUpdate,
      };

    case "CLEAR_CART":
      return {
        items: [],
        totalAmount: 0,
      };
    default:
      return state;
  }
};

const CartProvider = ({ children }) => {
  const [cartState, dispatch] = useReducer(cartReducer, initialState);
  const authContext = useContext(AuthContext);

  // Function to encode email for use as a Firebase key
  const encodeEmail = (email) => {
    return email.replace(/\./g, ',');
  };

  // Function to fetch cart data from Firebase
  const fetchCartData = async () => {
    if (!authContext.isLoggedIn || !authContext.email) return;

    const encodedEmail = encodeEmail(authContext.email);
    try {
      const response = await fetch(`https://authentication-db8ae-default-rtdb.firebaseio.com/carts/${encodedEmail}.json`);
      if (response.ok) {
        const data = await response.json();
        if (data) {
          dispatch({ type: "SET_CART", payload: data });
        }
      }
    } catch (error) {
      console.error("Error fetching cart data:", error);
    }
  };

  // Function to save cart data to Firebase
  const saveCartData = async () => {
    if (!authContext.isLoggedIn || !authContext.email) return;

    const encodedEmail = encodeEmail(authContext.email);
    try {
      await fetch(`https://authentication-db8ae-default-rtdb.firebaseio.com/carts/${encodedEmail}.json`, {
        method: 'PUT',
        body: JSON.stringify(cartState),
        headers: {
          'Content-Type': 'application/json',
        },
      });
    } catch (error) {
      console.error("Error saving cart data:", error);
    }
  };

  // Fetch cart data when the component mounts and when the user logs in
  useEffect(() => {
    if (authContext.isLoggedIn && authContext.email) {
      fetchCartData();
    } else {
      dispatch({ type: "CLEAR_CART" });
    }
  }, [authContext.isLoggedIn, authContext.email]);

  // Save cart data whenever it changes
  useEffect(() => {
    if (authContext.isLoggedIn && authContext.email) {
      saveCartData();
    }
  }, [cartState, authContext.isLoggedIn, authContext.email]);

  const addItemToCart = (item) => {
    dispatch({ type: "ADD_ITEM", item });
  };

  const removeItemFromCart = (id) => {
    dispatch({ type: "REMOVE_ITEM", id });
  };

  const updateItemQuantity = (id, quantity) => {
    dispatch({ type: "UPDATE_ITEM_QUANTITY", id, quantity });
  };

  const clearCart = () => {
    dispatch({ type: "CLEAR_CART" });
    if (authContext.isLoggedIn && authContext.email) {
      saveCartData();
    }
  };

  return (
    <CartContext.Provider
      value={{
        items: cartState.items,
        totalAmount: cartState.totalAmount,
        addItem: addItemToCart,
        removeItem: removeItemFromCart,
        updateItemQuantity: updateItemQuantity,
        clearCart: clearCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export default CartProvider;