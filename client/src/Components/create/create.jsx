import { useEffect,useState  } from "react";
import { useDispatch,useSelector } from "react-redux"
import { createVideogame, getGenres } from "../../Redux/actions"
import GenresList from "../genreslist/GenresList"
import styles from './create.module.css'

export default function Create(){
  const platforms = ['PC','PlayStation','Xbox','Nintendo','iOS','Android','macOS','Linux']
  const [error,setError] = useState({})
  const [input,setInput] = useState({
    name: "",
    description: "",
    released: "",
    rating: 0,
    platforms: [],
    genres: []
})
let genres = useSelector(state => state.genres)

const handleCheckbox = function(e,type) {
  if(type === 'genres'){
    if(e.checked){
      setInput({
        ...input,
        [type]: [...input[type], {name : e.name}]
      });
    } else {
      setInput({
        ...input,
        [type]: input[type].filter(name => name.name != e.name)
      });
    }
  } else {
    if(e.checked){
      setInput({
        ...input,
        [type]: [...input[type], e.name]
      });
    } else {
      setInput({
        ...input,
        [type]: input[type].filter(name => name != e.name)
      });
    }
  }
}

const dispatch = useDispatch()

const validate = (input) => {
  let error = {}
  if(!input.name){
    error.name = 'Name required'
  } else if (!/^[A-Z][\s\w]{1,35}$/.test(input.name)) {
    error.name = 'Name must begin with a capital letter, have no more than 35 characters and no symbols'
  }

  if(!input.description){
    error.description = 'Description required'
  } else if (!/^[A-Z][\s\w]{1,300}$/.test(input.description)) {
    error.description = 'Description must begin with a capital letter, have no more than 300 characters and no symbols'
  }

  if(!input.released){
    error.released = 'Released is required'
  } else if (!/^\d{4}\-(0[1-9]|1[012])\-(0[1-9]|[12][0-9]|3[01])$/.test(input.released)) {
    error.released = 'Released must be a valid date. Format: yyyy-mm-dd'
  }

  if(!input.rating){
    error.rating = 'Rating is required'
  } else if (!/(?<!\w|\d\.|\W)([0-4](\.\d{1,2})?|5(\.0{1,2})?)(?!\d|\.\d|\w|\W)/.test(input.rating)) {
    error.rating = 'Rating must be between 0.00 to 5.00'
  }
  return error
}

const handleSubmit = function(e) {
    e.preventDefault();
    console.log(input)
    dispatch(createVideogame(input))
  }

const handleInputChange = function(e) {
    setInput({
      ...input,
      [e.target.name]: e.target.value
    });
  }

  useEffect(()=>{
    if(genres.length < 1) dispatch(getGenres())
  },[])

  useEffect(()=>{
    setError(validate(input))
  },[input])

return (
    <div className={styles.container}>
        <form onSubmit={(e) => handleSubmit(e)} className={styles.form}>
            <fieldset className={styles.name}>
              <label>Name: </label>
              <input type="text" onChange={(e) => handleInputChange(e)} name='name' /> {error.name && <p>{error.name}</p>}
            </fieldset>
            <fieldset className={styles.released}>
              <label>released: </label>
              <input onChange={(e) => handleInputChange(e)} type="text" name='released' /> {error.released && <p>{error.released}</p>}
            </fieldset>
            <fieldset className={styles.rating}>
              <label>rating: </label>
              <input onChange={(e) => handleInputChange(e)} type="text" name='rating' /> {error.rating && <p>{error.rating}</p>}
            </fieldset>
            <fieldset className={styles.description}>
              <label>description: </label>
              <textarea onChange={(e) => handleInputChange(e)} type="text" name='description' /> {error.description && <p>{error.description}</p>}
            </fieldset>
            <fieldset className={styles.checkbox}>
              <fieldset className={styles.genre}>
                <legend>Genres</legend>
                  <GenresList
                    handleCheckbox = {handleCheckbox}
                    genres = {genres}
                  />
              </fieldset>
              <fieldset className={styles.platform}> 
                <legend>Plataforms</legend>
                  {platforms.map((platform,index) => {
                    return (
                      <li key={index}>
                        <input type="checkbox" name={platform} id={index} onChange={(e) => handleCheckbox(e.target,'platforms')}/>
                        <label id={index}>{platform}</label>
                      </li>
                      )
                  })}
              </fieldset>
            </fieldset>
            <fieldset className={styles.button}>
              <button type='submit' disabled={(error.name || error.description || error.released || error.rating)}>Create</button>
            </fieldset>
        </form>
    </div>
);
}