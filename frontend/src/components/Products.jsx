import "../styles/Product.css";

import * as React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import CardActionArea from "@mui/material/CardActionArea";
import CardActions from "@mui/material/CardActions";

function Products({ product, onDelete, onEdit }) {
  const formattedDate = new Date(product.created_at).toLocaleDateString(
    "en-US"
  );

  return (
    <div>
      {/* <Card sx={{ maxWidth: 345 }}>
        <CardActionArea>
          <CardMedia
            component="img"
            className="product-image"
            image={product.image}
            alt="green iguana"
          />
          <CardContent>
            <Typography gutterBottom variant="h5" component="div">
              {product.title}
            </Typography>
            <Typography variant="body2" sx={{ color: "text.secondary" }}>
              <p className="product-content">{product.content}</p>
              <p className="product-title">{formattedDate}</p>
            </Typography>
          </CardContent>
        </CardActionArea>
        <CardActions>
          <Button size="small" color="primary" onClick={() => onEdit(product)}>
            Edit
          </Button>
          <Button
            size="small"
            color="error"
            onClick={() => onDelete(product.id)}
          >
            Delete
          </Button>
        </CardActions>
      </Card> */}
      <div className="p-2 rounded-lg shadow-lg bg-gray-900 border border-gray-800 hover:scale-105 transition-all duration-150 hover:rotate-3">
        <img src={product.image} alt="" className='object-cover w-full h-72 mb-4'/>
        <div className="w-full mb-4">
            <h1 className='text-2xl font-bold '>{product.title}</h1>
            <p>Price: ₱{product.content}</p>
        </div>
        <div className="space-x-2">
        {/* <Button size="small" color="primary" onClick={() => onEdit(product)}>
            Edit
          </Button> */}
          <button className="bg-blue-500 p-1 px-4 rounded-lg" onClick={() => onEdit(product)}>
            Edit
          </button>
          <button className="bg-red-500 p-1 px-4 rounded-lg" onClick={() => onDelete(product.id)}>
            Delete
          </button>
          {/* <Button
            size="small"
            color="error"
            onClick={() => onDelete(product.id)}
          >
            Delete
          </Button> */}
        </div>
    </div>
    </div>
  );
}

export default Products;
