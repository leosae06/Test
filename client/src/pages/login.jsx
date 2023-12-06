
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [email, setEmail] = useState('');
  const [pass, setPass] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    const utilisateur = {
      email: email,
      pass: pass
    };

    try {
      const reponse = await fetch('http://localhost:3001/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(utilisateur),
      });

      if (reponse.ok) {
        const { token } = await reponse.json();
        localStorage.setItem('token', token);

        // Rediriger vers une autre page après la connexion réussie
        navigate('/compte');
      } else {
        // Afficher un message d'erreur si l'authentification échoue
        const erreur = await reponse.json();
        setErrorMessage(erreur.message);
      }
    } catch (erreur) {
      console.error('Erreur :', erreur);
    }
  };

  return (
    <div className='log'>
      <h1>Connexion</h1>
      <form onSubmit={handleLogin} className="f">
        <div className="ex">
          <input
            type="email"
            name="email"
            id="email"
            placeholder="Rentrer votre email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="ex">
          <input
            type="password"
            name="password"
            id="password"
            placeholder="Rentrer votre mot de passe"
            value={pass}
            onChange={(e) => setPass(e.target.value)}
            required
          />
        </div>
        <div className="ex">
          <input className="sub" type="submit" value="Connexion" />
        </div>
      </form>
      {errorMessage && <p className="error-message">{errorMessage}</p>}
    </div>
  );
};

export default Login;