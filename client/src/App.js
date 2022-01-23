import './App.css';
import { Route,Routes,Navigate } from 'react-router-dom';
import Create from './Components/create/create';
import Detail from './Components/detail/detail';
import Index from './Components/index/index';
import Videogames from './Components/videogames/Videogames';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path={'/'} element={<Index/>}/>
        <Route exact path={'/videogames'} element={<Videogames/>}/>
        <Route path={'/videogames/:id'} element={<Detail/>}/>
        <Route path={'/videogames/create'} element={<Create/>}/>
        <Route path={'*'} element={<Navigate replace to={'/'}/>}/>
      </Routes>
    </div>
  );
}

export default App;
