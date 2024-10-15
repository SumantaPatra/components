import { useCallback, useEffect, useState } from "react"
import './product.css'
import useDebounce from "../hooks/debounce";
import { useDispatch } from "react-redux";
import { addProduct, removeProduct } from "../redux/productSlice";
interface ProductType {
    id: string; // or number, depending on your data
    title: string;
    images: string[];
    price: number;
}

export default function ProductList({searchItem,orderBy}:{searchItem:string,orderBy:string}){
const [products,setProduct] = useState<ProductType[]|null>(null);
const [pages,setPages] = useState(1);
const [totalItem,setTotalItem] = useState(0);
const debouncedSearch = useDebounce(searchItem);




const fetchSearchResult = useCallback(function (skip:number){
    fetch(`https://dummyjson.com/products/search?q=${debouncedSearch}&skip=${skip}&limit=20`)
     .then((res)=>res.json())
     .then((data)=>{
        setProduct(data.products)
        setTotalItem(data.total)
     })
},[debouncedSearch])

function fetchProduct(skip:number){
    fetch(`https://dummyjson.com/products?skip=${skip}&limit=20`)
    .then((res)=>res.json())
    .then((data)=> {
        setProduct(data.products)
        setTotalItem(data.total)
    })
}



useEffect(()=>{
  if(orderBy === "asc"){
     const sortedProduct = [...(products ?? [])].sort((p1, p2) => p1.price - p2.price);
     console.log(sortedProduct);
     setProduct(sortedProduct);
  }else if(orderBy === "desc"){
    const sortedProduct = [...(products ?? [])].sort((p1, p2) => p2.price - p1.price);
    console.log(sortedProduct);
    setProduct(sortedProduct);
  }

// eslint-disable-next-line react-hooks/exhaustive-deps
},[orderBy])



 useEffect(()=>{
    const skip = (pages-1)*20
    if(debouncedSearch) fetchSearchResult(skip)
     else fetchProduct(skip)   
 },[fetchSearchResult, pages, debouncedSearch])


 const clickHandler = (index:number)=>{
   setPages(index)
 }



    return (
        <div>
           
            <div className="product-cont">
                {
                     products && products?.length > 0 && (
                        products?.map((product)=>(
                            <Product key={product.id} id={product.id} title={product.title} image={product.images[0]} price={product.price}/>
                        ))
                     )
                }
                
            </div>

            {
                products && products?.length > 0 && (
                    <div className="pagination-cont">
                      <button disabled={pages<=1} onClick={()=>{
                        setPages(pages-1);
                      }}>prev</button>
                         {
                            [...Array(Math.ceil(totalItem/20))].map((_,index)=>{
                                return <button onClick={()=>clickHandler(index+1)} className={`"pg-btn" ${index+1 === pages && "pg-active"}`}>{index+1}</button>
                            })
                         }   
                      <button 
                       disabled={pages>=Math.ceil(totalItem/20)}
                       onClick={()=>{
                        setPages(pages+1)
                       }}
                      >next</button>
                    </div>
                )
            }


           
        </div>
    )
}
interface ProductProps{
    title:string,
    image:string,
    price:number,
    id:string
}
function Product({
    title,
    image,
    price,
    id
}:ProductProps){
    const dispatch = useDispatch();
    const addHandler = ()=>{
      dispatch(addProduct({
        id:id,
        title:title,
        price:price
      }))
    }
    const removeHandler= ()=>{
        dispatch(removeProduct({id}))
    }

    return (
        <div className="product-card">
            <img src={image} alt={title}/>
            <div>
            <div>{title}</div>
            <div>{price}</div>
            </div>
            <div className="product-btn">
                <button onClick={addHandler}>Add</button>
                <button onClick={removeHandler}>remove</button>
            </div>
        </div>
    )
}