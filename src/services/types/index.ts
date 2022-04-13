import { Action, ActionCreator } from 'redux';
import { ThunkAction } from 'redux-thunk';
import { CrewActionsType } from '../crew/crewActions';
import { store } from '../store';

type AppThunkActions = CrewActionsType

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export type AppThunk<T = void> = ActionCreator<ThunkAction<T, Action, RootState, AppThunkActions>>;