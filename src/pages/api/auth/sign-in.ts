import type { APIRoute } from 'astro';
import { supabase } from '../../../core/supabaseClient';

export const prerender = false;

export const GET: APIRoute = async ({ request }) => {
  try {
    // Obtener el token de sesión del header Authorization
    const authHeader = request.headers.get('authorization');
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return new Response(
        JSON.stringify({ error: 'No autorizado.' }),
        { status: 401, headers: { 'Content-Type': 'application/json' } }
      );
    }
    const accessToken = authHeader.replace('Bearer ', '').trim();

    // Validar la sesión con Supabase
    const { data: { user }, error: sessionError } = await supabase.auth.getUser(accessToken);
    if (sessionError || !user) {
      return new Response(
        JSON.stringify({ error: 'Sesión inválida.' }),
        { status: 401, headers: { 'Content-Type': 'application/json' } }
      );
    }

    // Buscar el perfil en la tabla profiles
    const { data: profile, error: profileError } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', user.id)
      .single();

    if (profileError || !profile) {
      return new Response(
        JSON.stringify({ error: 'Perfil no encontrado.' }),
        { status: 404, headers: { 'Content-Type': 'application/json' } }
      );
    }

    return new Response(
      JSON.stringify({ profile }),
      { status: 200, headers: { 'Content-Type': 'application/json' } }
    );
  } catch (err: any) {
    return new Response(
      JSON.stringify({ error: 'Error interno del servidor.' }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }
};

export const POST: APIRoute = async ({ request }) => {
  try {
    const { email, password } = await request.json();
    if (!email || !password) {
      return new Response(
        JSON.stringify({ error: 'Email y contraseña son obligatorios.' }),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      );
    }

    // Login con Supabase Auth
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password
    });

    if (error) {
      return new Response(
        JSON.stringify({ error: error.message }),
        { status: 401, headers: { 'Content-Type': 'application/json' } }
      );
    }

    return new Response(
      JSON.stringify({ user: data.user, session: data.session }),
      { status: 200, headers: { 'Content-Type': 'application/json' } }
    );
  } catch (err: any) {
    return new Response(
      JSON.stringify({ error: 'Error interno del servidor.' }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }
};
