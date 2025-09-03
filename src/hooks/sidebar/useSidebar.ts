import { useState, useCallback, useEffect } from 'react';

export function useSidebar() {
	const [open, setOpen] = useState(true); // Abierto por defecto

	const toggleSidebar = useCallback(() => setOpen((prev) => !prev), []);
	const closeSidebar = useCallback(() => setOpen(false), []);
	const openSidebar = useCallback(() => setOpen(true), []);

	// Función para obtener las clases CSS del contenido principal
	const getMainContentClasses = useCallback(() => {
		return open ? 'ml-[280px]' : 'ml-20';
	}, [open]);

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
		toggleSidebar,
		closeSidebar,
		openSidebar,
		getMainContentClasses,
	};
}