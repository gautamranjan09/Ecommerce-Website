import React, { useEffect, useReducer } from "react";
import CartContext from "./CartContext";

const initialState = {
  items: JSON.parse(localStorage.getItem("cartItems")) || [],
  totalAmount: parseFloat(localStorage.getItem("totalAmount")) || 0,
};

const cartReducer = (state, action) => {
  switch (action.type) {
    case "ADD_ITEM":
      const existingItemIndex = state.items.findIndex(
        (item) => item.id === action.item.id
      );
      const existingItem = state.items[existingItemIndex];

      let updatedItems;
      if (existingItem) {
        // If the item exists, increase its quantity
        const updatedItem = {
          ...existingItem,
          quantity: existingItem.quantity + 1,
        };
        updatedItems = [...state.items];
        updatedItems[existingItemIndex] = updatedItem;
      } else {
        // If the item doesn't exist, add it with quantity 1
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

  useEffect(() => {
    localStorage.setItem("cartItems", JSON.stringify(cartState.items));
    localStorage.setItem("totalAmount", cartState.totalAmount);
  }, [cartState]);

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
