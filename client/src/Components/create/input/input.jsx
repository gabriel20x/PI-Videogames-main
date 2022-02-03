import styles from "./input.module.css";

export default function Index({ name, type, error, action, value }) {
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
              value={value}
            />{" "}
            {error.description && <span className={styles.error}>{error.description}</span>}
          </>
        ) : (
          <>
            <input
              className={styles.input}
              type={type}
              onChange={(e) => action(e)}
              name={name.toLowerCase()}
              value={value}
            />{" "}
            {error[name] && <p className={styles.error}>{error[name]}</p>}
          </>
        )}
      </fieldset>
    </>
  );
}
