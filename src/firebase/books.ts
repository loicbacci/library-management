import { collection, doc, deleteDoc, onSnapshot, query, orderBy, FirestoreDataConverter, addDoc } from "firebase/firestore";
import { db } from './utils';

const bookConverter: FirestoreDataConverter<Book> = {
  toFirestore: (book) => {
    return {
      title: book.title,
      author: book.author,
    }
  },
  fromFirestore: (snapshot, options) => {
    const data = snapshot.data(options);

    const book: Book = {
      title: data.title,
      author: data.author,
      loaned: data.loaned,
      id: snapshot.id
    }

    if (data.loaned) {
      const path = data.loan._key.path;
      const segments = path.segments.slice(path.offset + 1);
      book.loanId = segments[0];
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

export const removeBook = (id: string) => {
  return deleteDoc(doc(booksRef, id));
}

export const addBook = (title: string, author: string) => {
  const book: Book = {
    title, author,
    loaned: false,
    id: ""
  }
  return addDoc(booksRef, book)
}