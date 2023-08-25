import React from 'react'
import './header.css'

const Header = () => {
  return (
    <header>
        <div className='logo'>
            <h2>Autocomplete</h2>
        </div>
        <nav>
            <ul>
                <li>Home</li>
                <li>Contact</li>
                
            </ul>
        </nav>
    </header>
  )
}

export default Header