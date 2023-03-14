import Item from "./Item";


const ListOfItems = ( {items}) => {
    
    return(
        <div className="ItemList">
             <ol><Item  items={items}  /> </ol>
        </div>
    )



}

export default  ListOfItems;