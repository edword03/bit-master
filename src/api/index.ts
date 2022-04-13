import { AddressType } from "../types/mapTypes"

interface GetCrewListType {
  source_time: string
  addresses: Array<AddressType>
}

export const fetchData = async<T>(endpoint: string, body: GetCrewListType): Promise<T> => {
  const response = await fetch(`${process.env.REACT_APP_URL}/${endpoint}` || '')

  if(response.ok) {
    const data = await response.json()
    console.log('body', body);
    return data
  }
  
  throw new Error('Network error')
}

