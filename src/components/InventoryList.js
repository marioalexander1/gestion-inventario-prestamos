import React, { useState } from 'react';

function InventoryList() {
  const [items, setItems] = useState([
    { id: 1, name: 'Laptop', quantity: 10, category: 'Electrónica' },
    { id: 2, name: 'Libro', quantity: 5, category: 'Educación' }
  ]);

  const addItem = (newItem) => {
    setItems([...items, { ...newItem, id: items.length + 1 }]);
  };

  return (
    <div>
      <h2>Inventario</h2>
      <ul>
        {items.map(item => (
          <li key={item.id}>
            {item.name} - Cantidad: {item.quantity} - Categoría: {item.category}
          </li>
        ))}
      </ul>
      {/* Aquí puedes agregar un formulario para añadir ítems */}
    </div>
  );
}

export default InventoryList;