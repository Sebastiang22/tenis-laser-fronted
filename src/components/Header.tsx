import React, { useState } from 'react';
import { Menu, X } from 'lucide-react';

interface HeaderProps {
  onInicio: () => void;
  onLogout: () => void;
  isLoggedIn: boolean;
}

export function Header({ onInicio, onLogout, isLoggedIn }: HeaderProps) {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="bg-red-600 text-white shadow-md sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <img 
            src="/assets/logo_credi_laser.jpg"
            alt="Logo Tenis" 
            className="w-8 h-8 rounded-full object-cover"
          />
          <span className="text-2xl font-bold">Tenis Laser</span>
        </div>
        <nav className="hidden md:flex space-x-8">
          <button 
            onClick={onInicio} 
            className="hover:underline text-center"
          >
            Inicio
          </button>
          {isLoggedIn && (
            <button onClick={onLogout} className="hover:underline">
              Cerrar Sesión
            </button>
          )}
        </nav>
        <div className="md:hidden">
          <button onClick={() => setMenuOpen(!menuOpen)}>
            {menuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>
      {menuOpen && (
        <nav className="md:hidden bg-red-700">
          <div className="container mx-auto px-4 py-2 flex flex-col space-y-2">
            <button 
              onClick={() => {
                setMenuOpen(false);
                onInicio();
              }} 
              className="hover:underline text-center"
            >
              Inicio
            </button>
            {isLoggedIn && (
              <button onClick={onLogout} className="hover:underline">
                Cerrar Sesión
              </button>
            )}
          </div>
        </nav>
      )}
    </header>
  );
} 