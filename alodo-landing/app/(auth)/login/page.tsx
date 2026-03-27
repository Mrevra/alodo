"use client";

import { useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";
import { createBrowserClient } from "@supabase/auth-helpers-nextjs";
import { Shield, Mail, Lock, ArrowRight, Eye, EyeOff, CheckCircle } from "lucide-react";

const colors = {
  white: "#FFFFFF",
  deepBlue: "#1a3c6b",
  deepBlueDark: "#0e2a4a",
  deepBlueLight: "#2c4e7e",
  beninGreen: "#008751",
  beninYellow: "#FCD116",
  beninRed: "#E8112D",
  gray50: "#F9FAFB",
  gray100: "#F3F4F6",
  gray200: "#E5E7EB",
  gray300: "#D1D5DB",
  gray400: "#9CA3AF",
  gray500: "#6B7280",
  gray600: "#4B5563",
  gray700: "#374151",
  gray800: "#1F2937",
  gray900: "#111827",
};

const supabase = createBrowserClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL ?? "",
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ?? ""
);

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError("");
    setLoading(true);

    try {
      const { error: signInError } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (signInError) throw signInError;

      router.replace("/vendeur");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Connexion impossible.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{
      minHeight: "100vh",
      background: `linear-gradient(135deg, ${colors.deepBlue} 0%, ${colors.deepBlueDark} 50%, ${colors.gray100} 100%)`,
      fontFamily: "system-ui, -apple-system, sans-serif",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      padding: "20px",
      position: "relative",
      overflow: "hidden",
    }}>
      <style>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        @keyframes slideInLeft {
          from {
            opacity: 0;
            transform: translateX(-30px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }
        @keyframes pulse {
          0%, 100% { opacity: 0.3; transform: scale(1); }
          50% { opacity: 0.5; transform: scale(1.05); }
        }
      `}</style>

      {/* Décors de fond */}
      <div style={{
        position: "absolute",
        top: "-100px",
        right: "-100px",
        width: "400px",
        height: "400px",
        background: colors.beninGreen,
        borderRadius: "50%",
        filter: "blur(100px)",
        opacity: 0.1,
        animation: "pulse 8s ease-in-out infinite",
      }} />
      <div style={{
        position: "absolute",
        bottom: "-100px",
        left: "-100px",
        width: "400px",
        height: "400px",
        background: colors.beninYellow,
        borderRadius: "50%",
        filter: "blur(100px)",
        opacity: 0.1,
        animation: "pulse 8s ease-in-out infinite reverse",
      }} />
      <div style={{
        position: "absolute",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        width: "600px",
        height: "600px",
        background: colors.beninRed,
        borderRadius: "50%",
        filter: "blur(120px)",
        opacity: 0.05,
      }} />

      {/* Barre tricolore */}
      <div style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        height: "4px",
        display: "flex",
        zIndex: 50,
      }}>
        <div style={{ flex: 1, background: colors.beninGreen }} />
        <div style={{ flex: 1, background: colors.beninYellow }} />
        <div style={{ flex: 1, background: colors.beninRed }} />
      </div>

      {/* Skip to content */}
      <a
        href="#main-content"
        style={{
          position: "absolute",
          top: "-40px",
          left: "16px",
          background: colors.beninYellow,
          color: colors.deepBlue,
          padding: "8px 16px",
          borderRadius: "8px",
          textDecoration: "none",
          fontWeight: 600,
          zIndex: 100,
        }}
        onFocus={(e) => e.currentTarget.style.top = "16px"}
        onBlur={(e) => e.currentTarget.style.top = "-40px"}
      >
        Passer au contenu principal
      </a>

      {/* Conteneur principal */}
      <div id="main-content" style={{
        maxWidth: "1100px",
        width: "100%",
        background: colors.white,
        borderRadius: "32px",
        overflow: "hidden",
        boxShadow: "0 25px 50px -12px rgba(0,0,0,0.25)",
        display: "grid",
        gridTemplateColumns: "1fr 1fr",
        animation: "fadeInUp 0.5s ease-out",
      }}>
        
        {/* Panneau gauche - Branding */}
        <div style={{
          background: `linear-gradient(135deg, ${colors.deepBlue} 0%, ${colors.deepBlueDark} 100%)`,
          padding: "48px 40px",
          position: "relative",
          overflow: "hidden",
        }}>
          {/* Décoration interne */}
          <div style={{
            position: "absolute",
            top: "-50px",
            right: "-50px",
            width: "200px",
            height: "200px",
            background: colors.beninGreen,
            borderRadius: "50%",
            opacity: 0.1,
          }} />
          <div style={{
            position: "absolute",
            bottom: "-50px",
            left: "-50px",
            width: "200px",
            height: "200px",
            background: colors.beninYellow,
            borderRadius: "50%",
            opacity: 0.1,
          }} />
          
          <div style={{ position: "relative", zIndex: 2 }}>
            {/* Logo */}
            <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "48px" }}>
              <div style={{
                width: "48px",
                height: "48px",
                background: colors.white,
                borderRadius: "16px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}>
                <span style={{ fontSize: "28px", fontWeight: 700, color: colors.deepBlue }}>A</span>
              </div>
              <div>
                <span style={{
                  fontFamily: "'Playfair Display', serif",
                  fontSize: "28px",
                  fontWeight: 700,
                  color: colors.white,
                  letterSpacing: "-0.02em",
                }}>Alɔdó</span>
               
              </div>
            </div>

            {/* Titre */}
            <h1 style={{
              fontSize: "36px",
              fontWeight: 700,
              fontFamily: "'Playfair Display', serif",
              color: colors.white,
              marginBottom: "16px",
              letterSpacing: "-0.02em",
              lineHeight: 1.2,
            }}>
              Bienvenue sur<br />
              votre espace
            </h1>
            
            <p style={{
              fontSize: "16px",
              color: "rgba(255,255,255,0.8)",
              marginBottom: "32px",
              lineHeight: 1.5,
            }}>
              Accédez à votre tableau de bord pour gérer vos transactions,
              suivre vos performances et développer votre activité.
            </p>

            {/* Avantages */}
            <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
              {[
                "Transactions en temps réel",
                "Suivi des ventes et achats",
                "Tableau de bord personnalisé",
                "Support prioritaire 7j/7",
              ].map((item, i) => (
                <div key={i} style={{ display: "flex", alignItems: "center", gap: "12px", animation: `slideInLeft 0.3s ease-out ${i * 0.1}s backwards` }}>
                  <CheckCircle size={18} color={colors.beninGreen} />
                  <span style={{ fontSize: "14px", color: "rgba(255,255,255,0.9)" }}>{item}</span>
                </div>
              ))}
            </div>

            {/* Badge sécurisé */}
            <div style={{
              marginTop: "48px",
              display: "flex",
              alignItems: "center",
              gap: "8px",
              padding: "12px 16px",
              background: "rgba(255,255,255,0.1)",
              borderRadius: "12px",
              backdropFilter: "blur(8px)",
            }}>
              <Shield size={16} color={colors.beninYellow} />
              <span style={{ fontSize: "12px", color: "rgba(255,255,255,0.8)" }}>
                Plateforme certifiée • Sécurité bancaire
              </span>
            </div>
          </div>
        </div>

        {/* Panneau droit - Formulaire */}
        <div style={{
          padding: "48px 40px",
          background: colors.white,
        }}>
          <div style={{ marginBottom: "32px" }}>
            <h2 style={{
              fontSize: "28px",
              fontWeight: 600,
              color: colors.deepBlue,
              marginBottom: "8px",
            }}>
              Se connecter
            </h2>
            <p style={{ fontSize: "14px", color: colors.gray500 }}>
              Entrez vos identifiants pour accéder à votre compte
            </p>
          </div>

          <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
            {/* Champ Email */}
            <div>
              <label style={{
                display: "block",
                fontSize: "13px",
                fontWeight: 500,
                color: colors.gray700,
                marginBottom: "8px",
              }}>
                Adresse email
              </label>
              <div style={{ position: "relative" }}>
                <Mail size={18} style={{
                  position: "absolute",
                  left: "16px",
                  top: "50%",
                  transform: "translateY(-50%)",
                  color: colors.gray400,
                }} />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  autoComplete="email"
                  placeholder="exemple@alodo.com"
                  style={{
                    width: "100%",
                    padding: "14px 16px 14px 44px",
                    border: `1px solid ${colors.gray200}`,
                    borderRadius: "12px",
                    fontSize: "14px",
                    outline: "none",
                    transition: "all 0.2s",
                  }}
                  onFocus={(e) => e.currentTarget.style.borderColor = colors.deepBlue}
                  onBlur={(e) => e.currentTarget.style.borderColor = colors.gray200}
                />
              </div>
            </div>

            {/* Champ Mot de passe */}
            <div>
              <label style={{
                display: "block",
                fontSize: "13px",
                fontWeight: 500,
                color: colors.gray700,
                marginBottom: "8px",
              }}>
                Mot de passe
              </label>
              <div style={{ position: "relative" }}>
                <Lock size={18} style={{
                  position: "absolute",
                  left: "16px",
                  top: "50%",
                  transform: "translateY(-50%)",
                  color: colors.gray400,
                }} />
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  autoComplete="current-password"
                  placeholder="Votre mot de passe"
                  style={{
                    width: "100%",
                    padding: "14px 16px 14px 44px",
                    border: `1px solid ${colors.gray200}`,
                    borderRadius: "12px",
                    fontSize: "14px",
                    outline: "none",
                    transition: "all 0.2s",
                  }}
                  onFocus={(e) => e.currentTarget.style.borderColor = colors.deepBlue}
                  onBlur={(e) => e.currentTarget.style.borderColor = colors.gray200}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  style={{
                    position: "absolute",
                    right: "16px",
                    top: "50%",
                    transform: "translateY(-50%)",
                    background: "none",
                    border: "none",
                    cursor: "pointer",
                    color: colors.gray400,
                  }}
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            {/* Options */}
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <label style={{ display: "flex", alignItems: "center", gap: "8px", cursor: "pointer" }}>
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  style={{ width: "16px", height: "16px", cursor: "pointer" }}
                />
                <span style={{ fontSize: "13px", color: colors.gray600 }}>Se souvenir de moi</span>
              </label>
              <a href="/forgot-password" style={{
                fontSize: "13px",
                color: colors.deepBlue,
                textDecoration: "none",
              }}>
                Mot de passe oublié ?
              </a>
            </div>

            {/* Message d'erreur */}
            {error && (
              <div style={{
                padding: "12px 16px",
                background: `${colors.beninRed}10`,
                border: `1px solid ${colors.beninRed}20`,
                borderRadius: "12px",
                fontSize: "13px",
                color: colors.beninRed,
              }}>
                {error}
              </div>
            )}

            {/* Bouton de connexion */}
            <button
              type="submit"
              disabled={loading}
              style={{
                width: "100%",
                padding: "14px",
                background: colors.deepBlue,
                border: "none",
                borderRadius: "12px",
                fontSize: "15px",
                fontWeight: 600,
                color: colors.white,
                cursor: loading ? "not-allowed" : "pointer",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: "8px",
                transition: "all 0.2s",
                opacity: loading ? 0.7 : 1,
              }}
              onMouseEnter={(e) => !loading && (e.currentTarget.style.background = colors.deepBlueDark)}
              onMouseLeave={(e) => !loading && (e.currentTarget.style.background = colors.deepBlue)}
            >
              {loading ? "Connexion en cours..." : "Se connecter"}
              {!loading && <ArrowRight size={18} />}
            </button>

          
          </form>
        </div>
      </div>
    </div>
  );
}
