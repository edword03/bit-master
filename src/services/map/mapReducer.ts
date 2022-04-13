import { MapActions, MapActionsType } from './mapActions';

interface InitialStateType {
  address: string;
  coords: {
    lat: number;
    lon: number;
  };
}

const initialState: InitialStateType = {
  address: '',
  coords: {
    lat: 0,
    lon: 0,
  },
};

export function mapReducer(state = initialState, action: MapActionsType): InitialStateType {
  switch (action.type) {
    case MapActions.SET_ADDRESS:
      return { ...state, address: action.payload };
    case MapActions.SET_COORDS:
      return { ...state, coords: { lat: action.payload[0], lon: action.payload[1] } };
    default:
      return state;
  }
}
