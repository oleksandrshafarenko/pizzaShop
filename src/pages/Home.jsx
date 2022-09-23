import React, { useState, useEffect} from "react";
import Categories from "../components/Categories";
import Sort from "../components/Sort";
import Skeleton from "../components/Skeleton";
import PizzaBlock from "../components/PizzaBlock";

const Home = () => {
    const [pizzaItem, setPizzaItem] = useState([])
    const [isLoading, setIsLoading] = useState(true)
    const [sortItem, setSortItem] = useState('популярности')
  
    useEffect(() => {
      fetch('https://6317b24bece2736550b95b29.mockapi.io/pizza')
      .then(resp =>resp.json())
      .then(json=> {
        setPizzaItem(json);
        setIsLoading(false)})
        window.scrollTo(0, 0)
    }, [])
    return (
        <>
        <div className="container">
            <div className="content__top">
                <Categories />
                <Sort value={sortItem} onClickSort={(value) => setSortItem(value)}/>
            </div>
            <h2 className="content__title">Все пиццы</h2>
            <div className="content__items">
                {
                    isLoading ? [...new Array(6)].map((_, id) => <Skeleton key={id} />) : pizzaItem.map((elem, id) => <PizzaBlock key={elem.imageUrl} />)
                }
            </div>
            </div>
        </>
    )
}
export default Home