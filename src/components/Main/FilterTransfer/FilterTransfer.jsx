import React from "react";

// Styles
import styles from "./FilterTransfer.module.css";

const FilterTransfer = (props) => {
  const {all,noTransfer,oneTransfer, twoTransfer, threeTransfer} = props.sortTransfer

  
  const arrInput = [
    {htmlFor:'all',id:'all', label:'Все', checked: all},
    {htmlFor:'noTransfer',id:'noTransfer', label:'Без пересадок',checked:noTransfer},
    {htmlFor:'oneTransfer',id:'oneTransfer', label:'1 пересадка', checked:oneTransfer},
    {htmlFor:'twoTransfer',id:'twoTransfer', label:'2 пересадки', checked: twoTransfer},
    {htmlFor:'threeTransfer',id:'threeTransfer', label:'3 пересадки', checked: threeTransfer},
  ]

  const filterElements = arrInput.map(input=>{

    const {htmlFor,id,label, checked} = input
    return (
      <li key={id} className={styles.FilterTransfer__list_item}>
          <input defaultChecked={checked} onClick={()=>props.filterTransfer(id)} id={id} type="checkbox" />
          <label htmlFor={htmlFor}>{label}</label>
        </li> 
    )
  })

  return (



    <div className={styles.FilterTransfer}>
      <h3 className={styles.FilterTransfer__title}>Количество пересадок</h3>
      <ul className={styles.FilterTransfer__list}>
        {filterElements}

      </ul>
    </div>
  );
};

export default FilterTransfer;
