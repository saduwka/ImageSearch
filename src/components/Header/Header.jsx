
import styles from "./Header.module.css"
import logo from '../../assets/logo.svg'

const Header = () => {
  return (
    <header className={styles.headerWrapper}>
      <img src={logo} alt="logo" />
      <h1>Pixly</h1>
    </header>
  );
};

export default Header;
