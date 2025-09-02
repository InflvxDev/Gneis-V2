import React, { useState } from "react";


interface LoginFormProps {
  onSubmit?: (username: string, password: string) => void;
}

const LoginForm: React.FC<LoginFormProps> = ({ onSubmit }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!username || !password) {
      setError("Por favor, completa todos los campos.");
      return;
    }
    setError("");
    if (onSubmit) onSubmit(username, password);
  };

  const GoogleIcon = () => (
    <svg className="w-5 h-5" viewBox="0 0 24 24">
      <path
        fill="currentColor"
        d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
      />
      <path
        fill="currentColor"
        d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
      />
      <path
        fill="currentColor"
        d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
      />
      <path
        fill="currentColor"
        d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
      />
    </svg>
  );

  const GitHubIcon = () => (
    <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 0C5.374 0 0 5.373 0 12 0 17.302 3.438 21.8 8.207 23.387c.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z" />
    </svg>
  );

  return (
    <div
      className="min-h-screen flex relative"
      style={{ backgroundColor: "var(--color-background)" }}
    >
  {/* ...existing code... */}
      {/* Panel izquierdo - Formulario */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8">
        <div className="w-full max-w-md">
          {/* Logo */}
          <div className="mb-8">
            <div
              className="w-12 h-12 rounded-lg flex items-center justify-center mb-6"
              style={{ backgroundColor: "var(--color-primary)" }}
            >
              <svg
                fill="#ffffff"
                viewBox="-3.5 0 19 19"
                xmlns="http://www.w3.org/2000/svg"
                className="cf-icon-svg"
              >
                <g id="SVGRepo_iconCarrier">
                  <path d="M11.182 8.927v6.912a.794.794 0 0 1-.792.792H1.61a.794.794 0 0 1-.792-.792V8.927a.794.794 0 0 1 .792-.792h.856V6.367a3.534 3.534 0 1 1 7.068 0v1.768h.856a.794.794 0 0 1 .792.792zm-2.756-2.56a2.426 2.426 0 1 0-4.852 0v1.768h4.852zM7.108 11.47a1.108 1.108 0 1 0-1.583 1.001v1.849a.475.475 0 0 0 .95 0v-1.849a1.108 1.108 0 0 0 .633-1.001z"></path>
                </g>
              </svg>
            </div>
          </div>

          {/* Título */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold mb-2 text-[color:var(--color-dark)]">
              Iniciar Sesión
            </h1>
            <p className="text-gray-600">
              ¿No tienes cuenta?{" "}
              <a
                href="/login/register-user"
                className="font-medium hover:underline text-[color:var(--color-primary)]"
              >
                Registrate gratis
              </a>
            </p>
          </div>

          {/* Error */}
          {error && (
            <div className="mb-6 p-3 bg-red-100 border border-red-300 rounded-lg">
              <p className="text-red-700 text-sm">{error}</p>
            </div>
          )}

          {/* Formulario */}
          <div className="space-y-6">
            <div>
              <label
                htmlFor="username"
                className="block text-sm font-medium text-[color:var(--color-dark)] mb-2"
              >
                Correo electrónico
              </label>
              <input
                id="username"
                type="email"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full px-4 py-3 bg-white border border-gray-200 rounded-lg text-[color:var(--color-dark)] placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[color:var(--color-primary)] focus:border-[color:var(--color-primary)] transition-all"
                placeholder="Ingresa tu correo"
                autoComplete="email"
              />
            </div>

            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-[color:var(--color-dark)] mb-2"
              >
                Contraseña
              </label>
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-3 bg-white border border-gray-200 rounded-lg text-[color:var(--color-dark)] placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[color:var(--color-primary)] focus:border-[color:var(--color-primary)] transition-all"
                placeholder="Ingresa tu contraseña"
                autoComplete="current-password"
              />
            </div>

            <div className="flex items-center justify-between">
              <label className="flex items-center">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="w-4 h-4 rounded border-gray-300 bg-white text-[color:var(--color-primary)] focus:ring-2 focus:ring-[color:var(--color-primary)]"
                  style={{ accentColor: "var(--color-primary)" }}
                />
                <span className="ml-2 text-sm text-[color:var(--color-dark)]">
                  Recordarme
                </span>
              </label>
              <button
                type="button"
                className="text-sm font-medium hover:underline text-[color:var(--color-primary)]"
              >
                ¿Olvidaste tu contraseña?
              </button>
            </div>

            <button
              onClick={handleSubmit}
              className="w-full py-3 px-4 rounded-lg font-semibold text-white transition-all duration-200 hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[color:var(--color-primary)] bg-[color:var(--color-primary)]"
            >
              Iniciar Sesión
            </button>

            {/* Divisor */}
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-200"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 text-gray-500 bg-white">
                  O continúa con
                </span>
              </div>
            </div>

            {/* Botones sociales */}
            <div className="grid grid-cols-2 gap-3">
              <button
                type="button"
                disabled
                className="flex items-center justify-center gap-2 px-4 py-3 bg-gray-100 border border-gray-200 rounded-lg text-gray-400 cursor-not-allowed opacity-60"
              >
                <GoogleIcon />
                <span className="text-sm font-medium">Google</span>
              </button>
              <button
                type="button"
                disabled
                className="flex items-center justify-center gap-2 px-4 py-3 bg-gray-100 border border-gray-200 rounded-lg text-gray-400 cursor-not-allowed opacity-60"
              >
                <GitHubIcon />
                <span className="text-sm font-medium">GitHub</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Panel derecho - Imagen de fondo */}
      <div
        className="hidden lg:flex lg:w-1/2 relative overflow-hidden items-center justify-center"
        style={{
          backgroundImage: 'url(/images/lading-page/room-hotel.webp)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
      </div>
    </div>
  );
};

export default LoginForm;
