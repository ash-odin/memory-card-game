import { useState, useEffect } from "react";
import "./App.css";

const baseURL = "https://pokeapi.co/api/v2/pokemon";

function Card({ pokedexNmbr, onCardClick}) {
  const [name, setName] = useState('');
  const [source, setSource] = useState('');

  useEffect(() => {
    fetch(`${baseURL}/${pokedexNmbr}`)
    .then(response => response.json())
    .then(data => {
      setName(data.name.charAt(0).toUpperCase() + data.name.slice(1));
      setSource(data.sprites.front_default)
    })
    .catch(error => console.error("Error: ", error))
  }, [pokedexNmbr])

  return (
    <button onClick={() => {onCardClick(pokedexNmbr)}}>
      <img src={source} alt={`Pokemon# ${pokedexNmbr}`}/>
      <h4>{name}</h4>
    </button>
  )
}

function App() {
  const [round, setRound] = useState(0);
  const [cardsToShow, setCardsToShow] = useState([]);
  const [chosen, setChosen] = useState([]);

  const handleChoice = (choice) => {
    const nextChosen = chosen.slice();
    nextChosen.push(choice)
    setChosen(nextChosen);
  }

  let pokedexNmbr = Math.floor(Math.random() * 252);

  return (
    <>
      <div className="header"></div>
      <div className="game">
        <div className="cardContainer">
          <Card pokedexNmbr={pokedexNmbr} onCardClick={handleChoice}/>
        </div>
      </div>
      <div className="footer"></div>
    </>
  );
}

export default App;
