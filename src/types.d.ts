interface Book {
  author: string,
  title: string,
  loaned: boolean,

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

interface Field {
  displayName: string,
  fieldName: string,
  placeholder?: string
}
