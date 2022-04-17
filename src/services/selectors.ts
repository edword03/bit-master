import {RootState} from './types'

export const getMapState = (state: RootState) => {
  return state.map
}

export const getCrewListState = (state: RootState) => {
  return state.crew
}

export const getErrorState = (state: RootState) => {
  return state.input
}