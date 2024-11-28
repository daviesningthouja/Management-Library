import React from 'react'
import "./Chip-Icon.css"
const ChipIcon = () => {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="150" height="150" viewBox="0 0 150 150">
    {/* Main Chip Body */}
    <rect x="45" y="45" width="60" height="60" fill="black" rx="10" className="chip-body" />

    {/* Circuit Lines */}
    <line x1="30" y1="60" x2="45" y2="60" stroke="black" stroke-width="4" className="circuit-line" />
    <line x1="30" y1="90" x2="45" y2="90" stroke="black" stroke-width="4" className="circuit-line" />
    <line x1="120" y1="60" x2="105" y2="60" stroke="black" stroke-width="4" className="circuit-line" />
    <line x1="120" y1="90" x2="105" y2="90" stroke="black" stroke-width="4" className="circuit-line" />
    <line x1="75" y1="30" x2="75" y2="45" stroke="black" stroke-width="4" className="circuit-line" />
    <line x1="75" y1="120" x2="75" y2="105" stroke="black" stroke-width="4" className="circuit-line" />

    {/* Circuits' end circles */}
    <circle cx="30" cy="60" r="5" fill="black" className="circuit-end" />
    <circle cx="30" cy="90" r="5" fill="black" className="circuit-end" />
    <circle cx="120" cy="60" r="5" fill="black" className="circuit-end" />
    <circle cx="120" cy="90" r="5" fill="black" className="circuit-end" />
    <circle cx="75" cy="30" r="5" fill="black" className="circuit-end" />
    <circle cx="75" cy="120" r="5" fill="black" className="circuit-end" />

    {/* "Intel" text */}
    <text x="50%" y="47%" text-anchor="middle" fill="white" font-size="10" font-family="Arial" dy=".3em">
      Intel
    </text>
    {/* "Core i7" text */}
    <text x="50%" y="57%" text-anchor="middle" fill="white" font-size="9" font-family="Arial" dy=".3em">
      Core i7
    </text>
    {/* Generation text */}
    
  </svg>
  )
}

export default ChipIcon;
