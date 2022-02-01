import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { createVideogame, getGenres } from "../../Redux/actions";
import Checkbox from "../checkbox/checkbox";
import GenresList from "../genreslist/GenresList";
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
  const [error, setError] = useState({});
  const [input, setInput] = useState({
    name: "",
    description: "",
    released: "",
    rating: 0,
    platforms: [],
    genres: [],
  });
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
    } else if (!/^[A-Z][\s\w\W]{1,300}$/.test(input.description)) {
      error.description =
        "Description must begin with a capital letter, have no more than 300 characters";
    }

    if (!input.released) {
      error.released = "Released is required";
    } else if (
      !/^\d{4}\-(0[1-9]|1[012])\-(0[1-9]|[12][0-9]|3[01])$/.test(input.released)
    ) {
      error.released = "Released must be a valid date. Format: yyyy-mm-dd";
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
    console.log(input)
    dispatch(createVideogame(input));
    navigate(-1);
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
        />
        <Input
          action={handleInputChange}
          type={"date"}
          name={"released"}
          error={error}
        />
        <Input
          action={handleInputChange}
          type={"text"}
          name={"rating"}
          error={error}
        />
        <Input
          action={handleInputChange}
          type={"text"}
          name={"description"}
          error={error}
        />
        <fieldset className={styles.checkbox}>
          <fieldset className={styles.genre}>
            <legend>Genres{error.genres && <>{error.genres}</>}</legend>
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
            <legend>Platforms{error.platforms && <>{error.platforms}</>}</legend>
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
        <fieldset className={styles.button}>
          <button type="submit" disabled={Object.values(error).length > 0}>
            Create
          </button>
        </fieldset>
      </form>
    </div>
  );
}
