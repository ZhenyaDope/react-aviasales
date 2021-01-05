import React from "react";

// Components
import TicketItem from "./TicketItem/TicketItem";

// Styles
import styles from "./Tickets.module.css";

const Tickets = (props) => {
  // Если загрузка выполнена то будет false и он по идеи только тогда войдет сюда
  let id = 10;
  return (
    <ul className={styles.Tickets}>
      {props.loading ? (
        <div className={styles.center_Preloader}>
          <div className={styles.lds_roller}><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div>
        </div>
      ) : (
        <div>
          
          {props.tickets.map(({ price, carrier, segments }) => (
            <TicketItem
              key={id++}
              price={price}
              carrier={carrier}
              segments={segments}
            />
          ))}
        </div>
      )}
      {/* <TicketItem />
     
      <TicketItem />
      <TicketItem /> */}
    </ul>
  );
};

export default Tickets;
