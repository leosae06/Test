import './register.css';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Navigate } from 'react-router-dom';

const Element = () => {
  const [email, setEmail] = useState('');
  const [pass, setPass] = useState('');
  const [redirectToLogin, setRedirectToLogin] = useState(false);
  const navigate = useNavigate();

  // Fonction pour rediriger vers la page compte si l'utilisateur est connecté
  const redirectToCompte = () => {
    const token = localStorage.getItem('token');
    if (token) {
      navigate('/compte');
    }
  };

  useEffect(() => {
    redirectToCompte();
  }, []);


  const handleEvent = async (e) => {
    e.preventDefault();

    const utilisateur = {
      email: email,
      pass: pass
    };

    try {
      const reponse = await fetch('http://localhost:3001/user', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(utilisateur),
      });

      if (reponse.ok) {
        console.log('Données utilisateur envoyées avec succès');
        // Redirigez vers la page de connexion ou effectuez toute autre action
        setRedirectToLogin(true);
      } else {
        console.error('Échec de l\'envoi des données utilisateur');
      }
    } catch (erreur) {
      console.error('Erreur :', erreur);
    }
  };

  if (redirectToLogin) {
    // Rediriger vers la page de connexion sans rechargement de la page
    return <Navigate to="/login" />;
  }

  return (
    <div className='element'>
      <h1 className='principal'>
        Formulaire de contact
      </h1>
      <div className='englobe'>
        <form onSubmit={handleEvent} className="f">
          <div className="form-example">
            <input
              type="email"
              name="email"
              id="name"
              placeholder="Rentrer votre email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="form-example">
            <input
              type="password"
              name="pass"
              id="pass"
              placeholder="Rentrer votre mot de passe"
              value={pass}
              onChange={(e) => setPass(e.target.value)}
              required
            />
          </div>
          <div className="form-example">
            <input className="sub" type="submit" value="Enregistrer" />
          </div>
        </form>
      </div>
    </div>
  );
};

function Register() {
  return <Element />;
}

export default Register;