import { useState, useEffect } from "react";
import { supabase } from "../../supabaseClient";

export default function AuthPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  // Obtener sesión inicial y escuchar cambios
  useEffect(() => {
    const getSession = async () => {
      const { data } = await supabase.auth.getSession();
      setUser(data.session?.user ?? null);
    };
    getSession();

    const { data: listener } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
    });

    return () => listener.subscription.unsubscribe();
  }, []);

  // Registro
  const handleSignUp = async () => {
    if (!email || !password) return alert("Completa todos los campos");
    setLoading(true);
    const { data, error } = await supabase.auth.signUp({ email, password });
    setLoading(false);
    if (error) return alert(error.message);
    alert("Registro exitoso. Por favor verifica tu email.");
  };

  // Login
  const handleSignIn = async () => {
    if (!email || !password) return alert("Completa todos los campos");
    setLoading(true);
    const { data, error } = await supabase.auth.signInWithPassword({ email, password });
    setLoading(false);
    if (error) return alert(error.message);
    setUser(data.user);
    setEmail("");
    setPassword("");
  };

  // Logout
  const handleSignOut = async () => {
    await supabase.auth.signOut();
    setUser(null);
  };

  // Vista cuando el usuario está logueado
  if (user) {
    return (
      <div style={{ padding: 24, maxWidth: 400, margin: "40px auto", textAlign: "center" }}>
        <h2 style={{ fontSize: 24, fontWeight: "bold", marginBottom: 16 }}>Bienvenido</h2>
        <p>Tu email: {user.email}</p>
        <button
          onClick={handleSignOut}
          style={{
            marginTop: 20,
            backgroundColor: "#f56565",
            color: "white",
            padding: "10px 20px",
            border: "none",
            borderRadius: 6,
            cursor: "pointer"
          }}
        >
          Cerrar sesión
        </button>
      </div>
    );
  }

  // Vista de login / registro
  return (
    <div style={{ padding: 24, maxWidth: 400, margin: "40px auto", display: "flex", flexDirection: "column", gap: 12 }}>
      <h2 style={{ fontSize: 24, fontWeight: "bold", textAlign: "center" }}>Registro / Login</h2>

      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        style={{ padding: 8, borderRadius: 6, border: "1px solid #ccc" }}
      />

      <input
        type="password"
        placeholder="Contraseña"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        style={{ padding: 8, borderRadius: 6, border: "1px solid #ccc" }}
      />

      <div style={{ display: "flex", gap: 8 }}>
        <button
          onClick={handleSignUp}
          disabled={loading}
          style={{
            flex: 1,
            backgroundColor: "#805ad5",
            padding: 10,
            border: "none",
            borderRadius: 6,
            cursor: "pointer",
            opacity: loading ? 0.6 : 1
          }}
        >
          Registrarse
        </button>

        <button
          onClick={handleSignIn}
          disabled={loading}
          style={{
            flex: 1,
            backgroundColor: "#0a412c",
            padding: 10,
            border: "none",
            borderRadius: 6,
            cursor: "pointer",
            opacity: loading ? 0.6 : 1
          }}
        >
          Iniciar sesión
        </button>
      </div>
    </div>
  );
}
