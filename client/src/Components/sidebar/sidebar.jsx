import { useEffect } from "react"
import { useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { getGenres, searchVideogames, updateFilter } from "../../Redux/actions"

export default function Sidebar(){
  let [name,setName] = useState()
  let genres = useSelector(state => state.genres)
  let globalFilter = useSelector(state => state.filters)
  // let [filters,setFilters] = useState(globalFilter)
  const dispatch = useDispatch()

  let searchVideogame = () => {
    dispatch(searchVideogames(name.name))
  }

  const handleInputChange = function(e) {
    setName({
      ...name,
      name: e.target.value // cambie
    });
  }

  const handleCheckbox = function(e) {
    if(e.checked){
      // setFilters({
      //   ...filters,
      //   genres: [...filters.genres, e.name]
      // });
      globalFilter.genres.push(e.name)
    } else {
      // setFilters({
      //   ...filters,
      //   genres: filters.genres.filter(name => name != e.name)
      // });
      globalFilter.genres = globalFilter.genres.filter(name => name != e.name)
    }

  }

  const handleSelect = function(e) {
      setFilters({
        ...filters,
        order : {type : e.name,
                method : e.value}
      });
  }

  const handleLocalCheckbox = function(e) {
    setFilters({
      ...filters,
      onlyLocal: e.checked
    });
}

  useEffect(()=>{
    dispatch(getGenres())
    console.log(filters)
    console.log(globalFilter)
  },[])

  useEffect(()=>{
    console.log(filters)
    console.log(globalFilter)
    // dispatch(updateFilter(filters))
  },[filters])

  return <>
  <div className="searchBar">
    <input type="text" onChange={(e) => handleInputChange(e)} name='name' placeholder="Filter"/>
    <button onClick={searchVideogame}>Search</button>
  </div>
  <div className="genresList" >
    <ul>
      <li key='LocalDB'>
        <label id='LocalDB'>LocalDB</label>
        <input type="checkbox" name='LocalDB' id='LocalDB' onChange={(e) => handleLocalCheckbox(e.target)}/>
      </li>
      {genres.map(genre => {
        return (
          <li key={genre.id}>
          <label id={genre.id}>{genre.name}</label>
          <input type="checkbox" name={genre.name} id={genre.id} onChange={(e) => handleCheckbox(e.target)}/>
          </li>
          )
      })}
    </ul>
  </div>
  <div onChange={(e) => handleSelect(e.target)}>
    <select name="order" id="order">
      <option value="none">Select a filter/None</option>
      <option value="asc">asc</option>
      <option value="desc">desc</option>
    </select>
    <select name="rating" id="rating">
      <option hidden value="">Rating</option>
      <option value="asc">asc</option>
      <option value="desc">desc</option>
    </select>
  </div>
  </>
}