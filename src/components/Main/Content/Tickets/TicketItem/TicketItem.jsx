import React from "react";

// Styles
import styles from "./TicketItem.module.css";

const TicketItem = (props) => {

  // Массивые с данными ТУДА и ОБРАТНО
  const [thither, back] = [...props.segments];


  // Форматирование времени отправки (ЧЧ:ММ)
  const formatTime = (date) => {
    const hour = new Date(date).getHours().toString().padStart(2, 0);
    const min = new Date(date).getMinutes().toString().padStart(2, 0);
    return `${hour}:${min}`;
  };

  
  // Время отправки туда
  const timeThither = formatTime(thither.date);

  // Время отправки обратно
  const timeBack = formatTime(back.date);




  // Перевод минут в часы \ Время потраченное на полет 
  function getTimeFromMins(mins) {
    let hours = Math.trunc(mins / 60);
    let minutes = mins % 60;
    return `${hours}ч ${minutes}м`;
  }




  // Время на полет в ту сторону
  const thitherTimeDuration = getTimeFromMins(thither.duration);

  // Время на полет обратно
  const backTimeDuration = getTimeFromMins(back.duration);






  // Рассчет времени прибытия (ФОРМАТ ЧЧ:ММ)
  const timeArrival = (thitherTime, durationTime) => {

    // Время отправки в формате ЧЧ:ММ
    const thitherHours = +(new Date(thitherTime).getHours());
    const thitherMin = +(new Date(thitherTime).getMinutes());

    // Время в пути в формате ЧЧ:ММ
    const durationHours = Math.trunc(durationTime / 60);
    const durationMin = durationTime % 60;

    // Вычесляем время прибытия
    let arrivalHour = thitherHours + durationHours;
    let arrivalMinuts = thitherMin + durationMin;


    if(arrivalHour >= 24){
      arrivalHour = arrivalHour - 24;
    }
    if(arrivalMinuts>=60){
      arrivalMinuts = arrivalMinuts - 60;
    }

    return `${arrivalHour.toString().padStart(2,0)}:${arrivalMinuts.toString().padStart(2,0)}`;
  };


  


  const thitherArrival = timeArrival(thither.date, thither.duration);
  const backArrival = timeArrival(back.date, back.duration);

  
  
  return (
    <li className={styles.TicketItem}>
      <div className={styles.TicketItem__header}>
        <span>{`${props.price} Р`}</span>
        <img
          src={`https://pics.avs.io/99/36/${props.carrier}.png`}
          alt="Логотип компании"
        />
      </div>
      <div className={styles.TicketItem__info}>
        <div className={styles.TicketItem__element}>
          <p>{`${thither.origin} - ${thither.destination}`}</p>
          <span>{`${timeThither} - ${thitherArrival}`}</span>
        </div>
        <div className={styles.TicketItem__element}>
          <p>В пути</p>
          <span>{thitherTimeDuration}</span>
        </div>
        <div className={styles.TicketItem__element}>
          <p>
            {thither.stops.length === 0
              ? `0 пересадок`
              : thither.stops.length > 1
              ? `${thither.stops.length} пересадки`
              : `1 пересадка`}
          </p>
          <span>
            {thither.stops.map((place, index) =>
              index === thither.stops.length - 1 ? `${place}` : `${place}, `
            )}
          </span>
        </div>
      </div>
      <div className={styles.TicketItem__info}>
        <div className={styles.TicketItem__element}>
          <p>{`${back.origin} - ${back.destination}`}</p>
          <span>{`${timeBack} - ${backArrival}`}</span>
        </div>
        <div className={styles.TicketItem__element}>
          <p>В пути</p>
          <span>{backTimeDuration}</span>
        </div>
        <div className={styles.TicketItem__element}>
          <p>
            {back.stops.length === 0
              ? `0 пересадок`
              : back.stops.length > 1
              ? `${back.stops.length} пересадки`
              : `1 пересадка`}
          </p>
          <span>
            {back.stops.map((place, index) =>
              index === back.stops.length - 1 ? `${place}` : `${place}, `
            )}
          </span>
        </div>
      </div>
    </li>
  );
};

export default TicketItem;
