"use client";

import { useRouter } from "next/navigation";

const colors = {
  white: "#FFFFFF",
  deepBlue: "#1a3c6b",
  deepBlueDark: "#0e2a4a",
  beninGreen: "#008751",
  beninRed: "#E8112D",
  gray50: "#F9FAFB",
  gray100: "#F3F4F6",
  gray200: "#E5E7EB",
  gray300: "#D1D5DB",
  gray400: "#9CA3AF",
  gray500: "#6B7280",
  gray600: "#4B5563",
};

export default function VendeurPage() {
  const router = useRouter();

  return (
    <div style={{ backgroundColor: colors.white, minHeight: "100vh" }}>
      {/* Barre tricolore */}
      <div style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        height: "3px",
        display: "flex",
        zIndex: 50,
      }}>
        <div style={{ flex: 1, backgroundColor: colors.beninGreen }} />
        <div style={{ flex: 1, backgroundColor: colors.beninYellow }} />
        <div style={{ flex: 1, backgroundColor: colors.beninRed }} />
      </div>

      <main style={{ 
        maxWidth: "900px", 
        margin: "0 auto", 
        padding: "120px 24px 60px",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        minHeight: "100vh",
      }}>
        <p style={{
          color: colors.gray500,
          fontSize: "14px",
          marginBottom: "48px",
          letterSpacing: "0.5px",
        }}>
          Choisissez votre mode
        </p>

        <div style={{ 
          display: "flex", 
          gap: "32px", 
          justifyContent: "center", 
          flexWrap: "wrap",
          width: "100%",
        }}>
          {/* Vendeur simple */}
          <button
            onClick={() => router.push("/vendeur/simple")}
            style={{
              flex: 1,
              minWidth: "280px",
              padding: "48px 32px",
              backgroundColor: colors.white,
              border: `1px solid ${colors.gray200}`,
              borderRadius: "24px",
              cursor: "pointer",
              transition: "all 300ms ease",
              textAlign: "center",
              boxShadow: "0 1px 2px 0 rgba(0,0,0,0.05)",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.borderColor = colors.beninGreen;
              e.currentTarget.style.boxShadow = "0 10px 25px -5px rgba(0,0,0,0.1)";
              e.currentTarget.style.transform = "translateY(-4px)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.borderColor = colors.gray200;
              e.currentTarget.style.boxShadow = "0 1px 2px 0 rgba(0,0,0,0.05)";
              e.currentTarget.style.transform = "translateY(0)";
            }}
          >
            <div style={{
              width: "48px",
              height: "2px",
              backgroundColor: colors.beninGreen,
              margin: "0 auto 24px",
            }} />
            <h2 style={{
              fontSize: "24px",
              fontWeight: 600,
              fontFamily: "'Playfair Display', serif",
              color: colors.deepBlue,
              marginBottom: "12px",
            }}>
              Vendeur simple
            </h2>
            <p style={{
              fontSize: "14px",
              color: colors.gray500,
              lineHeight: 1.5,
              marginBottom: "20px",
            }}>
              Avec boîtier
            </p>
            <p style={{
              fontSize: "13px",
              color: colors.gray400,
            }}>
              Pour ceux qui gèrent des stocks
            </p>
          </button>

          {/* Vendeur avancé */}
          <button
            onClick={() => router.push("/vendeur/avance")}
            style={{
              flex: 1,
              minWidth: "280px",
              padding: "48px 32px",
              backgroundColor: colors.white,
              border: `1px solid ${colors.gray200}`,
              borderRadius: "24px",
              cursor: "pointer",
              transition: "all 300ms ease",
              textAlign: "center",
              boxShadow: "0 1px 2px 0 rgba(0,0,0,0.05)",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.borderColor = colors.beninRed;
              e.currentTarget.style.boxShadow = "0 10px 25px -5px rgba(0,0,0,0.1)";
              e.currentTarget.style.transform = "translateY(-4px)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.borderColor = colors.gray200;
              e.currentTarget.style.boxShadow = "0 1px 2px 0 rgba(0,0,0,0.05)";
              e.currentTarget.style.transform = "translateY(0)";
            }}
          >
            <div style={{
              width: "48px",
              height: "2px",
              backgroundColor: colors.beninRed,
              margin: "0 auto 24px",
            }} />
            <h2 style={{
              fontSize: "24px",
              fontWeight: 600,
              fontFamily: "'Playfair Display', serif",
              color: colors.deepBlue,
              marginBottom: "12px",
            }}>
              Vendeur avancé
            </h2>
            <p style={{
              fontSize: "14px",
              color: colors.gray500,
              lineHeight: 1.5,
              marginBottom: "20px",
            }}>
              Sur mobile
            </p>
            <p style={{
              fontSize: "13px",
              color: colors.gray400,
            }}>
              Pour ceux qui préfèrent utiliser leur téléphone
            </p>
          </button>
        </div>
      </main>
    </div>
  );
}