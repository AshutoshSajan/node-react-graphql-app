import React, { Component } from "react";
import { graphql } from "react-apollo";
import { getBookQuery } from "../queries/queries";

class BookDetails extends Component {
	displayBookDetails() {
		const { data } = this.props;
		if (data.loading) {
			return <p>loading...</p>;
		} else if (data.book) {
			return (
				<div>
					<hr />
					<p>Book details</p>
					<hr />
					<h2>Book Name: {data.book.name}</h2>
					<p>Book Genre: {data.book.genre}</p>
					<p>Book Author: {data.book.author.name}</p>
					<ul>
						<p>All books of the author</p>
						{data.book.author.books.map(book => {
							return <li key={book.id}>Book name: {book.name}</li>;
						})}
					</ul>
					<hr />
				</div>
			);
		} else {
			return <div>No book selected</div>;
		}
	}

	render() {
		return <div>{this.displayBookDetails()}</div>;
	}
}

export default graphql(getBookQuery, {
	options: props => {
		return {
			variables: {
				id: props.bookId
			}
		};
	}
})(BookDetails);
