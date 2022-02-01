import { useEffect } from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getGenres, getVideogames, searchVideogames, updateFilter } from "../../Redux/actions";
import SearchBar from "../searchbar/SearchBar";
import styles from "./sidebar.module.css";
import Loading from "../loading/loading";
import Checkbox from '../checkbox/checkbox';

export default function Sidebar({filters,setFilters}) {
  let [name, setName] = useState({name:'',active:false});
  const genres = useSelector((state) => state.genres);
  const dispatch = useDispatch();

  let searchVideogame = () => {
    if(name.name === '') {
      if(name.active){
        dispatch(getVideogames())
        setName({
          ...name,
          active: false
        })
        console.log(name)
      }
      console.log(name)
      return
    } 
    dispatch(searchVideogames(name.name));
    setName({
      ...name,
      name: '',
      active: true
    });
  };

  const handleInputChange = (e) => {
    setName({
      ...name,
      name: e.target.value,
    });
  };

  const handleCheckbox = (e) => {
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

  const handleSelect = (e) => {
    let [type, method] = e.value.split('_')
    setFilters({
      ...filters,
      order: { type: type, method: method },
    });
  };

  const handleLocalCheckbox = (e) => {
    setFilters({
      ...filters,
      onlyLocal: e.checked,
    });
  };

  const handleReset = () =>{
    setFilters( {
      onlyLocal : false,
      genres : [],
      order : {
        type: 'alphabetic',
        method: 'none' 
      }
    });
    if(name.active) dispatch(getVideogames())
  }

  useEffect(() => {
    if (genres.length < 1) dispatch(getGenres());
  }, []);

  return (
    <>
      <SearchBar
        handleInputChange={handleInputChange}
        searchVideogame={searchVideogame}
        name = {name}
      />
      <div className={styles.checklist}>
        <ul>
          <Checkbox key={"LocalDB"} name={'LocalDB'} action={handleLocalCheckbox} target={'genres'} />
          {genres.length < 1 ? <Loading/> : (
            genres.map((genre) => {
              return <Checkbox key={genre.id} name={genre.name} action={handleCheckbox} target={'genres'} />
            })
          )}
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
      <div>
        <button onClick={() => handleReset()}>Reset Filter</button>
      </div>
    </>
  );
}
