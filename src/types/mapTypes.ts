import { YMapsApi } from 'react-yandex-maps';

export type RefType = { current: YMapsApi } | any;
export type CoordsArray = Array<number>;
export type AddressType = {
  address: string;
  lat: number;
  lon: number;
};
