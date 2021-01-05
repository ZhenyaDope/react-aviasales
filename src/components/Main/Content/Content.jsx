import React from "react";

// Components
import FilterGroup from "./FilterGroup/FilterGroup";
import Tickets from "./Tickets/Tickets";

// Styles
import styles from "./Content.module.css";
const Content = (props) => {
  return (
    <div className={styles.Content}>
      <FilterGroup filterPrice={props.filterPrice} filterDuration={props.filterDuration}  sortPrice={props.sortPrice} />
      <Tickets tickets={props.tickets} loading={props.loading} />
    </div>
  );
};

export default Content;
