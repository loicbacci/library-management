import { collection, doc, deleteDoc, onSnapshot, query, orderBy, FirestoreDataConverter, addDoc } from "firebase/firestore";
import { db } from './utils';

const clientConverter: FirestoreDataConverter<Client> = {
  toFirestore: (client) => {
    return {
      name: client.name,
      email: client.email,
      phone: client.phone,
      address: client.address
    }
  },
  fromFirestore: (snapshot, options) => {
    const data = snapshot.data(options);

    return {
      name: data.name,
      email: data.email,
      phone: data.phone,
      address: data.address,
      id: snapshot.id
    };
  }
}

const clientsRef = collection(db, "clients").withConverter(clientConverter);

export const getClientsList = (onUpdate: (clients: Client[]) => void) => {
  const q = query(clientsRef, orderBy("name"));

  onSnapshot(q, snapshot => {
    onUpdate(snapshot.docs.map(e => e.data()));
  });
}

export const removeClient = (id: string) => {
  return deleteDoc(doc(clientsRef, id));
}

export const addClient = (name: string, email: string, phone: string, address: string) => {
  const client = {
    name, email, phone, address,
    id: ""
  }
  return addDoc(clientsRef, client)
}