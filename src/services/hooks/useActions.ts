import { useDispatch } from 'react-redux';
import { bindActionCreators } from 'redux';
import { setErrorState, clearErrorState } from '../input/inputActions';
import { setNewAddress, setCoords } from '../map/mapActions';

const AllActions = {
  setErrorState,
  clearErrorState,
  setNewAddress,
  setCoords,
};

export const useActions = () => {
  const dispatch = useDispatch();

  return bindActionCreators(AllActions, dispatch);
};
