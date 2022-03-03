import React, { createContext, useReducer } from "react";

interface Dish {
  name: string;
  image: string;
  description: string;
  rating: number;
  id: number;
  placeholder: string;
}

interface InitialState {
  dishes: Dish[] | null;
}

const initialState: InitialState = {
  dishes: null,
};

const AppContext = createContext<{
  state: InitialState;
  dispatch: React.Dispatch<Action>;
}>({
  state: initialState,
  dispatch: () => null,
});

type Action = { type: "SET_DISHES"; payload: Dish[] };

const reducer = (state: InitialState, action: Action) => {
  switch (action.type) {
    case "SET_DISHES":
      return { ...state, dishes: action.payload };
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
