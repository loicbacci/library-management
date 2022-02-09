import React, { useEffect, useState } from 'react';
import { addBook, getBookList } from '../firebase/books';
import Button from 'react-bootstrap/Button';
import AddBookModal from './AddBookModal';
import ListGroup from 'react-bootstrap/ListGroup';
import BookListEntry from './BookListEntry';
import Alert from 'react-bootstrap/Alert';
import Container from 'react-bootstrap/Container';
import ViewBookModal from './ViewBookModal';
import BookFilter from './BookFilter';
import { FilterStatus, SortStatus } from './bookTypes';
import BookSort from './BookSort';

const defaultBook: Book = {
  title: "title",
  author: "author",
  loaned: false,
  id: "id"
}

const BookList = () => {
  const [bookList, setBookList] = useState([] as Book[]);
  const [showAddModal, setShowAddModal] = useState(false);

  // View modal
  const [showViewModal, setShowViewModal] = useState(false);
  const [selectedBook, setSelectedBook] = useState(null as Book | null);

  // Filter
  const [filterStatus, setFilterStatus] = useState(FilterStatus.All);
  const [filteredBookList, setFilteredBookList] = useState([] as Book[]);

  // Sort (Changes directly the book list)
  const [sortStatus, setSortStatus] = useState(SortStatus.Title);

  // Success and fail
  const [showSuccess, setShowSuccess] = useState(false);
  const [successTimeout, setSuccessTimeout] = useState(setTimeout(() => {}, 0));

  const [failMessage, setFailMessage] = useState("");
  const [showFail, setShowFail] = useState(false);
  const [failTimeout, setFailTimeout] = useState(setTimeout(() => {}, 0));


  useEffect(() => {
    getBookList(bs => setBookList(bs));
  }, []);

  const successHandler = () => {
    setShowSuccess(true);
    clearTimeout(successTimeout);
    setSuccessTimeout(setTimeout(() => setShowSuccess(false), 5000));
  }

  const failHandler = (reason: any) => {
    setFailMessage(reason.toString());
    setShowFail(true);
    clearTimeout(failTimeout);
    setFailTimeout(setTimeout(() => setShowFail(false), 5000));
  }

  const addBookHandler = (title: string, author: string) => {
    setShowAddModal(false);
    addBook(title, author)
      .then(successHandler);
  }

  const modalCloseHandler = () => {
    setShowViewModal(false);
    setSelectedBook(null);
  }

  // Change filter
  useEffect(() => {
    let newBookList: Book[] = [];

    switch (filterStatus) {
      case FilterStatus.All:
        newBookList = Array.from(bookList);
        break;
      case FilterStatus.Available:
        newBookList = bookList.filter(book => !book.loaned)
        break;
      case FilterStatus.Loaned:
        newBookList = bookList.filter(book => book.loaned)
        break;
    }

    switch (sortStatus) {
      case SortStatus.Author:
        newBookList.sort((b1, b2) =>
          b1.author.localeCompare(b2.author)
        );
        break;
      case SortStatus.Title:
        newBookList.sort((b1, b2) =>
          b1.title.localeCompare(b2.title)
        );
        break;
    }

    console.log(newBookList[0]);
    setFilteredBookList(newBookList);
  }, [filterStatus, sortStatus, bookList]);


  const bookToEntry = (book: Book, index: number, array: Book[]) => {
    let showAuthor = (sortStatus === SortStatus.Author) &&
      ((index === 0) || (array[index - 1].author !== book.author));

    return (
      <>
        {showAuthor &&
          <ListGroup.Item className="fw-bold">{book.author}</ListGroup.Item>
        }

        <BookListEntry
          book={book}
          onClick={() => {
            setShowViewModal(true);
            setSelectedBook(book);
          }}
          isActive={selectedBook === book}
          noAuthor={sortStatus === SortStatus.Author}
          key={book.id}
        />
      </>
    );
  }

  return (
    <Container className="p-3">
      <h3>Books list</h3>

      <div className="py-3 d-flex">
        <Button
          variant="primary"
          onClick={() => setShowAddModal(true)}
        >
          Add book
        </Button>

        <BookFilter
          currentFilter={filterStatus}
          setFilter={setFilterStatus}
        />

        <BookSort currentSort={sortStatus} setSort={setSortStatus} />
      </div>

      {showSuccess && (
        <Alert variant="success">
          Success
        </Alert>
      )}

      {showFail && (
        <Alert variant="danger">
          Error: {failMessage}
        </Alert>
      )}

      <ListGroup>
        {filteredBookList.map(bookToEntry)}
      </ListGroup>

      <AddBookModal
        shown={showAddModal}
        onClose={() => setShowAddModal(false)}
        addBook={addBookHandler}
      />

      <ViewBookModal
        shown={showViewModal}
        onClose={modalCloseHandler}
        book={selectedBook ? selectedBook : defaultBook}
        editBook={() => alert("Can't edit yet")}
        deleteSuccess={() => {
          modalCloseHandler();
          successHandler();
        }}
        deleteFailed={(reason) => {
          modalCloseHandler();
          failHandler(reason);
        }}
      />
    </Container>
  )
};

export default BookList;
