const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const authorSchema = new Schema(
	{
		name: {
			type: String,
			required: true,
			unique: true
		},
		age: {
			type: Number,
			required: true
		}
		// books: [
		// 	{
		// 		type: Schema.Types.ObjectId,
		// 		required: true,
		// 		ref: "book"
		// 	}
		// ]
	},
	{ timestamps: true }
);

const Author = mongoose.model("Author", authorSchema);

module.exports = Author;
