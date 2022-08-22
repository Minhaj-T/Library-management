import * as api from '../../api/bookApis';

//add Books
const add_Books = async (Data) => {
    const { data } = await api.addBook(Data);
    return data;
  };

//edit book details
const edit_BookDetails = async (Data,id) => {
  const { data } = await api.editBookDetails(Data,id);
  return data;
}

//edit book details
const delete_BookDetails = async (Data,id) => {
    const { data } = await api.deleteBookDetails(Data,id);
    return data;
  }


  const bookService={
    delete_BookDetails,
    edit_BookDetails,
    add_Books
  };
  
  export default bookService;