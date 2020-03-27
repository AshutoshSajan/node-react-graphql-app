const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const bookSchema = new Schema(
	{
		name: {
			type: String,
			required: true,
			unique: true
		},
		genre: {
			type: String,
			required: true
		},
		authorId: {
			type: Schema.Types.ObjectId,
			required: true,
			ref: "Author"
		}
	},
	{ timestamps: true }
);

const Book = mongoose.model("Book", bookSchema);

module.exports = Book;
