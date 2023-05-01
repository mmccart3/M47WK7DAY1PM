const express = require("express");
const app = express();
const books = [];
book_id = 1;

const firstBook = {
  id: book_id,
  title: "LOTR",
  author: "Tolkein",
  genre: "Adventure",
};

books.push(firstBook);
book_id += 1;

// app.use((request, response, next) => {
//     console.log("hello from middleware");
//     next();
// })

app.use(express.json());

app.get("/book", (request, response) => {
  //   const book = {
  //     title: "LOTR",
  //     author: "Tolkein",
  //     genre: "Adventure",
  //   };

  const successReponse = {
    message: "Response sent successfully",
    books: books,
  };
  response.send(successReponse);
});

app.post("/book", (request, response) => {
  console.log(request.body);
  const newBook = {
    id: book_id,
    title: request.body.title,
    author: request.body.author,
    genre: request.body.genre,
  };
  books.push(newBook);
  book_id += 1;

  const successReponse = {
    message: "Book successfully added",
    book: newBook,
  };
  response.send(successReponse);
});

app.delete("/book", (request, response) => {
  function findBook(x) {
    return x.title === request.body.title;
  }
  const index = books.findIndex(findBook);
  console.log(index);
  if (index !== -1) {
    books.splice(index,1);

    const successReponse = {
      message: "Book successfully deleted",
      book: request.body.title,
    };
    response.send(successReponse);
  } else {
    const successReponse = {
      message: "Book title not found",
      book: request.body.title,
    };
    response.send(successReponse);
  }
});

app.put("/book", (request, response) => {
    function findBook(x) {
      return x.title === request.body.title;
    }
    const index = books.findIndex(findBook);
    console.log(index);
    if (index !== -1) {
        if (request.body.author) {
            books[index].author = request.body.author}
        if (request.body.genre) {
            books[index].genre = request.body.genre}
      const successReponse = {
        message: "Book successfully updated",
        book: books[index],
      };
      response.send(successReponse);
    } else {
      const successReponse = {
        message: "Book title not found",
        book: request.body.title,
      };
      response.send(successReponse);
    }
  });

app.listen(5001, () => console.log("server is listening on port 5001"));