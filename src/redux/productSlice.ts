import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// Define the type for a product
interface ProductType {
    id: string;
    title: string;
    price: number;
    // Add more fields as necessary
}

// Define the initial state type
interface ProductState {
    arr: ProductType[];
}

// Initial state with the correct type
const initialState: ProductState = {
    arr: []
};

export const productSlice = createSlice({
    name: 'product',
    initialState,
    reducers: {
        // Add a product to the array
        addProduct: (state, action: PayloadAction<ProductType>) => {
            state.arr.push(action.payload);
        },
        // Remove a product by filtering out the product with the matching ID
        removeProduct: (state, action: PayloadAction<{ id: string }>) => {
            state.arr = state.arr.filter((product) => product.id !== action.payload.id);
        }
    }
});

// Export the actions
export const { addProduct, removeProduct } = productSlice.actions;

// Export the reducer as default
export default productSlice.reducer;
