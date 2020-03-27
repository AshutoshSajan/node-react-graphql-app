import React from "react";
import ApolloClient from "apollo-boost";
import { ApolloProvider } from "react-apollo";

import BookList from "./components/BookList";
import AddBook from "./components/AddBook";

// apollo clien setup
const client = new ApolloClient({
	uri: "http://localhost:8000/graphql"
});

function App() {
	return (
		<ApolloProvider client={client}>
			<div className="App">
				<BookList />
				<AddBook />
			</div>
		</ApolloProvider>
	);
}

export default App;
