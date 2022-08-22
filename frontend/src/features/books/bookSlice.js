import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import bookService from './bookService';

const initialState = {
  BookDetails: [],
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: '',
};

//post the book details
export const  PostBookDetails= createAsyncThunk(
    'post/Bookdetails',
    async (Data, thunkAPI) => {
      try {
        return await bookService.add_Books(Data);
      }
      catch (error) {
        const message =
          (error.response &&
            error.response.data &&
            error.response.data.message) ||
          error.message ||
          error.toString()
        return thunkAPI.rejectWithValue(message)
      }
    }
  );

//edit book details 
export const editBookDetails = createAsyncThunk(
  'put/Bookdetails',
  async (Data, thunkAPI) => {
    try {
        const id = thunkAPI.getState().Books.id
      return await bookService.edit_BookDetails(Data,id);
    } 
    catch (error) {
        const message =
          (error.response &&
            error.response.data &&
            error.response.data.message) ||
          error.message ||
          error.toString()
        return thunkAPI.rejectWithValue(message)
      }
  }
);

//delete book details 
export const deleteBookDetails = createAsyncThunk(
    'delete/Bookdetails',
    async (Data, thunkAPI) => {
      try {
        const id = thunkAPI.getState().Books.id;
        return await bookService.delete_BookDetails(Data,id);
      } 
      catch (error) {
          const message =
            (error.response &&
              error.response.data &&
              error.response.data.message) ||
            error.message ||
            error.toString()
          return thunkAPI.rejectWithValue(message)
        }
    }
  );

const Books = createSlice({
  name: 'Books',
  initialState,
  reducers: {
    reset: (state) => {
      state.isError = false;
      state.isLoading = false;
      state.isSuccess = false;
      state.message = '';
    },
  },
  extraReducers: {
    [PostBookDetails.pending]: (state) => {
        state.isLoading = true;
      },
      [PostBookDetails.fulfilled]: (state, action) => {
        state.BookDetails = action.payload.data;
        state.isLoading = false;
        state.isSuccess = true;
      },
      [PostBookDetails.rejected]: (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        state.BookDetails = null;
      },
      [editBookDetails.pending]: (state) => {
        state.isLoading = true;
      },
      [editBookDetails.fulfilled]: (state, action) => {
        state.BookDetails = action.payload;
        state.isLoading = false;
        state.isSuccess = true;
      },
      [editBookDetails.rejected]: (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        state.BookDetails = null;
      },
      [deleteBookDetails.pending]: (state) => {
        state.isLoading = true;
      },
      [deleteBookDetails.fulfilled]: (state, action) => {
        const itemId = action.payload.id;
        state.BookDetails = state.BookDetails.filter((item) => item._id !== itemId);
        state.isLoading = false;
        state.isSuccess = true;
      },
      [deleteBookDetails.rejected]: (state, action) => {
        state.isLoading = false;
        state.isSuccess = false;
        state.isError = true;
        state.message = action.payload;
        state.BookDetails = null;
      },

  }
});

export const { reset } = Books.actions;
export default Books.reducer;