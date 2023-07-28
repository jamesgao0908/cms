import { useEffect, useState } from "react";
import axios from "axios";

const App = () => {

  const [data, setdata] = useState();
  
  useEffect(()=>{
    axios.get('http://localhost:5001/data')
    .then((e)=>{
      console.log(e);
      setdata(e.data)
    })

  },[]);

  return (<div>
    <h1>{ !!data && data.name}</h1>
    <h2>{ !!data && data.favorite}</h2>
  </div>)
}

export default App;