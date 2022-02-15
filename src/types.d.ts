interface Book {
  author: string,
  title: string,

  id: string,

  loanId?: string
}

interface Client {
  name: string,
  email: string
  phone: string,
  address: string,

  id: string,
}

interface Loan {
  bookId: string,
  clientId: string,
  date: Date,
  returned: boolean,

  id: string
}