import { useDispatch } from 'react-redux';
import { bindActionCreators, ActionCreatorsMapObject } from 'redux';
import { AppDispatch } from '../redux/store'; // Підключіть тип AppDispatch зі свого store.ts

type Actions = ActionCreatorsMapObject<any>;

export function useActions<T extends Actions>(actions: T,): { [K in keyof T]: (...args: Parameters<T[K]>) => void } {
  const dispatch = useDispatch<AppDispatch>();
  return bindActionCreators(actions, dispatch) as {
    [K in keyof T]: (...args: Parameters<T[K]>) => void;
  };
}