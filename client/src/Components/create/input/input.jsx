import styles from "./input.module.css";

export default function Index({ name, type, error, action }) {
  const capitalyze = name.charAt(0).toUpperCase() + name.slice(1);
  return (
    <>
      <fieldset className={styles[name.toLowerCase()]}>
        <label>{capitalyze}:</label>
        {name === "description" ? (
          <>
            <textarea
              className={styles.textarea}
              onChange={(e) => action(e)}
              type="text"
              name="description"
            />{" "}
            {error.description && <p>{error.description}</p>}
          </>
        ) : (
          <>
            <input
              className={styles.input}
              type={type}
              onChange={(e) => action(e)}
              name={name.toLowerCase()}
              min="1900-01-01"
              max="2022-12-31"
            />{" "}
            {error[name] && <p>{error[name]}</p>}
          </>
        )}
      </fieldset>
    </>
  );
}
