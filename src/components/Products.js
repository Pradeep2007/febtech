import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  Search,
  Plus,
  Edit,
  Trash2,
  Package,
  Pill,
} from "lucide-react";
import { getProducts, deleteProduct, addProduct, updateProduct } from "../firebase/firestore";
import ProductModal from "./ProductModal";
import toast from "react-hot-toast";
import { testProductOperations, quickProductTest } from "../utils/productTest";

const Products = () => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [showModal, setShowModal] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [isAdmin, setIsAdmin] = useState(false);

  const categories = [
    { value: "all", label: "All Products", icon: Package },
    { value: "medicines", label: "Medicines", icon: Pill },
    { value: "equipment", label: "Equipment", icon: Package },
    { value: "diagnostics", label: "Diagnostics", icon: Package },
    { value: "surgical", label: "Surgical", icon: Package },
  ];

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const productsData = await getProducts();
        setProducts(productsData);
        setFilteredProducts(productsData);
      } catch (error) {
        console.error("Error fetching products:", error);
        // Fallback dummy data
        const dummyProducts = [
          {
            id: "1",
            name: "Digital Blood Pressure Monitor",
            category: "equipment",
            sku: "BP-001",
            price: 299.99,
            description: "Accurate digital blood pressure monitoring device",
            specifications: {
              Display: "Large LCD display",
              Memory: "99 readings memory",
              Power: "4x AA batteries",
              "Cuff Size": "22-42 cm",
            },
            image: "/api/placeholder/300/300",
            inStock: true,
            stockQuantity: 50,
          },
          {
            id: "2",
            name: "Paracetamol 500mg Tablets",
            category: "medicines",
            sku: "MED-001",
            price: 12.99,
            description: "Pain relief and fever reduction tablets",
            specifications: {
              "Active Ingredient": "Paracetamol 500mg",
              "Pack Size": "100 tablets",
              Dosage: "1-2 tablets every 4-6 hours",
              Storage: "Store below 25°C",
            },
            image: "/api/placeholder/300/300",
            inStock: true,
            stockQuantity: 200,
          },
          {
            id: "3",
            name: "Surgical Gloves - Latex Free",
            category: "surgical",
            sku: "SG-001",
            price: 24.99,
            description: "Powder-free surgical gloves for medical procedures",
            specifications: {
              Material: "Nitrile",
              Size: "Medium",
              Powder: "Powder-free",
              Sterile: "Yes",
              Count: "100 pairs per box",
            },
            image: "/api/placeholder/300/300",
            inStock: true,
            stockQuantity: 100,
          },
          {
            id: "4",
            name: "COVID-19 Rapid Test Kit",
            category: "diagnostics",
            sku: "RT-001",
            price: 89.99,
            description: "Rapid antigen test for COVID-19 detection",
            specifications: {
              "Test Type": "Antigen",
              "Result Time": "15 minutes",
              Accuracy: "95%+",
              Storage: "2-30°C",
              "Kit Contents": "Test device, buffer, swab",
            },
            image: "/api/placeholder/300/300",
            inStock: true,
            stockQuantity: 75,
          },
        ];
        setProducts(dummyProducts);
        setFilteredProducts(dummyProducts);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  useEffect(() => {
    let filtered = products;

    // Filter by search term
    if (searchTerm) {
      filtered = filtered.filter(
        (product) =>
          product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          product.description
            .toLowerCase()
            .includes(searchTerm.toLowerCase()) ||
          product.sku.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Filter by category
    if (selectedCategory !== "all") {
      filtered = filtered.filter(
        (product) => product.category === selectedCategory
      );
    }

    setFilteredProducts(filtered);
  }, [products, searchTerm, selectedCategory]);

  const handleDelete = async (productId) => {
    if (window.confirm("Are you sure you want to delete this product?")) {
      try {
        await deleteProduct(productId);
        setProducts(products.filter((p) => p.id !== productId));
        toast.success("Product deleted successfully");
      } catch (error) {
        console.error("Error deleting product:", error);
        toast.error("Failed to delete product");
      }
    }
  };

  const handleTestProducts = async () => {
    try {
      toast.loading("Running product tests...");
      const success = await testProductOperations();
      if (success) {
        toast.success("All product tests passed!");
        // Refresh products list
        const productsData = await getProducts();
        setProducts(productsData);
        setFilteredProducts(productsData);
      } else {
        toast.error("Some product tests failed. Check console for details.");
      }
    } catch (error) {
      console.error("Test error:", error);
      toast.error("Product test failed: " + error.message);
    }
  };

  const handleQuickTest = async () => {
    try {
      toast.loading("Running quick test...");
      await quickProductTest();
      toast.success("Quick test passed!");
      // Refresh products list
      const productsData = await getProducts();
      setProducts(productsData);
      setFilteredProducts(productsData);
    } catch (error) {
      console.error("Quick test error:", error);
      toast.error("Quick test failed: " + error.message);
    }
  };

  const handleEdit = (product) => {
    setEditingProduct(product);
    setShowModal(true);
  };

  const handleAddNew = () => {
    setEditingProduct(null);
    setShowModal(true);
  };

  const handleModalClose = () => {
    setShowModal(false);
    setEditingProduct(null);
  };

  const handleProductSave = async (productData) => {
    try {
      if (editingProduct) {
        // Update existing product in Firestore
        console.log('🔄 Updating product in Firestore...', editingProduct.id);
        await updateProduct(editingProduct.id, productData);
        
        // Update local state
        setProducts(
          products.map((p) =>
            p.id === editingProduct.id ? { ...p, ...productData } : p
          )
        );
        toast.success("Product updated successfully");
        console.log('✅ Product updated successfully');
      } else {
        // Add new product to Firestore
        console.log('🔄 Adding new product to Firestore...', productData);
        const docId = await addProduct(productData);
        
        // Add to local state with the Firestore document ID
        const newProduct = {
          id: docId,
          ...productData,
          createdAt: new Date(),
          updatedAt: new Date(),
        };
        setProducts([...products, newProduct]);
        toast.success("Product added successfully");
        console.log('✅ Product added successfully with ID:', docId);
      }
      handleModalClose();
    } catch (error) {
      console.error('❌ Error saving product:', error);
      const errorMessage = error.message || "Failed to save product. Please try again.";
      toast.error(errorMessage);
      
      // Log additional debugging info
      if (error.originalError) {
        console.error("Original error:", error.originalError);
      }
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-light-gray flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-teal-prime mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading products...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-light-gray">
      {/* Header */}
      <section className="gradient-bg py-20">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center text-white"
          >
            <h1 className="text-5xl md:text-6xl font-bold mb-6">
              Product Catalogue
            </h1>
            <p className="text-xl md:text-2xl text-light-teal max-w-3xl mx-auto">
              Discover our comprehensive range of medical supplies and
              pharmaceuticals
            </p>
          </motion.div>
        </div>
      </section>

      {/* Filters and Search */}
      <section className="py-8 bg-white shadow-sm">
        <div className="container-custom">
          <div className="flex flex-col lg:flex-row gap-4 items-center justify-between">
            {/* Search */}
            <div className="relative flex-1 max-w-md">
              <Search
                className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                size={20}
              />
              <input
                type="text"
                placeholder="Search products..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-prime focus:border-transparent"
              />
            </div>

            {/* Category Filter */}
            <div className="flex flex-wrap gap-2">
              {categories.map((category) => {
                const Icon = category.icon;
                return (
                  <button
                    key={category.value}
                    onClick={() => setSelectedCategory(category.value)}
                    className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-colors ${
                      selectedCategory === category.value
                        ? "bg-teal-prime text-white"
                        : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                    }`}
                  >
                    <Icon size={16} />
                    <span>{category.label}</span>
                  </button>
                );
              })}
            </div>

            {/* Admin Controls */}
            <div className="flex gap-2">
              <button
                onClick={() => setIsAdmin(!isAdmin)}
                className={`px-4 py-2 rounded-lg transition-colors ${
                  isAdmin
                    ? "bg-orange text-white"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
              >
                {isAdmin ? "Exit Admin" : "Admin Mode"}
              </button>
              {isAdmin && (
                <>
                  <button
                    onClick={handleAddNew}
                    className="btn-primary flex items-center space-x-2"
                  >
                    <Plus size={16} />
                    <span>Add Product</span>
                  </button>
                  <button
                    onClick={handleQuickTest}
                    className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
                  >
                    Quick Test
                  </button>
                  <button
                    onClick={handleTestProducts}
                    className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                  >
                    Full Test
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Products Grid */}
      <section className="section-padding">
        <div className="container-custom">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredProducts.map((product, index) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
                className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300 group"
              >
                {/* Product Image */}
                <div className="relative h-48 bg-gradient-to-br from-teal-prime to-blue flex items-center justify-center">
                  <Package className="w-16 h-16 text-white" />
                  {isAdmin && (
                    <div className="absolute top-2 right-2 flex gap-1">
                      <button
                        onClick={() => handleEdit(product)}
                        className="p-1 bg-white/20 rounded hover:bg-white/30 transition-colors"
                      >
                        <Edit size={16} className="text-white" />
                      </button>
                      <button
                        onClick={() => handleDelete(product.id)}
                        className="p-1 bg-white/20 rounded hover:bg-white/30 transition-colors"
                      >
                        <Trash2 size={16} className="text-white" />
                      </button>
                    </div>
                  )}
                </div>

                {/* Product Info */}
                <div className="p-6">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm text-teal-prime font-semibold uppercase">
                      {product.category}
                    </span>
                    <span className="text-sm text-gray-500">
                      SKU: {product.sku}
                    </span>
                  </div>

                  <h3 className="text-lg font-bold text-gray-900 mb-2 group-hover:text-teal-prime transition-colors">
                    {product.name}
                  </h3>

                  <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                    {product.description}
                  </p>

                  <div className="flex items-center justify-between mb-4">
                    <span className="text-2xl font-bold text-teal-prime">
                      ${product.price}
                    </span>
                    <span
                      className={`px-2 py-1 rounded-full text-xs font-semibold ${
                        product.inStock
                          ? "bg-green-100 text-green-800"
                          : "bg-red-100 text-red-800"
                      }`}
                    >
                      {product.inStock ? "In Stock" : "Out of Stock"}
                    </span>
                  </div>

                  <button className="w-full btn-primary">View Details</button>
                </div>
              </motion.div>
            ))}
          </div>

          {filteredProducts.length === 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-16"
            >
              <Package className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-600 mb-2">
                No products found
              </h3>
              <p className="text-gray-500">
                Try adjusting your search or filter criteria
              </p>
            </motion.div>
          )}
        </div>
      </section>

      {/* Product Modal */}
      {showModal && (
        <ProductModal
          product={editingProduct}
          onClose={handleModalClose}
          onSave={handleProductSave}
        />
      )}
    </div>
  );
};

export default Products;

