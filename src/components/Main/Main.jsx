import React from "react";

// Styles
import styles from "./Main.module.css";

// Components
import FilterTransfer from "./FilterTransfer/FilterTransfer";
import Content from "./Content/Content";

const Main = (props) => {
  return (
    <div className={styles.Main}>
      <FilterTransfer filterTransfer={props.filterTransfer} sortTransfer={props.sortTransfer}/>
      <Content filterPrice={props.filterPrice} filterDuration={props.filterDuration}  sortPrice={props.sortPrice} tickets={props.tickets} loading={props.loading} />
    </div>
  );
};

export default Main;
