import { useEffect, useState } from "react";
import { getAuthenticatedSession } from "../../core/supabaseClient";

export interface Profile {
  id: string;
  email: string;
  full_name: string;
  role: string;
  created_at: string;
}

interface UseProfileViewResult {
  profile: Profile | null;
  loading: boolean;
  error: string;
  fetchProfile: () => Promise<void>;
}

export function useProfileView(): UseProfileViewResult {
  const [profile, setProfile] = useState<Profile | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchProfile = async () => {
    setLoading(true);
    setError("");
    try {
      const session = await getAuthenticatedSession();
      const token = session.access_token;
      if (!token) {
        setError("No autenticado.");
        setLoading(false);
        return;
      }
      const res = await fetch("/api/auth/sign-in", {
        method: "GET",
        headers: {
          "Authorization": `Bearer ${token}`,
          "Content-Type": "application/json"
        }
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error || "Error al obtener perfil");
        setProfile(null);
      } else {
        setProfile(data.profile);
      }
    } catch (err) {
      setError("No autenticado.");
      setProfile(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProfile();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return { profile, loading, error, fetchProfile };
}
