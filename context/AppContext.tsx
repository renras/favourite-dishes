import React, { createContext, useReducer } from "react";

const AppContext = createContext<InitialState | null>(null);

interface InitialState {
  name: string;
}

const initialState: InitialState = {
  name: "React",
};

type Action = { type: "SET_NAME"; payload: string };

const reducer = (state: InitialState, action: Action) => {
  switch (action.type) {
    case "SET_NAME":
      return {
        ...state,
        name: action.payload,
      };
    default:
      return state;
  }
};

export const AppContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  return (
    <AppContext.Provider value={{ ...state, ...dispatch }}>
      {children}
    </AppContext.Provider>
  );
};

export default AppContext;
