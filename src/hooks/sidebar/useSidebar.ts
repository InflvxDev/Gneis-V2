import { useState, useCallback, useEffect } from 'react';
import { supabase } from '../../core/supabaseClient';

export function useSidebar() {
	const [open, setOpen] = useState(true); // Abierto por defecto
	const [userRole, setUserRole] = useState<string | null>(null);

	const toggleSidebar = useCallback(() => setOpen((prev) => !prev), []);
	const closeSidebar = useCallback(() => setOpen(false), []);
	const openSidebar = useCallback(() => setOpen(true), []);

	// Función para obtener el rol del usuario actual
	const getUserRole = useCallback(async () => {
		try {
			const { data: { session }, error: sessionError } = await supabase.auth.getSession();
			
			if (sessionError || !session) {
				setUserRole(null);
				return null;
			}

			const token = session.access_token;

			// Fetch profile from the API endpoint
			const res = await fetch("/api/auth/sign-in", {
				method: "GET",
				headers: {
					"Authorization": `Bearer ${token}`,
					"Content-Type": "application/json"
				}
			});

			if (!res.ok) {
				setUserRole(null);
				return null;
			}

			const data = await res.json();
			const role = data.profile?.role || null;
			setUserRole(role);
			return role;
		} catch (error) {
			console.error('Error obteniendo el rol del usuario:', error);
			setUserRole(null);
			return null;
		}
	}, []);

	// Función para cerrar sesión
	const handleLogout = useCallback(async () => {
		try {
			const { error } = await supabase.auth.signOut();
			if (error) {
				console.error('Error al cerrar sesión:', error);
				return;
			}
			
			// Redirigir al login después de cerrar sesión exitosamente
			window.location.href = '/login';
		} catch (error) {
			console.error('Error inesperado al cerrar sesión:', error);
		}
	}, []);

	// Función para obtener las clases CSS del contenido principal
	const getMainContentClasses = useCallback(() => {
		return open ? 'ml-[280px]' : 'ml-20';
	}, [open]);

	// Efecto para obtener el rol del usuario al montar el componente
	useEffect(() => {
		getUserRole();
	}, [getUserRole]);

	// Efecto para actualizar las clases del contenido principal cuando cambia el estado
	useEffect(() => {
		const mainContent = document.querySelector('main');
		if (mainContent) {
			// Remover clases anteriores
			mainContent.classList.remove('ml-20', 'ml-[280px]');
			// Agregar la clase correcta
			const newClass = open ? 'ml-[280px]' : 'ml-20';
			mainContent.classList.add(newClass);
		}
	}, [open]);

	return {
		open,
		userRole,
		toggleSidebar,
		closeSidebar,
		openSidebar,
		handleLogout,
		getUserRole,
		getMainContentClasses,
	};
}