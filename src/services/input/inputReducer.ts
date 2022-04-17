import { InputActionsType, InputActions } from "./inputActions";

interface InitialStateType {
  isError: boolean;
  errorMessage: string;
}

const initialState: InitialStateType = {
  isError: false,
  errorMessage: '',
};

export const inputReducer = (state = initialState, action: InputActionsType) => {
  switch (action.type) {
    case InputActions.SET_ERROR_STATE:
      return {...state, isError: true, errorMessage: action.payload}
    case InputActions.CLEAR_ERROR_STATE:
      return {...state, isError: false, errorMessage: ''}
    default: return state
  }
};
