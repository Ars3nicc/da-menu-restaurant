// src/components/MenuItemView.js
import React from "react";

const MenuItemView = ({ menuItems, handleEdit, handleDelete }) => {
  return (
    <div className="w-full">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {menuItems.map((item) => (
          <div
            key={item.id}
            className="bg-white p-9 rounded-lg shadow-md flex flex-col justify-between w-full max-w-3xl mx-auto"
          >
            <header className="text-xl w-full font-bold py-4 border-b-2 leading-6">
              {item.name}
            </header>
            <div>
              <div className="text-end italic py-2">
                <p className="text-gray-600">{item.category}</p>
                <p className="text-gray-600">{item.options}</p>
              </div>
              <div className="text-left block">
                <label className="text-lg">Cost:</label>
                <p className="text-gray-600 font-bold">{item.cost} PHP</p>
              </div>
              <div className="text-left block">
                <label className="text-lg">Order/s:</label>
                <p className="text-gray-600 font-bold">{item.stock}</p>
              </div>
              <div className="text-end block">
                <label className="text-lg">Total: </label>
                <p className="font-bold text-gray-800">{item.price} PHP</p>
              </div>
            </div>
            <div className="flex space-x-2 mt-4">
              <button
                onClick={() => handleEdit(item)}
                className="btn-edit bg-yellow-400 text-white px-3 py-1 rounded shadow-md hover:bg-yellow-500 transition duration-200"
              >
                Update
              </button>
              <button
                onClick={() => handleDelete(item.id)}
                className="btn-delete bg-red-500 text-white px-3 py-1 rounded shadow-md hover:bg-red-600 transition duration-200"
              >
                Remove
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MenuItemView;
