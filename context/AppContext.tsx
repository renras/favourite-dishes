import React, { createContext, useReducer } from "react";

interface Dish {
  name: string;
  image: string;
  description: string;
  rating: number;
  id: number;
  placeholder?: string;
}

interface InitialState {
  dishes: Dish[];
  inputText: string;
  showModal: boolean;
}

const initialState: InitialState = {
  dishes: [] as Dish[],
  inputText: "",
  showModal: false,
};

const AppContext = createContext<{
  state: InitialState;
  dispatch: React.Dispatch<Action>;
}>({
  state: initialState,
  dispatch: () => null,
});

type Action =
  | { type: "SET_DISHES"; payload: Dish[] }
  | { type: "SET_INPUT_TEXT"; payload: string }
  | { type: "TOGGLE_MODAL"; payload: boolean }
  | { type: "ADD_DISH"; payload: Dish };

const reducer = (state: InitialState, action: Action) => {
  switch (action.type) {
    case "SET_DISHES":
      return { ...state, dishes: action.payload };
    case "SET_INPUT_TEXT":
      return { ...state, inputText: action.payload };
    case "TOGGLE_MODAL":
      return { ...state, showModal: action.payload };
    case "ADD_DISH":
      return { ...state, dishes: [...state.dishes, action.payload] };
    default:
      return state;
  }
};

export const AppContextProvider: React.FC = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <AppContext.Provider value={{ state, dispatch }}>
      {children}
    </AppContext.Provider>
  );
};

export default AppContext;
