import React, { useState, useEffect, useRef } from "react";
import {
  Plus,
  Trash2,
  ImageIcon,
  ArrowLeft,
  Upload,
  CheckCircle,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const AddCategory = ({ onBack }) => {
  const [categories, setCategories] = useState([]);
  const [title, setTitle] = useState("");
  const [image, setImage] = useState(null);
  const [isSuccess, setIsSuccess] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // Slider ke liye Ref
  const scrollRef = useRef(null);

  // useEffect(() => {
  //   const saved = localStorage.getItem("brick_categories");
  //   if (saved) setCategories(JSON.parse(saved));
  // }, []);

  useEffect(() => {
    const fetchCategories = async () => {
      const response = await fetch("/api/products/all-categories");
      const data = await response.json();
      if (data.success) setCategories(data.categories);
    };
    fetchCategories();
  }, []);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  // const handleAddCategory = () => {
  //    setTitle("");
  //   setImage(null);
  //   if (!title || !image) {
  //     alert("Please add both title and image!");
  //     return;
  //   }

  //   const newCategory = { id: Date.now(), title, image };
  //   const updated = [...categories, newCategory];
  //   setCategories(updated);
  //   localStorage.setItem("brick_categories", JSON.stringify(updated));

  //   setIsSuccess(true);
  //   setTimeout(() => setIsSuccess(false), 3000);
  // };

  const handleAddCategory = async () => {
    if (!title || !image) return alert("Title and image required!");
    setIsLoading(true);

     try {
       const token = localStorage.getItem("adminToken");
       const response = await fetch("/api/products/categories", {
         method: "POST",
         headers: {
           "Content-Type": "application/json",
           Authorization: `Bearer ${token}`,
         },
        body: JSON.stringify({ title, image }),
      });

      const data = await response.json();

      if (data.success) {
        setCategories([...categories, data.category]);
        setTitle("");
        setImage(null);
        setIsSuccess(true);
        setTimeout(() => setIsSuccess(false), 3000);
      } else {
        alert(data.message || "Failed to add category");
      }
    } catch (error) {
      console.error("Connection Error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this category?"))
      return;

     try {
       const token = localStorage.getItem("adminToken");
       const response = await fetch(`/api/products/categories/${id}`, {
         method: "DELETE",
         headers: { Authorization: `Bearer ${token}` },
       });

      if (response.ok) {
        setCategories(categories.filter((cat) => cat._id !== id));
      }
    } catch (error) {
      console.error("Delete Error:", error);
    }
  };

  // --- Scroll Logic ---
  const scroll = (direction) => {
    if (scrollRef.current) {
      const { scrollLeft, clientWidth } = scrollRef.current;
      const scrollTo =
        direction === "left"
          ? scrollLeft - clientWidth
          : scrollLeft + clientWidth;
      scrollRef.current.scrollTo({ left: scrollTo, behavior: "smooth" });
    }
  };

  return (
    <div className="min-h-screen bg-white rounded-[2rem] p-3 sm:p-4 md:p-6 lg:p-8 font-sans">
      <div className="max-w-[315px] sm:max-w-2xl md:max-w-4xl mx-auto w-full">
        {/* Header */}
        <div className="flex items-center gap-3 sm:gap-4 mb-4 flex-wrap">
          <button
            onClick={onBack}
            className="p-2 hover:bg-red-700 border cursor-pointer border-red-700 group rounded-full transition-colors"
          >
            <ArrowLeft
              size={24}
              className="text-stone-600 group-hover:text-white"
            />
          </button>
          <p className="text-red-700 font-bold">back to dashboard</p>
        </div>

        <h1 className="text-3xl font-black text-[#1C1917] mb-4">
          Manage <span className="text-red-700">Categories</span>
        </h1>

        {/* Form Card */}
        <div className="bg-white rounded-[2rem] border border-stone-200 p-6 md:p-8 shadow-xl mb-12">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
            <div className="space-y-4">
              <label className="block text-xs font-black uppercase tracking-widest text-stone-400">
                Category Thumbnail
              </label>
              <div
                className={`relative h-44 sm:h-52 md:h-56 rounded-[1.5rem] border-2 border-dashed flex flex-col items-center justify-center transition-all overflow-hidden ${image ? "border-red-700" : "border-stone-200 hover:border-red-300 bg-stone-50"}`}
              >
                {image ? (
                  <>
                    <img
                      src={image}
                      alt="Preview"
                      className="w-full h-full object-cover"
                    />
                    <button
                      onClick={() => setImage(null)}
                      className="absolute top-2 right-2 bg-red-700 text-white p-1.5 rounded-full shadow-lg"
                    >
                      <Trash2 size={16} />
                    </button>
                  </>
                ) : (
                  <label className="cursor-pointer flex flex-col items-center group">
                    <div className="p-4 bg-white rounded-full shadow-md group-hover:scale-110 transition-transform">
                      <Upload className="text-red-700" size={24} />
                    </div>
                    <span className="mt-3 text-sm font-bold text-stone-500">
                      Click to upload photo
                    </span>
                    <input
                      type="file"
                      className="hidden"
                      accept="image/*"
                      onChange={handleImageChange}
                    />
                  </label>
                )}
              </div>
            </div>

            <div className="flex flex-col justify-center space-y-6">
              <div className="space-y-2">
                <label className="block text-xs font-black uppercase tracking-widest text-stone-400">
                  Category Name
                </label>
                <input
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="e.g. Classic Reds"
                  className="w-full px-4 sm:px-6 py-3 sm:py-4 rounded-[1rem] bg-stone-50 border border-stone-200 focus:border-red-700 focus:bg-white outline-none font-bold transition-all"
                />
              </div>
              <motion.button
                disabled={isLoading}
                whileHover={!isLoading ? { scale: 1.02 } : {}}
                whileTap={!isLoading ? { scale: 0.98 } : {}}
                onClick={handleAddCategory}
                className={`w-full py-3 sm:py-4 rounded-xl font-black shadow-lg flex items-center justify-center gap-2 transition-all ${isLoading
                    ? "bg-stone-400 cursor-not-allowed shadow-none"
                    : "bg-red-700 text-white cursor-pointer shadow-orange-100 hover:bg-red-800"
                  }`}
              >
                <AnimatePresence mode="wait">
                  {isLoading ? (
                    <motion.div
                      key="loading"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className="flex items-center gap-2"
                    >
                      <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      <span>PROCESSING...</span>
                    </motion.div>
                  ) : (
                    <motion.div
                      key="idle"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className="flex items-center gap-2"
                    >
                      <Plus size={20} />
                      <span>ADD CATEGORY</span>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.button>
              {isSuccess && (
                <div className="flex items-center justify-center gap-2 text-green-600 font-bold text-sm">
                  <CheckCircle size={18} /> Category added successfully!
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Categories List with Slider */}
        <div className="space-y-6 relative">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-black text-[#1C1917] flex items-center gap-2">
              All Categories{" "}
              <span className="bg-stone-200 text-stone-600 text-xs px-2 py-0.5 rounded-full">
                {categories.length}
              </span>
            </h2>

            {/* Show controls only if more than 4 items */}
            {categories.length > 4 && (
              <div className="flex gap-2">
                <button
                  onClick={() => scroll("left")}
                  className="p-2 bg-white border cursor-pointer border-stone-200 rounded-full hover:bg-red-700 hover:text-white transition-all shadow-sm"
                >
                  <ChevronLeft size={20} />
                </button>
                <button
                  onClick={() => scroll("right")}
                  className="p-2 bg-white border cursor-pointer border-stone-200 rounded-full hover:bg-red-700 hover:text-white transition-all shadow-sm"
                >
                  <ChevronRight size={20} />
                </button>
              </div>
            )}
          </div>

          <div
            ref={scrollRef}
            className="flex gap-3 sm:gap-4 overflow-x-auto md:overflow-x-hidden scroll-smooth pb-4 px-1 sm:px-2"
            style={{ scrollSnapType: "x mandatory" }}
          >
            <AnimatePresence>
              {categories.map((cat) => (
                <motion.div
                  layout
                  key={cat._id}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.5 }}
                  className="flex-shrink-0 group relative bg-white border border-stone-200 p-2 rounded-[1.5rem] w-[160px] sm:w-[180px] md:w-[190px] hover:shadow-xl transition-all"
                  style={{ scrollSnapAlign: "start" }}
                >
                  <div className="h-28 sm:h-30 md:h-32 w-full rounded-[1rem] overflow-hidden bg-stone-100 border border-stone-100">
                    <img
                      src={cat.image}
                      alt=""
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                  </div>
                  <div className="p-3">
                    <h3 className="text-sm font-black text-stone-800 truncate">
                      {cat.title}
                    </h3>
                  </div>
                  <button
                    onClick={() => handleDelete(cat._id)}
                    className="absolute top-0 -right-2 cursor-pointer bg-red-700 text-white p-2 rounded-xl shadow-lg opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    <Trash2 size={14} />
                  </button>
                </motion.div>
              ))}
            </AnimatePresence>

            {categories.length === 0 && (
              <div className="w-full py-10 sm:py-12 border-2 border-dashed border-stone-200 rounded-[2rem] flex flex-col items-center justify-center text-stone-400 font-bold text-center px-4">
                <ImageIcon size={40} className="mb-2 opacity-20" />
                No categories added yet
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddCategory;
