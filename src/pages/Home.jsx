import React, { useState, useEffect ,  useContext }  from "react";
import Categories from "../components/Categories";
import Sort from "../components/Sort";
import Skeleton from "../components/Skeleton";
import PizzaBlock from "../components/PizzaBlock";
import Pagination from "../components/Pagination";
import { SearchContext } from "../App";

const Home = () => {
    const [pizzaItem, setPizzaItem] = useState([])
    const [isLoading, setIsLoading] = useState(true)
    const [sortItem, setSortItem] = useState({ name: 'популярності', sortProperyt: 'rating' })
    const [categorisItem, setCategorisItem] = useState(0)
    const [pizzaTotalPages, setPizzaTotalPages] = useState(1)
    const [isLoadingPage, setIsLoadingPage] = useState(false)
    const [selectPage, setSelectPage] = useState(1)
    const [AllPizzaItems, setAllPizzaItems] = useState()
    const {findPizzaValue} = useContext(SearchContext)

    const skeletons = [...new Array(6)].map((_, id) => <Skeleton key={id} />)
    const renderPizza = pizzaItem.filter(obj => obj.title.toUpperCase().includes(findPizzaValue.toUpperCase()))
        .map((elem, id) => <PizzaBlock key={elem.imageUrl} {...elem} />)

    const howManyPage = (number) => {
        const itemInPage = 4
        const result = Math.ceil(number / itemInPage)
        return setPizzaTotalPages(result)
    }

    useEffect(() => {
        fetch(`https://6317b24bece2736550b95b29.mockapi.io/pizza`
        )
            .then(resp => resp.json())
            .then(json => {
                json.length > 1 &&  howManyPage(json.length);
                setIsLoadingPage(true)
            })
    }, [])

  

    useEffect(() => {
        setIsLoading(true)
        const order = sortItem.sortProperyt.includes('-') ? 'asc' : 'desc'
        const sortBy = sortItem.sortProperyt.replace('-', '')
        const category = categorisItem > 0 ? `category=${categorisItem}` : ''

        fetch(`https://6317b24bece2736550b95b29.mockapi.io/pizza?page=${selectPage}&limit=4&${category}&sortBy=${sortBy}&order=${order}`
        )
            .then(resp => resp.json())
            .then(json => {
                setPizzaItem(json);
                setIsLoading(false)
            })
        window.scrollTo(0, 0)
    }, [categorisItem, sortItem, selectPage, findPizzaValue])

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
                {isLoadingPage && <Pagination valuePdge={selectPage} onClickSelectPage={(number) => setSelectPage(number)} pageQuantity={pizzaTotalPages}/>}
            </div>
        </>
    )
}

export default Home