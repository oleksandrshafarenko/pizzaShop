import React, { useState, useEffect ,  useContext, useRef }  from "react";
import axios from "axios"
import Categories from "../components/Categories";
import Sort, { sortItems } from "../components/Sort";
import Skeleton from "../components/Skeleton";
import PizzaBlock from "../components/PizzaBlock";
import Pagination from "../components/Pagination";
import { SearchContext } from "../App";
import { setCategory, setSort, setCurrentPage, setFilters } from "../redux/slices/filterSlice";
import { useSelector, useDispatch } from "react-redux";
import qs from 'qs'
import { useNavigate } from "react-router-dom";

const Home = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const isSearch = useRef(false)
    const isMounted = useRef(false)
    const [pizzaItem, setPizzaItem] = useState([])
    const [isLoading, setIsLoading] = useState(true)
    const [pizzaTotalPages, setPizzaTotalPages] = useState(1)
    const [isLoadingPage, setIsLoadingPage] = useState(false)
    const {findPizzaValue} = useContext(SearchContext)
    const itemInPage = 6
    const {categoriItem, sort} = useSelector((state) => state.filter)
    const sortItem = sort
    const {currentPage} = useSelector((state) => state.filter)

    const skeletons = [...new Array(itemInPage)].map((_, id) => <Skeleton key={id} />)
    const renderPizza = pizzaItem.filter(obj => obj.title.toUpperCase().includes(findPizzaValue.toUpperCase()))
        .map((elem, id) => <PizzaBlock key={elem.imageUrl} {...elem} />)
        
    const howManyPage = (number) => {
        const result = Math.ceil((number +2) / itemInPage)
        return setPizzaTotalPages(result)
    }

    const onChangePage = (number) => {
       dispatch(setCurrentPage(number))
    }

    const fetchPizzas = () => {
        setIsLoading(true)
        const order = sortItem.sortProperyt.includes('-') ? 'asc' : 'desc'
        const sortBy = sortItem.sortProperyt.replace('-', '')
        const category = categoriItem > 0 ? `category=${categoriItem}` : ''

        axios.get(`https://6317b24bece2736550b95b29.mockapi.io/pizza?page=${currentPage}&limit=${itemInPage}&${category}&sortBy=${sortBy}&order=${order}`)
        .then(resp => {
            setPizzaItem(resp.data);
            setIsLoading(false)
        })
        window.scrollTo(0, 0)
    }

//якщо перши рендер перевіряємо URL і зберігаємо редакс
    useEffect(() => {
        if(window.location.search){
            const params = qs.parse(window.location.search.substring(1))
            const sort = sortItems.find((obj) => obj.sortProperyt === params.sortItem.sortProperyt)
           dispatch(
                setFilters({
                    ...params, 
                    sort,
                })
            )
            isSearch.current = true
        }
    }, [])

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
        window.scrollTo(0, 0)

        if(!isSearch.current){
            fetchPizzas()
        }

       isSearch.current = false
    }, [categoriItem, sortItem, currentPage, findPizzaValue])

    useEffect(() => {
        if(isMounted.current){
            const queryString = qs.stringify({
                itemInPage, 
               categoriItem, sortItem, currentPage, findPizzaValue
           })
           navigate(`?${queryString}`)
        }
        isMounted.current = true
    },[categoriItem, sortItem, currentPage, findPizzaValue])

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