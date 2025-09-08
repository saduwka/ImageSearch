import React, { memo } from "react";
import styles from "./Loader.module.css";

const Loader = memo(() => (
    <div className={styles.loaderWrapper}>
    <div className={styles.loader}></div>
        </div>
));

export default Loader;
