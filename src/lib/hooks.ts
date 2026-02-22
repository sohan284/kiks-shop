import { useDispatch, useSelector } from "react-redux";

// use these hooks in every component instead of the plain react-redux ones
// this keeps all components automatically tied to the correct store type

// dispatch actions to the store
export const useAppDispatch = () => useDispatch();

// read state from the store
export const useAppSelector = useSelector;
