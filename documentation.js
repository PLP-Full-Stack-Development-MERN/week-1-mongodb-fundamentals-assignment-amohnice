// 1. Setup MongoDB:
// Check MongoDB version
// mongosh --version

// Start the MongoDB shell
// mongosh

// 2. Database and Collection Creation:
// Create a new database named 'library'
use library

// Create a collection named 'books'
db.createCollection("books")

// 3. Insert Data:
// Insert at least five book records into the 'books' collection
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
])

// 4. Retrieve Data:
// Retrieve all books
db.books.find()

// Query books by a specific author
db.books.find({ author: "J.K. Rowling" })

// Find books published after the year 2000
db.books.find({ publishedYear: { $gt: 2000 } })

// 5. Update Data:
// Update the publishedYear of a specific book
db.books.updateOne(
    { title: "The Great Gatsby" },
    { $set: { publishedYear: 1926 } }
)

// Add a rating field to all books with a default value
db.books.updateMany(
    {},
    { $set: { rating: 4.5 } }
)

// 6. Delete Data:
// Delete a book by its ISBN
db.books.deleteOne({ ISBN: "9780743273565" })

// Remove all books of a particular genre
db.books.deleteMany({ genre: "Fiction" })

// 7. Data Modeling Exercise:
// Create a data model for an e-commerce platform

// Insert a user record
db.users.insertOne({
    userId: 1,
    name: "John Doe",
    email: "john@example.com",
    address: "123 Main St"
});

// Insert a product record
db.products.insertOne({
    productId: 101,
    name: "Laptop",
    price: 999.99,
    category: "Electronics"
});

// Insert an order record
db.orders.insertOne({
    orderId: 1001,
    userId: 1,
    products: [
        { productId: 101, quantity: 1 }
    ],
    totalAmount: 999.99
});

// 8. Aggregation Pipeline:
// Find the total number of books per genre
db.books.aggregate([
    { $group: { _id: "$genre", totalBooks: { $sum: 1 } } }
])

// Calculate the average published year of all books
db.books.aggregate([
    { $group: { _id: null, avgPublishedYear: { $avg: "$publishedYear" } } }
])

// Identify the top-rated book
db.books.aggregate([
    { $sort: { rating: -1 } },
    { $limit: 1 }
])

// 9. Indexing:
// Create an index on the author field
db.books.createIndex({ author: 1 })

// Benefits of Indexing:
// - Indexes improve query performance by allowing MongoDB to quickly locate documents.
// - They reduce the need for full collection scans, improving efficiency in read-heavy operations.
