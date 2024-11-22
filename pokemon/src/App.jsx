import React, { useState } from "react";
import "./App.css";

const App = () => {
  const [pokemon, setPokemon] = useState(null);
  const [error, setError] = useState(null);

  const handleSearch = async () => {
    const inputValue = document.getElementById("search-input").value.toLowerCase();

    setPokemon(null);
    setError(null);

    try {
      const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${inputValue}`);

      if (!response.ok) {
        setError("Pokémon not found");
        return;
      }

      const data = await response.json();
      setPokemon({
        name: data.name,
        id: data.id,
        weight: data.weight,
        height: data.height,
        stats: data.stats.map((stat) => stat.base_stat),
        types: data.types.map((type) => type.type.name),
        sprite: data.sprites.front_default,
      });
    } catch {
      setError("Error fetching data");
    }
  };

  return (
    <div className="container">
      <h1>Pokemon Status</h1>
      <div className="search-bar">
        <input type="text" id="search-input" placeholder="Enter Pokémon name or ID" />
        <button onClick={handleSearch}>Search</button>
      </div>

      {error && <p className="error">{error}</p>}

      {pokemon && (
        <div className="pokemon-info">
          <div className="pokemon-header">
            <h2>
              {pokemon.name.toUpperCase()} #{pokemon.id}
            </h2>
            <p>
              <strong>Weight:</strong> {pokemon.weight} <strong>Height:</strong> {pokemon.height}
            </p>
            <img src={pokemon.sprite} alt={pokemon.name} />
          </div>

          <div className="types">
            {pokemon.types.map((type, index) => (
              <span key={index} className={`type ${type}`}>
                {type.toUpperCase()}
              </span>
            ))}
          </div>

          <table className="stats-table">
            <thead>
              <tr>
                <th>Base</th>
                <th>Stats</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>HP:</td>
                <td>{pokemon.stats[0]}</td>
              </tr>
              <tr>
                <td>Attack:</td>
                <td>{pokemon.stats[1]}</td>
              </tr>
              <tr>
                <td>Defense:</td>
                <td>{pokemon.stats[2]}</td>
              </tr>
              <tr>
                <td>Sp. Attack:</td>
                <td>{pokemon.stats[3]}</td>
              </tr>
              <tr>
                <td>Sp. Defense:</td>
                <td>{pokemon.stats[4]}</td>
              </tr>
              <tr>
                <td>Speed:</td>
                <td>{pokemon.stats[5]}</td>
              </tr>
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default App;
