import React, { Component } from "react";
import { graphql } from "react-apollo";
import { getBooksQuery } from "../queries/queries";
import BookDetails from "./BookDetails";
class BookList extends Component {
	constructor(props) {
		super(props);
		this.state = {
			selected: null
		};
	}

	handleClick(id) {
		this.setState({ selected: id });
	}

	displayBooks() {
		const { data } = this.props;
		if (data.loading) {
			return <p>loading books...</p>;
		} else {
			return data.books.map(book => {
				return (
					<li key={book.id} onClick={() => this.handleClick(book.id)}>
						Book Name: {book.name}
					</li>
				);
			});
		}
	}

	render() {
		return (
			<div>
				<ul id="book-list">{this.displayBooks()}</ul>
				<BookDetails bookId={this.state.selected} />
			</div>
		);
	}
}

export default graphql(getBooksQuery)(BookList);
