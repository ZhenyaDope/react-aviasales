import React from "react";

// Image
import logo from "./Logo.png";
// Styles
import styles from "./Header.module.css";

const Header = () => {
  return (
    <header className={styles.Header}>
      <img className={styles.Header__logo} src={logo} alt="Логотип компании" />
    </header>
  );
};

export default Header;
