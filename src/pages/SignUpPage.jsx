import { useState } from "react";
import { IoEyeSharp } from "react-icons/io5";
import { FaEyeSlash } from "react-icons/fa";

const SignUpage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setconfirmPassword] = useState("");
  const [nickname, setNickname] = useState("");
  const [hidePassword, setHidePassword] = useState(true);

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(
        "https://stock-tracker-api.up.railway.app/auth/register-investor",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email, password, confirmPassword, nickname }),
        }
      );

      if (!response.ok) {
        throw new Error("Login failed");
      }

      // Recharger la page ou accéder à une autre URL après la connexion réussie
      window.location.href = "/login";

      // Réinitialiser les champs d'entrée
      setEmail("");
      setPassword("");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="relative flex h-screen flex-col justify-center overflow-hidden">
      <div className="m-auto w-full rounded-xl border border-[#E4E4E7] bg-white p-6 lg:max-w-lg">
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
              className="w-full rounded-lg border-[#E4E4E7] focus:border-blue-300 focus:bg-white"
              value={nickname}
              onChange={(e) => setNickname(e.target.value)}
            />
          </div>
          <div>
            <label className="label">
              <span className="label-text text-base">Email</span>
            </label>
            <input
              type="text"
              placeholder="Adresse mail"
              className="w-full rounded-lg border-[#E4E4E7] focus:border-blue-300 focus:bg-white"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div>
            <label className="label">
              <span className="label-text text-base">Mot de passe</span>
            </label>
            <div className="flex">
              <input
                type={hidePassword ? "password" : "text"}
                placeholder="Votre mot de passe"
                className="w-full rounded-lg border-[#E4E4E7] focus:border-blue-300 focus:bg-white"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <a
                onClick={() => setHidePassword(!hidePassword)}
                href
                className="-ml-10 mt-3.5"
              >
                {hidePassword ? <IoEyeSharp /> : <FaEyeSlash />}
              </a>
            </div>
          </div>
          <div>
            <label className="label">
              <span className="label-text text-base">
                Confirmez votre mot de passe
              </span>
            </label>
            <div className="flex">
              <input
                type={hidePassword ? "password" : "text"}
                placeholder="Votre mot de passe"
                className="w-full rounded-lg border-[#E4E4E7] focus:border-blue-300 focus:bg-white"
                value={confirmPassword}
                onChange={(e) => setconfirmPassword(e.target.value)}
              />
              <a
                onClick={() => setHidePassword(!hidePassword)}
                href
                className="-ml-10 mt-3.5"
              >
                {hidePassword ? <IoEyeSharp /> : <FaEyeSlash />}
              </a>
            </div>
          </div>
          <a
            href="#"
            className="text-xs text-gray-600 hover:text-blue-600 hover:underline"
          >
            Mot de passe oublié ?
          </a>
          <div>
            <button type="submit" className="btn-primary btn">
              S'inscrire
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SignUpage;
