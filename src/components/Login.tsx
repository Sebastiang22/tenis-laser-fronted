import React, { useState } from 'react';
import { API_URL } from '../config'; // Importar la URL de la API

interface LoginProps {
  onLoginSuccess: () => void;
}

export function Login({ onLoginSuccess }: LoginProps) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    try {
      const response = await fetch(`${API_URL}/api/verificar_usuario`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ nombre_usuario: username, contraseña: password }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        setError(`Error: ${errorData.message || 'Error en la conexión con el servidor'}`);
        return;
      }

      const data = await response.json();
      console.log('Respuesta de la API:', data);

      if (data && typeof data === 'object' && 'existe' in data) {
        if (data.existe) {
          onLoginSuccess(); // Llama a la función de éxito
        } else {
          setError('Usuario o contraseña incorrectos');
        }
      } else {
        setError('Respuesta inesperada del servidor');
      }
    } catch (error: any) {
      setError('Error al realizar la solicitud: ' + error.message);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <form onSubmit={handleLogin} className="bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-2xl font-bold mb-4">Iniciar Sesión</h2>
        {error && <p className="text-red-500 mb-4">{error}</p>}
        <div className="mb-4">
          <label className="block text-gray-700">Nombre de usuario</label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="border rounded w-full py-2 px-3"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Contraseña</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="border rounded w-full py-2 px-3"
            required
          />
        </div>
        <button type="submit" className="bg-red-600 text-white py-2 px-4 rounded">
          Iniciar Sesión
        </button>
      </form>
    </div>
  );
} 