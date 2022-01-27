import './App.css';
import { Route,Routes,Navigate } from 'react-router-dom';
import Create from './Components/create/create';
import Detail from './Components/detail/detail';
import Index from './Components/index/index';
import Videogames from './Components/videogames/Videogames';
import Navbar from './Components/navbar/navbar'

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path={'/'} element={<Index/>}/>
        <Route path={'videogames'} element={<Navbar/>}>
          <Route index element={<Videogames/>}/>
          <Route path={':id'} element={<Detail/>}/>
          <Route path={'create'} element={<Create/>}/>
        </Route>
        <Route path={'*'} element={<Navigate replace to={'/'}/>}/>
      </Routes>
    </div>
  );
}

export default App;
