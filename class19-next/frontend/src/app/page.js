"use client";
import Image from "next/image";
import styles from "./page.module.css";
import { useEffect } from "react";
import { useState } from "react";
import axios from "axios";


export default function Home() {
  const [count, setCount] = useState(0);
  const [products, setProducts] = useState([]);
  function inc(){
        // setCount(count+1);
        console.log(count);
        setCount((prev)=>{return prev+1})

    }

    const getProducts=async()=>{
      try {
        let res = await axios.get("http://localhost:4000/user/all/products",
          {withCredentials:true}
        );
        setProducts(res.data.products);
      } catch (error) {
        console.log(error);
        
      }
    }

  useEffect(() => {
    getProducts();
    console.log("Home component mounted");
  }, [count]);
  return (
    <div>
      <h2> {count}</h2><button onClick={(e)=>inc()}>Increment</button>
      {products.map((el)=>{
        return <div key={el._id} style={{border:"1px solid black", margin:"10px", padding:"10px"}}>
          <h3>{el.name}</h3>
          <h4>{el.price}</h4>
          <p>{el.description}</p>
        </div>
      })}
    </div>
  );
}
