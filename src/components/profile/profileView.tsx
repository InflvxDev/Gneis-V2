import React, { useState } from "react";
import { useProfileView } from "../../hooks/profile/useProfileView";
import { supabase } from "../../core/supabaseClient";

const ProfileView: React.FC = () => {
  const { profile, loading, error, fetchProfile } = useProfileView();


  if (loading) {
    return (
      <div 
        className="min-h-screen flex items-center justify-center"
        style={{ backgroundColor: "var(--color-background)" }}
      >
        <div className="flex flex-col items-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[color:var(--color-primary)] mb-4"></div>
          <span className="text-[color:var(--color-dark)] text-lg">Cargando perfil...</span>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div 
        className="min-h-screen flex items-center justify-center"
        style={{ backgroundColor: "var(--color-background)" }}
      >
        <div className="bg-white rounded-xl shadow-lg p-8 max-w-md w-full mx-4">
          <div className="text-center">
            <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-[color:var(--color-dark)] mb-2">Error al cargar perfil</h3>
            <p className="text-gray-600 mb-6">{error}</p>
            <button
              onClick={fetchProfile}
              className="w-full py-3 px-4 rounded-lg font-semibold text-white transition-all duration-200 hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[color:var(--color-primary)] bg-[color:var(--color-primary)]"
            >
              Reintentar
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (!profile) {
    return null;
  }

  return (
    <div 
      className="min-h-screen py-12 px-4"
      style={{ backgroundColor: "var(--color-background)" }}
    >
      <div className="max-w-4xl mx-auto">
        {/* Header con logo y título */}
        <div className="mb-8">
          <div className="flex items-center mb-6">
            <div
              className="w-12 h-12 rounded-lg flex items-center justify-center mr-4"
              style={{ backgroundColor: "var(--color-primary)" }}
            >
              <svg
                className="w-6 h-6 text-white"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                />
              </svg>
            </div>
            <div>
              <h1 className="text-3xl font-bold text-[color:var(--color-dark)]">Mi Perfil</h1>
              <p className="text-gray-600">Gestiona tu información personal</p>
            </div>
          </div>
        </div>

        {/* Tarjeta principal del perfil */}
        <div className="bg-white rounded-xl shadow-lg overflow-hidden">
            {/* Header de la tarjeta */}
            <div 
              className="px-8 py-6 border-b border-gray-100"
              style={{ backgroundColor: "var(--color-background)" }}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <div 
                    className="w-16 h-16 rounded-full flex items-center justify-center text-white text-xl font-bold mr-4"
                    style={{ backgroundColor: "var(--color-primary)" }}
                  >
                    {profile.full_name.charAt(0).toUpperCase()}
                  </div>
                  <div>
                    <h2 className="text-xl font-semibold text-[color:var(--color-dark)]">{profile.full_name}</h2>
                    <p className="text-gray-600">{profile.email}</p>
                  </div>
                </div>
                
              </div>
            </div>          {/* Información del perfil */}
          <div className="p-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Información personal */}
              <div>
                <h3 className="text-lg font-semibold text-[color:var(--color-dark)] mb-4">Información Personal</h3>
                <div className="space-y-4">
                  <div className="flex flex-col">
                    <label className="text-sm font-medium text-gray-500 mb-1">Nombre Completo</label>
                    <div className="px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg">
                      <span className="text-[color:var(--color-dark)]">{profile.full_name}</span>
                    </div>
                  </div>
                  
                  <div className="flex flex-col">
                    <label className="text-sm font-medium text-gray-500 mb-1">Correo Electrónico</label>
                    <div className="px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg">
                      <span className="text-[color:var(--color-dark)]">{profile.email}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Información de la cuenta */}
              <div>
                <h3 className="text-lg font-semibold text-[color:var(--color-dark)] mb-4">Información de la Cuenta</h3>
                <div className="space-y-4">
                  <div className="flex flex-col">
                    <label className="text-sm font-medium text-gray-500 mb-1">Rol</label>
                    <div className="px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg">
                      <span 
                        className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium text-white"
                        style={{ backgroundColor: "var(--color-primary)" }}
                      >
                        {profile.role}
                      </span>
                    </div>
                  </div>
                  
                  <div className="flex flex-col">
                    <label className="text-sm font-medium text-gray-500 mb-1">Miembro desde</label>
                    <div className="px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg">
                      <span className="text-[color:var(--color-dark)]">
                        {new Date(profile.created_at).toLocaleDateString('es-ES', {
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric'
                        })}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Acciones */}
            <div className="mt-8 pt-6 border-t border-gray-100">
              <div className="flex flex-col sm:flex-row gap-4">
                <button className="flex-1 py-3 px-4 rounded-lg font-semibold text-white transition-all duration-200 hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[color:var(--color-primary)] bg-[color:var(--color-primary)]">
                  Editar Perfil
                </button>
                <button className="flex-1 py-3 px-4 bg-white border border-gray-200 rounded-lg font-semibold text-[color:var(--color-dark)] transition-all duration-200 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-300">
                  Cambiar Contraseña
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileView;
