import { createContext, useContext, useState, useEffect } from 'react';
import toast from 'react-hot-toast';

const CartContext = createContext();

export const useCart = () => useContext(CartContext);

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState(() => {
    const saved = localStorage.getItem('cart');
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart));
  }, [cart]);

  const addToCart = (product, quantity = 1, color = null) => {
    setCart((prev) => {
      const existing = prev.find(
        (item) => item._id === product._id && item.selectedColor?.name === color?.name
      );
      if (existing) {
        return prev.map((item) =>
          item._id === product._id && item.selectedColor?.name === color?.name
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }
      return [...prev, { ...product, quantity, selectedColor: color }];
    });
    toast.success('تمت الإضافة إلى السلة');
  };

  const removeFromCart = (productId, colorName) => {
    setCart((prev) => prev.filter(
      (item) => !(item._id === productId && item.selectedColor?.name === colorName)
    ));
    toast.success('تم الحذف من السلة');
  };

  const updateQuantity = (productId, colorName, quantity) => {
    if (quantity < 1) {
      removeFromCart(productId, colorName);
      return;
    }
    setCart((prev) =>
      prev.map((item) =>
        item._id === productId && item.selectedColor?.name === colorName
          ? { ...item, quantity }
          : item
      )
    );
  };

  const clearCart = () => {
    setCart([]);
    localStorage.removeItem('cart');
  };

  const cartTotal = cart.reduce((sum, item) => {
    const price = item.discount > 0
      ? item.price - (item.price * item.discount / 100)
      : item.price;
    return sum + price * item.quantity;
  }, 0);

  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart, updateQuantity, clearCart, cartTotal, cartCount }}>
      {children}
    </CartContext.Provider>
  );
};
