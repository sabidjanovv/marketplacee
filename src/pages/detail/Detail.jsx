import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { FaHeart, FaRegHeart, FaStar } from "react-icons/fa";
import { Toaster, toast } from "react-hot-toast";
import { request } from "../../api";

const Detail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [data, setData] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [loading, setLoading] = useState(true);
  const [selectedColor, setSelectedColor] = useState("Black");

  // Timer State
  const [timer, setTimer] = useState({
    days: 2,
    hours: 12,
    minutes: 45,
    seconds: 5,
  });

  useEffect(() => {
    // Fetch product details
    request
      .get(`/product/get/${id}`)
      .then((res) => {
        if (res.data) setData(res.data);
        else navigate("/not-found");
      })
      .catch(() => navigate("/not-found"))
      .finally(() => setLoading(false));

    // Countdown Timer
    const countdown = setInterval(() => {
      setTimer((prev) => {
        let { days, hours, minutes, seconds } = prev;
        if (seconds > 0) seconds--;
        else if (minutes > 0) {
          minutes--;
          seconds = 59;
        } else if (hours > 0) {
          hours--;
          minutes = 59;
        } else if (days > 0) {
          days--;
          hours = 23;
          minutes = 59;
        }
        return { days, hours, minutes, seconds };
      });
    }, 1000);

    return () => clearInterval(countdown);
  }, [id, navigate]);

  // Wishlist Toggle Handler
  const handleWishlistToggle = () => {
    const customerId = +localStorage.getItem("id");

    if (!customerId) {
      return navigate("/login");
    }

    request
      .post(`/wishlist/create`, { productId: data.id, customerId })
      .then((res) => {
        if (res.data?.message === "Item deleted succecfully from wishlist") {
          toast.error("Removed from Wishlist");
          setData((prev) => ({ ...prev, isInWishlist: false }));
        } else {
          toast.success("Added to Wishlist");
          setData((prev) => ({ ...prev, isInWishlist: true }));
        }
      })
      .catch((err) => {
        console.error(err);
        toast.error("An error occurred. Please try again.");
      });
  };

  if (loading || !data)
    return <div className="text-center py-20">Loading...</div>;

  return (
    <div className="container mx-auto py-10 grid md:grid-cols-2 gap-10">
      {/* Left: Product Image */}
      <div className="flex flex-col items-center">
        <img
          src={data.image || "https://via.placeholder.com/400"}
          alt={data.name}
          className="rounded-lg border border-gray-200"
        />
        <div className="flex gap-4 mt-4">
          {/* Mock Small Images */}
          {[...Array(3)].map((_, index) => (
            <img
              key={index}
              src={data.image || "https://via.placeholder.com/100"}
              alt="small"
              className="w-20 h-20 border rounded"
            />
          ))}
        </div>
      </div>

      {/* Right: Product Details */}
      <div className="p-6 border rounded-lg shadow-lg">
        {/* Product Name and Description */}
        <div className="pb-2 border-b">
          <div className="flex pb-1">
            {[...Array(5)].map((_, i) => (
              <FaStar key={i} className="text-gray-950" />
            ))}
          </div>
          <h1 className="text-4xl font-semibold">{data.name}</h1>
          <p className="text-gray-500 my-2">{data.description}</p>
        </div>

        {/* Price Section */}
        <div className="my-4">
          <span className="text-3xl font-bold text-green-600">
            ${data.price}
          </span>
          <span className="text-xl text-gray-400 line-through ml-2">
            ${data.originalPrice || 400}
          </span>
        </div>

        {/* Countdown Timer */}
        <div className="flex gap-2 items-center my-4 text-gray-600">
          <span>Offer expires in:</span>
          <div className="flex gap-1">
            {Object.entries(timer).map(([key, value]) => (
              <div key={key} className="p-2 bg-gray-100 rounded text-center">
                {value}{" "}
                <span>{key.charAt(0).toUpperCase() + key.slice(1)}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Color Selector */}
        <div className="mb-4">
          <h3 className="font-medium">Choose Color:</h3>
          <div className="flex gap-3 mt-2">
            {["Black", "Brown", "Red", "White"].map((color) => (
              <button
                key={color}
                onClick={() => setSelectedColor(color)}
                className={`w-10 h-10 rounded-full border-2 ${
                  selectedColor === color ? "border-black" : "border-gray-300"
                }`}
                style={{ backgroundColor: color.toLowerCase() }}
              />
            ))}
          </div>
        </div>

        {/* Quantity and Wishlist */}
        <div className="flex items-center gap-6">
          <div className="flex items-center border rounded-lg">
            <button
              onClick={() => setQuantity((prev) => Math.max(1, prev - 1))}
              className="px-3 py-1"
            >
              -
            </button>
            <span className="px-4">{quantity}</span>
            <button
              onClick={() => setQuantity((prev) => prev + 1)}
              className="px-3 py-1"
            >
              +
            </button>
          </div>
          <button
            onClick={handleWishlistToggle}
            className="flex items-center text-red-500 gap-1"
          >
            {data.isInWishlist ? <FaHeart /> : <FaRegHeart />}
            <span>Wishlist</span>
          </button>
        </div>

        {/* Add to Cart */}
        <button className="w-full py-3 mt-6 bg-black text-white rounded hover:bg-green-600 transition">
          Add to Cart
        </button>
      </div>

      <Toaster position="bottom-right" />
    </div>
  );
};

export default Detail;
