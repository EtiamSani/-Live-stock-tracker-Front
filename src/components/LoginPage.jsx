const LoginPage = () => {
  return (
    <div class="relative flex h-screen flex-col justify-center overflow-hidden">
      <div class="m-auto w-full rounded-md bg-white p-6 shadow-md lg:max-w-lg">
        <h1 class="text-center text-3xl font-semibold text-purple-700">
          Connectez-vous
        </h1>
        <form class="space-y-4">
          <div>
            <label class="label">
              <span class="label-text text-base">Email</span>
            </label>
            <input
              type="text"
              placeholder="Email Address"
              class="input-bordered input-primary input w-full"
            />
          </div>
          <div>
            <label class="label">
              <span class="label-text text-base">Mot de passe</span>
            </label>
            <input
              type="password"
              placeholder="Enter Password"
              class="input-bordered input-primary input w-full"
            />
          </div>
          <a
            href="#"
            class="text-xs text-gray-600 hover:text-blue-600 hover:underline"
          >
            Forget Password?
          </a>
          <div>
            <button class="btn-primary btn">Login</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
