import React, { useState, useRef, useEffect } from "react";

export const sortItems = [
    {name:'популярності (DESC)', sortProperyt: 'rating'},
    {name:'популярності (ASC)', sortProperyt: '-rating'},
    {name:'ціні (DESC)', sortProperyt: 'price'}, 
    {name:'ціні (ASC)', sortProperyt: '-price'}, 
    {name: 'алфавіту (DESC)', sortProperyt: 'title'},
    {name: 'алфавіту (ASC)', sortProperyt: '-title'}]

const Sort = ({value, onClickSort}) => {
    const [activeSort, setActiveSort] = useState(true)
    const sortRef = useRef()

    useState(() => {
        console.log('mount')
        const handleClick = (event) => {
            if(!event.path.includes(sortRef.current)){
                setActiveSort(true)
                console.log('click')
            }
        }

        document.body.addEventListener('click', handleClick)

        return () => document.body.removeEventListener('click', handleClick)
    }, [])
    return (
        <div ref={sortRef} onClick={() => setActiveSort(!activeSort)} className="sort">
            <div className="sort__label">
                <svg
                    width="10"
                    height="6"
                    viewBox="0 0 10 6"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <path
                        d="M10 5C10 5.16927 9.93815 5.31576 9.81445 5.43945C9.69075 5.56315 9.54427 5.625 9.375 5.625H0.625C0.455729 5.625 0.309245 5.56315 0.185547 5.43945C0.061849 5.31576 0 5.16927 0 5C0 4.83073 0.061849 4.68424 0.185547 4.56055L4.56055 0.185547C4.68424 0.061849 4.83073 0 5 0C5.16927 0 5.31576 0.061849 5.43945 0.185547L9.81445 4.56055C9.93815 4.68424 10 4.83073 10 5Z"
                        fill="#2C2C2C"
                    />
                </svg>
                <b>Сортувати по:</b>
                <span>{value.name }</span>
            </div>
            <div
                className='sort__popup'
                style={activeSort ? { display: 'none' } : null}
            >
                <ul>
                    {sortItems.map((obj, id) =>
                        <li onClick={() => onClickSort(obj)} 
                                key={id} 
                                className={value.sortProperyt == obj.sortProperyt ? "active" : ''
                            }>
                            {obj.name}
                        </li>
                    )}
                </ul>
            </div>
        </div>
    )
}

export default Sort