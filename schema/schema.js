const graphql = require("graphql");
const { GraphQLObjectType, GraphQLString, GraphQLInt, GraphQLSchema } = graphql;

const books = [
	{ name: "Hunger games", genre: "fiction", id: "1" },
	{ name: "Game of thrones", genre: "fantasy", id: "2" },
	{ name: "Hound", genre: "science", id: "3" },
	{ name: "Gravity", genre: "sci-fi", id: "4" }
];

const authors = [
	{ name: "sam", age: 22, id: "1" },
	{ name: "jack", age: 33, id: "2" },
	{ name: "bill", age: 32, id: "3" },
	{ name: "jhon", age: 43, id: "4" }
];

const BookType = new GraphQLObjectType({
	name: "Book",
	fields: () => ({
		id: {
			type: GraphQLString
		},
		name: {
			type: GraphQLString
		},
		genre: {
			type: GraphQLString
		}
	})
});

const AuthorType = new GraphQLObjectType({
	name: "Author",
	fields: () => ({
		id: {
			type: GraphQLString
		},
		name: {
			type: GraphQLString
		},
		age: {
			type: GraphQLInt
		}
	})
});

const RootQuery = new GraphQLObjectType({
	name: "RootQueryType",
	fields: {
		book: {
			type: BookType,
			args: {
				id: { type: GraphQLString }
			},
			resolve(parent, args) {
				console.log(parent, args.id);
				// e.g return Book.find()
				const book = books.filter(book => book.id === args.id);
				return book;
			}
		},

		author: {
			type: AuthorType,
			args: {
				id: { type: GraphQLString }
			},
			resolve(parent, args) {
				// e.g return Author.find()
				return authors.filter(author => author.id === args.id);
			}
		}
	}
});

module.exports = new GraphQLSchema({
	query: RootQuery
});
