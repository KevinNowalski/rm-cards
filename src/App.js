import {useEffect, useState} from "react"
import './App.scss'
import axios from "axios";
import Slider from "react-slick"

function App() {
  const [ data, setData ] = useState([])
  const [ value, setValue ] = useState([])
  const [ isLoading, setLoading ] = useState(true);

  useEffect(() => {
    axios.get("https://rickandmortyapi.com/api/character").then(response => {
      setData(response.data.results);
      setLoading(false);
      console.log(data);
    })
   
  }, [])

  if (isLoading) {
    return <div className="App">Loading...</div>;
  }

  else {

    var settings = {
      dots: false,
      infinite: false,
      speed: 500,
      rows: 2,
      slidesPerRow: 4,
      slidesToScroll: 1,
      centerPadding: '15px',
      responsive: [
        {
          breakpoint: 1280,
          settings: {
            slidesPerRow: 3
          }
        },
        {
          breakpoint: 991,
          settings: {
            slidesPerRow: 1
          }
        }
      ]
    };

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
          <div className="container">
            <label htmlFor="filter">Filter by</label>
            <input type="text" placeholder="Enter the text" onChange={e => setValue(e.target.value)} />
          </div>
        </div>
        <div id="cards">
        <div className="container">
          <Slider {...settings}>
            {
            data
            .filter(item => {
              console.log(value)
              if (!value) return true
              if (item.name.toLowerCase().includes(value) || item.name.includes(value)) {
                return true
              }
            })
            .map((item) => {
              return (
                <div className="card" key="{item}">
                  <div>
                    <img src={item.image} alt="card image" />
                    <div className="name-delete">
                      <h2>{item.name}</h2>
                      <button type="button" onClick={() => deleteCard(item.id)}>delete</button>
                    </div>
                  </div>
                </div>
              )
            })
            }
            </Slider>
        </div>
        </div>
      </div>
    );
  }
}

export default App;