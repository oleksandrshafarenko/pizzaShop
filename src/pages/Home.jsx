import React, { useState, useEffect ,  useContext }  from "react";
import axios from "axios"
import Categories from "../components/Categories";
import Sort from "../components/Sort";
import Skeleton from "../components/Skeleton";
import PizzaBlock from "../components/PizzaBlock";
import Pagination from "../components/Pagination";
import { SearchContext } from "../App";
import { setCategory, setSort, setCurrentPage } from "../redux/slices/filterSlice";
import { useSelector, useDispatch } from "react-redux";

const Home = () => {
    const [pizzaItem, setPizzaItem] = useState([])
    const [isLoading, setIsLoading] = useState(true)
    const [pizzaTotalPages, setPizzaTotalPages] = useState(1)
    const [isLoadingPage, setIsLoadingPage] = useState(false)
    const [selectPage, setSelectPage] = useState(1)
    const [AllPizzaItems, setAllPizzaItems] = useState()
    const {findPizzaValue} = useContext(SearchContext)

    const dispatch = useDispatch()
    const {categoriItem, sort} = useSelector((state) => state.filter)
    const sortItem = sort
    const {currentPage} = useSelector((state) => state.filter)

    const skeletons = [...new Array(6)].map((_, id) => <Skeleton key={id} />)
    const renderPizza = pizzaItem.filter(obj => obj.title.toUpperCase().includes(findPizzaValue.toUpperCase()))
        .map((elem, id) => <PizzaBlock key={elem.imageUrl} {...elem} />)
        
    const howManyPage = (number) => {
        const itemInPage = 4
        const result = Math.ceil(number / itemInPage)
        return setPizzaTotalPages(result)
    }

    const onChangePage = (number) => {
        console.log(number) 
       dispatch(setCurrentPage(number))
       
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
        const category = categoriItem > 0 ? `category=${categoriItem}` : ''

        axios.get(`https://6317b24bece2736550b95b29.mockapi.io/pizza?page=${currentPage}&limit=4&${category}&sortBy=${sortBy}&order=${order}`)
        .then(resp => {
            setPizzaItem(resp.data);
                setIsLoading(false)
        })
        /*fetch(`https://6317b24bece2736550b95b29.mockapi.io/pizza?page=${selectPage}&limit=4&${category}&sortBy=${sortBy}&order=${order}`
        )
            .then(resp => resp.json())
            .then(json => {
                setPizzaItem(json);
                setIsLoading(false)
            })*/
        window.scrollTo(0, 0)
    }, [categoriItem, sortItem, currentPage, findPizzaValue])

    return (
        <>
            <div className="container">
                <div className="content__top">
                    <Categories value={categoriItem} onClickCategoris={(value) => dispatch(setCategory(value))} />
                    <Sort value={sortItem} onClickSort={(value) => dispatch(setSort(value))} />
                </div>
                <h2 className="content__title">Всі піци</h2>
                <div className="content__items">
                    {isLoading ? skeletons : renderPizza}
                </div>
                {isLoadingPage && 
                    <Pagination 
                        valuePage={currentPage} 
                        onClickSelectPage={(num) => onChangePage(num)}  
                        pageQuantity={pizzaTotalPages}/>}
            </div>
        </>
    )
}

export default Home