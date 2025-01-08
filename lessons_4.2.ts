interface IBook {
    id: number;
    title: string;
    authorId: number;
    genre: string;
    year: number;
  }
  
  interface IAuthor {
    id: number;
    name: string;
    biography: string;
  }
  
  // Інтерфейс IBookService
  interface IBookService {
    getBooks(): IBook[];
    getBookById(id: number): IBook | undefined;
    getAuthors(): IAuthor[];
    getAuthorById(id: number): IAuthor | undefined;
    getBooksByAuthor(authorIdentifier: number | string): IBook[];
    getAuthorByBookId(bookId: number): IAuthor | undefined;
    search(query: string): (IBook | IAuthor)[];
  }
  
  // Реалізація IBookService
  class BookService implements IBookService {
    private books: IBook[] = [
      { id: 1, title: "1984", authorId: 1, genre: "Dystopian", year: 1949 },
      { id: 2, title: "Animal Farm", authorId: 1, genre: "Political Satire", year: 1945 },
      { id: 3, title: "To Kill a Mockingbird", authorId: 2, genre: "Fiction", year: 1960 },
      { id: 4, title: "The Great Gatsby", authorId: 3, genre: "Fiction", year: 1925 },
    ];
  
    private authors: IAuthor[] = [
      { id: 1, name: "George Orwell", biography: "English novelist and essayist, journalist and critic." },
      { id: 2, name: "Harper Lee", biography: "American novelist, widely known for To Kill a Mockingbird." },
      { id: 3, name: "F. Scott Fitzgerald", biography: "American novelist, known for The Great Gatsby." },
    ];
  
    getBooks(): IBook[] {
      return this.books;
    }
  
    getBookById(id: number): IBook | undefined {
      return this.books.find(book => book.id === id);
    }
  
    getAuthors(): IAuthor[] {
      return this.authors;
    }
  
    getAuthorById(id: number): IAuthor | undefined {
      return this.authors.find(author => author.id === id);
    }
  
    getBooksByAuthor(authorIdentifier: number | string): IBook[] {
      if (typeof authorIdentifier === "number") {
        return this.books.filter(book => book.authorId === authorIdentifier);
      } else {
        const author = this.authors.find(a => a.name.toLowerCase() === authorIdentifier.toLowerCase());
        return author ? this.books.filter(book => book.authorId === author.id) : [];
      }
    }
  
    getAuthorByBookId(bookId: number): IAuthor | undefined {
      const book = this.getBookById(bookId);
      return book ? this.getAuthorById(book.authorId) : undefined;
    }
  
    search(query: string): (IBook | IAuthor)[] {
      const lowerQuery = query.toLowerCase();
      const bookResults = this.books.filter(book =>
        book.title.toLowerCase().includes(lowerQuery) ||
        book.genre.toLowerCase().includes(lowerQuery) ||
        book.year.toString().includes(lowerQuery)
      );
  
      const authorResults = this.authors.filter(author =>
        author.name.toLowerCase().includes(lowerQuery)
      );
  
      return [...bookResults, ...authorResults];
    }
  }
  
  // Приклади роботи з сервісом
  const bookService = new BookService();
  
  // Отримання всіх книг
  console.log("Books:", bookService.getBooks());
  
  // Отримання книги за ID
  console.log("Book by ID (1):", bookService.getBookById(1));
  
  // Отримання всіх авторів
  console.log("Authors:", bookService.getAuthors());
  
  // Отримання автора за ID
  console.log("Author by ID (1):", bookService.getAuthorById(1));
  
  // Отримання книг за автором (ID)
  console.log("Books by author ID (1):", bookService.getBooksByAuthor(1));
  
  // Отримання книг за автором (ім'я)
  console.log("Books by author name (George Orwell):", bookService.getBooksByAuthor("George Orwell"));
  
  // Отримання автора за ID книги
  console.log("Author by book ID (1):", bookService.getAuthorByBookId(1));
  
  // Глобальний пошук
  console.log("Search results ('Fiction'):", bookService.search("Fiction"));
  console.log("Search results ('Orwell'):", bookService.search("Orwell"));