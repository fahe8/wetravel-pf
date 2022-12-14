import React from "react";


export default function Paginado({hotels,currentPage,setCurrentPage,search}){
    function nextPage(){
        if(currentPage <= hotels.length - 12 && hotels.filter(el=> el.name.includes(search)).length > currentPage + 12)
        // currentPage <= hotels.length - 12
        setCurrentPage(currentPage+12)
    }
    function prevPage(){
        if(currentPage > 0)
        setCurrentPage(currentPage-12)
    }
    return(
        <div>
        <button  onClick={prevPage}>Prev Page</button>
        <button  onClick={nextPage}>Next Page</button>
        </div>
    )
}