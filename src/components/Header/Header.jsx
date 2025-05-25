import React from "react";
import styles from "./Header.module.css"

const Header = ({ setFilter }) => {
  return (
    <header className={styles.headerWrapper}>
      <div className={styles.headerBtn}>
        <button onClick={() => setFilter("likes")}>Most Liked</button>
        <button onClick={() => setFilter("views")}>Most Viewed</button>
        <button onClick={() => setFilter("comments")}>Most Commented</button>
      </div>
    </header>
  );
};

export default Header;
