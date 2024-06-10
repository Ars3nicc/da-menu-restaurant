// src/components/MenuItemForm/index.js
import React, { useState, useEffect } from "react";
import {
  getDatabase,
  ref,
  onValue,
  push,
  update,
  remove,
} from "firebase/database";
import { database } from "../../firebaseConfig";
import './index.css'; // Assuming you have the Tailwind CSS included

const MenuItemForm = () => {
  const [menuItems, setMenuItems] = useState([]);
  const [category, setCategory] = useState("");
  const [name, setName] = useState("");
  const [options, setOptions] = useState("");
  const [price, setPrice] = useState("");
  const [cost, setCost] = useState("");
  const [stock, setStock] = useState("");
  const [editId, setEditId] = useState(null);

  useEffect(() => {
    const menuRef = ref(database, "menu");
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
    const menuRef = ref(database, "menu");
    const item = {
      category,
      name,
      options,
      price,
      cost,
      stock,
    };

    if (editId) {
      const itemRef = ref(database, `menu/${editId}`);
      update(itemRef, item);
      setEditId(null);
    } else {
      push(menuRef, item);
    }

    setCategory("");
    setName("");
    setOptions("");
    setPrice("");
    setCost("");
    setStock("");
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
    <div className="container mx-auto p-6 flex space-x-6">
      <div className="w-1/3 bg-white p-6 rounded shadow-lg">
        <h1 className="text-3xl font-bold mb-6 text-gray-800">Da' Menu Restaurant</h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            placeholder="Category"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="input-field border-2 border-blue-400 rounded p-2 w-full"
            required
          />
          <input
            type="text"
            placeholder="Order Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="input-field border-2 border-blue-400 rounded p-2 w-full"
            required
          />
          <input
            type="text"
            placeholder="Other options (comma separated)"
            value={options}
            onChange={(e) => setOptions(e.target.value)}
            className="input-field border-2 border-blue-400 rounded p-2 w-full"
          />
          <input
            type="number"
            placeholder="Price"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            className="input-field border-2 border-blue-400 rounded p-2 w-full"
            required
          />
          <input
            type="number"
            placeholder="Cost"
            value={cost}
            onChange={(e) => setCost(e.target.value)}
            className="input-field border-2 border-blue-400 rounded p-2 w-full"
            required
          />
          <input
            type="number"
            placeholder="Amount of Stock"
            value={stock}
            onChange={(e) => setStock(e.target.value)}
            className="input-field border-2 border-blue-400 rounded p-2 w-full"
            required
          />
          <button
            type="submit"
            className="btn bg-blue-500 text-white px-4 py-2 rounded shadow-md hover:bg-blue-600 transition duration-200 w-full"
          >
            {editId ? "Update Order" : "Submit Order"}
          </button>
        </form>
      </div>
      <div className="w-2/3">
        <h2 className="text-2xl font-bold mb-4 text-gray-800">Your Orders</h2>
        <p className="mb-4 text-gray-600">Please review your selections before checkout</p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {menuItems.map((item) => (
            <div key={item.id} className="bg-white p-4 rounded shadow-md">
              <h3 className="text-xl font-bold">{item.name}</h3>
              <p className="text-gray-600">{item.category}</p>
              <p className="text-gray-600">{item.options}</p>
              <p className="text-gray-600">Cost: {item.cost} PHP</p>
              <p className="text-gray-600">Amount in Stock: {item.stock}</p>
              <p className="font-bold text-gray-800">Total: {item.price} PHP</p>
              <div className="flex space-x-2 mt-4">
                <button
                  onClick={() => handleEdit(item)}
                  className="btn-edit bg-yellow-400 text-white px-3 py-1 rounded shadow-md hover:bg-yellow-500 transition duration-200"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(item.id)}
                  className="btn-delete bg-red-500 text-white px-3 py-1 rounded shadow-md hover:bg-red-600 transition duration-200"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MenuItemForm;
