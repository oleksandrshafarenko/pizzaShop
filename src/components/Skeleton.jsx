import React from 'react'
import ContentLoader from "react-content-loader"

function Skeleton(props) {
    return (
        <div style ={{paddingLeft: "20px"}}>

        
        <ContentLoader
            className='pizza-block'
            speed={2}
            width={280}
            height={465}
            viewBox="0 0 280 465"
            backgroundColor="#f3f3f3"
            foregroundColor="#ecebeb"
            {...props}
        >
            <rect x="20" y="305" rx="3" ry="3" width="280" height="0" />
            <rect x="20" y="316" rx="3" ry="3" width="280" height="0" />
            <circle cx="160" cy="120" r="120" />
            <rect x="20" y="270" rx="10" ry="10" width="280" height="25" />
            <rect x="20" y="310" rx="16" ry="16" width="280" height="88" />
            <rect x="20" y="430" rx="10" ry="10" width="91" height="30" />
            <rect x="145" y="420" rx="26" ry="26" width="152" height="45" />
        </ContentLoader>
        </div>
    )

  
}

export default Skeleton