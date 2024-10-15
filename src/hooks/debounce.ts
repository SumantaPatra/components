import { useEffect, useState } from "react";

export default function useDebounce<T>(value:T,timer=500){
  const [debouncedVal,setDebouncedVal] = useState(value);


  useEffect(()=>{
    
    const timerId = setTimeout(()=>{
       setDebouncedVal(value);
    },timer)

    return ()=>{
        clearTimeout(timerId)
    }

  },[timer, value])


  return debouncedVal;
}