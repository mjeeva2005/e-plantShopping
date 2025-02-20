import { createSlice } from '@reduxjs/toolkit';

export const CartSlice = createSlice({
  name: 'cart',
  initialState: {
    items: [], 
  },
  reducers: {
    addItem: (state, action) => {
      const { name, image, cost } = action.payload;
      const existingItem = state.items.find(item => item.name === name);
      if (existingItem) {
        existingItem.quantity = existingItem.quantity + 1 || 1; 
      } else {
        state.items.push({ name, image, cost, quantity: 1 });
      }
    },
    removeItem: (state, action) => {
      state.items = state.items.filter(item => item.name !== action.payload);
    },
    updateQuantity: (state, action) => {
      const { name, quantity } = action.payload;
      const itemToUpdate = state.items.find(item => item.name === name);
      if (itemToUpdate) {
        itemToUpdate.quantity = Math.max(quantity, 1); 
      }
    },
    clearCart: (state) => {
      state.items = []; 
    },
  },
});


export const { addItem, removeItem, updateQuantity, clearCart } = CartSlice.actions;
export const calculateTotalAmount = (state) => {
  return state.cart.items.reduce((total, item) => total + item.quantity * item.cost, 0);
};

export default CartSlice.reducer;
