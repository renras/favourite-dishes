import React from "react";

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <header>
        <h1>Favourite Dishes</h1>
      </header>
      <main>{children}</main>
    </>
  );
};

export default Layout;
