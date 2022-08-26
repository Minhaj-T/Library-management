import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { getAllBooks } from '../../features/books/bookSlice';

function Pagination() {
  const dispatch = useDispatch();
  const [Count, setCount] = useState(1);
  const increment = () => {
    setCount((prev) => prev + 1);
    const data = {
      limit: 4,
      page: Count,
    };
    console.log('dd', data, Count);
    dispatch(getAllBooks(data));
  };
  const decrement = () => {
    setCount((prev) => prev - 1);
    const data = {
      limit: 4,
      page: Count,
    };
    dispatch(getAllBooks(data));
  };
  const firstValue = () => {
    setCount(1);
    const data = {
      limit: 4,
      page: Count,
    };
    dispatch(getAllBooks(data));
  };
  const secondValue = () => {
    setCount(2);
    const data = {
      limit: 4,
      page: Count,
    };
    dispatch(getAllBooks(data));
  };
  console.log(Count);
  return (
    <>
      <nav aria-label="Page navigation example">
        <ul class="pagination">
          <li class="page-item">
            <a class="page-link" onClick={decrement}>
              Previous
            </a>
          </li>
          <li class="page-item">
            <a class="page-link" onClick={firstValue}>
              1
            </a>
          </li>
          <li class="page-item">
            <a class="page-link" onClick={secondValue}>
              2
            </a>
          </li>
          <li class="page-item">
            <a class="page-link" onClick={increment}>
              Next
            </a>
          </li>
        </ul>
      </nav>
    </>
  );
}

export default Pagination;
