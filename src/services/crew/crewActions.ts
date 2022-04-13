import { AppDispatch, AppThunk } from '../types';
import { CrewItemType, CrewState } from '../../types/crewTypes';
import { fetchData } from '../../api';

export enum CrewActions {
  GET_CREW_REQUEST = 'GET_CREW_REQUEST',
  GET_CREW_SUCCESS = 'GET_CREW_SUCCESS',
  GET_CREW_ERROR = 'GET_CREW_SUCCESS',
}

type GetCrewRequestType = {
  readonly type: typeof CrewActions.GET_CREW_REQUEST;
};

type GetCrewSuccessType = {
  readonly type: typeof CrewActions.GET_CREW_SUCCESS;
  readonly payload: Array<CrewItemType>;
};

type GetCrewErrorType = {
  readonly type: typeof CrewActions.GET_CREW_ERROR;
  readonly payload?: any;
};

export type CrewActionsType = GetCrewRequestType | GetCrewSuccessType | GetCrewErrorType;

const getCrewRequestAction = (): GetCrewRequestType => ({
  type: CrewActions.GET_CREW_REQUEST,
});

const getCrewSuccessAction = (data: Array<CrewItemType>): GetCrewSuccessType => ({
  type: CrewActions.GET_CREW_SUCCESS,
  payload: data,
});

const getCrewErrorAction = (): GetCrewErrorType => ({
  type: CrewActions.GET_CREW_ERROR,
});

export const getCrewList: AppThunk = body => {
  return async (dispatch: AppDispatch) => {
    try {
      dispatch(getCrewRequestAction());
      const result = await fetchData<CrewState>('crews', body);

      if (result.descr === 'OK') {
        console.log(result);
        dispatch(getCrewSuccessAction(result.data.crews_info));
      }
    } catch (error) {
      dispatch(getCrewErrorAction());
      console.error(error);
    }
  };
};
