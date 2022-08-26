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
export const PostBookDetails = createAsyncThunk(
  'post/BooksDetails',
  async (Data, thunkAPI) => {
    try {
      return await bookService.add_Books(Data);
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

//get all the book details
export const getAllBooks = createAsyncThunk(
  'get/BooksDetails',
  async (Data, thunkAPI) => {
    try {
      return await bookService.getAll_Books(Data.limit, Data.page);
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

//edit book details
export const editBookDetails = createAsyncThunk(
  'put/BooksDetails',
  async (Data, thunkAPI) => {
    try {
      const id = thunkAPI.getState().Books.id;
      return await bookService.edit_BookDetails(Data, id);
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

//delete book details
export const deleteBookDetails = createAsyncThunk(
  'delete/BooksDetails',
  async (id, thunkAPI) => {
    try {
      return await bookService.delete_BookDetails(id);
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
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
    },
    [getAllBooks.pending]: (state) => {
      state.isLoading = true;
    },
    [getAllBooks.fulfilled]: (state, action) => {
      state.BookDetails = action.payload.Books;
      state.isLoading = false;
      state.isSuccess = true;
    },
    [getAllBooks.rejected]: (state, action) => {
      state.isLoading = false;
      state.isError = true;
      state.message = action.payload;
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
    },
    [deleteBookDetails.pending]: (state) => {
      state.isLoading = true;
    },
    [deleteBookDetails.fulfilled]: (state, action) => {
      const itemId = action.payload.id;
      state.BookDetails = state.BookDetails.filter(
        (item) => item.bookId !== itemId
      );
      state.isLoading = false;
      state.isSuccess = true;
    },
    [deleteBookDetails.rejected]: (state, action) => {
      state.isLoading = false;
      state.isSuccess = false;
      state.isError = true;
      state.message = action.payload;
    },
  },
});

export const { reset } = Books.actions;
export default Books.reducer;
