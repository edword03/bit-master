import { CrewItemType } from '../../types/crewTypes';
import { CrewActionsType, CrewActions } from './crewActions';

interface InitialStateType {
  crewRequest: boolean;
  crewSuccess: boolean;
  crewError: boolean;
  crewList: Array<CrewItemType>;
}

const initialState: InitialStateType = {
  crewList: [],
  crewRequest: false,
  crewSuccess: false,
  crewError: false,
};

export function crewsReducer(state = initialState, action: CrewActionsType): InitialStateType {
  switch (action.type) {
    case CrewActions.GET_CREW_REQUEST:
      return { ...state, crewRequest: true };
    case CrewActions.GET_CREW_SUCCESS:
      return { ...state, crewRequest: false, crewSuccess: true, crewList: [...action.payload].sort((a, b) => a.distance - b.distance)};
      case CrewActions.GET_CREW_ERROR:
        return {...state, crewError: true, crewRequest: false, crewSuccess: false}
    default:
      return state;
  }
}
