import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const Home = () => {
  const [items, setItems] = useState([]);

  const getItems = async () => {
    const email = localStorage.getItem("email");
    try {
      const { data } = await axios.post("http://localhost:5000/food", {
        email,
      });
      setItems(data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    getItems();
  }, []);

  return (
    <div className="min-h-screen bg-gray-900 text-gray-200">
      {/* Hero Section */}
      <header className="bg-gradient-to-r from-blue-600 to-purple-700 text-white py-16 px-6 text-center">
        <h1 className="text-4xl font-bold mb-4">Reduce Food Wastage</h1>
        <p className="text-lg mb-6">
          Join us in our mission to reduce food wastage by donating or claiming
          surplus food.
        </p>
        <button className="px-6 py-3 bg-white text-blue-600 font-medium rounded-lg shadow-md hover:bg-gray-100 transition" onClick={() => window.location.href = "#food-items"}>
          Get Started
        </button>
      </header>

      {/* Food Items Section */}
      <main className="py-12 px-6" id="food-items">
        <h2 className="text-2xl font-semibold mb-8 text-center">
          Available Food Items
        </h2>

        {items.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
            {items.map((item, index) => (
              <FoodItem key={index} item={item} />
            ))}
          </div>
        ) : (
          <p className="text-center text-gray-500">
            No food items available at the moment.
          </p>
        )}
      </main>
    </div>
  );
};

export default Home;

const FoodItem = ({ item }) => {
  const expirydate = new Date(item.expiryDate);
  const today = new Date();
  const timediff = expirydate - today;
  const daysleft = Math.ceil(timediff / (1000 * 60 * 60 * 24));

  const getExpiryStatus = () => {
    if (daysleft <= 0) return { text: "Expired", color: "bg-red-500" };
    if (daysleft <= 3) return { text: "Expiring Soon", color: "bg-yellow-500" };
    return { text: `Expires in ${daysleft} days`, color: "bg-green-500" };
  };

  const { text, color } = getExpiryStatus();

  return (
    <Link to={`/food/${item._id}`} className="bg-gray-800 rounded-lg shadow-md overflow-hidden hover:shadow-lg transition transform hover:scale-105">
      {/* Food Image */}
      <div className="w-full h-40 bg-gray-700">
        <img
          src="food.png"
          alt={item.foodItem}
          className="w-full h-full object-cover"
        />
      </div>

      {/* Food Details */}
      <div className="p-4">
        <h3 className="text-lg font-semibold mb-2">{item.foodItem}</h3>
        <p className="text-sm text-gray-400 mb-1">Quantity: {item.quantity}</p>
        <p className="text-sm text-gray-400 mb-1">Location: {item.location}</p>
        <p className="text-sm text-gray-400 mb-3">
          Expiry Date: {new Date(item.expiryDate).toLocaleDateString()}
        </p>

        {/* Expiry Badge */}
        <span
          className={`inline-block px-3 py-1 text-xs font-medium text-white rounded-full ${color}`}
        >
          {text}
        </span>
      </div>
    </Link>
  );
};