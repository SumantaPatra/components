import Search from "./search";
import './header.css'
import { useSelector } from "react-redux";
import { RootState } from "../redux/store";


export default function Header({onSearch,onSort}:{onSearch:(q:string)=>void,onSort:(q:string)=>void}){
    const cart = useSelector((store:RootState)=>store.cart.arr)
    return (
        <nav className="nav-cont">
            <span>logo</span>

            <Search onSearch={onSearch}/>

            <span>{cart.length} items</span>

            <select onChange={(e)=>onSort(e.target.value)} name="" id="">
                <option disabled value="">sort</option>
                <option value="desc">desc</option>
                <option value="asc">asc</option>
            </select>
        </nav>
    )
}