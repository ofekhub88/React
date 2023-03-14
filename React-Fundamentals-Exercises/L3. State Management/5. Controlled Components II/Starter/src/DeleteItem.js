
const DeleteItem = ({items,OnedeleteLastItem}) => {

    return (
<button onClick={OnedeleteLastItem} disabled={items.length === 0}>
        Delete Last Item
      </button>)

}
export default DeleteItem