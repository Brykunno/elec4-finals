import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import CardActionArea from '@mui/material/CardActionArea';
import CardActions from '@mui/material/CardActions';

import "../styles/Product.css"


function Product ({product,onDelete}){

    
    const formattedDate = new Date(product.created_at).toLocaleDateString("en-US")
    return <div >
         {/* <Card sx={{ maxWidth: 345 }}>
      <CardActionArea>
        <CardMedia
          component="img"
          height="140"
          image={product.image}
          alt="green iguana"
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
          {product.title}
          </Typography>
          <Typography variant="body2" sx={{ color: 'text.secondary' }}>
          <p className="product-content">{product.content}</p>
          <p className="product-title">{formattedDate}</p>
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions>
        <Button size="small" color="primary">
          Share
        </Button>
      </CardActions>
    </Card> */}
    <div className="p-2 rounded-lg shadow-lg bg-gray-900 border border-gray-800 hover:scale-105 transition-all duration-150 hover:rotate-3">
        <img src={product.image} alt="" className='object-cover w-full h-72 mb-4'/>
        <div className="w-full">
            <h1 className='text-2xl font-bold '>{product.title}</h1>
            <p>Price: ₱{product.content}</p>
        </div>
    </div>
      
       
   
    </div>

}

export default Product