import { configureStore } from '@reduxjs/toolkit'
import productReducer from './productSlice'

export const store = configureStore({
  reducer: {
    cart:productReducer
  },
})
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch