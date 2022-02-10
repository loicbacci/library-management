export const enum FilterStatus {
  All = "ALL",
  Loaned = "LOANED",
  Available = "AVAILABLE"
}

export const nameToFilter = (name: string) => {
  switch (name.toUpperCase()) {
    case "ALL":
      return FilterStatus.All;
    case "AVAILABLE":
      return FilterStatus.Available;
    case "LOANED":
      return FilterStatus.Loaned;
    default:
      return FilterStatus.All;
  }
}

export const enum SortStatus {
  Title = "TITLE",
  Author = "AUTHOR"
}

export const nameToSort = (name: string) => {
  switch (name.toUpperCase()) {
    case "TITLE":
      return SortStatus.Title;
    case "AUTHOR":
      return SortStatus.Author;
    default:
      return SortStatus.Title;
  }
}

