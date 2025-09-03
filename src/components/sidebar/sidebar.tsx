import React from 'react';
import { Home, User, LogOut, LayoutDashboard, ChevronLeft, Bed, Users, Calendar, UserCheck } from 'lucide-react';
import { useSidebar } from '../../hooks/sidebar/useSidebar';

export default function Sidebar() {
  const { open, toggleSidebar, closeSidebar } = useSidebar();

  const mainItems = [
    { label: 'Dashboard', icon: <LayoutDashboard />, route: '/dashboard' },
    { label: 'Habitaciones', icon: <Bed />, route: '/dashboard' },
    { label: 'Clientes', icon: <Users />, route: '/dashboard' },
    { label: 'Reservas', icon: <Calendar />, route: '/dashboard' },
    { label: 'Empleados', icon: <UserCheck />, route: '/dashboard' },
  ];

  const userItems = [
    { label: 'Perfil', icon: <User />, route: '/profile' },
    { label: 'Cerrar sesión', icon: <LogOut />, route: '/logout' },
  ];

  return (
    <>
      <aside
        className={`fixed top-0 left-0 h-screen bg-gradient-to-b from-white via-white to-gray-50/80 z-[100] flex flex-col overflow-hidden transition-all duration-500 ease-[cubic-bezier(0.25,0.46,0.45,0.94)] shadow-2xl ring-1 ring-gray-100/50 backdrop-blur-xl ${
          open ? 'w-[280px]' : 'w-20'
        }`}
        style={{
          background: open 
            ? 'linear-gradient(135deg, rgba(255,255,255,0.95) 0%, rgba(249,250,251,0.98) 50%, rgba(243,244,246,0.95) 100%)'
            : 'linear-gradient(135deg, rgba(255,255,255,0.98) 0%, rgba(249,250,251,0.99) 100%)'
        }}
      >
        {/* Decorative gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-transparent via-transparent to-gray-100/30 pointer-events-none" />

        {/* Header */}
        <div className={`relative p-6 flex items-center justify-between min-h-[80px] bg-gradient-to-r from-[var(--color-primary)] to-[var(--color-primary)]/90 border-b-2 border-[var(--color-primary)]/20 shadow-lg ${open ? 'shadow-xl' : ''}`}>
          {/* Decorative elements */}
          <div className="absolute inset-0 bg-gradient-to-br from-white/10 via-transparent to-transparent pointer-events-none" />
          <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/30 to-transparent" />
          
          {/* Logo / texto */}
          {open ? (
            <div className="relative z-10 text-white text-2xl font-bold whitespace-nowrap transition-all duration-500 transform hover:scale-105">
              <span className="bg-gradient-to-r from-white to-white/90 bg-clip-text text-transparent font-extrabold tracking-wide drop-shadow-sm">
                GNEIS
              </span>
              <div className="absolute -bottom-1 left-0 w-full h-0.5 bg-gradient-to-r from-white/40 to-transparent rounded-full transform scale-x-0 transition-transform duration-300 hover:scale-x-100" />
            </div>
          ) : (
            <div className="flex justify-center w-full relative z-10">
              <button
                onClick={toggleSidebar}
                className="relative bg-white/15 border border-white/30 rounded-2xl p-3.5 text-white cursor-pointer flex items-center justify-center transition-all duration-300 hover:bg-white/25 hover:scale-110 hover:rotate-6 shadow-lg hover:shadow-xl backdrop-blur-sm"
                aria-label="Expandir menú"
              >
                <Home size={20} className="drop-shadow-sm" />
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-white/20 to-transparent pointer-events-none" />
              </button>
            </div>
          )}

          {/* Botón contraer (solo visible cuando está abierto) */}
          {open && (
            <button
              onClick={toggleSidebar}
              className="relative z-10 bg-white/15 border border-white/30 rounded-xl p-2.5 text-white cursor-pointer flex items-center justify-center transition-all duration-300 hover:bg-white/25 hover:scale-110 hover:-rotate-12 shadow-md hover:shadow-lg backdrop-blur-sm"
              aria-label="Contraer menú"
            >
              <ChevronLeft size={16} className="drop-shadow-sm" />
              <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-white/20 to-transparent pointer-events-none" />
            </button>
          )}
        </div>

        {/* Zona principal */}
        <div className="relative bg-gradient-to-b from-gray-50/50 to-gray-100/30 flex-1 flex flex-col backdrop-blur-sm">
          {/* Decorative top border */}
          <div className="h-px bg-gradient-to-r from-transparent via-gray-200/60 to-transparent" />
          
          <nav className={`flex flex-col gap-3 flex-1 py-8 relative ${open ? 'px-6' : 'px-3'}`}>
            {/* Background decoration */}
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-white/20 to-transparent pointer-events-none" />
            
            {/* Opciones principales */}
            {mainItems.map((item, index) => (
              <a
                key={item.route}
                href={item.route}
                onClick={closeSidebar}
                className={`relative group text-[var(--color-primary)] font-semibold rounded-2xl no-underline transition-all duration-400 flex items-center overflow-hidden whitespace-nowrap backdrop-blur-[10px] border border-gray-200/30 hover:border-[var(--color-primary)]/30 ${
                  open
                    ? 'py-4 px-5 justify-start gap-4 text-[15px] hover:translate-x-2 hover:shadow-xl shadow-md bg-gradient-to-r from-white/80 to-white/60'
                    : 'p-3.5 justify-center w-14 h-14 mx-auto rounded-2xl hover:scale-110 shadow-md bg-gradient-to-br from-white/90 to-white/70'
                }`}
                style={{
                  animationDelay: `${index * 100}ms`,
                }}
              >
                {/* Hover effect background */}
                <div className="absolute inset-0 bg-gradient-to-r from-[var(--color-primary)]/10 to-[var(--color-primary)]/5 opacity-0 group-hover:opacity-100 transition-all duration-300 rounded-2xl" />
                
                {/* Icon glow effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-[var(--color-primary)]/5 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-300 blur-xl" />
                
                <div
                  className={`relative z-10 ${
                    open ? 'w-6 h-6 min-w-[24px]' : 'w-6 h-6'
                  } flex items-center justify-center transition-all duration-300 group-hover:scale-110`}
                >
                  {React.cloneElement(item.icon, { 
                    size: 20, 
                    className: "drop-shadow-sm group-hover:drop-shadow-md transition-all duration-300" 
                  })}
                </div>
                {open && (
                  <span className="relative z-10 transition-all duration-400 group-hover:text-[var(--color-primary)]/90">
                    {item.label}
                  </span>
                )}
                
                {/* Subtle border highlight */}
                <div className="absolute inset-0 rounded-2xl ring-1 ring-white/40 opacity-0 group-hover:opacity-100 transition-all duration-300" />
              </a>
            ))}
          </nav>
        </div>

        {/* Footer */}
        <div className={`relative bg-gradient-to-r from-[var(--color-primary)] to-[var(--color-primary)]/95 border-t-2 border-[var(--color-primary)]/20 shadow-lg ${open ? 'p-6' : 'p-4'}`}>
          {/* Decorative elements */}
          <div className="absolute inset-0 bg-gradient-to-br from-white/8 via-transparent to-black/5 pointer-events-none" />
          
          {userItems.map((item, index) => (
            <a
              key={item.route}
              href={item.route}
              onClick={closeSidebar}
              className={`relative group bg-white/15 border border-white/30 rounded-2xl text-white cursor-pointer flex items-center justify-center transition-all duration-200 hover:bg-white/25 hover:scale-105 shadow-lg ${
                index === userItems.length - 1 ? 'mb-0' : 'mb-4'
              } ${
                open
                  ? 'py-3.5 px-5 justify-start gap-4 text-sm'
                  : 'p-3 justify-center w-12 h-12 mx-auto'
              }`}
            >
              {/* Hover background effect */}
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-white/15 to-white/5 opacity-0 group-hover:opacity-100 transition-opacity duration-200" />
              
              <div
                className={`relative z-10 ${
                  open ? 'w-5 h-5 min-w-[20px]' : 'w-5 h-5'
                } flex items-center justify-center transition-transform duration-200 group-hover:scale-105`}
              >
                {React.cloneElement(item.icon, { 
                  size: 18, 
                  className: "drop-shadow-sm transition-all duration-200" 
                })}
              </div>
              {open && (
                <span className="relative z-10 transition-opacity duration-200 font-medium">
                  {item.label}
                </span>
              )}
            </a>
          ))}

          <div className={`flex items-center justify-center pt-6 relative z-10 transition-opacity duration-200 ${open ? 'opacity-100' : 'opacity-0'}`}>
            <div className="text-white/80 text-xs text-center font-medium tracking-wide">
              <span className="bg-gradient-to-r from-white/90 to-white/70 bg-clip-text text-transparent">
                © 2025 GNEIS
              </span>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
}