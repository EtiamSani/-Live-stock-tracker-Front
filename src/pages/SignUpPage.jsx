import { useState } from "react";
import { IoEyeSharp } from "react-icons/io5";
import { FaEyeSlash } from "react-icons/fa";

const SignUpage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setconfirmPassword] = useState("");
  const [nickname, setNickname] = useState("");
  const [hidePassword, setHidePassword] = useState(true);
  const [message, setMessage] = useState("");
  const [progress, setProgress] = useState("");

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
                onChange={(e) => {
                  setPassword(e.target.value);
                  handlePassword(e.target.value);
                }}
              />
              <a
                onClick={() => setHidePassword(!hidePassword)}
                href
                className="-ml-10 mt-3.5"
              >
                {hidePassword ? <IoEyeSharp /> : <FaEyeSlash />}
              </a>
            </div>
            <div
              className={`progress ${getActiveColorBar(message)}`}
              style={{
                width: progress,
              }}
            ></div>
            <div>
              {password.length !== 0 ? (
                <p className={`message ${getActiveColor(message)}`}>
                  Votre mot de passe est {message}
                </p>
              ) : null}
              {strengthChecks.length &&
              strengthChecks.hasUpperCase &&
              strengthChecks.hasLowerCase &&
              strengthChecks.hasDigit &&
              strengthChecks.hasSpecialChar ? null : (
                <>
                  <div className="card-compact rounded-xl bg-white p-2 shadow-xl">
                    <p className="mb-2 font-bold">
                      Le mot de passe doit comporter au moins
                    </p>
                    {!strengthChecks.length && (
                      <p className="text-xs text-red-400">8 caractères.</p>
                    )}
                    {!strengthChecks.hasUpperCase && (
                      <p className="text-xs text-red-400">
                        Une lettre majuscule.
                      </p>
                    )}
                    {!strengthChecks.hasLowerCase && (
                      <p className="text-xs text-red-400">
                        Une lettre minuscule.
                      </p>
                    )}
                    {!strengthChecks.hasDigit && (
                      <p className="text-xs text-red-400">
                        Au moins un chiffre.
                      </p>
                    )}
                    {!strengthChecks.hasSpecialChar && (
                      <p className="text-xs text-red-400">
                        Au moins un caractère spécial.
                      </p>
                    )}
                  </div>
                </>
              )}
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
