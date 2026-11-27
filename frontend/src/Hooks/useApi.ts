import {useState, useEffect} from 'react';

export function useApi<T>(fn: ()=> Promise<T>, initial:T){
    const [data, setData] = useState(initial);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(()=>{
       fn()
       .then(setData)
       .catch((e:Error)=>setError(e.message))
       .finally(()=> setLoading(false))
    }, [fn]);

   return {data, loading, error}
   
}