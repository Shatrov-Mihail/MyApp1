import { useState } from "react";
import styles from "./app.module.css";

export const App = () => {
  const [value, setValue] = useState("");
  const [list, setList] = useState([]);
  const [error, setError] = useState("");

  const MyComponent = () => {
    const onInputButtonClick = () => {
      const promptValue = prompt("Введите значение");
      if (promptValue && promptValue.length >= 3) {
        setValue(promptValue);
        setError("");
      } else {
        setError("Введенное значение должно содержать минимум 3 символа");
      }
    };

    return (
      <button className={styles.button} onClick={onInputButtonClick}>
        Ввести новое
      </button>
    );
  };

  const onAddButtonClick = () => {
    if (value.length >= 3) {
      const id = Date.now();
      const currentDate = new Date();
      const options = {
        year: "numeric",
        month: "numeric",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
      };
      const formattedDateTime = currentDate.toLocaleString(options);
      const updatedList = [...list, { id, value, formattedDateTime }];
      setList(updatedList);
      setValue("");
      setError("");
    }
  };

  const isValueVaild = value.length >= 3;
  const showAddElementPar = list.length >= 1;

  return (
    <div className={styles.app}>
      <h1 className={styles["page-heading"]}>Ввод значения</h1>
      <p className={styles["no-margin-text"]}>
        Текущее значение : "
        <output className={styles["current-value"]}>{value}</output>"
      </p>
      {error && <div className={styles.error}>{error}</div>}
      <div className={styles["buttons-container"]}>
        <MyComponent />
        <button
          className={styles.button}
          disabled={!isValueVaild}
          onClick={onAddButtonClick}
        >
          Добавить в список
        </button>
      </div>
      <div className={styles["list-container"]}>
        <h2 className={styles["list-heading"]}>Список:</h2>
        {!showAddElementPar && (
          <p className={styles["no-margin-text"]}>Нет добавленных элементов</p>
        )}
        <ul className={styles.list}>
          {list.map(({ id, value, formattedDateTime }) => (
            <li className={styles["list-item"]} key={id}>
              <span>{formattedDateTime}</span> - <span>{value}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};
