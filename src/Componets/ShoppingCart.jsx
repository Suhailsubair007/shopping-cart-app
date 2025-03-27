import { useState, useEffect } from "react";

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

  const remainingForFreeGift = THRESHOLD - calculateSubtotal();

  return (
    <div className="max-w-4xl mx-auto p-4 bg-gray-50 min-h-screen">
      <h1 className="text-2xl font-bold mb-6 text-center text-gray-800">
        Shopping Cart
      </h1>

      <div className="mb-8">
        <h2 className="text-xl font-semibold mb-4 text-gray-700">Products</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
          {products.map((product) => (
            <div key={product.id} className="bg-white p-4 rounded-lg shadow-sm">
              <h3 className="font-medium text-gray-800">{product.name}</h3>
              <p className="text-gray-700 my-2">₹{product.price}</p>
              <button
                onClick={() => addToCart(product)}
                className="w-full bg-blue-500 hover:bg-blue-600 text-white py-2 rounded-md transition-colors"
              >
                Add to Cart
              </button>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
        <h2 className="text-xl font-semibold mb-4 text-gray-700">
          Cart Summary
        </h2>
        <div className="flex justify-between items-center mb-4">
          <span className="font-medium">Subtotal:</span>
          <span className="font-bold text-gray-800">
            ₹{calculateSubtotal()}
          </span>
        </div>
        <div className="h-px bg-gray-200 w-full mb-4"></div>

        {calculateSubtotal() < THRESHOLD && calculateSubtotal() > 0 && (
          <div className="mb-4">
            <div className="text-sm text-gray-600 mb-2">
              Add ₹{remainingForFreeGift} more to get a FREE Wireless Mouse!
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div
                className="bg-blue-500 h-2 rounded-full"
                style={{ width: `${calculateProgressPercentage()}%` }}
              ></div>
            </div>
          </div>
        )}

        {freeGiftAdded && (
          <div className="text-green-600 font-medium mb-4">
            You got a free Wireless Mouse!
          </div>
        )}
      </div>

      {cart.length > 0 ? (
        <div className="bg-white rounded-lg shadow-sm p-6">
          <h2 className="text-xl font-semibold mb-4 text-gray-700">
            Cart Items
          </h2>
          {cart.map((item) => (
            <div
              key={item.id}
              className="flex justify-between items-center py-4 border-b border-gray-100 last:border-0"
            >
              <div>
                <div className="font-medium text-gray-800">{item.name}</div>
                <div className="text-sm text-gray-600">
                  ₹{item.price} × {item.quantity} = ₹
                  {item.price * item.quantity}
                </div>
              </div>
              <div className="flex items-center">
                {item.id !== FREE_GIFT.id ? (
                  <>
                    <button
                      onClick={() => updateQuantity(item.id, item.quantity - 1)}
                      className="h-8 w-8 flex items-center justify-center bg-red-500 text-white rounded-md"
                    >
                      -
                    </button>
                    <span className="mx-3 w-6 text-center font-medium">
                      {item.quantity}
                    </span>
                    <button
                      onClick={() => updateQuantity(item.id, item.quantity + 1)}
                      className="h-8 w-8 flex items-center justify-center bg-green-500 text-white rounded-md"
                    >
                      +
                    </button>
                  </>
                ) : (
                  <span className="text-xs font-medium text-green-600 bg-green-100 px-2 py-1 rounded">
                    FREE GIFT
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="bg-white rounded-lg shadow-sm p-6 text-center">
          <p className="text-gray-500 py-4">Your cart is empty</p>
          <p className="text-gray-400 text-sm">
            Add some products to see them here!
          </p>
        </div>
      )}
    </div>
  );
}

export default ShoppingCartApp;
