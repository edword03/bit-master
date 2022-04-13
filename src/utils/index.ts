import { AddressType } from '../types/mapTypes';

export const sliceAddress = (address: string) => {
  return address.split(', ').slice(3).join(', ');
};

export const getCurrentTime = () => {
  const date = new Date();

  return (
    date.getFullYear() +
    ('0' + (date.getMonth() + 1)).slice(-2) +
    ('0' + date.getDate()).slice(-2) +
    ('0' + date.getHours()).slice(-2) +
    ('0' + date.getMinutes()).slice(-2) +
    ('0' + date.getSeconds()).slice(-2)
  );
};

export const searchCrewBody = (addresses: AddressType) => {
  return {
    source_time: getCurrentTime(),
    addresses: [addresses],
  };
};

export const createOrderBody = (addresses: AddressType, crew_id: number) => {
  return {
    source_time: getCurrentTime(),
    addresses: [addresses],
    crew_id,
  };
};
