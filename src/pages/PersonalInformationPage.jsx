import { useState, useEffect } from "react";
import jwt_decode from "jwt-decode";
import fetchInvestor from "../APIServices/fetchInvestor";
import { useQuery } from "@tanstack/react-query";

const PersonalInformationPage = () => {
  const [nickname, setNickname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [profilpicture, setProfilePhoto] = useState("");
  const [isUpdated, setIsUpdated] = useState(false);

  const handleNicknameChange = (event) => {
    setNickname(event.target.value);
  };

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  useEffect(() => {
    // Récupérer le token depuis localStorage
    const token = localStorage.getItem("token");

    // Vérifier si le token existe
    if (token) {
      try {
        // Décoder le token pour obtenir les informations
        const decodedToken = jwt_decode(token);
        console.log(decodedToken);

        // Vérifier si le décodage a réussi
        if (decodedToken) {
          // Récupérer le chemin de la photo de profil depuis les informations du token
          const photoPath = `http://localhost:3000/${decodedToken.data.profilpicture}`;

          // Mettre à jour l'état avec le chemin de la photo de profil
          setProfilePhoto(photoPath);
        }
      } catch (error) {
        console.error("Failed to decode token:", error);
      }
    }
  }, []);

  const handleSubmit = (event) => {
    // Créer un objet avec les données du formulaire
    event.preventDefault();
    const formData = {
      nickname,
      email,
      password,
      profilpicture,
    };
    const token = localStorage.getItem("token");
    const decodedToken = jwt_decode(token);

    const id = decodedToken.data.id;
    // Envoyer les données à la route http://localhost:3000/investor/
    fetch(`http://localhost:3000/investor/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    })
      .then((response) => response.json())
      .then((data) => {
        // Traiter la réponse de la requête
        console.log("Response from server:", data);

        // Réinitialiser les champs du formulaire
        setNickname("");
        setEmail("");
        setPassword("");
        setIsUpdated(true);

        // Recharger la page après un délai de 2 secondes
        setTimeout(() => {
          window.location.reload();
        }, 2000);
      })
      .catch((error) => {
        console.error("Failed to update data:", error);
      });
  };
  const handleImageChange = (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();

    reader.onloadend = () => {
      const base64String = reader.result;
      console.log(base64String);
      setProfilePhoto(base64String);
    };

    reader.readAsDataURL(file);
  };

  useEffect(() => {
    setIsUpdated(false);
  }, []);

  useEffect(() => {
    const fetchInvestor = async () => {
      try {
        const token = localStorage.getItem("token");
        const decodedToken = jwt_decode(token);
        const investorId = decodedToken.data.id;
        const response = await fetch(
          `http://localhost:3000/investor/${investorId}`
        );
        const data = await response.json();
        const fetchedUsername = data.nickname;
        const fetchedEmail = data.email;
        setNickname(fetchedUsername);
        setEmail(fetchedEmail);
      } catch (error) {
        console.error("Error occurred while fetching investor data:", error);
      }
    };

    fetchInvestor();
  }, []);

  return (
    <div className="m-0 ">
      <div className="card mx-auto mt-20 w-80 border bg-base-100 shadow-xl">
        <div className="flex flex-col items-center justify-items-center">
          <div className="avatar ">
            <div className="mask mask-squircle mt-5 w-28">
              <img src={profilpicture} alt="Profile" />
            </div>
          </div>
          <input
            type="file"
            className="w-30 mw-sm w-xs file-input-bordered file-input-info file-input file-input-xs m-5"
            onChange={handleImageChange}
          />
          <form onSubmit={handleSubmit}>
            <div className="mt-4">
              <input
                type="text"
                placeholder="Nickname"
                className="mw-sm input-bordered input input-sm mx-10"
                value={nickname}
                onChange={handleNicknameChange}
              />
            </div>
            <div className="mt-4">
              <input
                type="email"
                placeholder="Email"
                className="mw-sm w-xs input-bordered input input-sm mx-10"
                value={email}
                onChange={handleEmailChange}
              />
            </div>
            <div className="mt-4">
              <input
                type="password"
                placeholder="Password"
                className="mw-sm w-xs input-bordered input  input-sm mx-10"
                value={password}
                onChange={handlePasswordChange}
              />
            </div>
            {isUpdated && (
              <div className="h-30 alert alert-success m-5  w-72">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6 shrink-0 stroke-current"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
                <span className="text-center">
                  {" "}
                  Informations mises à jour avec succès
                </span>
              </div>
            )}
            <button
              type="submit"
              className="btn-primary btn mx-auto mb-5 mt-4 block"
            >
              Sauvegarder
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default PersonalInformationPage;
