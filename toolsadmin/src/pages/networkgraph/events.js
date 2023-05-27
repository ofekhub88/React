





export  const onClickNode = (nodeId, node) => {
    alert('Clicked node '+node.id);
};

export const  onRightClickNode = (e, node,setDialog) =>  { 
    e.preventDefault();     
    setDialog({open: true,title: "select option",position: {top: e.clientY, left: e.clientX}})
  }


