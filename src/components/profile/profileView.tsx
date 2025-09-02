import React from "react";
import { useProfileView } from "../../hooks/profile/useProfileView";

const ProfileView: React.FC = () => {
  const { profile, loading, error, fetchProfile } = useProfileView();

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <span className="text-gray-500">Cargando perfil...</span>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col items-center h-64 justify-center">
        <span className="text-red-600 mb-2">{error}</span>
        <button
          onClick={fetchProfile}
          className="px-4 py-2 bg-[color:var(--color-primary)] text-white rounded-lg mt-2"
        >
          Reintentar
        </button>
      </div>
    );
  }

  if (!profile) {
    return null;
  }

  return (
    <div className="max-w-md mx-auto mt-12 p-8 bg-white rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold mb-4 text-[color:var(--color-dark)]">Mi Perfil</h2>
      <div className="space-y-4">
        <div>
          <span className="font-semibold text-[color:var(--color-dark)]">Nombre:</span>
          <span className="ml-2">{profile.full_name}</span>
        </div>
        <div>
          <span className="font-semibold text-[color:var(--color-dark)]">Correo:</span>
          <span className="ml-2">{profile.email}</span>
        </div>
        <div>
          <span className="font-semibold text-[color:var(--color-dark)]">Rol:</span>
          <span className="ml-2">{profile.role}</span>
        </div>
        <div>
          <span className="font-semibold text-[color:var(--color-dark)]">Creado el:</span>
          <span className="ml-2">{new Date(profile.created_at).toLocaleString()}</span>
        </div>
      </div>
    </div>
  );
};

export default ProfileView;
