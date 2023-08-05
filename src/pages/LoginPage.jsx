import { useState } from "react";
import { IoEyeSharp } from "react-icons/io5";
import { FaEyeSlash } from "react-icons/fa";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [verify, setVerify] = useState(false);
  const [hidePassword, setHidePassword] = useState(true);
  const [message, setMessage] = useState("");
  const [progress, setProgress] = useState("");

  const onChange = () => {
    setVerify(true);
  };

  const handleLogin = async (e) => {
    e.preventDefault();

    // Effectuer ici votre logique de connexion en utilisant l'email et le mot de passe
    try {
      const response = await fetch(
        "https://stock-tracker-api.up.railway.app/auth/login",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email, password }),
        }
      );

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

  const initialChecks = {
    length: 0,
    hasUpperCase: false,
    hasLowerCase: false,
    hasDigit: false,
    hasSpecialChar: false,
  };

  const [strengthChecks, setStrengthChecks] = useState(initialChecks);

  const checkPasswordStrength = (passwordValue) => {
    const checks = {
      length: passwordValue.length >= 8,
      hasUpperCase: /[A-Z]+/.test(passwordValue),
      hasLowerCase: /[a-z]+/.test(passwordValue),
      hasDigit: /[0-9]+/.test(passwordValue),
      hasSpecialChar: /[^A-Za-z0-9]+/.test(passwordValue),
    };

    setStrengthChecks(checks);
  };

  const handlePassword = (passwordValue) => {
    checkPasswordStrength(passwordValue);

    const checks = {
      length: passwordValue.length >= 8,
      hasUpperCase: /[A-Z]+/.test(passwordValue),
      hasLowerCase: /[a-z]+/.test(passwordValue),
      hasDigit: /[0-9]+/.test(passwordValue),
      hasSpecialChar: /[^A-Za-z0-9]+/.test(passwordValue),
    };

    setStrengthChecks(checks);

    strengthChecks.length = passwordValue.length >= 8 ? true : false;
    strengthChecks.hasUpperCase = /[A-Z]+/.test(passwordValue);
    strengthChecks.hasLowerCase = /[a-z]+/.test(passwordValue);
    strengthChecks.hasDigit = /[0-9]+/.test(passwordValue);
    strengthChecks.hasSpecialChar = /[^A-Za-z0-9]+/.test(passwordValue);

    let verifiedList = Object.values(strengthChecks).filter((value) => value);

    let strength =
      verifiedList.length === 5
        ? "Fort"
        : verifiedList.length >= 2
        ? "Moyen"
        : "Faible";

    setPassword(passwordValue);
    setProgress(`${(verifiedList.length / 5) * 100}%`);
    setMessage(strength);
  };

  const getActiveColor = (type) => {
    if (type === "Fort") return "text-green-500 text-xs";
    if (type === "Moyen") return "text-yellow-500 text-xs";
    return "text-red-500 text-xs";
  };

  const getActiveColorBar = (type) => {
    if (type === "Fort") return "bg-green-500";
    if (type === "Moyen") return "bg-yellow-500";
    return "bg-red-500";
  };

  return (
    <div className="relative flex h-screen flex-col justify-center overflow-hidden">
      <div className="m-auto w-full rounded-xl border border-[#E4E4E7] bg-white p-6  lg:max-w-lg">
        <h1 className="text-center text-3xl font-semibold text-blue-700">
          Connectez-vous
        </h1>
        <form className="space-y-4" onSubmit={handleLogin}>
          <div>
            <label className="label">
              <span className="label-text text-base">Email</span>
            </label>
            <input
              type="text"
              placeholder="wbuffet@gmail.com"
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
                name="password"
                placeholder="Votre mot de passe"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="mt w-full rounded-lg border-[#E4E4E7] p-2 focus:border-blue-300 focus:bg-white"
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
              Connecter
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
