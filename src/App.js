import './scss/app.scss'
import Headers from './components/Headers';
import Sort from './components/Sort';
import Categories from './components/Categories';
import PizzaBlock from './components/PizzaBlock';
import { useEffect, useState } from 'react';
import Skeleton from './components/Skeleton';
import Home from './pages/Home';
import NotFound from './components/NotFoundBlock';
import { Route, Routes } from 'react-router-dom';
import Card from './pages/Card';

function App() {




  return (
    <div className="App">
          <div className="wrapper">
            <Headers/>
      <div className="content">
        
    <Routes>
      <Route path='/' element={<Home/>}/>
      <Route path='*' element={<Card/>}/>
    </Routes>
        </div>
      </div>
    </div>
    
  );
}

export default App;
