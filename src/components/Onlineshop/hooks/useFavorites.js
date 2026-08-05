import { useContext } from "react";

import { FavoritesContext } from "../context/FavoritesContext";

export default function useFavorites() {
  const favoritesContext = useContext(FavoritesContext);

  if (!favoritesContext) {
    throw new Error(
      "useFavorites muss innerhalb eines FavoritesProvider verwendet werden."
    );
  }

  return favoritesContext;
}