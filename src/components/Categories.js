import React, { useState } from "react";

type CategoriesProps = {
    value: number,
    onChangeCategory: (idx: number) => void
}
const titleValue = ['Всі', 'Мясні', 'Вегетаріанскі', 'Гриль', 'Гострі', 'Закриті']

const Categories = ({value, onClickCategoris}) => {
  

    return (
        <div className="categories">
          <ul >
            {titleValue.map((elem, id) => 
              <li 
                key={id} 
                onClick={() => onClickCategoris(id)}
                className={value == id ? "active" : ''}
                >
                  {elem}
              </li>
            )}
          </ul>
      </div>
    )
}

export default Categories