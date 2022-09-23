import React, { useState } from "react";

type CategoriesProps = {
    value: number,
    onChangeCategory: (idx: number) => void
}
const titleValue = ['Все', 'Мясные', 'Вегетарианская', 'Гриль', 'Острые', 'Закрытые']

const Categories = () => {
  const [title, setTitle] = useState('Мясные')

  const trigerButton = (e) => {
    setTitle(e.target.innerText)
  }

    return (
        <div className="categories">
          <ul onClick={(e) => trigerButton(e)}>
            {titleValue.map((elem, id) => 
              <li key={id} className={title == elem ? "active" : ''} >{elem}</li>
            )}
          </ul>
      </div>
    )
}

export default Categories