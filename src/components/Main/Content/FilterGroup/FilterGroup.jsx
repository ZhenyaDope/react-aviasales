import React from "react";

// Styles
import styles from "./FilterGroup.module.css";

const FilterGroup = (props) => {
  
  return (
    <div className={styles.FilterGroup}>
      <button onClick={()=> props.filterPrice()} id="sortPrice" className={`${styles.btn} ${props.sortPrice === 'price' ? styles.active : ''}`}>
        Самый дешевый
      </button>
      <button onClick={()=> props.filterDuration()} id="sortFast" className={`${styles.btn} ${props.sortPrice === 'fast' ? styles.active : ''}`}>
        Самый быстрый
      </button>
    </div>
  );
};

export default FilterGroup;
