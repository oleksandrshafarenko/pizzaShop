import React, { useState, useEffect } from "react";
import Categories from "../components/Categories";
import Sort from "../components/Sort";
import Skeleton from "../components/Skeleton";
import PizzaBlock from "../components/PizzaBlock";

const Home = ({ findPizza }) => {
    const [pizzaItem, setPizzaItem] = useState([])
    const [isLoading, setIsLoading] = useState(true)
    const [sortItem, setSortItem] = useState({ name: 'популярності', sortProperyt: 'rating' })
    const [categorisItem, setCategorisItem] = useState(0)


    const skeletons = [...new Array(6)].map((_, id) => <Skeleton key={id} />)
    const renderPizza = pizzaItem.filter(obj => obj.title.toUpperCase().includes(findPizza.toUpperCase()))
        .map((elem, id) => <PizzaBlock key={elem.imageUrl} {...elem} />)

    useEffect(() => {
        setIsLoading(true)
        const order = sortItem.sortProperyt.includes('-') ? 'asc' : 'desc'
        const sortBy = sortItem.sortProperyt.replace('-', '')
        const category = categorisItem > 0 ? `category=${categorisItem}` : ''

        fetch(`https://6317b24bece2736550b95b29.mockapi.io/pizza?${category}&sortBy=${sortBy}&order=${order}`
        )
            .then(resp => resp.json())
            .then(json => {
                setPizzaItem(json);
                setIsLoading(false)
            })
        window.scrollTo(0, 0)
    }, [categorisItem, sortItem])

    return (
        <>
            <div className="container">
                <div className="content__top">
                    <Categories value={categorisItem} onClickCategoris={(value) => setCategorisItem(value)} />
                    <Sort value={sortItem} onClickSort={(value) => setSortItem(value)} />
                </div>
                <h2 className="content__title">Всі піци</h2>
                <div className="content__items">
                    {isLoading ? skeletons : renderPizza}
                </div>
            </div>
        </>
    )
}

export default Home