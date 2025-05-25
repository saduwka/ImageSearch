import React from "react";
import styles from "./Sidebar.module.css"


const Sidebar = ({ history = [] }) => {
  return (
    <aside>
      <h2>Search History</h2>
      <ul className={styles.historyList}>
        {history.length > 0 ? (
          history.map((item, index) => (
            <li key={index}>{item}</li>
          ))
        ) : (
          <p>No history yet</p>
        )}
      </ul>
    </aside>
  );
};

export default Sidebar;