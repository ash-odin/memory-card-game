import { useState, useEffect } from "react";
import "./App.css";

const baseURL = "https://pokeapi.co/api/v2/pokemon";

function Card({ pokedexNmbr, onCardClick }) {
  const [name, setName] = useState("");
  const [source, setSource] = useState("");

  useEffect(() => {
    fetch(`${baseURL}/${pokedexNmbr}`)
      .then((response) => response.json())
      .then((data) => {
        setName(data.name.charAt(0).toUpperCase() + data.name.slice(1));
        setSource(data.sprites.front_default);
      })
      .catch((error) => console.error("Error: ", error));
  }, []);

  return (
    <button
      className="card"
      onClick={() => {
        onCardClick(pokedexNmbr);
      }}
    >
      <img className="sprite" src={source} alt={`Pokemon# ${pokedexNmbr}`} />
      <h4>{name}</h4>
    </button>
  );
}

function App() {
  // const [history, setHistory] = useState([Array(5).fill(null)]);
  const [round, setRound] = useState(1);
  const [status, setStatus] = useState("New game");
  const [choices, setChoices] = useState([]);

  const handleStart = () => {
    setStatus("In progress");
  };

  const handleChoice = (choice) => {
    if (choices.includes(choice)) {
      setStatus("You lose");
    } else if (round === 8) {
      setStatus("You win");
    } else {
      const nextChoices = choices.slice();
      nextChoices.push(choice);
      setChoices(nextChoices);
      setRound((prevRound) => prevRound + 1);
    }
  };

  const randomChoices = [];

  for (let i = 0; i < 9 - (round - 1); i++) {
    let randomPokemon = Math.floor(Math.random() * 252);
    // Try again if the random pokemon is in the choices
    while (
      choices.includes(randomPokemon || randomChoices.includes(randomPokemon))
    ) {
      randomPokemon = Math.floor(Math.random() * 252);
    }
    randomChoices.push(randomPokemon);
  }

  const cardsToShow = [...choices, ...randomChoices];
  const shuffledCards = shuffleArray(cardsToShow);

  return (
    <>
      <div className="game">
        {status === "New game" && (
          <button onClick={handleStart} className="startGame">
            Start game
          </button>
        )}

        {status === "In progress" && (
          <div className="cardContainer">
            {shuffledCards.map((pokedexNmbr, index) => {
              return (
                <Card
                  key={`${pokedexNmbr} ${index}`}
                  pokedexNmbr={pokedexNmbr}
                  onCardClick={handleChoice}
                />
              );
            })}
          </div>
        )}
        {status === "You win" && (
          <p>You win! Game over.</p>
        )}
        {status === "You lose" && (
          <p>You lose! Game over.</p>
        )}
      </div>
    </>
  );
}

function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

export default App;
