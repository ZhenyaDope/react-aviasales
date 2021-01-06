import React, { useState, useEffect } from "react";

// Components
import Header from "../Header/Header";
import Main from "../Main/Main";

// Styles
import styles from "./App.module.css";

function App() {
  const SEARCH_ID_URL = "https://front-test.beta.aviasales.ru/";

  // Билеты
  const [tickets, setTickets] = useState([]);

  // Флаг загрузки
  const [loading, setLoading] = useState(true);

  // Сортировка дешевые \ быстрые
  const [sortTickets, setSortTickets] = useState("price");

  // Фильтр по пересадкам
  const [sortTransfer, setSortTransfer] = useState({
    all: true,
    noTransfer: true,
    oneTransfer: true,
    twoTransfer: true,
    threeTransfer: true,
  });

  // Измение фильтра по количеству пересадок

  const filterTransfer = (id) => {
    const oldSortTransfer = { ...sortTransfer };
    oldSortTransfer[id] = !oldSortTransfer[id];
    setSortTransfer({ ...oldSortTransfer });
  };

  // Событие на изменение на филтрации
  useEffect(() => {
    filterTickets(tickets, sortTransfer);
  }, [sortTransfer, tickets]);

  // Фильтрация по количеству персадок
  const filterTickets = (tickets, filterGroup) => {
    // Добавление поля transfer
    const modTickets = tickets.map((el) => {
      const transfer =
        el.segments[0].stops.length + el.segments[1].stops.length;

      el.transfer = transfer;

      return el;
    });

    //Соотношение имени к длине массива stops
    const filters = {
      all: tickets,
      noTransfer: 0,
      oneTransfer: 1,
      twoTransfer: 2,
      threeTransfer: 3,
    };

    const some = Object.entries(filterGroup).reduce((acc, cur) => {
      const key = cur[0];
      const value = cur[1];
      return value ? [...acc, key] : [...acc];
    }, []);

    //Итоговый массив, с значениями, которые нужно вывести
    const arrFilters = [];

    for (const key in filters) {
      if (some.includes(key)) {
        arrFilters.push(filters[key]);
      }
    }

    return filterGroup.all
      ? tickets
      : modTickets.filter((el) => arrFilters.includes(el.transfer));
  };

  // Запрос на сервер
  const responseData = async (url) => {
    // Получение ID
    const responseID = await fetch(`${url}search/`);
    const { searchId } = await responseID.json();
    // Получение данных
    const responseData = await fetch(
      `${url}tickets?searchId=${searchId}`
    ).then((data) => data.json());
    return responseData;
  };

  // Получение данных при загрузке компонентов
  useEffect(() => {
    // Получение массива билетов
    responseData(SEARCH_ID_URL)
      .then(
        (data) =>
          setTickets(
            ...tickets,
            data.tickets
              .slice(0, 10)
              .sort(
                (prevTicekt, nextTicket) => prevTicekt.price - nextTicket.price
              )
          ),
        setLoading(false),
        setSortTickets("price")
      )
      .catch((e) => setLoading(true));
  }, []);

  // Фильтрация по длительности
  const filterDuration = () => {
    setSortTickets("fast");

    const data = [...tickets]
      .map((ticket) => {
        const [first, second] = ticket.segments;
        return [ticket, first.duration + second.duration];
      })
      .sort((a, b) => a[1] - b[1])
      .map((ticket) => ticket[0]);

    setTickets(data);
  };

  // Фильтрация по цене
  const filterPrice = () => {
    setSortTickets("price");
    setTickets(
      [...tickets].sort(
        (prevTicekt, nextTicket) => prevTicekt.price - nextTicket.price
      )
    );
  };

  const visibleTickets = filterTickets(tickets, sortTransfer);

  return (
    <div className={styles.App}>
      <Header />
      <Main
        filterTransfer={filterTransfer}
        sortTransfer={sortTransfer}
        filterPrice={filterPrice}
        filterDuration={filterDuration}
        sortPrice={sortTickets}
        tickets={visibleTickets}
        loading={loading}
      />
    </div>
  );
}

export default App;
