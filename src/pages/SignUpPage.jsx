import { useState } from "react";

const SignUpage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();

    // Effectuer ici votre logique de connexion en utilisant l'email et le mot de passe
    try {
      const response = await fetch("http://localhost:3000/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) {
        throw new Error("Login failed");
      }

      // Obtenir le token de la réponse
      const data = await response.json();
      const token = data.token;
      console.log(token);

      // Stocker le token dans localStorage
      localStorage.setItem("token", token);

      // Recharger la page ou accéder à une autre URL après la connexion réussie
      window.location.href = "/watchlists";

      // Réinitialiser les champs d'entrée
      setEmail("");
      setPassword("");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="relative flex h-screen flex-col justify-center overflow-hidden">
      <div className="m-auto w-full rounded-md bg-white p-6 shadow-md lg:max-w-lg">
        <h1 className="text-center text-3xl font-semibold text-blue-700">
          Inscrivez-vous
        </h1>
        <form className="space-y-2" onSubmit={handleLogin}>
          <div>
            <label className="label">
              <span className="label-text text-base">Pseudo</span>
            </label>
            <input
              type="text"
              placeholder="Votre pseudo"
              className="input-bordered input-primary input w-full"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div>
            <label className="label">
              <span className="label-text text-base">Email</span>
            </label>
            <input
              type="text"
              placeholder="Adresse mail"
              className="input-bordered input-primary input w-full"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div>
            <label className="label">
              <span className="label-text text-base">Mot de passe</span>
            </label>
            <input
              type="password"
              placeholder="Votre mot de passe"
              className="input-bordered input-primary input w-full"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div>
            <label className="label">
              <span className="label-text text-base">
                Confirmez votre mot de passe
              </span>
            </label>
            <input
              type="password"
              placeholder="Votre mot de passe"
              className="input-bordered input-primary input w-full"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <a
            href="#"
            className="text-xs text-gray-600 hover:text-blue-600 hover:underline"
          >
            Mot de passe oublié ?
          </a>
          <div>
            <button type="submit" className="btn-primary btn">
              S'incrire
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SignUpage;
