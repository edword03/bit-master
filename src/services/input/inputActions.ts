export enum InputActions {
  SET_ERROR_STATE = 'SET_ERROR_STATE',
  CLEAR_ERROR_STATE = 'CLEAR_ERROR_STATE'
}

type SetErrorStateType = {
  type: typeof InputActions.SET_ERROR_STATE
  payload: string
}

type ClearErrorStateType = {
  type: typeof InputActions.CLEAR_ERROR_STATE
}

export type InputActionsType = SetErrorStateType | ClearErrorStateType

export const setErrorState = (message: string): SetErrorStateType => ({
  type: InputActions.SET_ERROR_STATE,
  payload: message
})

export const clearErrorState = (): ClearErrorStateType => ({
  type: InputActions.CLEAR_ERROR_STATE
})