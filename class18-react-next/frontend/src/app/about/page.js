"use client"
import { useState } from "react";
export default ()=>{

    // let count = 0;
    function inc(){
        // setCount(count+1);
        console.log(count);
        setCount((prev)=>{return prev+1})

    }


    let arr = [1,2,3,4,5];
    let newArr = [...arr,6];
    let obj = {name:"John", age:30};
    let newObj = {...obj, city:"New York"};

    let [info, setInfo] = useState({name:"John", age:30});
    function updateInfo(){
        setInfo((prev)=>{return {...prev, city:"New York"}});
    }

    let [nums,setNums] = useState([1,2,3]);
    function addNum(){
        setNums((prev)=>{return [...prev,4]});
    }
    console.log(info);
    console.log(nums);

    const [count, setCount] = useState(0);

    return <><h1>About Page</h1> <h2> {count}</h2><button onClick={(e)=>inc()}>Increment</button>
    <button onClick={(e)=>addNum()}>Add Number</button>
    <button onClick={(e)=>updateInfo()}>Update Info</button>
    </>
}