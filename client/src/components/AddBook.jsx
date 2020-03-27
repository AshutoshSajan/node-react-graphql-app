import React, { Component } from "react";
import { graphql } from "react-apollo";
import {
	getBooksQuery,
	getAuthorsQuery,
	addBookMutation
} from "../queries/queries";
import * as compose from "lodash.flowright";

class AddBook extends Component {
	constructor(props) {
		super(props);
		this.state = {
			name: "",
			genre: "",
			authorId: ""
		};
	}

	displayAuthors = () => {
		// getAuthorsQuery name given in compose method so we can call this methos with this name

		const data = this.props.getAuthorsQuery;

		if (data.loading) {
			return (
				<option disabled value="">
					loading authors...
				</option>
			);
		} else {
			return data.authors.map(author => {
				return (
					<option key={author.id} value={author.id}>
						{author.name}
					</option>
				);
			});
		}
	};

	handleChange = e => {
		const { name, value } = e.target;
		this.setState({ [name]: value });
	};

	handleSubmit = e => {
		e.preventDefault();
		// console.log(this.state);
		// addBookMutation name given in compose method so we can call this methos with this name
		this.props.addBookMutation({
			variables: {
				...this.state
				// name: this.state.name,
				// genre: this.state.genre,
				// authorId: this.state.authorId
			},
			// refetch the books list after creating new book to update the dom
			refetchQueries: [{ query: getBooksQuery }]
		});

		this.setState({ name: "", genre: "", authorId: "" });
	};

	render() {
		const { name, genre, authorId } = this.state;

		return (
			<div>
				<form onSubmit={this.handleSubmit}>
					<input
						type="text"
						name="name"
						placeholder="book name"
						value={name}
						onChange={this.handleChange}
					/>
					<br />
					<input
						type="text"
						name="genre"
						placeholder="genre"
						value={genre}
						onChange={this.handleChange}
					/>
					<br />
					<select onChange={this.handleChange} name="authorId" value={authorId}>
						<option value="">select author</option>
						{this.displayAuthors()}
					</select>
					<br />
					<button type="submit">Add Book</button>
				</form>
			</div>
		);
	}
}

// binding single query
// export default graphql(getAuthorsQuery)(AddBook);

// binding multiple queries
export default compose(
	graphql(getAuthorsQuery, { name: "getAuthorsQuery" }),
	graphql(addBookMutation, { name: "addBookMutation" })
)(AddBook);
