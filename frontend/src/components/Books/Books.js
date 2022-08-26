import Pagination from '../Pagination/Pagination';
import { deleteBookDetails, reset } from '../../features/books/bookSlice';
import { useDispatch } from 'react-redux';
import { Box, Modal, Typography } from '@mui/material';
import { useState } from 'react';
import Button from '@mui/material/Button';

function Books({ allBooks }) {
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const [deleteId, setDeleteId] = useState(null);
  const handleClose = () => {
    setOpen(false);
    setDeleteId(null);
  };

  const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: '#fff',
    boxShadow: 24,
    border: 'none',
    p: 3,
  };

  const handleDelete = async () => {
    dispatch(deleteBookDetails(deleteId));
    handleClose();
  };
  return (
    <>
      <div className="container">
        <div className="row">
          {allBooks.length > 0 ? (
            <>
              {allBooks.map((item) => (
                <div key={item._id} className="col-md-3">
                  <div class="card" style={{ width: '18rem' }}>
                    <div class="card-body">
                      <h5 class="card-title">{item.name}</h5>
                      <h6 class="card-subtitle mb-2 text-muted">
                        {item.author}
                      </h6>
                      <p class="card-text">Price :{item.price}</p>
                      <p class="card-text">
                        published Year :{item.publishedYear}
                      </p>
                      <button
                        type="button"
                        class="btn btn-secondary btn-sm"
                        onClick={() => {
                          setDeleteId(item.bookId);
                          handleOpen();
                        }}
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </>
          ) : (
            <h3>Loading.......</h3>
          )}
        </div>
        <div className="d-flex align-items-center justify-content-center my-5">
          <Pagination />
        </div>
      </div>

      <div>
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style}>
            <Typography id="modal-modal-title" variant="h6" component="h2">
              Confirm Action
            </Typography>
            <Typography id="modal-modal-description" sx={{ mt: 2 }}>
              <>
                <div>Are you sure to remove this user{deleteId}</div>
              </>
            </Typography>
            <div className="content-end mt-3">
              <Button
                size="small"
                variant="contained"
                color="success"
                onClick={() => {
                  handleClose();
                }}
              >
                Cancel
              </Button>{' '}
              <Button
                className="delete-confirm-btn"
                size="small"
                variant="contained"
                color="error"
                onClick={handleDelete}
              >
                Confirm
              </Button>
            </div>
          </Box>
        </Modal>
      </div>
    </>
  );
}

export default Books;
