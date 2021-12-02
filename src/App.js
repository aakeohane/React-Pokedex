import React from 'react'
import Navbar from './components/Navbar';
import { useEffect } from 'react';
import { useState } from 'react';

export default function App() {

  const initialNum = 9;
  const [pokeNum, setPokeNum] = useState(initialNum)

  const [pokemonList, setPokemonList] = useState([])
  const [results, setResults] = useState([])

  // state of each pokemon will either be blank or whichever one was clicked
  const [pokemon, setPokemon] = useState({
    id: '',
    name: '',
    imageUrl: '',
    height: '',
    weight: '',
    types: []
  })

  // need to useEffect to avoid any side effects that fetching will cause with rerender
  useEffect(() => {
    fetchPokemon()
  }, [])

  const fetchPokemon = () => {
    fetch("https://pokeapi.co/api/v2/pokemon/?limit=151")
      .then(res => res.json())
      .then(data => {
        // mapping this data allows me to grab the image using the index data for each button => credit: MaruCodes
        const pokemon = data.results.map((result, index) => {
          const id = index + 1
          const image = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-v/black-white/animated/${id}.gif`
          return {
            ...result,
            pokeSprites: image,
            id: id
          }
        })
        // create two instances of state, one true state and one for the search results
        setPokemonList(pokemon)
        setResults(pokemon)
      })
  }

  function showDetails(poke) {
    fetch(poke.url)
      .then(res => res.json())
      .then(data => setPokemon( {
        id: data.id,
        name: data.name,
        sprite: data.sprites.front_default,
        imageUrl: data.sprites.other['official-artwork'].front_default,
        height: data.height,
        weight: data.weight,
        // Array.from used to form array to map out individual values on render below
        types: Array.from(data.types)
      }))
  }

  // search function to update state only where its needed in results, true source of state is unchanged (pokemonList)
  function searchPokes(event) {
    if(!event) {
      setResults(pokemonList)
      return
    }
    const matches = []
    const searchString = event.target.value.toLowerCase()
    const filteredPoke = pokemonList.filter(poke => poke.name.toLowerCase().includes(searchString))
    if (!filteredPoke.length) {
      setResults([])
      setPokeNum(initialNum)
    } 
    if (!searchString) {
      setResults(pokemonList)
      setPokeNum(initialNum)
    } 
    else {
      filteredPoke.forEach((poke) => {
        matches.push(poke)
      })
      setResults(matches)
      setPokeNum(matches.length)
    }
  }

  function loadMore() {
    console.log("worked")
    setPokeNum(prevNum => prevNum + 6)
  }

  return (
    <div className="App">
      <Navbar searchPokes={searchPokes}/>
      {results.length <= 0 && <p>No pokes found! Try a different name.</p>}
      <div className="poke-container">
        {results.slice(0, pokeNum).map((poke) => (
          <button className="poke-btn" key={poke.id} onClick={() => showDetails(poke)}>
            <p className="poke-id">{poke.id}</p>
            <img className="poke-sprite" src={poke.pokeSprites} alt={poke.name} />
            <h1 className="poke-name">{poke.name}</h1>
          </button>
        ))}
        <div>
          <button className="load-more-btn" onClick={loadMore}>Load More +</button>
                {/* add a random button */}
        </div>
        
      </div>
      <div> 
        <h1>{pokemon.name}</h1>
        <h2>{pokemon.id}</h2>
        <img src={pokemon.imageUrl} alt={pokemon.name} />
        <p>{ pokemon.types.length > 1 ? 'Types:' : 'Type:'}</p>
        <ul>
          {pokemon.types.map((type, index) => (
            <li key={index}>
              {type.type.name}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

