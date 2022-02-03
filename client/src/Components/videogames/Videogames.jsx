import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getVideogames } from "../../Redux/actions";
import Videogame from "../videogame/Videogame";
import Sidebar from "../sidebar/sidebar";
import Pagination from "../pagination/pagination";
import { useState } from "react";
import styles from "./videogames.module.css";
import Loading from "../loading/loading";

export default function Videogames() {
  let videogames = useSelector((state) => state.videogames);
  // let filters = useSelector((state) => state.filters);

  let isLoading = useSelector((state) => state.isLoading);
  let [page, setPage] = useState(1);
  const videogamesForPage = 15
  let [filters, setFilters] = useState({
    onlyLocal : false,
    genres : [],
    order : {
      type: 'alphabetic',
      method: 'none' 
    }
  });
  let dispatch = useDispatch();

  useEffect(() => {
    dispatch(getVideogames());
  }, []);

  useEffect(() => {
    setPage(1);
  }, [filters]);

  let listOfGames = (videogames) => {
    let list = videogames.filter((videogame) => {
      let hasAllGenres = true;
      if (filters.genres.length > 0) {
        hasAllGenres = filters.genres.every((genre) =>
          videogame.genres.find((element) => element.name == genre)
        );
      }
      if (filters.onlyLocal) {
        return isNaN(videogame.id) && hasAllGenres;
      }
      return hasAllGenres;
    });

    if (filters.order.method !== "none") {
      switch (filters.order.type) {
        case "alphabetic":
          if (filters.order.method === "asc") {
            list = list.sort((a, b) => {
              if (a.name.toLowerCase() < b.name.toLowerCase()) return -1;
              if (a.name.toLowerCase() > b.name.toLowerCase()) return 1;
              return 0;
            });
          } else {
            list = list.sort((a, b) => {
              if (a.name.toLowerCase() < b.name.toLowerCase()) return 1;
              if (a.name.toLowerCase() > b.name.toLowerCase()) return -1;
              return 0;
            });
          }
          break;
        case "rating":
          if (filters.order.method === "asc") {
            list = list.sort((a, b) => a.rating - b.rating);
          } else {
            list = list.sort((a, b) => b.rating - a.rating);
          }
          break;
        default:
          break;
      }
    }
    return list;
  };

  let paginate = (number) => {
    setPage(number);
  };

  let games = listOfGames(videogames);
  let indexOfFirstVideogame = (page - 1) * videogamesForPage;
  let indexOfLastVideogame = indexOfFirstVideogame + videogamesForPage;
  let paginatedVideogames = games.slice(
    indexOfFirstVideogame,
    indexOfLastVideogame
  );

  return (
    <div className={styles.container}>
      <div className={styles.sidebar}>
        <Sidebar filters={filters} setFilters={setFilters}/>
      </div>
      <div className={styles.games}>
        {isLoading ? (
          <Loading />
        ) : (
          <>
            {paginatedVideogames.length < 1 ? 'Nothing here dude' : null}
            <div className={styles.videogameList}>
              {paginatedVideogames.map((videogame) => {
                return (
                  <Videogame
                    videogame={videogame}
                    key={videogame.id ? videogame.id : videogame.Id}
                  />
                );
              })}
            </div>
            {games.length > 15 ? (
            <div className={styles.pagination}>
              <Pagination
                totalVideogames={games.length}
                videogamesForPage={videogamesForPage}
                paginate={paginate}
              />
            </div>) : null
            }
          </>
        )}
      </div>
    </div>
  );
}
