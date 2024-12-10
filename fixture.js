require("dotenv").config();

const dbConnect = require("./src/db/db.js");
const AuthorModel = require("./src/models/author.js");
const GenreModel = require("./src/models/genre.js");
const BookModel = require("./src/models/book.js");
const { faker } = require("@faker-js/faker");

dbConnect().catch((err) => {
  console.log(err);
});

const numberOfAuthor = 500;
const numberOfGenre = 300;
const numberOfBook = 10000;

async function generate() {
  let authorsList = [];
  let genresList = [];

  for (let i = 0; i < numberOfAuthor; i++) {
    const newItem = new AuthorModel({
      firstname: faker.person.firstName(),
      lastname: faker.person.lastName(),
      dateOfBirth: faker.date.birthdate(),
      email: faker.internet.email(),
    });
    const result = await newItem.save();
    authorsList.push(result._id);
    console.log(`${i} - Author with id: ${result._id} generated`);
  }

  for (let i = 0; i < numberOfGenre; i++) {
    const newItem = new GenreModel({
      title: faker.music.genre(),
      description: faker.lorem.sentence(5),
    });
    const result = await newItem.save();
    genresList.push(result._id);
    console.log(`${i} - Author with id: ${result._id} generated`);
  }

  for (let i = 0; i < numberOfBook; i++) {
    const randomAuthor =
      authorsList[Math.floor(Math.random() * authorsList.length)];
    const randomGenre =
      genresList[Math.floor(Math.random() * genresList.length)];

    const newItem = new BookModel({
      title: faker.lorem.sentence(5).replace(/\.$/, ""),
      description: faker.lorem.sentence(5),
      pages: faker.number.int({ min: 10, max: 1000 }),
      author: randomAuthor,
      genre: randomGenre,
    });
    const result = await newItem.save();
    console.log(`${i} - Book with id: ${result._id} generated`);
  }
}
generate();
