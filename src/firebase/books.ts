import { getDoc, collection, doc, deleteDoc, onSnapshot, query, orderBy, FirestoreDataConverter, addDoc, updateDoc } from "firebase/firestore";
import { db } from './utils';

const bookConverter: FirestoreDataConverter<Book> = {
  toFirestore: (book) => {
    const { id, ...newBook } = book;

    return newBook;
  },

  fromFirestore: (snapshot, options) => {
    const data = snapshot.data(options);

    const book: Book = {
      title: data.title,
      author: data.author,
      loanId: data.loanId,
      id: snapshot.id
    }

    return book;
  }
}

const booksRef = collection(db, "books").withConverter(bookConverter);

export const getBookList = (onUpdate: (books: Book[]) => void) => {
  const q = query(booksRef, orderBy("title"));

  onSnapshot(q, snapshot => {
    onUpdate(snapshot.docs.map(e => e.data()));
  });
}

export const getTitle = (id: string) => {
  return getDoc(doc(booksRef, id))
    .then(bookSnap => bookSnap.exists() ? bookSnap.data().title : "")
}

export const removeBook = (id: string) => {
  return deleteDoc(doc(booksRef, id));
}

export const addBook = (title: string, author: string) => {
  const book: Book = {
    title, author,
    id: ""
  }

  return addDoc(booksRef, book)
}

export const editBook = (newBook: Book) => {
  const { id, ...data } = newBook;

  return updateDoc(doc(booksRef, newBook.id), data);
}
