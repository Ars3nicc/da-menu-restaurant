// src/components/MenuItemForm/index.js
import React, { useState, useEffect } from 'react';
import { getDatabase, ref, onValue, push, update, remove } from 'firebase/database';
import { database } from '../../firebaseConfig';
import './index.css';

const MenuItemForm = () => {
  const [menuItems, setMenuItems] = useState([]);
  const [category, setCategory] = useState('');
  const [name, setName] = useState('');
  const [options, setOptions] = useState('');
  const [price, setPrice] = useState('');
  const [cost, setCost] = useState('');
  const [stock, setStock] = useState('');
  const [editId, setEditId] = useState(null);

  useEffect(() => {
    const menuRef = ref(database, 'menu');
    onValue(menuRef, (snapshot) => {
      const items = snapshot.val();
      const menuList = [];
      for (let id in items) {
        menuList.push({ id, ...items[id] });
      }
      setMenuItems(menuList);
    });
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    const menuRef = ref(database, 'menu');
    const item = {
      category,
      name,
      options,
      price,
      cost,
      stock
    };

    if (editId) {
      const itemRef = ref(database, `menu/${editId}`);
      update(itemRef, item);
      setEditId(null);
    } else {
      push(menuRef, item);
    }

    setCategory('');
    setName('');
    setOptions('');
    setPrice('');
    setCost('');
    setStock('');
  };

  const handleEdit = (item) => {
    setCategory(item.category);
    setName(item.name);
    setOptions(item.options);
    setPrice(item.price);
    setCost(item.cost);
    setStock(item.stock);
    setEditId(item.id);
  };

  const handleDelete = (id) => {
    const itemRef = ref(database, `menu/${id}`);
    remove(itemRef);
  };

  return (
    <div>
      <h1>Menu Items</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Category"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="Options (comma separated)"
          value={options}
          onChange={(e) => setOptions(e.target.value)}
        />
        <input
          type="number"
          placeholder="Price"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          required
        />
        <input
          type="number"
          placeholder="Cost"
          value={cost}
          onChange={(e) => setCost(e.target.value)}
          required
        />
        <input
          type="number"
          placeholder="Amount in Stock"
          value={stock}
          onChange={(e) => setStock(e.target.value)}
          required
        />
        <button type="submit">{editId ? 'Update' : 'Add'} Item</button>
      </form>
      <ul>
        {menuItems.map((item) => (
          <li key={item.id}>
            <p>{item.category} - {item.name} - {item.options} - {item.price} - {item.cost} - {item.stock}</p>
            <button onClick={() => handleEdit(item)}>Edit</button>
            <button onClick={() => handleDelete(item.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default MenuItemForm;
