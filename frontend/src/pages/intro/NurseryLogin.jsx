import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import useNurseryLogin from "../../hooks/useNurseryLogin";

function NurseryLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { nurseryLogin, error, isLoading } = useNurseryLogin();

  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();
    await nurseryLogin(email, password);
    setEmail("");
    setPassword("");
  }

  return (
    <main className="connect">
      <header>
        <button
          className="switchMode"
          type="button"
          onClick={() => navigate("/login")}
        >
          parents
        </button>
      </header>
      <h3>Je me connecte en tant que professionnel</h3>
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          required
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Mot de passe"
          value={password}
          required
          onChange={(e) => setPassword(e.target.value)}
        />
        <Link to="/nurserysignup" className="inscriptionLink">
          Pas de compte ? <span>S&apos;inscrire</span>
        </Link>
        <button
          type="submit"
          disabled={isLoading}
          className={password ? "submitButton" : "deadButton"}
        >
          Se connecter
        </button>
        {error && <h4>{error.message}</h4>}
      </form>
    </main>
  );
}

export default NurseryLogin;
