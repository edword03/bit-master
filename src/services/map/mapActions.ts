import { CoordsArray } from '../../types/mapTypes';

export enum MapActions {
  SET_ADDRESS = 'SET_ADDRESS',
  SET_COORDS = 'SET_COORDS',
}

type SetAddressType = {
  type: typeof MapActions.SET_ADDRESS;
  payload: string;
};

type SetCoordsType = {
  type: typeof MapActions.SET_COORDS;
  payload: CoordsArray;
};

export function setNewAddress(address: string): SetAddressType {
  return {
    type: MapActions.SET_ADDRESS,
    payload: address,
  };
}

export function setCoords(coords: CoordsArray): SetCoordsType {
  return {
    type: MapActions.SET_COORDS,
    payload: coords,
  };
}

export type MapActionsType = SetAddressType | SetCoordsType;
