import React, {useState} from 'react';

function Pagination(props) {
    const { articlesCount, onChangePage, page } = props;
    const [wantedPage, setWantedPage] = useState();

    const handleChange = (event) => {
        setWantedPage(event.target.value)
        
    }

    const searchPage = (event) => {
        event.preventDefault();
        let num =  parseInt(wantedPage);
        if(num > totalPages.length) {
            return
        }
        onChangePage(num);
        event.target.reset()
    }
    let totalPages = [];
    if(articlesCount) {
        for (let i = 0; i < articlesCount + 9; i+=10) {
            if(i > 0) {
                totalPages.push(i / 10)
            }
        }
    }
    if(totalPages.length < 2) {
        return null
    }
    if (totalPages.length > 10) {
        return (
            <nav>
                <ul className="pagination">
                    <li className={"page-item"}>
                        <a className="page-link" onClick={() => onChangePage(page - 1)}>PREV</a>
                    </li>
                      {totalPages.map(item => {
                        if (item === 1 || item === page || item === page + 1 || item === page -1 || item === totalPages.length || item === totalPages.length - 1) {
                            return (
                                <li key={item} className={item === page ? "page-item active" : "page-item"}>
                                <a className="page-link" onClick={() => onChangePage(item)}>{item}</a>
                                </li>
                            )
                        }
                        if (item === page + 2 || item === page - 2) {
                            return (
                                <li key={item} className={item === page ? "page-item active" : "page-item"}>
                                <a className="page-link" onClick={() => onChangePage(item)}>...</a>
                                </li>
                            )
                        }
                    })}
                    <li className={"page-item"}>
                        <a className="page-link" onClick={() => onChangePage(page + 1)}>NEXT</a>
                    </li>
                    <li className={"page-item"}>
                        <a className="page-link" >  
                        <form onSubmit={searchPage} >
                        <i className="ion-search" ></i>  
                        <input onChange={handleChange} 
                            style={{ 'marginLeft' : '5px', 'height': '20px', 'width' : '50px', 'border' : 'none', 'borderBottom' : '1px solid #5cb85c' }}/>
                        </form>
                        </a>
                    </li>
                </ul>
                </nav>
        )
    }
    return (
            <nav>
                <ul className="pagination">
                    {totalPages.map(item => {
                        return (
                            <li key={item} className={item === page ? "page-item active" : "page-item"}>
                            <a className="page-link" onClick={() => onChangePage(item)}>{item}</a>
                            </li>
                        )
                    })}
                </ul>
                </nav>
            
    )
}

export default Pagination;