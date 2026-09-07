import React, { useState, useEffect } from "react";
import {
  ArrowLeft,
  Layers,
  Factory,
  HardHat,
  Settings,
  FileText,
  Truck,
  Image as ImageIcon,
} from "lucide-react";
import { motion } from "framer-motion";

/* ================= ANIMATION VARIANTS ================= */

const page = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
};

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: "easeOut" },
  },
};

const stagger = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.12 },
  },
};

const imageZoom = {
  hidden: { scale: 1.15, opacity: 0 },
  visible: {
    scale: 1,
    opacity: 1,
    transition: { duration: 0.6, ease: "easeOut" },
  },
};

/* ================= COMPONENT ================= */

const ProductDetails = ({ product, onBack }) => {
  const [detailedProduct, setDetailedProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const productId = product?._id;

useEffect(() => {
    const fetchFullDetails = async () => {
      if (!productId) return;

      try {
        setLoading(true);
        // Changed to GET and removed body/formData
        const response = await fetch(`https://wahrehousing-project.onrender.com/api/products/${productId}`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${localStorage.getItem("adminToken")}`,
          },
        });
        
        const data = await response.json();

        if (data.success) {
          setDetailedProduct(data.product);
        } else {
          console.error("Fetch failed:", data.message);
        }
      } catch (error) {
        console.error("Error fetching detailed data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchFullDetails();
  }, [productId]);


  /* ✅ Always open page from TOP */
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" });
  }, []);

  if (!product) return <ProductNotFound onBack={onBack} />;

  const [activeImg, setActiveImg] = useState(
    product.images?.[0] || product.image,
  );

  return (
    <motion.div
      className="min-h-screen bg-stone-100 p-4 text-black"
      variants={page}
      initial="hidden"
      animate="visible"
      transition={{ duration: 0.35 }}
    >
      <div className="rounded-xl overflow-hidden bg-white border border-stone-200">
        {/* ================= HERO IMAGE ================= */}
        <div className="relative h-[55vh] w-full overflow-hidden">
          <motion.img
            key={activeImg}
            src={activeImg}
            className="w-full h-full object-cover"
            variants={imageZoom}
            initial="hidden"
            animate="visible"
          />

          {/* Back Button */}
          <motion.button
            onClick={onBack}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.3 }}
            className="absolute top-6 left-6 flex items-center gap-2 px-4 py-2 rounded-lg bg-red-700 text-white text-xs font-bold uppercase tracking-widest"
          >
            <ArrowLeft size={14} /> Back
          </motion.button>

          {/* Thumbnails */}
          <div className="absolute bottom-6 right-6 flex gap-2">
            {product.images?.map((img, i) => (
              <motion.button
                key={i}
                whileHover={{ scale: 1.12 }}
                whileTap={{ scale: 0.96 }}
                onClick={() => setActiveImg(img)}
                className={`w-14 h-14 rounded-lg overflow-hidden border-2 transition ${activeImg === img
                    ? "border-red-700"
                    : "border-stone-300 opacity-70"
                  }`}
              >
                <img src={img} className="w-full h-full object-cover" />
              </motion.button>
            ))}
          </div>
        </div>

        {/* ================= HEADER ================= */}
        <motion.div
          className="bg-white px-6 py-6 border-b border-stone-200"
          variants={stagger}
          initial="hidden"
          animate="visible"
        >
          <div className="max-w-6xl mx-auto space-y-2">
            <motion.span
              variants={fadeUp}
              className="text-[10px] uppercase tracking-widest font-black text-red-700"
            >
              {product.status || "Active"}
            </motion.span>

            <motion.h1
              variants={fadeUp}
              className="text-3xl md:text-4xl font-black uppercase"
            >
              {product.productName}
            </motion.h1>

            <motion.p
              variants={fadeUp}
              className="text-sm text-stone-600 max-w-3xl"
            >
              {product.shortDescription || "High quality construction material"}
            </motion.p>
          </div>
        </motion.div>

        {/* ================= CONTENT ================= */}
        <motion.div
          className="max-w-6xl mx-auto px-6 py-10 space-y-14"
          variants={stagger}
          initial="hidden"
          animate="visible"
        >
          {/* INFO GRID */}
          <motion.div
            className="grid grid-cols-2 md:grid-cols-4 gap-4"
            variants={stagger}
          >
            <AnimatedCard>
              <InfoCard
                icon={<Layers />}
                label="Category"
                value={product.productType}
              />
            </AnimatedCard>
            <AnimatedCard>
              <InfoCard
                icon={<HardHat />}
                label="Application"
                value={product.usageArea}
              />
            </AnimatedCard>
            <AnimatedCard>
              <InfoCard
                icon={<Factory />}
                label="Manufacturer"
                value={product.brand || "In-House"}
              />
            </AnimatedCard>
          </motion.div>

          {/* DESCRIPTION */}
          <AnimatedSection title="Product Overview" icon={<FileText />}>
            <p className="text-sm leading-loose text-stone-700 max-w-4xl">
              {product.detailedDescription ||
                "Detailed description not available."}
            </p>
          </AnimatedSection>

          {/* SPECIFICATIONS */}
          <AnimatedSection title="Technical Specifications" icon={<Settings />}>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {[
                // ["Brick Type", product.brickType || "Fly Ash"],
                ["Size", product.specifications?.size || "190 × 90 × 90 mm"],
                ["Strength", product.specifications?.strength || "10 N/mm²"],
                [
                  "Water Absorption",
                  product.specifications?.waterAbsorption || "< 15%",
                ],
                ["Finish", product.finish || "Smooth"],
                ["weight", product.specifications?.weight || "NA"],
              ].map(([label, value], i) => (
                <AnimatedCard key={i}>
                  <Spec label={label} value={value} />
                </AnimatedCard>
              ))}
            </div>
          </AnimatedSection>

          {/* LOGISTICS */}
          <AnimatedSection title="Logistics & Packaging" icon={<Truck />}>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {[
                ["Packaging", product.packaging || "Palletized"],
                ["Dispatch Time", product.dispatchTime || "2–3 Days"],
                ["Transport", product.transport || "Truck / Container"],
                ["Stock", product.status || "Available"],
              ].map(([label, value], i) => (
                <AnimatedCard key={i}>
                  <Spec label={label} value={value} />
                </AnimatedCard>
              ))}
            </div>
          </AnimatedSection>
        </motion.div>
      </div>
    </motion.div>
  );
};

/* ================= REUSABLE ANIMATED UI ================= */

const AnimatedSection = ({ title, icon, children }) => (
  <motion.div variants={fadeUp} className="space-y-6">
    <h3 className="flex items-center gap-3 text-xs font-black uppercase tracking-[0.3em] text-red-700 border-l-2 border-red-700 pl-3">
      {icon} {title}
    </h3>
    {children}
  </motion.div>
);

const AnimatedCard = ({ children }) => (
  <motion.div
    variants={fadeUp}
    whileHover={{ y: -6 }}
    transition={{ duration: 0.25 }}
  >
    {children}
  </motion.div>
);

/* ================= UI PARTS ================= */

const InfoCard = ({ icon, label, value }) => (
  <div className="bg-white border border-stone-200 p-5 rounded-xl">
    <div className="flex items-center gap-2 text-stone-500 mb-2">
      {icon}
      <span className="text-[9px] uppercase tracking-widest font-black">
        {label}
      </span>
    </div>
    <p className="text-sm font-bold truncate">{value}</p>
  </div>
);

const Spec = ({ label, value }) => (
  <div className="bg-stone-100 border border-stone-200 p-4 rounded-xl">
    <p className="text-[10px] uppercase tracking-widest text-stone-600">
      {label}
    </p>
    <p className="text-sm font-bold mt-1">{value}</p>
  </div>
);

const ProductNotFound = ({ onBack }) => (
  <div className="min-h-screen flex items-start justify-center pt-20">
    <div className="text-center space-y-6">
      <ImageIcon size={48} className="mx-auto opacity-20" />
      <h2 className="text-sm uppercase tracking-widest font-black">
        Product Not Found
      </h2>
      <button
        onClick={onBack}
        className="text-xs uppercase tracking-widest border-b border-red-700 text-red-700"
      >
        Go Back
      </button>
    </div>
  </div>
);

export default ProductDetails;