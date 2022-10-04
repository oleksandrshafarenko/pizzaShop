import './scss/app.scss'
import Headers from './components/Headers';
import Sort from './components/Sort';
import Categories from './components/Categories';
import PizzaBlock from './components/PizzaBlock';
import { createContext, useEffect, useState } from 'react';
import Skeleton from './components/Skeleton';
import Home from './pages/Home';
import NotFound from './components/NotFoundBlock';
import { Route, Routes } from 'react-router-dom';
import Card from './pages/Card';

export const SearchContext = createContext()

function App() {
  const [findPizzaValue, setFindPizzaValue] = useState('')

  return (
    <div className="App">
      <div className="wrapper">
        <SearchContext.Provider value={{ findPizzaValue, setFindPizzaValue }}>
          <Headers/>
          <div className="content">
            <Routes>
              <Route path='/' element={<Home/>} />
              <Route path='*' element={<Card />} />
            </Routes>
          </div>
        </SearchContext.Provider>
      </div>
    </div>

  );
}

export default App;
