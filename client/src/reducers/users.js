// import { createReducer } from 'redux';
const initialState = {
	inProcess: true,
	isLoading: true,
	user: null
};

export function usersReducer(state = initialState, action) {
	switch (action.type) {
		case "LOGIN":
			return {
				...state,
				isLoading: false,
				token: action.payload.token,
				user: action.payload.user,
				inProcess: false
			};

		case "AUTO_LOGIN":
			return {
				...state,
				isLoading: false,
				user: action.payload.user,
				inProcess: false
			};

		case "REGISTER":
			return state;

		case "LOGOUT":
			return {
				...state,
				isLoading: true,
				inProcess: true,
				user: null,
				token: null
			};

		case "":
			return state;

		default:
			return state;
	}
}
