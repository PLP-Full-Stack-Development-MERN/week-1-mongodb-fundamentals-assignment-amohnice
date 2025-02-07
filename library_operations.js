// Create a new database called `library'
use library;

// Inside `library`, create a collection named `books`
db.createCollection("books");

// Insert books into the books collection
db.books.insertMany([
    {
        title: "The Great Gatsby",
        author: "F. Scott Fitzgerald",
        publishedYear: 1925,
        genre: "Fiction",
        ISBN: "9780743273565"
    },
    {
        title: "1984",
        author: "George Orwell",
        publishedYear: 1949,
        genre: "Dystopian",
        ISBN: "9780451524935"
    },
    {
        title: "To Kill a Mockingbird",
        author: "Harper Lee",
        publishedYear: 1960,
        genre: "Fiction",
        ISBN: "9780061120084"
    },
    {
        title: "The Catcher in the Rye",
        author: "J.D. Salinger",
        publishedYear: 1951,
        genre: "Fiction",
        ISBN: "9780316769488"
    },
    {
        title: "Harry Potter and the Sorcerer's Stone",
        author: "J.K. Rowling",
        publishedYear: 1997,
        genre: "Fantasy",
        ISBN: "9780590353427"
    }
]);

// Retrieve all books
print("All books:");
db.books.find().forEach(printjson);

// Query books by a specific author
print("Books by J.K. Rowling:");
db.books.find({ author: "J.K. Rowling" }).forEach(printjson);

// Find books published after the year 2000
print("Books published after 2000:");
db.books.find({ publishedYear: { $gt: 2000 } }).forEach(printjson);

// Update the publishedYear of a specific book
db.books.updateOne(
    { title: "The Great Gatsby" },
    { $set: { publishedYear: 1926 } }
);

// Add a rating field to all books
db.books.updateMany(
    {},
    { $set: { rating: 4.5 } }
);

// Delete a book by its ISBN
db.books.deleteOne({ ISBN: "9780743273565" });

// Remove all books of a particular genre
db.books.deleteMany({ genre: "Fiction" });

// Aggregation: Total number of books per genre
print("Total books per genre:");
db.books.aggregate([
    { $group: { _id: "$genre", totalBooks: { $sum: 1 } } }
]).forEach(printjson);

// Aggregation: Average published year of all books
print("Average published year:");
db.books.aggregate([
    { $group: { _id: null, avgPublishedYear: { $avg: "$publishedYear" } } }
]).forEach(printjson);

// Aggregation: Top-rated book
print("Top-rated book:");
db.books.aggregate([
    { $sort: { rating: -1 } },
    { $limit: 1 }
]).forEach(printjson);

// Create an index on the author field
db.books.createIndex({ author: 1 });

print("Script execution complete.");