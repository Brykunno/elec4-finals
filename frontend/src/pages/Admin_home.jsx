import { useState, useEffect } from "react";
import api from "../api";
import Products from "../components/Products";
import LoadingIndicator from "../components/LoadingIndicator";
import "../styles/Home.css";
import AdminLayout from "../components/AdminLayout";
import "../styles/modal.css";

function Admin_home() {
  const [products, setProducts] = useState([]);
  const [content, setContent] = useState("");
  const [title, setTitle] = useState("");
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [open, setOpen] = useState(false); // State to control modal visibility

  useEffect(() => {
    document.title = "Home";
    getProducts();
  }, []);

  const getProducts = () => {
    api
      .get("/api/products/")
      .then((res) => res.data)
      .then((data) => {
        setProducts(data);
        console.log(data);
      })
      .catch((err) => alert(err));
  };

  const deleteProduct = (id) => {
    api
      .delete(`/api/products/delete/${id}/`)
      .then((res) => {
        if (res.status === 204) alert("Product deleted!");
        else alert("Failed to delete product.");
        getProducts();
      })
      .catch((error) => alert(error));
  };

  const handleEditProduct = (product) => {
    setEditingProduct(product);
    setTitle(product.title);
    setContent(product.content);
    setImage(null); // Clear the image field so the admin can select a new one
    setOpen(true); // Open the modal
  };

  const handleSubmit = (e) => {
    setLoading(true);
    e.preventDefault();

    const formData = new FormData();
    formData.append("title", title);
    formData.append("content", content);
    if (image) formData.append("image", image);

    const apiMethod = editingProduct ? api.put : api.post;
    const apiUrl = editingProduct ? `/api/products/update/${editingProduct.id}/` : "/api/products/";

    apiMethod(apiUrl, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    })
      .then((res) => {
        if (res.status === 201 || res.status === 200) {
          alert(editingProduct ? "Product updated!" : "Product created!");
        } else alert("Failed to create/update product.");
        setLoading(false);
        setEditingProduct(null);
        setOpen(false); // Close the modal
        getProducts();
      })
      .catch((err) => alert(err));
  };

  const handleOpen = () => {
    setOpen(true);
    setEditingProduct(null); // Ensure the form is in "create" mode
    setTitle("");
    setContent("");
    setImage(null);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <AdminLayout>
      <div>
        <div>
          <div className="flex justify-between">
            <h2 className="text-2xl font-bold">Products</h2>
            <button className="bg-blue-500 p-1 px-4 rounded-lg" onClick={handleOpen}>
              Add New Product
            </button>
          </div>
          <div className="grid grid-cols-4 gap-5 p-10">
            {products.map((product) => (
              <Products
                product={product}
                onDelete={deleteProduct}
                onEdit={handleEditProduct}
                key={product.id}
              />
            ))}
          </div>
        </div>

        {/* Simple Modal */}
        {open && (
          <div className="modal">
            <div className="modal-content">
              <span className="close" onClick={handleClose}>
                &times;
              </span>
              <h2>{editingProduct ? "Edit Product" : "Create a Product"}</h2>
              <form onSubmit={handleSubmit} className="bg-transparent">
                <label htmlFor="title">Title:</label>
                <br />
                <input
                  type="text"
                  id="title"
                  name="title"
                  className="bg-gray-950 border border-gray-800 w-full"
                  required
                  onChange={(e) => setTitle(e.target.value)}
                  value={title}
                />
                <br />
                <label htmlFor="content">Price:</label>
                <br />
                <input
                  id="content"
                  type="text"
                  name="content"
                  required
                  onChange={(e) => setContent(e.target.value)}
                  className="bg-gray-950 border border-gray-800 w-full"
                  value={content}
                ></input>
                <br />
                <label htmlFor="image">Product Image:</label>
                <br />
                <input
                  type="file"
                  id="image"
                  className="bg-gray-950 border border-gray-800 w-full"
                  name="image"
                  accept="image/*"
                  onChange={(e) => setImage(e.target.files[0])}
                />
                <br />
                {loading && <LoadingIndicator />}
                <button type="submit" className="bg-blue-500  p-1 px-4 rounded-lg mt-2">
                  {editingProduct ? "Update" : "Submit"}
                </button>
              </form>
            </div>
          </div>
        )}
      </div>
    </AdminLayout>
  );
}

export default Admin_home;
