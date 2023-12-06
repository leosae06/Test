import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Compte = () => {
  const navigate = useNavigate();
  const [users, setUsers] = useState([]);

  const handleLogout = async () => {
    try {
      // Envoyez une requête au serveur pour déclencher la déconnexion
      const response = await fetch('http://localhost:3001/logout', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (response.ok) {
        // Si la déconnexion côté serveur réussit, détruisez le token côté client
        localStorage.removeItem('token');
        // Redirigez l'utilisateur vers la page de connexion (login)
        navigate('/login');
      } else {
        console.error('Échec de la déconnexion');
      }
    } catch (error) {
      console.error('Erreur lors de la déconnexion :', error);
    }
  };

  useEffect(() => {
    // Fonction asynchrone pour récupérer les utilisateurs depuis le serveur
    const fetchUsers = async () => {
      try {
        const response = await fetch('http://localhost:3001/compte');

        if (response.ok) {
          const data = await response.json();
          setUsers(data);
        } else {
          console.error('Échec de la récupération des utilisateurs');
        }
      } catch (error) {
        console.error('Erreur lors de la récupération des utilisateurs :', error);
      }
    };

    // Appel de la fonction asynchrone
    fetchUsers();
  }, []); // Le tableau vide en tant que dépendance signifie que cela ne se déclenchera qu'une fois

  return (
    <div>
      <h1>Liste des utilisateurs :</h1>
      <ul>
        {users.map((user, index) => (
          <li key={index}>{user.email}</li>
        ))}
      </ul>
      <button onClick={handleLogout}>Déconnexion</button>
    </div>
  );
};

export default Compte;