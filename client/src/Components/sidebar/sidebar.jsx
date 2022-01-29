import { useEffect } from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getGenres, searchVideogames, updateFilter } from "../../Redux/actions";
import SearchBar from "../searchbar/SearchBar";
import GenresList from "../genreslist/GenresList"
import styles from "./sidebar.module.css";

export default function Sidebar() {
  let [name, setName] = useState();
  const genres = useSelector((state) => state.genres);
  let globalFilter = useSelector((state) => state.filters);
  let [filters, setFilters] = useState(globalFilter);
  const dispatch = useDispatch();

  let searchVideogame = () => {
    dispatch(searchVideogames(name.name));
  };

  const handleInputChange = function (e) {
    setName({
      ...name,
      name: e.target.value, // cambie
    });
  };

  const handleCheckbox = function (e) {
    if (e.checked) {
      setFilters({
        ...filters,
        genres: [...filters.genres, e.name],
      });
    } else {
      setFilters({
        ...filters,
        genres: filters.genres.filter((name) => name != e.name),
      });
    }
  };

  const handleSelect = function (e) {
    let [type, method] = e.value.split('_')
    setFilters({
      ...filters,
      order: { type: type, method: method },
    });
  };

  const handleLocalCheckbox = function (e) {
    setFilters({
      ...filters,
      onlyLocal: e.checked,
    });
  };

  useEffect(() => {
    if (genres.length < 1) dispatch(getGenres());
  }, []);

  useEffect(() => {
    dispatch(updateFilter(filters));
  }, [filters]);

  return (
    <>
      <SearchBar
        handleInputChange={handleInputChange}
        searchVideogame={searchVideogame}
      />
      <div className={styles.checklist}>
        <ul>
          <li key="LocalDB">
            <input
              type="checkbox"
              name="LocalDB"
              id="LocalDB"
              onChange={(e) => handleLocalCheckbox(e.target)}
            />
            <label id="LocalDB">LocalDB</label>
          </li>
          <GenresList
            handleCheckbox = {handleCheckbox}
            genres = {genres}
          />
        </ul>
      </div>
      <div onChange={(e) => handleSelect(e.target)} className={styles.select}>
        <select name="order" id="order">
          <option value="none">Select a filter/None</option>
          <option value="alphabetic_asc">A - Z</option>
          <option value="alphabetic_desc">Z - A</option>
          <option value="rating_desc">Best to Worst</option>
          <option value="rating_asc">Worst to Best</option>
        </select>
      </div>
    </>
  );
}
