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
  let [lastSearch,setLast] = useState('')
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
      }
      return
    }
    if(lastSearch !== name.name) dispatch(searchVideogames(name.name));
    setLast(name.name)
    setName({
      ...name,
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
    if(filters.genres.length > 0){
      filters.genres.forEach(genre => {
        console.log(genre)
        document.querySelector(`input[name='${genre}']`).checked = false
      })
    }
    if(filters.onlyLocal) {
      document.querySelector(`input[name='LocalDB']`).checked = false
    }
    if(filters.order.method !== 'none') {
      document.querySelector(`select[name='order']`).options.selectedIndex = 0
    }
    setFilters( {
      onlyLocal : false,
      genres : [],
      order : {
        type: 'alphabetic',
        method: 'none' 
      }
    });
    if(name.active) dispatch(getVideogames())
    setName({
      ...name,
      name: '',
      active: false
    });
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
      <div className={'button_container'}>
        <button className={`button_list  ${styles.button}`} onClick={() => handleReset()}>
          <div className={'button_list_item'}>Reset Filter</div>
        </button>
      </div>
    </>
  );
}
