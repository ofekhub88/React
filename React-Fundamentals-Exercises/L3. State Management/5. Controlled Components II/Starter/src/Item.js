const Item = ( {items}) => {
    return(
        <div key="ItemList">
          {items.map((item,i) =>{
           return (  <li key={i}> {item} </li> ) })
        }
        </div>
    )

}

export default  Item;


