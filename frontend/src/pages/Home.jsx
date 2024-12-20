import { useState, useEffect } from "react";
import api from "../api";
import Product from "../components/Product";
import "../styles/Home.css"
import LoadingIndicator from "../components/LoadingIndicator";
import CustomerLayout from "../components/CustomerLayout";

function Home() {
  const [products, setProducts] = useState([]);
  const [content, setContent] = useState("");
  const [title, setTitle] = useState("");
  const [loading, setLoading] = useState(false);

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

  const createProduct = (e) => {
    setLoading(true);
    e.preventDefault();
    api
      .post("/api/products/", { content, title })
      .then((res) => {
        if (res.status === 201){
            alert("Product created!");  
            setLoading(false);
        } 
        else alert("Failed to make product.");
        getProducts();
      })
      .catch((err) => alert(err));
  };

  return (
    <CustomerLayout>
      <div className="py-12 max-w-7xl mx-auto">
      <div>
        <h2 className=" text-center text-2xl font-bold mb-4">Products</h2>
       <div className="grid grid-cols-4 gap-4">
       {products.map((product) => (
          <Product product={product} onDelete={deleteProduct} key={product.id} />
        ))}
       </div>
      </div>
      {/* <h2>Create a Product</h2>
      <form onSubmit={createProduct}>
        <label htmlFor="title">Title:</label>
        <br />
        <input
          type="text"
          id="title"
          name="title"
          required
          onChange={(e) => setTitle(e.target.value)}
          value={title}
        />
        <br />
        <label htmlFor="content">Content:</label>
        <br />

        <textarea
          id="content"
          name="content"
          required
          onChange={(e) => setContent(e.target.value)}
          value={content}
        ></textarea>
        <br />
        {loading && <LoadingIndicator/>}

        <input type="submit" value="Submit" />
      </form> */}
    </div>
    </CustomerLayout>
  );
}
export default Home;
