import Books from '../../components/Books/Books';
import './home.css';
import { useSelector, useDispatch } from 'react-redux';
import { getAllBooks, reset } from '../../features/books/bookSlice';
import { useEffect } from 'react';

function Home() {
  const dispatch = useDispatch();
  const { BookDetails, isLoading, isError, message } = useSelector(
    (state) => state.Books
  );
  useEffect(() => {
    if (isError) {
      console.log(message);
    }
    const data = {
      limit: 4,
      page: 1,
    };
    dispatch(getAllBooks(data));

    return () => {
      dispatch(reset());
    };
  }, [isError, message, dispatch]);
  console.log('ddd', BookDetails && BookDetails);

  return (
    <>
      <h1 className="text-center my-5">Library Management</h1>

      <Books allBooks={BookDetails} />
    </>
  );
}

export default Home;
