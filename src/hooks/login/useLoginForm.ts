import { useState } from "react";
import { supabase } from "../../core/supabaseClient";


interface UseLoginForm {
  login: (email: string, password: string) => Promise<void>;
  loading: boolean;
  error: string;
  validateForm: (fields: { email: string; password: string }) => string | null;
}


export function useLoginForm(): UseLoginForm {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const validateForm = (fields: { email: string; password: string }): string | null => {
    if (!fields.email || !fields.password) {
      return "Por favor, completa todos los campos.";
    }
    return null;
  };

  const login = async (email: string, password: string) => {
    setLoading(true);
    setError("");
    const validationError = validateForm({ email, password });
    if (validationError) {
      setError(validationError);
      setLoading(false);
      return;
    }
    try {
      const res = await fetch("/api/auth/sign-in", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password })
      });
      const data = await res.json();
      if (!res.ok) {
        let errorMsg = data.error || "Error al iniciar sesión";
        if (errorMsg === "Invalid login credentials") {
          errorMsg = "Correo o contraseña incorrectos";
        }
        setError(errorMsg);
        setLoading(false);
        return;
      }

      // Set the session in Supabase client after successful login
      if (data.session) {
        await supabase.auth.setSession(data.session);
      }

      // Redirigir según el rol
      if (data.role === "administrador") {
        window.location.href = "/dashboard";
      } else {
        window.location.href = "/profile";
      }
    } catch (err) {
      setError("Error de red o del servidor");
    } finally {
      setLoading(false);
    }
  };

  return { login, loading, error, validateForm };
}
