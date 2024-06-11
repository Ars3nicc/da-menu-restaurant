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
import MenuItemView from "../MenuItemView";
import { database } from "../../firebaseConfig";
import "./index.css"; // Assuming you have the Tailwind CSS included

const MenuItemForm = () => {
  const [menuItems, setMenuItems] = useState([]);
  const [category, setCategory] = useState("");
  const [name, setName] = useState("");
  const [options, setOptions] = useState("");
  const [price, setPrice] = useState(0); // Initialize price as 0
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
    setPrice(0); // Reset price to 0
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

  useEffect(() => {
    let additionalCost = 0;
    switch (options) {
      case "Medium":
        additionalCost = 5;
        break;
      case "Large":
        additionalCost = 10;
        break;
      case "Extra Large":
        additionalCost = 15;
        break;
      default:
        break;
    }
    setPrice(Number(cost) + additionalCost); // Update price when cost or options change
  }, [cost, options]);

  return (
    <main className="container mx-auto text-center p-4">
      <header className=" float-end text-end leading-5">
        <h2 className="text-5xl font-bold text-gray-800">Your Orders</h2>
        <p className="text-gray-600">
          Please review your selections before checkout
        </p>
      </header>
      <div className="container mx-auto p-6 md:flex lg:flex space-x-6">
        <div className="w-full md:w-96 bg-white p-6 rounded shadow-lg">
          <h1 className="text-left text-4xl font-bold mb-6 text-gray-800">
            Da'Menu <br /> Restaurant
          </h1>
          <form onSubmit={handleSubmit} className=" space-y-4">
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="input-field border-2 border-gray-300 rounded p-2 w-full"
              required
            >
              <option value="">Select a category</option>
              <option value="Burgers">Burgers</option>
              <option value="Sides">Sides</option>
              <option value="Beverages">Beverages</option>
              <option value="Desserts">Desserts</option>
            </select>
            <input
              type="text"
              placeholder="Order Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="input-field border-2 border-gray-300 rounded p-2 w-full"
              required
            />

            <select
              value={options}
              onChange={(e) => {
                setOptions(e.target.value);
                let additionalCost = 0;
                switch (e.target.value) {
                  case "Medium":
                    additionalCost = 5;
                    break;
                  case "Large":
                    additionalCost = 10;
                    break;
                  case "Extra Large":
                    additionalCost = 15;
                    break;
                  default:
                    break;
                }
                setCost(price + additionalCost);
              }}
              className="input-field border-2 border-gray-300 rounded p-2 w-full"
            >
              <option value="">Select a size</option>
              <option value="Regular">Regular</option>
              <option value="Medium">Medium</option>
              <option value="Large">Large</option>
              <option value="Extra Large">Extra Large</option>
            </select>
            <input
              type="number"
              placeholder="Number of Orders"
              value={cost}
              onChange={(e) => setCost(e.target.value)}
              className="input-field border-2 border-gray-300 rounded p-2 w-full"
              required
            />
            <p className="text-end text-2xl p-2 w-full">
              Total Price: <span className="font-bold">{price} PHP</span>
            </p>
            <button
              type="submit"
              className="btn bg-blue-500 text-white px-4 py-2 rounded shadow-md hover:bg-blue-600 transition duration-200 w-full"
            >
              {editId ? "Update Order" : "Submit Order"}
            </button>
          </form>
        </div>

        <section>
          <MenuItemView
            menuItems={menuItems}
            handleEdit={handleEdit}
            handleDelete={handleDelete}
          />
        </section>
      </div>
    </main>
  );
};

export default MenuItemForm;
