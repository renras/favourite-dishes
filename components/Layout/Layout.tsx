import React from "react";

import styles from "./Layout.module.css";

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <header className={styles.header}>
        <h1>Favourite Dishes</h1>
      </header>
      <main className={styles.main}>{children}</main>
    </>
  );
};

export default Layout;
