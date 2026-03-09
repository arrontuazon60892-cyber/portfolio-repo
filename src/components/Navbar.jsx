import React from 'react';

export default function Navbar() {
  return (
    <nav className="bg-blue-600 text-white p-4 flex justify-between">
      <div className="font-bold text-lg">Arron Portfolio</div>
      <div className="space-x-4">
        <a href="#home" className="hover:text-gray-200">Home</a>
        <a href="#about" className="hover:text-gray-200">About</a>
        <a href="#projects" className="hover:text-gray-200">Projects</a>
        <a href="#contact" className="hover:text-gray-200">Contact</a>
      </div>
    </nav>
  );
}