"use client";

import { useState } from "react";

const colors = {
  white: "#FFFFFF",
  deepBlue: "#1a3c6b",
  beninGreen: "#008751",
  beninYellow: "#FCD116",
  beninRed: "#E8112D",
  gray100: "#F3F4F6",
  gray300: "#D1D5DB",
  gray400: "#9CA3AF",
  gray600: "#4B5563",
  gray800: "#1F2937",
};

// Chaque touche = chiffre + lettres associées
const keys = [
  { number: "1", letters: "" },
  { number: "2", letters: "ABC" },
  { number: "3", letters: "DEF" },
  { number: "4", letters: "GHI" },
  { number: "5", letters: "JKL" },
  { number: "6", letters: "MNO" },
  { number: "7", letters: "PQRS" },
  { number: "8", letters: "TUV" },
  { number: "9", letters: "WXYZ" },
  { number: "0", letters: "" },
];

export default function BoitierUI() {
  const [value, setValue] = useState("");
  const [mode, setMode] = useState<"chiffre" | "nom">("chiffre");
  const [balance, setBalance] = useState(125000);
  const [message, setMessage] = useState("");

  const addChar = (number: string, letters: string) => {
    if (mode === "chiffre") {
      setValue(prev => prev + number);
    } else if (letters) {
      // En mode nom, on alterne entre les lettres du même chiffre
      // Ici version simple : ajoute la première lettre
      setValue(prev => prev + letters[0]);
    }
  };

  const clearAll = () => setValue("");
  const backspace = () => setValue(prev => prev.slice(0, -1));

  const handleAction = (type: string) => {
    if (!value) return;
    const amount = parseInt(value) || 0;
    
    if (type === "vente") {
      setBalance(prev => prev + amount);
      setMessage(`${amount.toLocaleString()} FCFA ajoutés`);
    } else if (type === "achat") {
      setBalance(prev => prev - amount);
      setMessage(`${amount.toLocaleString()} FCFA déduits`);
    } else {
      setMessage(`${type} de ${amount.toLocaleString()} FCFA`);
    }
    
    setValue("");
    setTimeout(() => setMessage(""), 2000);
  };

  return (
    <div style={{
      minHeight: "100vh",
      background: colors.gray100,
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      padding: "20px",
      fontFamily: "system-ui, -apple-system, sans-serif",
    }}>
      <div style={{
        maxWidth: "420px",
        width: "100%",
        background: colors.white,
        borderRadius: "32px",
        padding: "24px",
        boxShadow: "0 10px 25px -5px rgba(0,0,0,0.05), 0 8px 10px -6px rgba(0,0,0,0.02)",
        border: `1px solid ${colors.gray300}`,
      }}>
        
        {/* Barre tricolore */}
        <div style={{ display: "flex", gap: "4px", marginBottom: "24px" }}>
          <div style={{ flex: 1, height: "3px", background: colors.beninGreen, borderRadius: "2px" }} />
          <div style={{ flex: 1, height: "3px", background: colors.beninYellow, borderRadius: "2px" }} />
          <div style={{ flex: 1, height: "3px", background: colors.beninRed, borderRadius: "2px" }} />
        </div>

        {/* Header */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", marginBottom: "20px" }}>
          <span style={{ fontWeight: 600, fontSize: "18px", color: colors.deepBlue }}>Alɔdó</span>
          <div style={{ textAlign: "right" }}>
            <div style={{ fontSize: "12px", color: colors.gray400 }}>Solde</div>
            <div style={{ fontWeight: 600, fontSize: "18px", color: colors.beninGreen }}>
              {balance.toLocaleString()} FCFA
            </div>
          </div>
        </div>

        {/* Écran */}
        <div style={{
          background: colors.gray100,
          borderRadius: "20px",
          padding: "20px",
          marginBottom: "20px",
          border: `1px solid ${colors.gray300}`,
        }}>
          <div style={{ fontSize: "11px", color: colors.gray400, marginBottom: "8px" }}>
            {mode === "chiffre" ? "MONTANT" : "IDENTIFIANT"}
          </div>
          <div style={{
            fontSize: "32px",
            fontWeight: 500,
            fontFamily: "monospace",
            color: mode === "chiffre" ? colors.deepBlue : colors.beninGreen,
            wordBreak: "break-all",
            minHeight: "60px",
          }}>
            {value || "0"}
          </div>
        </div>

        {/* Message */}
        {message && (
          <div style={{
            padding: "10px 12px",
            background: `${colors.beninGreen}10`,
            borderRadius: "12px",
            fontSize: "13px",
            color: colors.beninGreen,
            textAlign: "center",
            marginBottom: "16px",
          }}>
            {message}
          </div>
        )}

        {/* Actions */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "8px", marginBottom: "20px" }}>
          {["VENTE", "ACHAT", "DETTE", "PAIEMENT"].map((label) => (
            <button
              key={label}
              onClick={() => handleAction(label.toLowerCase())}
              style={{
                padding: "12px",
                background: label === "VENTE" ? colors.beninGreen : label === "ACHAT" ? colors.deepBlue : colors.gray100,
                border: `1px solid ${label === "DETTE" ? colors.beninYellow : colors.gray300}`,
                borderRadius: "12px",
                fontWeight: 500,
                fontSize: "12px",
                color: label === "VENTE" || label === "ACHAT" ? colors.white : colors.gray600,
                cursor: "pointer",
                transition: "all 0.1s",
              }}
            >
              {label}
            </button>
          ))}
        </div>

        {/* Switch mode */}
        <div style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          marginBottom: "20px",
          padding: "8px 12px",
          background: colors.gray100,
          borderRadius: "12px",
        }}>
          <span style={{ fontSize: "13px", color: colors.gray600 }}>Mode identification</span>
          <button
            onClick={() => setMode(mode === "chiffre" ? "nom" : "chiffre")}
            style={{
              padding: "6px 16px",
              borderRadius: "20px",
              border: `1px solid ${colors.gray300}`,
              background: mode === "nom" ? colors.beninGreen : colors.white,
              color: mode === "nom" ? colors.white : colors.gray600,
              fontSize: "12px",
              fontWeight: 500,
              cursor: "pointer",
            }}
          >
            {mode === "chiffre" ? "Mode nom" : "Mode chiffre"}
          </button>
        </div>

        {/* Clavier */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "10px" }}>
          {keys.map((key) => (
            <button
              key={key.number}
              onClick={() => addChar(key.number, key.letters)}
              style={{
                background: colors.white,
                border: `1px solid ${colors.gray300}`,
                borderRadius: "16px",
                padding: "14px 8px",
                cursor: "pointer",
                transition: "all 0.1s",
                boxShadow: "0 1px 2px rgba(0,0,0,0.05)",
              }}
              onMouseDown={(e) => e.currentTarget.style.transform = "scale(0.97)"}
              onMouseUp={(e) => e.currentTarget.style.transform = "scale(1)"}
            >
              <div style={{ fontSize: "24px", fontWeight: 500, color: colors.deepBlue }}>
                {key.number}
              </div>
              {key.letters && (
                <div style={{ fontSize: "10px", color: colors.gray400, letterSpacing: "0.5px" }}>
                  {key.letters}
                </div>
              )}
            </button>
          ))}
          
          {/* Touches contrôle */}
          <button
            onClick={clearAll}
            style={{
              background: colors.white,
              border: `1px solid ${colors.beninRed}`,
              borderRadius: "16px",
              padding: "14px",
              fontSize: "16px",
              fontWeight: 500,
              color: colors.beninRed,
              cursor: "pointer",
            }}
          >
            C
          </button>
          <button
            onClick={backspace}
            style={{
              background: colors.white,
              border: `1px solid ${colors.gray300}`,
              borderRadius: "16px",
              padding: "14px",
              fontSize: "18px",
              color: colors.gray600,
              cursor: "pointer",
            }}
          >
            ⌫
          </button>
        </div>

        {/* Footer */}
        <div style={{ marginTop: "20px", textAlign: "center", fontSize: "10px", color: colors.gray400 }}>
          Terminal sécurisé
        </div>
      </div>
    </div>
  );
}