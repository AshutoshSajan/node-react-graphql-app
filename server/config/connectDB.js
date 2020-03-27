const mongoose = require("mongoose");
const chalk = require("chalk");

const connectDB = async () => {
	try {
		const conn = await mongoose.connect(process.env.MONGO_URI, {
			useNewUrlParser: true,
			useCreateIndex: true,
			useFindAndModify: false,
			useUnifiedTopology: true
		});

		console.log(
			chalk.blue.bold(
				`MongoDB connected at host: ${conn.connection.host} . . .\n`
			)
		);
	} catch (err) {
		console.log(
			chalk.red.bold(`MongoDB connection error: ${err.message} . . .\n`)
		);
		process.exit(1);
	}
};

module.exports = connectDB;
