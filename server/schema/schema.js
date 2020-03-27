const graphql = require("graphql");
const {
	GraphQLObjectType,
	GraphQLString,
	GraphQLInt,
	GraphQLSchema,
	GraphQLID,
	GraphQLList,
	GraphQLNonNull
} = graphql;

const Book = require("../models/Book");
const Author = require("../models/Author");

// dummy data
// const books = [
// 	{ name: "Hunger games", genre: "fiction", id: "1", authorId: "1" },
// 	{ name: "Game of thrones", genre: "fantasy", id: "2", authorId: "2" },
// 	{ name: "Hound", genre: "science", id: "3", authorId: "3" },
// 	{ name: "kill bill", genre: "history", id: "4", authorId: "4" },
// 	{ name: "dr who", genre: "sci-fi", id: "4", authorId: "1" },
// 	{ name: "dark night", genre: "fiction", id: "4", authorId: "2" },
// 	{ name: "mr been", genre: "comedy", id: "4", authorId: "3" },
// 	{ name: "python", genre: "programming", id: "4", authorId: "4" }
// ];

// const authors = [
// 	{ name: "sam", age: 22, id: "1" },
// 	{ name: "jack", age: 33, id: "2" },
// 	{ name: "bill", age: 32, id: "3" },
// 	{ name: "jhon", age: 43, id: "4" }
// ];

const BookType = new GraphQLObjectType({
	name: "Book",
	fields: () => ({
		id: {
			// type: GraphQLString,
			type: GraphQLID
		},
		name: {
			type: GraphQLString
		},
		genre: {
			type: GraphQLString
		},
		author: {
			type: AuthorType,
			resolve(parent, args) {
				return Author.findOne({ _id: parent.authorId });

				// using dummy data
				//return authors.filter(author => author.id === parent.authorId)[0];
			}
		}
	})
});

const AuthorType = new GraphQLObjectType({
	name: "Author",
	fields: () => ({
		id: {
			// type: GraphQLString,
			type: GraphQLID
		},
		name: {
			type: GraphQLString
		},
		age: {
			type: GraphQLInt
		},
		// single book
		// book: {
		// 	type: BookType,
		// 	resolve(parent, args) {
		// 		return books.filter(book => book.id === parent.bookId)[0];
		// 	}
		// }
		books: {
			type: new GraphQLList(BookType),
			resolve(parent, args) {
				console.log(parent);

				return Book.find({ authorId: parent.id });
				// using dummy data
				// return books.filter(book => book.authorId === parent.bookId);
			}
		}
	})
});

const RootQuery = new GraphQLObjectType({
	name: "RootQueryType",
	fields: {
		book: {
			type: BookType,
			args: {
				// id: { type: GraphQLString },
				id: { type: GraphQLID }
			},
			resolve(parent, args) {
				return Book.findOne({ _id: args.id });
				// using dummy data
				// return books.filter(book => book.id === args.id)[0];
			}
		},

		author: {
			type: AuthorType,
			args: {
				// id: { type: GraphQLString },
				id: { type: GraphQLID }
			},
			resolve(parent, args) {
				return Author.findOne({ _id: args.id });
				// using dummy data
				// return authors.filter(author => author.id === args.id)[0];
			}
		},
		books: {
			type: new GraphQLList(BookType),
			resolve(parent, args) {
				return Book.find({});
			}
		},
		authors: {
			type: new GraphQLList(AuthorType),
			resolve(parent, args) {
				return Author.find({});
			}
		}
	}
});

const Mutation = new GraphQLObjectType({
	name: "Mutation",
	fields: {
		addAuthor: {
			type: AuthorType,
			args: {
				name: { type: new GraphQLNonNull(GraphQLString) },
				age: { type: new GraphQLNonNull(GraphQLInt) }
			},
			resolve(parent, args) {
				const author = new Author({
					name: args.name,
					age: args.age
				});
				return author.save();
			}
		},
		updateAuthor: {
			type: AuthorType,
			args: {
				id: { type: new GraphQLNonNull(GraphQLID) },
				name: { type: new GraphQLNonNull(GraphQLString) },
				age: { type: new GraphQLNonNull(GraphQLInt) }
			},
			resolve(parent, args) {
				const author = Author.findOneAndUpdate(
					{ _id: args.id },
					{ name: args.name, age: args.age },
					{ new: true }
				);
				return author;
			}
		},
		deleteAuthor: {
			type: AuthorType,
			args: {
				id: { type: new GraphQLNonNull(GraphQLID) }
			},
			resolve(parent, args) {
				const author = Author.findOneAndDelete({ _id: args.id });
				return author;
			}
		},
		addBook: {
			type: BookType,
			args: {
				name: { type: new GraphQLNonNull(GraphQLString) },
				genre: {
					type: new GraphQLNonNull(GraphQLString)
				},
				authorId: { type: new GraphQLNonNull(GraphQLID) }
			},
			resolve(parent, args) {
				const book = new Book({
					name: args.name,
					genre: args.genre,
					authorId: args.authorId
				});
				return book.save();
			}
		},
		updateBook: {
			type: BookType,
			args: {
				id: { type: new GraphQLNonNull(GraphQLID) },
				name: { type: new GraphQLNonNull(GraphQLString) },
				genre: {
					type: new GraphQLNonNull(GraphQLString)
				},
				authorId: { type: new GraphQLNonNull(GraphQLID) }
			},
			resolve(parent, args) {
				const book = Book.findByIdAndUpdate(
					{ _id: args.id },
					{
						name: args.name,
						genre: args.genre,
						authorId: args.authorId
					},
					{ new: true }
				);
				return book;
			}
		},
		deleteBook: {
			type: BookType,
			args: {
				id: { type: new GraphQLNonNull(GraphQLID) }
			},
			resolve(parent, args) {
				const book = Book.findByIdAndDelete({ _id: args.id });
				return book;
			}
		}
	}
});

module.exports = new GraphQLSchema({
	query: RootQuery,
	mutation: Mutation
});
