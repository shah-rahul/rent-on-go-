import React from 'react';
import './singleItem.css';
function SingleItem({item}) {
    return (  
        console.log(item['item']),
    <div className="singleItem "> 
      <img className='thumbnail' src={item['image'] } ></img>
      <div className='wrapper'>
      <h1 className='header truncate'>{item['name']}</h1>
      <div className="flex flex-row justify-between">
        <div > {item['price']} </div>  
        <div > {item['price']} </div> 
      </div>
      </div>
    </div>  

      );
}
export default SingleItem;



