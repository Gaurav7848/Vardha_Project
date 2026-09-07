import React, { useState, useEffect, useMemo } from "react";
import { get, set } from 'idb-keyval';
import { motion, AnimatePresence } from "framer-motion"; // <--- Add this line

import {
  Save,
  UploadCloud,
  ArrowLeft,
  Trash2,
  Info,
  Tag,
  Layers,
  Settings,
  HelpCircle,
  Ruler,
  Weight,
  Droplets,
  Zap,
  Cpu,
  Loader2
} from "lucide-react";

const ProductForm = ({ editId, onCancel }) => {
  const isEditMode = Boolean(editId);

  const [previewImages, setPreviewImages] = useState([]);
  const [dynamicCategories, setDynamicCategories] = useState([]);
  const [isLoadingCats, setIsLoadingCats] = useState(true);
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    type: "",
    application: "",
    shortDesc: "",
    detailedDesc: "",
    strength: "",
    size: "",
    weight: "",
    waterAbsorption: "",
    usage: "",
    status: "Active",
  });

  // --- DYNAMIC CATEGORIES LOGIC ---

  useEffect(() => {
    const fetchCats = async () => {
      try {
        const response = await fetch("/api/products/all-categories");
        const data = await response.json();

        if (data.success && data.categories) {
          const backendTitles = data.categories.map((cat) => cat.title);
          setDynamicCategories([...new Set(backendTitles)]);
        } else {
          setDynamicCategories([]);
        }
      } catch (error) {
        console.error("Error fetching categories:", error);
        setDynamicCategories([]);
      } finally {
        setIsLoadingCats(false);
      }
    };
    fetchCats();
  }, []);

  useEffect(() => {
    const actualId = editId && typeof editId === 'object'
      ? (editId._id || editId.id)
      : editId;

    if (isEditMode && actualId && actualId !== '[object Object]') {

       const fetchProductDetails = async () => {
         const token = localStorage.getItem("adminToken");
         try {
           const response = await fetch(`/api/products/${actualId}`, {
            method: "GET",
            headers: {
              "Authorization": `Bearer ${token}`,
              "Content-Type": "application/json"
            }
          });
          const result = await response.json();

          const product = result.product || result;

          if (product) {
            const specs = product.specifications || {};
            setFormData({
              name: product.productName || "",
              type: product.productType || "",
              application: product.usageArea || "",
              shortDesc: product.shortDescription || "",
              detailedDesc: product.detailedDescription || "",
              strength: product.specifications?.strength || "",
              size: product.specifications?.size || "",
              weight: product.specifications?.weight || "",
              waterAbsorption: product.specifications?.waterAbsorption || "",
              usage: product.usageArea || "",
              status: product.status || "Active",
            });
            setPreviewImages(product.images || []);
          }
        }
        catch (error) {
          console.error("Error fetching product for edit:", error);
        }
      };
      fetchProductDetails();
    }
  }, [editId, isEditMode]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);

    setSelectedFiles((prev) => [...prev, ...files]);

    files.forEach((file) => {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewImages((prev) => [...prev, reader.result]);
      };
      reader.readAsDataURL(file);
    });
  };

  const removeImage = (index) => {
    setPreviewImages((prev) => prev.filter((_, i) => i !== index));
  };


  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

     const token = localStorage.getItem("adminToken");

     const actualId = editId && typeof editId === 'object'
      ? (editId._id || editId.id)
      : editId;

    const data = new FormData();

    data.append("productName", formData.name);
    data.append("productType", formData.type);
    data.append("usageArea", formData.application);
    data.append("shortDescription", formData.shortDesc);
    data.append("detailedDescription", formData.detailedDesc);
    data.append("status", formData.status);
    data.append("specifications", JSON.stringify({
      strength: formData.strength,
      size: formData.size,
      weight: formData.weight,
      waterAbsorption: formData.waterAbsorption
    }));
    previewImages.forEach((img) => {
      if (typeof img === "string" && img.startsWith("http")) {
        data.append("images", img);
      }
    });
    selectedFiles.forEach((file) => {
      data.append("images", file);
    });

    try {
      const url = isEditMode
        ? `/api/products/edit-product/${actualId}`
        : "/api/products/add-product";

      const method = isEditMode ? "PUT" : "POST";

      const response = await fetch(url, {
        method: method,
        headers: {
          "Authorization": `Bearer ${token}`
        },
        body: data,
      });

      const result = await response.json();

      if (result.success) {
        alert(isEditMode ? "Product updated!" : "Product added!");
        onCancel();
      } else {
        alert("Error: " + result.error);
      }
    } catch (error) {
      console.error("Submission failed:", error);
      alert("Could not connect to the server.");
    }
    finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="p-4 min-h-screen">
      <div className="max-w-6xl mx-auto bg-white rounded-[1.5rem] shadow-sm border border-stone-200 overflow-hidden">
        {/* TOP NAVIGATION BAR */}
        <div className="bg-stone-50/50 px-8 py-5 border-b border-orange-200 flex justify-between items-center">
          <button
            onClick={onCancel}
            className="flex items-center gap-2 text-red-700 transition-all font-bold text-sm group"
          >
            <div className="p-2 bg-white rounded-full border border-red-700 hover:bg-red-700 hover:text-white/95">
              <ArrowLeft size={18} className="cursor-pointer" />
            </div>
            Back to Dashboard
          </button>
        </div>

        <div className="p-8 md:p-6">
          <header className="mb-12">
            <h1 className="text-4xl font-black text-stone-900 ">
              {isEditMode ? (
                <>
                  Update <span className="text-red-700">Product</span>
                </>
              ) : (
                <>
                  Add New <span className="text-red-700">Product</span>
                </>
              )}
            </h1>
            <p className="text-stone-500 mt-2 font-medium">
              Fill in the technical and commercial details of the bricks.
            </p>
          </header>

          <form
            onSubmit={handleSubmit}
            className="grid grid-cols-1 lg:grid-cols-12 gap-12"
          >
            {/* LEFT COLUMN */}
            <div className="lg:col-span-4 space-y-6 order-2 lg:order-1">
              <div className="sticky top-24 space-y-6">
                <div className="bg-stone-50 p-6 rounded-[2rem] border border-stone-200">
                  <label className="text-xs font-black text-stone-400 uppercase tracking-widest mb-4 block">
                    Product Gallery
                  </label>
                  <div className="space-y-4">
                    <label className="border-2 border-dashed border-stone-300 rounded-[1.5rem] p-6 bg-white transition-all hover:border-red-300 flex flex-col items-center justify-center cursor-pointer group">
                      <div className="p-3 bg-orange-50 text-red-700 rounded-full mb-2 group-hover:scale-110 transition-transform">
                        <UploadCloud size={24} />
                      </div>
                      <span className="text-xs font-bold text-stone-600">
                        Add Images
                      </span>
                      <input
                        type="file"
                        hidden
                        multiple
                        onChange={handleImageChange}
                        accept="image/*"
                      />
                    </label>
                    <div className="grid grid-cols-2 gap-3">
                      {previewImages.map((img, index) => (
                        <div
                          key={index}
                          className="relative group aspect-square"
                        >
                          <img
                            src={img}
                            alt=""
                            className="w-full h-full object-cover rounded-[1rem] border border-stone-200"
                          />
                          <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity rounded-[1rem] flex items-center justify-center">
                            <button
                              type="button"
                              onClick={() => removeImage(index)}
                              className="p-2 bg-red-700 text-white rounded-full hover:scale-110 transition-transform"
                            >
                              <Trash2 size={16} />
                            </button>
                          </div>
                          {index === 0 && (
                            <span className="absolute top-2 left-2 bg-red-700 text-[8px] text-white px-2 py-0.5 rounded-full font-bold">
                              COVER
                            </span>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className={`w-full cursor-pointer text-white py-3 rounded-xl font-black transition-all shadow-xl flex items-center justify-center gap-3 group hover:scale-105 ${isSubmitting ? "bg-stone-400 cursor-not-allowed" : "bg-red-700 shadow-red-700/10"
                    }`}
                >
                  <AnimatePresence mode="wait">
                    {isSubmitting ? (
                      <motion.div
                        key="processing"
                        initial={{ opacity: 0, y: 5 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -5 }}
                        className="flex items-center gap-3"
                      >
                        <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                        <span>PROCESSING...</span>
                      </motion.div>
                    ) : (
                      <motion.div
                        key="idle"
                        initial={{ opacity: 0, y: 5 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -5 }}
                        className="flex items-center gap-3"
                      >
                        <Save
                          size={20}
                          className="group-hover:rotate-12 transition-transform"
                        />
                        <span>{isEditMode ? "UPDATE PRODUCT" : "ADD PRODUCT"}</span>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </button>
              </div>
            </div>

            {/* RIGHT COLUMN */}
            <div className="lg:col-span-8 space-y-8 order-1 lg:order-2">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <FormInput
                  label="Product Name"
                  icon={<Tag size={16} className="text-red-700" />}
                >
                  <input
                    required
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="e.g. Premium Fly Ash Bricks"
                    className="form-input-style"
                  />
                </FormInput>

                {/* --- DYNAMIC TYPE DROPDOWN --- */}
                <FormInput
                  label="Category / Type"
                  icon={<Layers size={16} className="text-red-700" />}
                >
                  <select
                    required
                    name="type"
                    value={formData.type}
                    onChange={handleChange}
                    className="form-input-style appearance-none cursor-pointer"
                  >
                    <option value="">
                      {isLoadingCats ? "Loading Categories..." : "Select Type"}
                    </option>
                    {dynamicCategories.map((cat, idx) => (
                      <option key={idx} value={cat}>
                        {cat}
                      </option>
                    ))}
                  </select>
                </FormInput>

                <FormInput
                  label="Application Area"
                  icon={<Settings size={16} className="text-red-700" />}
                >
                  <select
                    required
                    name="application"
                    value={formData.application}
                    onChange={handleChange}
                    className="form-input-style appearance-none cursor-pointer"
                  >
                    <option value="">Select Application</option>
                    <option>Industrial</option>
                    <option>Commercial</option>
                    <option>Residential</option>
                  </select>
                </FormInput>

                <FormInput
                  label="Product Status"
                  icon={<Info size={16} className="text-red-700" />}
                >
                  <select
                    name="status"
                    value={formData.status}
                    onChange={handleChange}
                    className="form-input-style appearance-none cursor-pointer"
                  >
                    <option>Active</option>
                    <option>InActive</option>
                  </select>
                </FormInput>
              </div>

              <FormInput
                label="Short Description"
                icon={<Info size={16} className="text-red-700" />}
              >
                <input
                  name="shortDesc"
                  value={formData.shortDesc}
                  onChange={handleChange}
                  placeholder="One line catchphrase..."
                  className="form-input-style"
                />
              </FormInput>

              <div className="space-y-4">
                <label className="text-xs font-black text-stone-500 uppercase tracking-widest flex items-center gap-2">
                  <Cpu size={16} className="text-red-700" /> Technical
                  Specifications
                </label>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <FormInput
                    label="Strength"
                    icon={<Zap size={16} className="text-red-700" />}
                  >
                    <input
                      name="strength"
                      value={formData.strength}
                      onChange={handleChange}
                      placeholder="e.g. 7.5 N/mm²"
                      className="form-input-style"
                    />
                  </FormInput>
                  <FormInput
                    label="Size"
                    icon={<Ruler size={16} className="text-red-700" />}
                  >
                    <input
                      name="size"
                      value={formData.size}
                      onChange={handleChange}
                      placeholder='e.g. 9" x 4" x 3"'
                      className="form-input-style"
                    />
                  </FormInput>
                  <FormInput
                    label="Weight"
                    icon={<Weight size={16} className="text-red-700" />}
                  >
                    <input
                      name="weight"
                      value={formData.weight}
                      onChange={handleChange}
                      placeholder="e.g. 3.2 kg"
                      className="form-input-style"
                    />
                  </FormInput>
                  <FormInput
                    label="Water Absorption"
                    icon={<Droplets size={16} className="text-red-700" />}
                  >
                    <input
                      name="waterAbsorption"
                      value={formData.waterAbsorption}
                      onChange={handleChange}
                      placeholder="e.g. < 10%"
                      className="form-input-style"
                    />
                  </FormInput>
                </div>
              </div>

              <FormInput
                label="Usage Guidelines"
                icon={<HelpCircle size={16} className="text-red-700" />}
              >
                <textarea
                  name="usage"
                  value={formData.usage}
                  onChange={handleChange}
                  rows="3"
                  placeholder="How to use or install..."
                  className="form-input-style"
                />
              </FormInput>

              <FormInput
                label="Detailed Description"
                icon={<Info size={16} className="text-red-700" />}
              >
                <textarea
                  name="detailedDesc"
                  value={formData.detailedDesc}
                  onChange={handleChange}
                  rows="5"
                  placeholder="Write full details about the product..."
                  className="form-input-style"
                />
              </FormInput>
            </div>
          </form>
        </div>
      </div>

      <style
        dangerouslySetInnerHTML={{
          __html: `
        .form-input-style {
            width: 100%;
            padding: 1rem 1.25rem;
            background-color: #f9f8f7;
            border: 1px solid #e7e5e4;
            border-radius: 1rem;
            outline: none;
            font-size: 0.875rem;
            font-weight: 600;
            color: #1c1917;
            transition: all 0.2s;
        }
        .form-input-style:focus {
            border-color: #EA580C;
            background-color: white;
            box-shadow: 0 0 0 4px rgba(234, 88, 12, 0.05);
        }
      `,
        }}
      />
    </div>
  );
};

const FormInput = ({ label, icon, children }) => (
  <div className="space-y-2">
    <label className="text-xs font-black text-stone-500 uppercase tracking-widest ml-1 flex items-center gap-2">
      {icon}
      {label}
    </label>
    {children}
  </div>
);

export default ProductForm;

// import React, { useState, useEffect } from "react";
// import { Save, UploadCloud, ArrowLeft, Trash2, Info, Tag, Layers, Settings, HelpCircle, Ruler, Weight, Droplets, Zap, Cpu } from "lucide-react";

// const ProductForm = ({ editId, onCancel }) => {
//   const isEditMode = Boolean(editId);

//   const [previewImages, setPreviewImages] = useState([]);
//   const [formData, setFormData] = useState({
//     name: "",
//     type: "",
//     application: "",
//     shortDesc: "",
//     detailedDesc: "",
//     // New fields from image
//     strength: "",
//     size: "",
//     weight: "",
//     waterAbsorption: "",
//     usage: "",
//     status: "Active",
//   });

//   useEffect(() => {
//     if (isEditMode) {
//       const saved = JSON.parse(localStorage.getItem("brick_products")) || [];
//       const product = saved.find((p) => p.id === Number(editId));

//       if (product) {
//         setFormData({ ...product });
//         setPreviewImages(Array.isArray(product.images) ? product.images : product.image ? [product.image] : []);
//       }
//     }
//   }, [editId, isEditMode]);

//   const handleChange = (e) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   };

//   const handleImageChange = (e) => {
//     const files = Array.from(e.target.files);
//     files.forEach(file => {
//       const reader = new FileReader();
//       reader.onloadend = () => {
//         setPreviewImages((prev) => [...prev, reader.result]);
//       };
//       reader.readAsDataURL(file);
//     });
//   };

//   const removeImage = (index) => {
//     setPreviewImages(prev => prev.filter((_, i) => i !== index));
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     const saved = JSON.parse(localStorage.getItem("brick_products")) || [];
//     let updatedProducts;

//     const productData = {
//       ...formData,
//       images: previewImages,
//       image: previewImages[0] || null
//     };

//     if (isEditMode) {
//       updatedProducts = saved.map((p) =>
//         p.id === Number(editId) ? { ...p, ...productData } : p
//       );
//     } else {
//       updatedProducts = [
//         ...saved,
//         { ...productData, id: Date.now() },
//       ];
//     }

//     localStorage.setItem("brick_products", JSON.stringify(updatedProducts));
//     onCancel();
//   };

//   return (
//     <div className="p-4 min-h-screen">
//       <div className="max-w-6xl mx-auto bg-white rounded-[1.5rem] shadow-sm border border-stone-200 overflow-hidden">

//         {/* TOP NAVIGATION BAR */}
//         <div className="bg-stone-50/50 px-8 py-5 border-b border-orange-200 flex justify-between items-center">
//           <button
//             onClick={onCancel}
//             className="flex items-center gap-2 text-[#EA580C] transition-all font-bold text-sm group"
//           >
//             <div className="p-2 bg-white rounded-full border border-orange-200">
//                 <ArrowLeft size={18} />
//             </div>
//             Back to Dashboard
//           </button>
//         </div>

//         <div className="p-8 md:p-6">
//           <header className="mb-12">
//             <h1 className="text-4xl font-black text-stone-900 ">
//               {isEditMode ? (
//                 <>Update <span className="text-orange-600">Product</span></>
//               ) : (
//                 <>Add New <span className="text-orange-600">Product</span></>
//               )}
//             </h1>
//             <p className="text-stone-500 mt-2 font-medium">Fill in the technical and commercial details of the bricks.</p>
//           </header>

//           <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-12 gap-12">

//             {/* LEFT COLUMN: MULTI-IMAGE UPLOAD */}
//             <div className="lg:col-span-4 space-y-6 order-2 lg:order-1">
//               <div className="sticky top-24 space-y-6">
//                 <div className="bg-stone-50 p-6 rounded-[2rem] border border-stone-200">
//                     <label className="text-xs font-black text-stone-400 uppercase tracking-widest mb-4 block">Product Gallery</label>

//                     <div className="space-y-4">
//                       {/* Dropzone */}
//                       <label className="border-2 border-dashed border-stone-300 rounded-[1.5rem] p-6 bg-white transition-all hover:border-orange-300 flex flex-col items-center justify-center cursor-pointer group">
//                           <div className="p-3 bg-orange-50 text-[#EA580C] rounded-full mb-2 group-hover:scale-110 transition-transform">
//                               <UploadCloud size={24} />
//                           </div>
//                           <span className="text-xs font-bold text-stone-600">Add Images</span>
//                           <input type="file" hidden multiple onChange={handleImageChange} accept="image/*" />
//                       </label>

//                       {/* Image Preview Grid */}
//                       <div className="grid grid-cols-2 gap-3">
//                         {previewImages.map((img, index) => (
//                           <div key={index} className="relative group aspect-square">
//                             <img src={img} alt="" className="w-full h-full object-cover rounded-[1rem] border border-stone-200" />
//                             <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity rounded-[1rem] flex items-center justify-center">
//                                 <button type="button" onClick={() => removeImage(index)} className="p-2 bg-red-500 text-white rounded-full hover:scale-110 transition-transform">
//                                     <Trash2 size={16}/>
//                                 </button>
//                             </div>
//                             {index === 0 && (
//                               <span className="absolute top-2 left-2 bg-orange-600 text-[8px] text-white px-2 py-0.5 rounded-full font-bold">COVER</span>
//                             )}
//                           </div>
//                         ))}
//                       </div>
//                     </div>
//                 </div>

//                 <button type="submit" className="w-full text-white py-3 rounded-[1rem] font-black bg-[#EA580C] transition-all shadow-xl shadow-orange-900/10 flex items-center justify-center gap-3 group hover:scale-105">
//                     <Save size={20} className="group-hover:rotate-12 transition-transform" />
//                     {isEditMode ? "UPDATE PRODUCT" : "ADD PRODUCT"}
//                 </button>

//                 <p className="text-[10px] text-center text-stone-400 font-medium px-4">
//                     First image will be used as the primary display image.
//                 </p>
//               </div>
//             </div>

//             {/* RIGHT COLUMN: FORM DETAILS */}
//             <div className="lg:col-span-8 space-y-8 order-1 lg:order-2">
//               <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//                 <FormInput label="Product Name" icon={<Tag size={16} className="text-orange-600"/>}>
//                     <input required name="name" value={formData.name} onChange={handleChange} placeholder="e.g. Premium Fly Ash Bricks" className="form-input-style" />
//                 </FormInput>

//                 <FormInput label="Category / Type" icon={<Layers size={16} className="text-orange-600"/>}>
//                     <select required name="type" value={formData.type} onChange={handleChange} className="form-input-style appearance-none">
//                         <option value="">Select Type</option>
//                         <option>Darks</option>
//                         <option>Hamptons</option>
//                         <option>Classic Reds</option>
//                          <option>Multies</option>
//                         <option>Rumbled</option>
//                         <option>Yellows</option>
//                          <option>Reclaimed</option>
//                     </select>
//                 </FormInput>

//                 <FormInput label="Application Area" icon={<Settings size={16} className="text-orange-600"/>}>
//                     <select required name="application" value={formData.application} onChange={handleChange} className="form-input-style appearance-none">
//                         <option value="">Select Application</option>
//                         <option>Industrial</option>
//                         <option>Commercial</option>
//                         <option>Residential</option>
//                     </select>
//                 </FormInput>

//                 <FormInput label="Product Status" icon={<Info size={16} className="text-orange-600"/>}>
//                     <select name="status" value={formData.status} onChange={handleChange} className="form-input-style appearance-none">
//                         <option>Active</option>
//                         <option>InActive</option>
//                     </select>
//                 </FormInput>
//               </div>

//               <FormInput label="Short Description" icon={<Info size={16} className="text-orange-600"/>}>
//                   <input name="shortDesc" value={formData.shortDesc} onChange={handleChange} placeholder="One line catchphrase..." className="form-input-style" />
//               </FormInput>

//               {/* TECHNICAL SPECIFICATIONS SECTION FROM IMAGE */}
//               <FormInput label="Technical Specifications" icon={<Cpu size={16} className="text-orange-600"/>}></FormInput>
//               {/* <label className="text-xs font-black text-orange-600 uppercase tracking-widest mb-6 block">Technical Specifications</label> */}
//               <div className="rounded-[1.5rem]">
//                 <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                   <FormInput label="Strength" icon={<Zap size={16} className="text-orange-600"/>}>
//                       <input name="strength" value={formData.strength} onChange={handleChange} placeholder="e.g. 7.5 N/mm²" className="form-input-style" />
//                   </FormInput>

//                   <FormInput label="Size" icon={<Ruler size={16} className="text-orange-600"/>}>
//                       <input name="size" value={formData.size} onChange={handleChange} placeholder="e.g. 9&quot; x 4&quot; x 3&quot;" className="form-input-style" />
//                   </FormInput>

//                   <FormInput label="Weight" icon={<Weight size={16} className="text-orange-600"/>}>
//                       <input name="weight" value={formData.weight} onChange={handleChange} placeholder="e.g. 3.2 kg" className="form-input-style" />
//                   </FormInput>

//                   <FormInput label="Water Absorption" icon={<Droplets size={16} className="text-orange-600"/>}>
//                       <input name="waterAbsorption" value={formData.waterAbsorption} onChange={handleChange} placeholder="e.g. < 10%" className="form-input-style" />
//                   </FormInput>
//                 </div>
//               </div>

//               <FormInput label="Usage Guidelines" icon={<HelpCircle size={16} className="text-orange-600"/>}>
//                   <textarea name="usage" value={formData.usage} onChange={handleChange} rows="3" placeholder="How to use or install..." className="form-input-style" />
//               </FormInput>

//               <FormInput label="Detailed Description" icon={<Info size={16} className="text-orange-600"/>}>
//                   <textarea name="detailedDesc" value={formData.detailedDesc} onChange={handleChange} rows="5" placeholder="Write full details about the product..." className="form-input-style" />
//               </FormInput>
//             </div>

//           </form>
//         </div>
//       </div>

//       <style dangerouslySetInnerHTML={{ __html: `
//         .form-input-style {
//             width: 100%;
//             padding: 1rem 1.25rem;
//             background-color: #f9f8f7;
//             border: 1px solid #e7e5e4;
//             border-radius: 1rem;
//             outline: none;
//             font-size: 0.875rem;
//             font-weight: 600;
//             color: #1c1917;
//             transition: all 0.2s;
//         }
//         .form-input-style:focus {
//             border-color: #EA580C;
//             background-color: white;
//             box-shadow: 0 0 0 4px rgba(234, 88, 12, 0.05);
//         }
//       `}} />
//     </div>
//   );
// };

// const FormInput = ({ label, icon, children }) => (
//     <div className="space-y-2">
//       <label className="text-xs font-black text-stone-500 uppercase tracking-widest ml-1 flex items-center gap-2">
//         {icon}
//         {label}
//       </label>
//       {children}
//     </div>
// );

// export default ProductForm;
