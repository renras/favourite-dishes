import React, { createContext, useReducer } from "react";

import data from "../dishes-favourite";

interface Movie {
  id?: number;
  title?: string;
  overview?: string;
  rating?: number;
}

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
  showDarkModeWidget: boolean;
  filteredDishes: Dish[];
  sort: "none" | "ASCENDING" | "DESCENDING";
  favoriteMovies: Movie[] | null;
  showFavoriteDishes: boolean;
  showFavoriteMovies: boolean;
}

const initialState: InitialState = {
  dishes: data,
  inputText: "",
  showModal: false,
  showDarkModeWidget: true,
  filteredDishes: data,
  sort: "none",
  favoriteMovies: null,
  showFavoriteDishes: true,
  showFavoriteMovies: false,
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
  | { type: "ADD_DISH"; payload: Dish }
  | { type: "FILTER_DISHES" }
  | { type: "SET_SORT"; payload: "none" | "ASCENDING" | "DESCENDING" }
  | { type: "SET_REQUEST_TOKEN"; payload: string }
  | { type: "SET_FAVORITE_MOVIES"; payload: Movie[] }
  | { type: "SET_SHOW_FAVORITE_DISHES"; payload: boolean }
  | { type: "SET_SHOW_FAVORITE_MOVIES"; payload: boolean };

const reducer = (state: InitialState, action: Action) => {
  switch (action.type) {
    case "SET_DISHES":
      return {
        ...state,
        dishes: action.payload,
      };
    case "SET_INPUT_TEXT":
      return { ...state, inputText: action.payload };
    case "TOGGLE_MODAL":
      return { ...state, showModal: action.payload };
    case "ADD_DISH":
      return { ...state, dishes: [...state.dishes, action.payload] };
    case "FILTER_DISHES":
      const newDishes = state.dishes.filter((dish) =>
        dish.name.toLowerCase().includes(state.inputText.toLowerCase())
      );

      if (state.sort === "ASCENDING") {
        return {
          ...state,
          filteredDishes: newDishes.sort((a, b) => a.rating - b.rating),
        };
      }

      if (state.sort === "DESCENDING") {
        return {
          ...state,
          filteredDishes: newDishes.sort((a, b) => b.rating - a.rating),
        };
      }

      return { ...state, filteredDishes: newDishes };
    case "SET_SORT":
      return { ...state, sort: action.payload };
    case "SET_REQUEST_TOKEN":
      return { ...state, requestToken: action.payload };
    case "SET_FAVORITE_MOVIES":
      return { ...state, favoriteMovies: action.payload };
    case "SET_SHOW_FAVORITE_DISHES":
      return { ...state, showFavoriteDishes: action.payload };
    case "SET_SHOW_FAVORITE_MOVIES":
      return { ...state, showFavoriteMovies: action.payload };
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
