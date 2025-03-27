import React, { useState, useEffect } from "react";

const PRODUCTS = [
  { id: 1, name: "Laptop", price: 500 },
  { id: 2, name: "Smartphone", price: 300 },
  { id: 3, name: "Headphones", price: 100 },
  { id: 4, name: "Smartwatch", price: 150 },
];

const FREE_GIFT = { id: 99, name: "Wireless Mouse", price: 0 };
const THRESHOLD = 1000;

function ShoppingCartApp() {
  const [products, setProducts] = useState(PRODUCTS);
  const [cart, setCart] = useState([]);
  const [freeGiftAdded, setFreeGiftAdded] = useState(false);

  useEffect(() => {
    const cartSubtotal = cart.reduce(
      (total, item) => total + item.price * item.quantity,
      0
    );

    if (cartSubtotal >= THRESHOLD && !freeGiftAdded) {
      setCart((prevCart) => [...prevCart, { ...FREE_GIFT, quantity: 1 }]);
      setFreeGiftAdded(true);
    } else if (cartSubtotal < THRESHOLD && freeGiftAdded) {
      setCart((prevCart) =>
        prevCart.filter((item) => item.id !== FREE_GIFT.id)
      );
      setFreeGiftAdded(false);
    }
  }, [cart, freeGiftAdded]);

  const addToCart = (product) => {
    const existingItem = cart.find((item) => item.id === product.id);

    if (existingItem) {
      setCart((prevCart) =>
        prevCart.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        )
      );
    } else {
      setCart((prevCart) => [...prevCart, { ...product, quantity: 1 }]);
    }
  };

  const updateQuantity = (productId, newQuantity) => {
    if (newQuantity === 0) {
      setCart((prevCart) => prevCart.filter((item) => item.id !== productId));
    } else {
      setCart((prevCart) =>
        prevCart.map((item) =>
          item.id === productId ? { ...item, quantity: newQuantity } : item
        )
      );
    }
  };

  const calculateSubtotal = () => {
    return cart.reduce((total, item) => total + item.price * item.quantity, 0);
  };

  const calculateProgressPercentage = () => {
    const subtotal = calculateSubtotal();
    return Math.min((subtotal / THRESHOLD) * 100, 100);
  };

  return (
    <div className="max-w-4xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Shopping Cart</h1>

      <div className="w-full bg-gray-200 rounded-full h-4 mb-4">
        <div
          className="bg-green-500 h-4 rounded-full"
          style={{ width: `${calculateProgressPercentage()}%` }}
        ></div>
      </div>

      {freeGiftAdded && (
        <div className="bg-green-100 p-2 rounded mb-4">
          Free Gift Unlocked: {FREE_GIFT.name}
        </div>
      )}

      <div className="grid grid-cols-2 gap-4 mb-8">
        {products.map((product) => (
          <div key={product.id} className="border p-4 rounded">
            <h2 className="text-lg font-semibold">{product.name}</h2>
            <p>₹{product.price}</p>
            <div className="flex items-center space-x-2 mt-2">
              <button
                onClick={() => {
                  const cartItem = cart.find((item) => item.id === product.id);
                  updateQuantity(product.id, (cartItem?.quantity || 0) - 1);
                }}
                className="bg-gray-200 px-2 rounded"
              >
                -
              </button>
              <span className="mx-2">
                {cart.find((item) => item.id === product.id)?.quantity || 0}
              </span>
              <button
                onClick={() => addToCart(product)}
                className="bg-gray-200 px-2 rounded"
              >
                +
              </button>
              <button
                onClick={() => addToCart(product)}
                className="text-white bg-gradient-to-r from-cyan-400 via-cyan-500 to-cyan-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-cyan-300 dark:focus:ring-cyan-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
              >
                Add to Cart
              </button>
            </div>
          </div>
        ))}
      </div>

      <div className="border border-gray-200 p-6 rounded-lg shadow-sm">
        <h2 className="text-xl font-bold mb-6 text-gray-800">Shopping Cart</h2>
        {cart.length === 0 ? (
          <p className="text-gray-500 py-4">Your cart is empty</p>
        ) : (
          <>
            {cart.map((item) => (
              <div
                key={item.id}
                className="flex justify-between items-center py-3 border-b border-gray-100 last:border-0"
              >
                <span className="font-medium text-gray-700">{item.name}</span>
                <div className="flex items-center">
                  <button
                    onClick={() => updateQuantity(item.id, item.quantity - 1)}
                    className="h-8 w-8 flex items-center justify-center bg-red-500 hover:bg-gray-200 rounded-md transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                    disabled={item.id === FREE_GIFT.id}
                  >
                    -
                  </button>
                  <span className="mx-3 w-6 text-center font-medium">
                    {item.quantity}
                  </span>
                  <button
                    onClick={() => updateQuantity(item.id, item.quantity + 1)}
                    className="h-8 w-8 flex items-center justify-center bg-green-200 hover:bg-gray-200 rounded-md transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                    disabled={item.id === FREE_GIFT.id}
                  >
                    +
                  </button>
                  <span className="ml-6 min-w-[60px] text-right font-medium">
                  ₹{(item.price * item.quantity).toFixed(2)}
                  </span>
                </div>
              </div>
            ))}
            <div className="mt-6 pt-4 border-t border-gray-200 flex justify-end">
              <div className="text-lg font-bold text-gray-800">
                Total: ₹{calculateSubtotal().toFixed(2)}
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default ShoppingCartApp;
