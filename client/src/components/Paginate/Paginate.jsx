import React, {useState} from 'react'
import InfiniteScroll from 'react-infinite-scroll-component';

const Paginate = () => {
    const [page, setPage] = useState(1);
    const [arr, setArr] = useState(["hola", "lucas", "sdsad", "sdasdas", "adsadsa","hola", "lucas", "sdsad", "HOLALUCAS", "sdasdas", "adsadsa","hola", "lucas", "sdsad", "sdasdas", "adsadsa","hola", "lucas", "sdsad", "sdasdas", "adsadsa", "hola", "lucas", "sdsad", "sdasdas", "adsadsa", "hola", "lucas", "sdsad", "sdasdas", "adsadsa", "hola", "lucas", "sdsad", "sdasdas", "adsadsa", "hola", "lucas", "sdsad", "sdasdas", "adsadsa", "hola", "lucas", "sdsad", "HOLACHE", "sdasdas", "adsadsa", "hola", "lucas", "sdsad", "sdasdas", "adsadsa", "hola", "lucas", "sdsad", "sdasdas", "adsadsa", "hola", "lucas", "sdsad", "sdasdas", "adsadsa", "hola", "lucas", "sdsad", "sdasdas", "adsadsa", "hola", "lucas", "sdsad", "sdasdas", "adsadsa"]);
    const [hasMore, setHasMore] = useState(true);

    const fetchMoreData = () => {
        if(arr.length<200){
            setTimeout(() => {
                setArr(arr.concat(Array.from({length: 20})))
            }, 500);
        } else {
            setHasMore(false);
        }
    }


  return (
    <InfiniteScroll dataLength={arr.length} next={fetchMoreData} hasMore={hasMore} loader={<h4>Loading...</h4>} endMessage={<p>Se Termino TODO</p>}>
        {
            arr.map(el => <p className='text-8xl'>{el}</p>)
        }
    </InfiniteScroll>
  )
}

export default Paginate