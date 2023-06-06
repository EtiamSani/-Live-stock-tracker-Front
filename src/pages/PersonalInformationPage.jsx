import { useState, useEffect } from "react";
import jwt_decode from "jwt-decode";

const PersonalInformationPage = () => {
  const [nickname, setNickname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [profilpicture, setProfilePhoto] = useState("");

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

          const username = decodedToken.data.nickname;
          setUsername(username);

          setNickname(decodedToken.data.nickname);
          setEmail(decodedToken.data.email);
        }
      } catch (error) {
        console.error("Failed to decode token:", error);
      }
    }
  }, []);

  const handleSubmit = (event) => {
    event.preventDefault();
    // Logique de traitement du formulaire ici (ex : appel à une API pour enregistrer les informations)

    // Créer un objet avec les données du formulaire
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
