import { where, collection, doc, deleteDoc, onSnapshot, query, FirestoreDataConverter, addDoc, updateDoc } from "firebase/firestore";
import { db } from './utils';

const loanConverter: FirestoreDataConverter<Loan> = {
  toFirestore(loan) {
    return loan
  },

  fromFirestore(snapshot, options) {
    const data = snapshot.data(options);

    const date = new Date(data.date.seconds * 1000);

    const loan: Loan = {
      bookId: data.bookId,
      clientId: data.clientId,
      returned: data.returned,
      date,
      id: snapshot.id,
    }

    console.log(date);

    return loan;
  }
}

const loanRef = collection(db, "loans").withConverter(loanConverter);


export const getAllLoans = (onUpdate: (loans: Loan[]) => void) => {
  const q = query(loanRef);

  onSnapshot(q, snapshot => {
    onUpdate(snapshot.docs.map(e => e.data()));
  });
}

export const getCurrentLoans = (onUpdate: (loans: Loan[]) => void) => {
  const q = query(loanRef, where("returned", "==", false));

  onSnapshot(q, snapshot => {
    onUpdate(snapshot.docs.map(e => e.data()));
  });
}

export const getOldLoans = (onUpdate: (loans: Loan[]) => void) => {
  const q = query(loanRef, where("returned", "==", true));

  onSnapshot(q, snapshot => {
    onUpdate(snapshot.docs.map(e => e.data()));
  });
}

export const removeLoan = (id: string) => {
  return deleteDoc(doc(loanRef, id));
}

export const addLoan = (bookId: string, clientId: string, date: Date) => {
  const loan: Loan = {
    bookId, clientId, date,
    returned: false,
    id: ""
  }

  return addDoc(loanRef, loan);
}

export const editLoan = (newLoan: Loan) => {
  const { id, ...data } = newLoan;

  return updateDoc(doc(loanRef, newLoan.id), data);
}
