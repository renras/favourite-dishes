import { useContext } from "react";
import AppContext from "../../context/AppContext";

import styles from "./Layout.module.css";

const Layout = ({ children }: { children: React.ReactNode }) => {
  const { state } = useContext(AppContext);

  return (
    <>
      <header className={styles.header}>
        <h1>
          {state.showFavoriteDishes ? "Favorite Dishes" : "Favorite Movies"}
        </h1>
      </header>
      <main className={styles.main}>{children}</main>
    </>
  );
};

export default Layout;
