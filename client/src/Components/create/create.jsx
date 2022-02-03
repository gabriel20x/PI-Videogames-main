import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { createVideogame, getGenres } from "../../Redux/actions";
import Checkbox from "../checkbox/checkbox";
import styles from "./create.module.css";
import Input from "./input/input";
import Loading from "../loading/loading";

export default function Create() {
  const platforms = [
    "PC",
    "PlayStation",
    "Xbox",
    "Nintendo",
    "iOS",
    "Android",
    "macOS",
    "Linux",
    "Another",
  ];
  let addZero = function (date){
    if(date < 10) return `0${date}`
    return date
  }
  const today = new Date()
  const notFuture = `${today.getFullYear()}-${addZero(today.getMonth()+1)}-${addZero(today.getDate())}` 
  const [error, setError] = useState({});
  const initialState = {
    name: "",
    description: "",
    released: "",
    rating: "",
    platforms: [],
    genres: [],
  }
  const [input, setInput] = useState(initialState);
  let genres = useSelector((state) => state.genres);
  let navigate = useNavigate();

  const handleCheckbox = function (e, type) {
    if (type === "genres") {
      if (e.checked) {
        setInput({
          ...input,
          [type]: [...input[type], { name: e.name }],
        });
      } else {
        setInput({
          ...input,
          [type]: input[type].filter((name) => name.name != e.name),
        });
      }
    } else {
      if (e.checked) {
        setInput({
          ...input,
          [type]: [...input[type], e.name],
        });
      } else {
        setInput({
          ...input,
          [type]: input[type].filter((name) => name != e.name),
        });
      }
    }
  };

  const dispatch = useDispatch();

  const validate = (input) => {
    let error = {};
    if (!input.name) {
      error.name = "Name required";
    } else if (!/^[A-Z][\s\w\:]{1,35}$/.test(input.name)) {
      error.name =
        "Name must begin with a capital letter, have no more than 35 characters and no symbols except ':' ";
    }

    if (!input.description) {
      error.description = "Description required";
    } else if (!/^[A-Z][\s\w\W]{1,250}$/.test(input.description)) {
      error.description =
        "Description must begin with a capital letter, have no more than 250 characters";
    }

    if (!input.released) {
      error.released = "Released is required";
    } else if (
      !/^\d{4}\-(0[1-9]|1[012])\-(0[1-9]|[12][0-9]|3[01])$/.test(input.released)
    ) {
      error.released = "Released must be a valid date. Format: yyyy-mm-dd";
    } else if(new Date(input.released) > new Date(notFuture)) {
        error.released = "Come back to your future.";
    }

    if (!input.rating) {
      error.rating = "Rating is required";
    } else if (
      !/(?<!\w|\d\.|\W)([0-4](\.\d{1,2})?|5(\.0{1,2})?)(?!\d|\.\d|\w|\W)/.test(
        input.rating
      )
    ) {
      error.rating = "Rating must be between 0.00 to 5.00";
    }

    if (!input.platforms.length) {
      error.platforms = "* required";
    }

    if (!input.genres.length) {
      error.genres = "* required";
    }

    return error;
  };

  const handleSubmit = function (e) {
    e.preventDefault();
    // console.log(input)
    dispatch(createVideogame(input));
    let confirm = window.confirm('Videojuego creado, ¿desea crear otro?')
    if(confirm) {
      setInput(initialState)
      return
    }
    return navigate('/videogames')
  };

  const handleInputChange = function (e) {
    setInput({
      ...input,
      [e.target.name]: e.target.value,
    });
  };

  useEffect(() => {
    if (genres.length < 1) dispatch(getGenres());
  }, []);

  useEffect(() => {
    setError(validate(input));
  }, [input]);

  return (
    <div className={styles.container}>
      <form onSubmit={(e) => handleSubmit(e)} className={styles.form}>
        <Input
          action={handleInputChange}
          type={"text"}
          name={"name"}
          error={error}
          value = {input.name}
        />
        <Input
          action={handleInputChange}
          type={"date"}
          name={"released"}
          error={error}
          value = {input.released}
        />
        <Input
          action={handleInputChange}
          type={"text"}
          name={"rating"}
          error={error}
          value = {input.rating}
        />
        <Input
          action={handleInputChange}
          type={"text"}
          name={"description"}
          error={error}
          value = {input.description}
        />
        <fieldset className={styles.checkbox}>
          <fieldset className={styles.genre}>
            <legend>Genres{error.genres && <p className={styles.error}>{error.genres}</p>}</legend>
            {genres.length < 1 ? (
              <Loading />
            ) : (
              genres.map((genre) => {
                return (
                  <Checkbox
                    key={genre.id}
                    name={genre.name}
                    action={handleCheckbox}
                    target={"genres"}
                  />
                );
              })
            )}
          </fieldset>
          <fieldset className={styles.platform}>
            <legend>Platforms{error.platforms && <p className={styles.error}>{error.platforms}</p>}</legend>
            {platforms.map((platform, index) => {
              return (
                <Checkbox
                  key={index}
                  name={platform}
                  action={handleCheckbox}
                  target={"platforms"}
                />
              );
            })}
          </fieldset>
        </fieldset>
        <fieldset className={`button_container ${styles.button}`}>
          {(Object.values(error).length > 0) ? 
            <h4 className={styles.no_button}> Complete the fields to save your progress </h4> :
            <button className='button_list' type="submit" disabled={Object.values(error).length > 0}>
              <div className="button_list_item">Save</div>
            </button>
          }
        </fieldset>
      </form>
    </div>
  );
}
