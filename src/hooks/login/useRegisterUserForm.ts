import { useState } from "react";

interface UseRegisterUserFormResult {
  loading: boolean;
  error: string;
  success: boolean;
  registerUser: (fullName: string, email: string, password: string) => Promise<void>;
  validateForm: (fields: {
    fullName: string;
    email: string;
    password: string;
    confirmPassword: string;
    acceptTerms: boolean;
  }) => string | null;
}

export function useRegisterUserForm(): UseRegisterUserFormResult {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  const validateForm = (fields: {
    fullName: string;
    email: string;
    password: string;
    confirmPassword: string;
    acceptTerms: boolean;
  }): string | null => {
    if (!fields.fullName || !fields.email || !fields.password || !fields.confirmPassword) {
      return "Por favor, completa todos los campos.";
    }
    if (fields.password !== fields.confirmPassword) {
      return "Las contraseñas no coinciden.";
    }
    // Validación robusta de contraseña
    if (fields.password.length < 8) {
      return "La contraseña debe tener al menos 8 caracteres.";
    }
    if (!/[A-Z]/.test(fields.password)) {
      return "La contraseña debe contener al menos una letra mayúscula.";
    }
    if (!/[a-z]/.test(fields.password)) {
      return "La contraseña debe contener al menos una letra minúscula.";
    }
    if (!/[0-9]/.test(fields.password)) {
      return "La contraseña debe contener al menos un número.";
    }
    if (!/[!@#$%^&*(),.?":{}|<>]/.test(fields.password)) {
      return "La contraseña debe contener al menos un carácter especial.";
    }
    if (!fields.acceptTerms) {
      return "Debes aceptar los términos y condiciones.";
    }
    return null;
  };

  const registerUser = async (fullName: string, email: string, password: string) => {
    setLoading(true);
    setError("");
    setSuccess(false);
    try {
      const res = await fetch("/api/auth/sign-up", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ fullName, email, password })
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error || "Error al registrar usuario.");
        setSuccess(false);
      } else {
        setSuccess(true);
      }
    } catch (err: any) {
      setError("Error de red o servidor.");
      setSuccess(false);
    } finally {
      setLoading(false);
    }
  };

  return { loading, error, success, registerUser, validateForm };
}
