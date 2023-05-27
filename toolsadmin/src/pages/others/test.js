
import React, { useState, useEffect } from 'react';

const test = () => {
  const [chosenItem, setChosenItem] = useState('');
  const [contextMenuStyle, setContextMenuStyle] = useState({ display: 'none' });

  const handleContextMenu = (event) => {
    event.preventDefault();

    const { clientX, clientY } = event;
    setContextMenuStyle({ top: `${clientY}px`, left: `${clientX}px`, display: 'block' });
    setChosenItem(event.target.id);
  };

  const addToFavorites = () => {
    console.log(`Added ${chosenItem} to favorites`);
  };

  const removeFromFavorites = () => {
    console.log(`Removed ${chosenItem} from favorites`);
  };

  const handleClick = () => {
    setContextMenuStyle({ display: 'none' });
  };

  useEffect(() => {
    document.addEventListener('click', handleClick);

    return () => {
      document.removeEventListener('click', handleClick);
    };
  }, []);

  return (
    <div>
      <div
        id="contextMenu"
        style={{
          ...contextMenuStyle,
          position: 'absolute',
          background: '#fff',
          border: '1px solid #ccc',
          padding: '5px',
        }}
      >
        <div onClick={addToFavorites}>Add to Favorites</div>
        <div onClick={removeFromFavorites}>Remove from Favorites</div>
      </div>

      <div
        id="item1"
        onContextMenu={handleContextMenu}
        style={{ background: '#ccc', padding: '10px' }}
      >
        Item 1
      </div>
      <div
        id="item2"
        onContextMenu={handleContextMenu}
        style={{ background: '#ccc', padding: '10px' }}
      >
        Item 2
      </div>
      <div
        id="item3"
        onContextMenu={handleContextMenu}
        style={{ background: '#ccc', padding: '10px' }}
      >
        Item 3
      </div>
    </div>
  );
};

export  default test