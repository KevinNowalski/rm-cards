import {useEffect, useState} from "react"
import axios from "axios";
import jquery from "jquery";

function App() {
  const [ value, setValue ] = useState([])
  const [ data, setData ] = useState([])

  useEffect(() => {
    axios.get("https://rickandmortyapi.com/api/character").then(response => {
      setData(response.data.results)
    })
  }, [])

  function deleteCard(id){
    const newData = data.filter(item => item.id !== id);
    setData(newData);
  }

  return (
    <div className="App">
      <header>
        <a href="./" id="logo"><img src="images/logo.png" alt="logo" /></a>
      </header>
        <h1>rick and Morty Characters</h1>
        <div id="filter">
          <label htmlFor="filter">Filter by</label>
          <input type="text" onChange={e => setValue(e.target.value)} />
        </div>
     <div id="cards">
       {
       data
       .filter(item => {
        if (!value) return true
        if (item.name.toLowerCase().includes(value) || item.name.includes(value)) {
          return true
        }
      })
       .map((item) => {
         return (
           <div className="card">
             <img src={item.image} alt="card image" />
             <h1>{item.name}</h1>
             <button type="button" onClick={() => deleteCard(item.id)}>delete</button>
           </div>
         )
       })
       }
     </div>
    </div>
  );
}

export default App;