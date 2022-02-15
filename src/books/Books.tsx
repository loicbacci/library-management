import React, { useEffect, useState } from 'react';
import { addBook, editBook, getBookList, removeBook } from '../firebase/books';
import AddBookModal from './AddBookModal';
import BookListEntry from './BookListEntry';
import ViewBookModal from './ViewBookModal';
import { FilterStatus, SortStatus } from './bookTypes';
import { Box, Heading, Stack, Text, useToast } from '@chakra-ui/react';
import BooksOptions from './BooksOptions';
import PageLayout from '../common/PageLayout';
import AddButton from '../common/AddButton';
import { useNavigate, useParams } from 'react-router-dom';

const Books = () => {
  // React Router hooks
  const params = useParams();
  const navigate = useNavigate();

  // Toast
  const toast = useToast();

  // Books
  const [bookList, setBookList] = useState([] as Book[]);
  const [initialized, setInitialized] = useState(false);
  const [sortedList, setSortedList] = useState([] as Book[]);
  const [filteredBookList, setFilteredBookList] = useState([] as Book[]);

  const authors = Array.from(new Set(bookList.map(b => b.author))).sort();

  // Modals
  const [showAddModal, setShowAddModal] = useState(false);

  const [showViewModal, setShowViewModal] = useState(false);
  const [selectedBook, setSelectedBook] = useState(null as Book | null);

  // Options
  const [filterStatus, setFilterStatus] = useState(FilterStatus.All);
  const [sortStatus, setSortStatus] = useState(SortStatus.Title);


  // Set listener for book list updates
  useEffect(() => {
    getBookList(bs => {
      setBookList(bs);
      setInitialized(true);
    });
  }, []);

  // Selected book handler
  useEffect(() => {
    if (params.bookId) {
      const book = bookList.find(b => b.id === params.bookId)
      if (book) {
        setSelectedBook(book);
        setShowViewModal(true);
      } else if (initialized) {
        toast({
          title: "Failed to find book",
          status: "error",
          isClosable: true
        })

        navigate("/books");
      }
    }
  }, [params, bookList, navigate, initialized, toast]);


  const addBookHandler = (title: string, author: string) => {
    setShowAddModal(false);
    addBook(title, author)
      .then(() => {
        toast({
          title: "Successfully added book",
          status: "success",
          isClosable: true
        })
      })
      .catch((reason) => {
        toast({
          title: "Failed to add book",
          description: reason,
          status: "error",
          isClosable: true
        })
      });
  }

  const viewModalClose = () => {
    setShowViewModal(false);
    setSelectedBook(null);
    navigate("/books");
  }

  // Filter books
  useEffect(() => {
    let newBookList: Book[] = [];

    switch (filterStatus) {
      case FilterStatus.All:
        newBookList = Array.from(sortedList);
        break;
      case FilterStatus.Available:
        newBookList = sortedList.filter(book => !book.loanId)
        break;
      case FilterStatus.Loaned:
        newBookList = sortedList.filter(book => book.loanId)
        break;
    }

    setFilteredBookList(newBookList);
  }, [filterStatus, sortedList]);

  // Sort books
  useEffect(() => {
    const newBookList = Array.from(bookList);

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

    setSortedList(newBookList);
  }, [sortStatus, bookList]);


  // Handlers
  const bookClick = (book: Book) => () => {
    navigate(`/books/${book.id}`);
  }

  const handleDelete = () => {
    if (!selectedBook) return;

    removeBook(selectedBook.id)
      .then(() => {
        toast({
          title: "Delete successful",
          status: "success",
          isClosable: true
        })
      })
      .catch((reason) => {
        toast({
          title: "Delete failed",
          description: reason,
          status: "error",
          isClosable: true
        })
      })

    viewModalClose();
  }

  const handleEdit = (newBook: Book) => {
    editBook(newBook)
      .then(() => {
        toast({
          title: "Edit successful",
          status: "success",
          isClosable: true
        })
      })
      .catch((reason) => {
        toast({
          title: "Edit failed",
          description: reason,
          status: "error",
          isClosable: true
        })
      })

    viewModalClose();
  }

  return (
    <PageLayout>
      <Heading as="h2">Books</Heading>

      <Box>
        <BooksOptions
          sort={sortStatus}
          setSort={setSortStatus}
          filter={filterStatus}
          setFilter={setFilterStatus}
        />
      </Box>

      <Stack>
        {filteredBookList.map(book => (
          <BookListEntry
            book={book}
            onClick={bookClick(book)}
            key={book.id}
          />
        ))}
      </Stack>

      <AddButton onClick={() => setShowAddModal(true)}>
        <Text>Add book</Text>
      </AddButton>

      <AddBookModal
        shown={showAddModal}
        onClose={() => setShowAddModal(false)}
        addBook={addBookHandler}
        authors={authors}
      />

      {selectedBook && <ViewBookModal
        shown={showViewModal}
        onClose={viewModalClose}
        book={selectedBook}
        editBook={handleEdit}
        handleDelete={handleDelete}
      />}
    </PageLayout>
  )
};

export default Books;
