import React from 'react'
import pokeball from '../img/black-white-poke-ball.png'

export default function Navbar(props) {
  return (
    <nav className="nav-bar">
      <img src={pokeball} alt="poke-ball" />
      <h1> Pokedex </h1>
      <input 
        type="search" 
        id="poke-search"
        aria-label="Search through Pokemon"
        placeholder="Search Pokémon"
        onChange={(event) => props.searchPokes(event)}
        // onChange instead of onKeyUp is required so that x button in 
        // search will trigger initial state
      />
    </nav>
  )
}