import React, { useEffect, useState } from 'react';
import { addBook, getBookList } from '../firebase/books';
import AddBookModal from './AddBookModal';
import BookListEntry from './BookListEntry';
import ViewBookModal from './ViewBookModal';
import { FilterStatus, SortStatus } from './bookTypes';
import { Box, Container, Heading, Stack, useToast } from '@chakra-ui/react';
import AddBookButton from './AddBookButton';
import BooksOptions from './BooksOptions';


const Books = () => {
  // Toast
  const toast = useToast();

  // Books
  const [bookList, setBookList] = useState([] as Book[]);
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
    getBookList(bs => setBookList(bs));
  }, []);


  const addBookHandler = (title: string, author: string) => {
    setShowAddModal(false);
    addBook(title, author)
      .then(() => {
        toast({
          title: "Successfully added book",
          status: "success",
          isClosable: true
        })
      });
  }

  const modalCloseHandler = () => {
    setShowViewModal(false);
    setSelectedBook(null);
  }

  // Change options
  useEffect(() => {
    let newBookList: Book[] = [];

    switch (filterStatus) {
      case FilterStatus.All:
        newBookList = Array.from(sortedList);
        break;
      case FilterStatus.Available:
        newBookList = sortedList.filter(book => !book.loaned)
        break;
      case FilterStatus.Loaned:
        newBookList = sortedList.filter(book => book.loaned)
        break;
    }

    setFilteredBookList(newBookList);
  }, [filterStatus, sortedList]);

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
  const handleBookClick = (book: Book) => () => {
    setSelectedBook(book);
    setShowViewModal(true);
  }

  const handleDeleteSuccess = () => {
    toast({
      title: "Delete successful",
      status: "success",
      isClosable: true
    })

    modalCloseHandler();
  }

  const handleDeleteFailed = (reason: any) => {
    toast({
      title: "Delete failed",
      description: reason,
      status: "error",
      isClosable: true
    })

    modalCloseHandler();
  }

  return (
    <Container>
      <Stack spacing={6} pt={6}>
        <Heading as="h2">Books</Heading>

        <Box>
          <BooksOptions
            sort={sortStatus}
            setSort={setSortStatus}
            filter={filterStatus}
            setFilter={setFilterStatus}
          />
        </Box>


        <Stack spacing={2}>
          {filteredBookList.map(book => (
            <BookListEntry
              book={book}
              onClick={handleBookClick(book)}
              key={book.id}
            />
          ))}
        </Stack>

        <AddBookButton onClick={() => setShowAddModal(true)} />

        <AddBookModal
          shown={showAddModal}
          onClose={() => setShowAddModal(false)}
          addBook={addBookHandler}
          authors={authors}
        />

        {selectedBook && <ViewBookModal
          shown={showViewModal}
          onClose={modalCloseHandler}
          book={selectedBook}
          editBook={() => alert('Can\'t edit yet')}
          deleteSuccess={handleDeleteSuccess}
          deleteFailed={handleDeleteFailed}
        />}
      </Stack>


    </Container>
  )
};

export default Books;
