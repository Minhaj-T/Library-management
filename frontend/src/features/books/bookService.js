import * as api from '../../api/bookApis';

//get all book Details
const getAll_Books = async (limit, page) => {
  const { data } = await api.getAllBooks(limit, page);
  return data;
};

//add Books
const add_Books = async (Data) => {
  const { data } = await api.addBook(Data);
  return data;
};

//edit book details
const edit_BookDetails = async (Data, id) => {
  const { data } = await api.editBookDetails(Data, id);
  return data;
};

//edit book details
const delete_BookDetails = async (id) => {
  const { data } = await api.deleteBookDetails(id);
  return data;
};

const bookService = {
  delete_BookDetails,
  edit_BookDetails,
  add_Books,
  getAll_Books,
};

export default bookService;
