import React from 'react'
import Navbar from './components/Navbar';
import Modal from './components/Modal';
import { useEffect } from 'react';
import { useState } from 'react';

export default function App() {

  // store state of modal
  const [show, setShow] = useState(false)

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

  const showDetails = (poke) => {
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
    setShow(true)
  }

  // search function to update state only where its needed in results, true source of state is unchanged (pokemonList)
  const searchPokes = (event) => {
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

  const loadMore = () => {
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
      </div>
        <div className="button-container">
          <button className="load-more-btn" onClick={loadMore}>Load more Pokes</button>
                {/* add a random button */}
        </div>

      <Modal onClose={() => setShow(false)} show={show} pokemon={pokemon} />

    </div>
  );
}

