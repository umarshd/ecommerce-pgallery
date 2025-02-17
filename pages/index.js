import { useEffect, useState } from "react";
import axios from "axios";
import Image from "next/image";
import Head from "next/head";
import { motion, AnimatePresence } from "framer-motion";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBagShopping,
  faCartShopping,
  faStar,
  faXmark,
  faXmarkCircle,
} from "@fortawesome/free-solid-svg-icons";

export default function Home() {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [cart, setCart] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [sortBy, setSortBy] = useState("");

  const [showCart, setShowCart] = useState(false);

  const getAllProduct = async () => {
    try {
      const response = await axios({
        method: "get",
        url: selectedCategory
          ? `https://fakestoreapi.com/products/category/${selectedCategory}`
          : "https://fakestoreapi.com/products",
      });

      setProducts(response?.data);
      const savedCart = JSON.parse(localStorage.getItem("cart"));
      if (savedCart) setCart(savedCart);
    } catch (error) {
      console.log(error);
    }
  };

  const getAllCategory = async () => {
    try {
      const response = await axios({
        method: "get",
        url: "https://fakestoreapi.com/products/categories",
      });

      setCategories(response?.data);
    } catch (error) {
      console.log(error);
    }
  };

  // 🛒 Tambah ke Cart
  const addToCart = (product) => {
    setCart((prevCart) => {
      const updatedCart = [...prevCart, product];
      localStorage.setItem("cart", JSON.stringify(updatedCart));
      return updatedCart;
    });
  };

  // ❌ Hapus dari Cart
  const removeFromCart = (index) => {
    setCart((prevCart) => {
      const updatedCart = prevCart.filter((_, i) => i !== index);
      localStorage.setItem("cart", JSON.stringify(updatedCart));
      return updatedCart;
    });
  };

  // 🔢 Hitung Total Harga
  const totalCartPrice = cart
    .reduce((total, item) => total + item.price, 0)
    .toFixed(2);

  const sortedProducts = [...products].sort((a, b) => {
    if (sortBy === "price-low") return a.price - b.price;
    if (sortBy === "price-high") return b.price - a.price;
    if (sortBy === "rating-high") return b.rating.rate - a.rating.rate;
    return 0;
  });

  const handleModalClick = (e) => {
    // Mencegah penutupan modal saat klik pada modal itu sendiri
    e.stopPropagation();
  };

  useEffect(() => {
    getAllProduct();
    getAllCategory();
  }, [selectedCategory]);

  return (
    <>
      <div className="bg-white text-black min-h-screen">
        <Head>
          <title>Ecommerce Product Gallery</title>
        </Head>

        {/* 🛒 Header */}
        <div className="bg-gray-900 text-white p-4 flex flex-wrap justify-center md:justify-between items-center gap-2">
          <h1 className="text-2xl w-full text-center md:w-auto md:text-left">
            Ecommerce
          </h1>

          <div className="w-full md:w-auto  flex justify-between flex-row md:flex-row md:justify-between gap-2 items-center">
            <div className="text-md">
              {" "}
              Total <FontAwesomeIcon icon={faBagShopping} /> : ${totalCartPrice}
            </div>
            <button
              onClick={() => setShowCart(true)}
              className="bg-blue-500 px-2 py-1 rounded"
            >
              <FontAwesomeIcon icon={faCartShopping} /> ({cart.length})
            </button>
          </div>
        </div>

        <div className="container mx-auto p-4">
          <h1 className="text-3xl text-center my-8">Product Gallery</h1>

          <div className="flex justify-between mb-4">
            <select
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="border p-2"
            >
              <option value="">All Categories</option>
              {categories.map((category) => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </select>
            <select
              onChange={(e) => setSortBy(e.target.value)}
              className="border p-2"
            >
              <option value="">Sort By</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
              <option value="rating-high">Rating: High to Low</option>
            </select>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {sortedProducts.map((product) => (
              <div
                key={product.id}
                className="border p-4 rounded-lg cursor-pointer"
                onClick={() => setSelectedProduct(product)}
              >
                <div className="h-[200px] flex justify-center items-center overflow-hidden bg-white">
                  <Image
                    src={product.image}
                    alt={product.title}
                    width={200}
                    height={200}
                    // style={{ width: "auto", height: "auto" }}
                    className="w-auto h-full object-contain transition-transform duration-300 hover:scale-90"
                    loading="lazy"
                  />
                </div>
                <h2 className="text-sm md:text-lg font-bold mt-2">
                  {product.title}
                </h2>
                <p className="text-sm text-gray-600">${product.price}</p>
                <p className=" text-sm text-yellow-500">
                  <FontAwesomeIcon
                    icon={faStar}
                    style={{ color: "#FFD43B", marginRight: "2px" }}
                  />
                  {product.rating.rate}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* 📌 Product Modal */}
        <AnimatePresence>
          {selectedProduct && (
            <motion.div
              className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center p-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedProduct(null)}
            >
              <motion.div
                className="bg-white p-6 rounded-lg w-full max-w-lg relative"
                initial={{ y: -50, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: -50, opacity: 0 }}
                transition={{ duration: 0.3 }}
                onClick={handleModalClick}
              >
                <button
                  className="absolute top-4 right-4 text-red-500 text-xl"
                  onClick={() => setSelectedProduct(null)}
                >
                  <FontAwesomeIcon
                    icon={faXmarkCircle}
                    size="lg"
                    style={{ color: "red" }}
                  />
                </button>

                <div className="flex flex-col items-center">
                  <Image
                    src={selectedProduct.image}
                    alt={selectedProduct.title}
                    width={300}
                    height={300}
                    className="w-[200px] h-[200px] sm:w-[150px] sm:h-[150px] md:w-[300px] md:h-[300px] object-contain transition-transform duration-300 hover:scale-90"
                    loading="lazy"
                  />
                  <h2 className="text-2xl font-bold mt-4">
                    {selectedProduct.title}
                  </h2>
                  <p className="text-gray-600 text-lg">
                    ${selectedProduct.price}
                  </p>
                  <p className="text-yellow-500 text-lg">
                    ⭐
                    <FontAwesomeIcon
                      icon="fa-solid fa-star"
                      style={{ color: "#FFD43B" }}
                    />
                    {selectedProduct.rating.rate}
                  </p>
                  <p className="text-gray-700 text-sm mt-2">
                    {selectedProduct.description}
                  </p>

                  <button
                    onClick={() => {
                      addToCart(selectedProduct);
                      setSelectedProduct(null);
                    }}
                    className="mt-4 bg-blue-500 text-white px-6 py-2 rounded"
                  >
                    Add to Cart
                  </button>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* 🛒 Cart Modal */}
        <AnimatePresence>
          {showCart && (
            <motion.div
              className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center p-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <motion.div
                className="bg-white p-6 rounded-lg w-full max-w-lg relative"
                initial={{ y: -50, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: -50, opacity: 0 }}
                transition={{ duration: 0.3 }}
              >
                <button
                  className="absolute top-4 right-4 text-red-500 text-xl"
                  onClick={() => setShowCart(false)}
                >
                  ✖
                </button>
                <h2 className="text-2xl font-bold text-center mb-4">
                  Your Cart
                </h2>

                {cart.length === 0 ? (
                  <p className="text-center text-gray-500">
                    Your cart is empty
                  </p>
                ) : (
                  cart.map((item, index) => (
                    <div
                      key={index}
                      className="grid grid-cols-8 gap-4 border-b py-2"
                    >
                      <Image
                        src={item.image}
                        alt={item.title}
                        width={50}
                        height={50}
                        className="object-contain"
                      />
                      <span className="col-span-5">{item.title}</span>
                      <div className="flex justify-start items-start gap-2">
                        <span className="font-bold">${item.price}</span>
                        <button
                          onClick={() => removeFromCart(index)}
                          className="text-red-500"
                        >
                          ❌
                        </button>
                      </div>
                    </div>
                  ))
                )}
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </>
  );
}
