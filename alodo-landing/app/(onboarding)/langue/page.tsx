"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { 
  Volume2, 
  VolumeX, 
  Headphones, 
  ChevronRight,
  Package,
  Hammer,
  Factory,
  Briefcase,
  CheckCircle,
  Upload,
  FileText,
  Phone,
  Send,
  Loader2,
  Smartphone,
  Check
} from "lucide-react";

// ============================================================================
// COULEURS DU BRANDING ALO̱DÓ
// ============================================================================

const colors = {
  white: "#FFFFFF",
  deepBlue: "#1a3c6b",
  deepBlueDark: "#0e2a4a",
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

type ProfileType = "vendeur" | "artisan" | "transformateur" | "prestataire" | null;
type StepType = "language" | "profile" | "document" | "phone";

// Configuration des profils
const PROFILES = [
  { 
    id: "vendeur" as const, 
    title: "Vendeur de flux", 
    description: "Je vends des produits ou services de manière régulière",
    icon: Package,
    color: colors.beninGreen,
    bgColor: "#00875110"
  },
  { 
    id: "artisan" as const, 
    title: "Artisan de projet", 
    description: "Je réalise des projets ponctuels sur mesure",
    icon: Hammer,
    color: colors.beninYellow,
    bgColor: "#FCD11610"
  },
  { 
    id: "transformateur" as const, 
    title: "Transformateur", 
    description: "Je transforme des matières premières en produits finis",
    icon: Factory,
    color: colors.beninRed,
    bgColor: "#E8112D10"
  },
  { 
    id: "prestataire" as const, 
    title: "Prestataire de service", 
    description: "Je fournis des services professionnels",
    icon: Briefcase,
    color: colors.deepBlue,
    bgColor: "#1a3c6b10"
  }
];

// Langues disponibles
const LANGUAGES = [
  { code: "fr" as const, name: "Français", color: colors.beninGreen, textColor: colors.white },
  { code: "fon" as const, name: "Fon", color: colors.beninYellow, textColor: colors.deepBlue },
  { code: "yor" as const, name: "Yorùbá", color: colors.beninRed, textColor: colors.white }
];

export default function OnboardingPage() {
  const router = useRouter();
  
  // États
  const [step, setStep] = useState<StepType>("language");
  const [selectedLang, setSelectedLang] = useState<"fr" | "fon" | "yor">("fr");
  const [selectedProfile, setSelectedProfile] = useState<ProfileType>(null);
  const [isAudioModalOpen, setIsAudioModalOpen] = useState(true);
  const [isMuted, setIsMuted] = useState(false);
  const [isAudioPlaying, setIsAudioPlaying] = useState(false);
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [phoneNumber, setPhoneNumber] = useState("");
  const [verificationCode, setVerificationCode] = useState("");
  const [showCodeInput, setShowCodeInput] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [countdown, setCountdown] = useState(0);
  const [error, setError] = useState("");

  const audioRef = useRef<HTMLAudioElement | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Contenu textuel
  const content = {
    language: {
      title: "Bienvenue sur Alɔdó",
      subtitle: "La plateforme qui transforme l'économie informelle",
      instruction: "Choisissez votre langue de préférence"
    },
    profile: {
      title: "Choisissez votre profil",
      subtitle: "Nous allons personnaliser votre expérience",
      instruction: "Sélectionnez l'activité qui vous correspond",
      buttonNext: "Continuer",
      buttonBack: "Retour"
    },
    document: {
      title: "Validation d'identité",
      subtitle: "Pour garantir la sécurité de notre plateforme",
      instruction: "Téléchargez une pièce d'identité valide",
      buttonNext: "Continuer",
      buttonBack: "Retour",
      uploadZone: "Cliquez ou glissez votre pièce d'identité",
      uploadHint: "Formats acceptés : JPG, PNG, PDF (max. 5 Mo)",
      acceptedFormats: ".jpg,.jpeg,.png,.pdf",
      maxSize: 5 * 1024 * 1024
    },
    phone: {
      title: "Vérification téléphone",
      subtitle: "Activez votre compte en toute sécurité",
      instruction: "Entrez votre numéro de téléphone",
      buttonSendCode: "Envoyer le code",
      buttonVerify: "Vérifier et terminer",
      buttonBack: "Retour",
      phonePlaceholder: "99 99 99 99",
      codePlaceholder: "Code à 6 chiffres",
      sending: "Envoi en cours...",
      verifying: "Vérification...",
      resendCode: "Renvoyer le code",
      resendIn: "Renvoyer dans",
      seconds: "secondes",
      errors: {
        invalidPhone: "Numéro de téléphone invalide",
        invalidCode: "Code invalide (6 chiffres)",
        sendFailed: "Échec de l'envoi du code",
        verifyFailed: "Échec de la vérification"
      }
    }
  };

  // Lecture audio
  const playAudio = useCallback(() => {
    if (!audioRef.current || isMuted) return;
    audioRef.current.currentTime = 0;
    audioRef.current.play().catch(() => {});
  }, [isMuted]);

  const stopAudio = useCallback(() => {
    if (!audioRef.current) return;
    audioRef.current.pause();
    audioRef.current.currentTime = 0;
  }, []);

  const toggleMute = useCallback(() => {
    setIsMuted(prev => !prev);
  }, []);

  useEffect(() => {
    if (!selectedLang || isAudioModalOpen) return;
    const audio = audioRef.current;
    if (!audio) return;

    const audioFiles = {
      language: `/audio/${selectedLang}/langue.mp3`,
      profile: `/audio/${selectedLang}/profil.mp3`,
      document: `/audio/${selectedLang}/document.mp3`,
      phone: `/audio/${selectedLang}/phone.mp3`,
    };

    audio.src = audioFiles[step];
    audio.load();
    if (!isMuted) playAudio();
  }, [selectedLang, step, isAudioModalOpen, isMuted, playAudio]);

  useEffect(() => {
    if (countdown > 0) {
      const timer = setTimeout(() => setCountdown(countdown - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [countdown]);

  const handleEnableAudio = () => {
    setIsAudioModalOpen(false);
    setTimeout(() => !isMuted && playAudio(), 100);
  };

  const handleSelectLanguage = (lang: "fr" | "fon" | "yor") => {
    setSelectedLang(lang);
    setTimeout(() => setStep("profile"), 300);
  };

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    if (file.size > content.document.maxSize) {
      alert("Le fichier est trop volumineux. Taille maximum : 5 Mo");
      return;
    }

    setUploadedFile(file);
    let progress = 0;
    const interval = setInterval(() => {
      progress += 10;
      setUploadProgress(progress);
      if (progress >= 100) clearInterval(interval);
    }, 200);
  };

  const formatPhoneNumber = (value: string) => {
    const cleaned = value.replace(/\D/g, "");
    const match = cleaned.match(/^(\d{2})(\d{2})(\d{2})(\d{2})$/);
    return match ? `${match[1]} ${match[2]} ${match[3]} ${match[4]}` : value;
  };

  const sendVerificationCode = async () => {
    const cleanPhone = phoneNumber.replace(/\s/g, "");
    if (cleanPhone.length !== 8) {
      setError(content.phone.errors.invalidPhone);
      return;
    }

    setIsLoading(true);
    setError("");
    try {
      await new Promise(resolve => setTimeout(resolve, 1500));
      setShowCodeInput(true);
      setCountdown(60);
      setPhoneNumber(cleanPhone);
    } catch {
      setError(content.phone.errors.sendFailed);
    } finally {
      setIsLoading(false);
    }
  };

  const verifyCode = async () => {
    if (verificationCode.length !== 6) {
      setError(content.phone.errors.invalidCode);
      return;
    }

    setIsLoading(true);
    setError("");
    try {
      await new Promise(resolve => setTimeout(resolve, 1500));
      stopAudio();
      localStorage.setItem("alodo_user_data", JSON.stringify({
        language: selectedLang,
        profile: selectedProfile,
        phone: phoneNumber,
        hasCompletedOnboarding: true,
      }));
      router.push("/dashboard");
    } catch {
      setError(content.phone.errors.verifyFailed);
    } finally {
      setIsLoading(false);
    }
  };

  // Styles communs
  const btnPrimaryStyle = {
    minHeight: "56px",
    padding: "12px 32px",
    borderRadius: "8px",
    fontWeight: 600,
    fontSize: "16px",
    border: "none",
    cursor: "pointer",
    transition: "all 200ms ease",
    backgroundColor: colors.deepBlue,
    color: colors.white,
  };

  const btnSecondaryStyle = {
    minHeight: "56px",
    padding: "12px 32px",
    borderRadius: "8px",
    fontWeight: 600,
    fontSize: "16px",
    border: `2px solid ${colors.deepBlue}`,
    backgroundColor: "transparent",
    color: colors.deepBlue,
    cursor: "pointer",
    transition: "all 200ms ease",
  };

  const btnAccentStyle = {
    minHeight: "56px",
    padding: "12px 32px",
    borderRadius: "8px",
    fontWeight: 600,
    fontSize: "16px",
    border: "none",
    cursor: "pointer",
    transition: "all 200ms ease",
    backgroundColor: colors.beninGreen,
    color: colors.white,
  };

  const inputStyle = {
    width: "100%",
    padding: "16px",
    fontSize: "16px",
    border: `1px solid ${colors.gray200}`,
    borderRadius: "12px",
    outline: "none",
    transition: "all 200ms ease",
  };

  return (
    <div style={{ position: "fixed", inset: 0, backgroundColor: colors.white, overflow: "hidden" }}>
      {/* Skip to content link */}
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

      <audio ref={audioRef} preload="auto" playsInline />

      {/* Barre de contrôle audio */}
      <div style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        zIndex: 40,
        backgroundColor: colors.white,
        borderBottom: `1px solid ${colors.gray100}`,
      }}>
        <div style={{ display: "flex", justifyContent: "flex-end", alignItems: "center", height: "56px", padding: "0 16px" }}>
          <button
            onClick={toggleMute}
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              width: "48px",
              height: "48px",
              borderRadius: "8px",
              border: "none",
              background: "transparent",
              cursor: "pointer",
              color: colors.deepBlue,
            }}
            aria-label={isMuted ? "Activer le son" : "Couper le son"}
          >
            {isMuted ? <VolumeX size={24} /> : <Volume2 size={24} />}
          </button>
        </div>
      </div>

      {/* Barre tricolore béninoise */}
      <div style={{
        position: "fixed",
        top: "56px",
        left: 0,
        right: 0,
        height: "4px",
        display: "flex",
        zIndex: 40,
      }}>
        <div style={{ flex: 1, backgroundColor: colors.beninGreen }} />
        <div style={{ flex: 1, backgroundColor: colors.beninYellow }} />
        <div style={{ flex: 1, backgroundColor: colors.beninRed }} />
      </div>

      {/* Contenu principal */}
      <div
        id="main-content"
        style={{
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          padding: "96px 24px 24px 24px",
          overflowY: "auto",
        }}
      >
        {/* Étape Langue */}
        {step === "language" && (
          <div style={{ maxWidth: "400px", width: "100%", animation: "fadeIn 300ms ease forwards" }}>
            <style>{`
              @keyframes fadeIn {
                from { opacity: 0; transform: translateY(10px); }
                to { opacity: 1; transform: translateY(0); }
              }
            `}</style>
            <div style={{ textAlign: "center", marginBottom: "32px" }}>
              <h1 style={{
                fontSize: "clamp(28px, 5vw, 36px)",
                fontWeight: 700,
                fontFamily: "'Playfair Display', serif",
                color: colors.deepBlue,
                letterSpacing: "-0.02em",
                marginBottom: "12px",
              }}>
                {content.language.title}
              </h1>
              <p style={{ fontSize: "16px", color: colors.gray600, marginBottom: "16px" }}>
                {content.language.subtitle}
              </p>
              <p style={{ fontSize: "14px", color: colors.gray500 }}>
                {content.language.instruction}
              </p>
            </div>

            <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
              {LANGUAGES.map((lang) => (
                <button
                  key={lang.code}
                  onClick={() => handleSelectLanguage(lang.code)}
                  style={{
                    width: "100%",
                    minHeight: "56px",
                    padding: "0 24px",
                    borderRadius: "8px",
                    fontWeight: 600,
                    fontSize: "16px",
                    border: "none",
                    cursor: "pointer",
                    backgroundColor: lang.color,
                    color: lang.textColor,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    transition: "all 200ms ease",
                  }}
                  onMouseEnter={(e) => e.currentTarget.style.opacity = "0.9"}
                  onMouseLeave={(e) => e.currentTarget.style.opacity = "1"}
                >
                  <span>{lang.name}</span>
                  <ChevronRight size={20} />
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Étape Profil */}
        {step === "profile" && (
          <div style={{ maxWidth: "700px", width: "100%" }}>
            <div style={{ textAlign: "center", marginBottom: "32px" }}>
              <h2 style={{
                fontSize: "clamp(28px, 5vw, 36px)",
                fontWeight: 700,
                fontFamily: "'Playfair Display', serif",
                color: colors.deepBlue,
                letterSpacing: "-0.02em",
                marginBottom: "12px",
              }}>
                {content.profile.title}
              </h2>
              <p style={{ fontSize: "16px", color: colors.gray600, marginBottom: "8px" }}>
                {content.profile.subtitle}
              </p>
              <p style={{ fontSize: "14px", color: colors.gray500 }}>
                {content.profile.instruction}
              </p>
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "16px", marginBottom: "32px" }}>
              {PROFILES.map((profile) => {
                const Icon = profile.icon;
                const isSelected = selectedProfile === profile.id;
                return (
                  <button
                    key={profile.id}
                    onClick={() => setSelectedProfile(profile.id)}
                    style={{
                      width: "100%",
                      padding: "24px",
                      borderRadius: "12px",
                      textAlign: "left",
                      border: isSelected ? `2px solid ${profile.color}` : `1px solid ${colors.gray200}`,
                      backgroundColor: isSelected ? colors.deepBlue : colors.white,
                      cursor: "pointer",
                      transition: "all 200ms ease",
                      boxShadow: isSelected ? "0 4px 6px -1px rgba(0,0,0,0.1)" : "none",
                    }}
                  >
                    <div style={{ display: "flex", gap: "16px", alignItems: "flex-start" }}>
                      <div style={{
                        width: "48px",
                        height: "48px",
                        borderRadius: "9999px",
                        backgroundColor: isSelected ? "rgba(255,255,255,0.2)" : profile.bgColor,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                      }}>
                        <Icon size={24} color={isSelected ? colors.white : profile.color} />
                      </div>
                      <div style={{ flex: 1 }}>
                        <h3 style={{
                          fontSize: "18px",
                          fontWeight: 600,
                          marginBottom: "4px",
                          color: isSelected ? colors.white : colors.gray900,
                        }}>
                          {profile.title}
                        </h3>
                        <p style={{
                          fontSize: "14px",
                          color: isSelected ? "rgba(255,255,255,0.8)" : colors.gray500,
                        }}>
                          {profile.description}
                        </p>
                      </div>
                      {isSelected && <Check size={20} color={colors.white} />}
                    </div>
                  </button>
                );
              })}
            </div>

            <div style={{ display: "flex", gap: "16px", justifyContent: "center" }}>
              <button
                onClick={() => setStep("language")}
                style={btnSecondaryStyle}
                onMouseEnter={(e) => e.currentTarget.style.backgroundColor = `${colors.deepBlue}10`}
                onMouseLeave={(e) => e.currentTarget.style.backgroundColor = "transparent"}
              >
                {content.profile.buttonBack}
              </button>
              <button
                onClick={() => setStep("document")}
                disabled={!selectedProfile}
                style={{
                  ...btnAccentStyle,
                  opacity: !selectedProfile ? 0.5 : 1,
                  cursor: !selectedProfile ? "not-allowed" : "pointer",
                }}
                onMouseEnter={(e) => {
                  if (selectedProfile) e.currentTarget.style.backgroundColor = colors.beninGreen + "dd";
                }}
                onMouseLeave={(e) => {
                  if (selectedProfile) e.currentTarget.style.backgroundColor = colors.beninGreen;
                }}
              >
                {content.profile.buttonNext}
              </button>
            </div>
          </div>
        )}

        {/* Étape Document */}
        {step === "document" && (
          <div style={{ maxWidth: "400px", width: "100%" }}>
            <div style={{ textAlign: "center", marginBottom: "32px" }}>
              <h2 style={{
                fontSize: "clamp(28px, 5vw, 36px)",
                fontWeight: 700,
                fontFamily: "'Playfair Display', serif",
                color: colors.deepBlue,
                letterSpacing: "-0.02em",
                marginBottom: "12px",
              }}>
                {content.document.title}
              </h2>
              <p style={{ fontSize: "16px", color: colors.gray600, marginBottom: "8px" }}>
                {content.document.subtitle}
              </p>
              <p style={{ fontSize: "14px", color: colors.gray500 }}>
                {content.document.instruction}
              </p>
            </div>

            <input
              ref={fileInputRef}
              type="file"
              accept={content.document.acceptedFormats}
              onChange={handleFileUpload}
              style={{ display: "none" }}
            />

            <div
              onClick={() => fileInputRef.current?.click()}
              onKeyDown={(e) => (e.key === "Enter" || e.key === " ") && fileInputRef.current?.click()}
              tabIndex={0}
              role="button"
              style={{
                width: "100%",
                minHeight: "200px",
                border: `2px dashed ${uploadedFile ? colors.beninGreen : colors.gray300}`,
                borderRadius: "12px",
                cursor: "pointer",
                backgroundColor: uploadedFile ? `${colors.beninGreen}10` : "transparent",
                marginBottom: "32px",
                transition: "all 200ms ease",
              }}
            >
              <div style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", height: "100%", padding: "24px" }}>
                {uploadedFile ? (
                  <>
                    <CheckCircle size={48} color={colors.beninGreen} style={{ marginBottom: "12px" }} />
                    <p style={{ fontSize: "14px", fontWeight: 500, marginBottom: "4px" }}>{uploadedFile.name}</p>
                    <p style={{ fontSize: "12px", color: colors.gray500 }}>{(uploadedFile.size / 1024 / 1024).toFixed(2)} Mo</p>
                    {uploadProgress < 100 && (
                      <div style={{ width: "100%", maxWidth: "200px", marginTop: "12px" }}>
                        <div style={{ height: "4px", backgroundColor: colors.gray200, borderRadius: "4px", overflow: "hidden" }}>
                          <div style={{ width: `${uploadProgress}%`, height: "100%", backgroundColor: colors.beninGreen, transition: "width 200ms ease" }} />
                        </div>
                        <p style={{ fontSize: "11px", color: colors.gray500, marginTop: "4px", textAlign: "center" }}>{uploadProgress}%</p>
                      </div>
                    )}
                  </>
                ) : (
                  <>
                    <Upload size={48} color={colors.gray400} style={{ marginBottom: "12px" }} />
                    <p style={{ fontSize: "14px", fontWeight: 500, marginBottom: "4px" }}>{content.document.uploadZone}</p>
                    <p style={{ fontSize: "12px", color: colors.gray500 }}>{content.document.uploadHint}</p>
                  </>
                )}
              </div>
            </div>

            <div style={{ display: "flex", gap: "16px", justifyContent: "center" }}>
              <button
                onClick={() => setStep("profile")}
                style={btnSecondaryStyle}
                onMouseEnter={(e) => e.currentTarget.style.backgroundColor = `${colors.deepBlue}10`}
                onMouseLeave={(e) => e.currentTarget.style.backgroundColor = "transparent"}
              >
                {content.document.buttonBack}
              </button>
              <button
                onClick={() => setStep("phone")}
                disabled={!uploadedFile}
                style={{
                  ...btnAccentStyle,
                  opacity: !uploadedFile ? 0.5 : 1,
                  cursor: !uploadedFile ? "not-allowed" : "pointer",
                }}
                onMouseEnter={(e) => {
                  if (uploadedFile) e.currentTarget.style.backgroundColor = colors.beninGreen + "dd";
                }}
                onMouseLeave={(e) => {
                  if (uploadedFile) e.currentTarget.style.backgroundColor = colors.beninGreen;
                }}
              >
                {content.document.buttonNext}
              </button>
            </div>
          </div>
        )}

        {/* Étape Téléphone */}
        {step === "phone" && (
          <div style={{ maxWidth: "400px", width: "100%" }}>
            <div style={{ textAlign: "center", marginBottom: "32px" }}>
              <div style={{
                width: "64px",
                height: "64px",
                borderRadius: "9999px",
                backgroundColor: `${colors.deepBlue}10`,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                margin: "0 auto 16px",
              }}>
                <Smartphone size={32} color={colors.deepBlue} />
              </div>
              <h2 style={{
                fontSize: "clamp(28px, 5vw, 36px)",
                fontWeight: 700,
                fontFamily: "'Playfair Display', serif",
                color: colors.deepBlue,
                letterSpacing: "-0.02em",
                marginBottom: "12px",
              }}>
                {content.phone.title}
              </h2>
              <p style={{ fontSize: "16px", color: colors.gray600, marginBottom: "8px" }}>
                {content.phone.subtitle}
              </p>
              <p style={{ fontSize: "14px", color: colors.gray500 }}>
                {content.phone.instruction}
              </p>
            </div>

            <div style={{ marginBottom: "24px" }}>
              {!showCodeInput ? (
                <>
                  <div style={{ position: "relative", marginBottom: "16px" }}>
                    <Phone size={20} color={colors.gray400} style={{ position: "absolute", left: "16px", top: "50%", transform: "translateY(-50%)" }} />
                    <input
                      type="tel"
                      value={phoneNumber}
                      onChange={(e) => {
                        setPhoneNumber(formatPhoneNumber(e.target.value));
                        setError("");
                      }}
                      placeholder={content.phone.phonePlaceholder}
                      style={{ ...inputStyle, paddingLeft: "48px" }}
                      onFocus={(e) => e.currentTarget.style.borderColor = colors.deepBlue}
                      onBlur={(e) => e.currentTarget.style.borderColor = colors.gray200}
                      disabled={isLoading}
                    />
                  </div>
                  {error && <p style={{ fontSize: "14px", color: colors.beninRed, textAlign: "center", marginBottom: "16px" }}>{error}</p>}
                  <button
                    onClick={sendVerificationCode}
                    disabled={isLoading || phoneNumber.replace(/\s/g, "").length !== 8}
                    style={{
                      width: "100%",
                      minHeight: "56px",
                      padding: "12px 24px",
                      borderRadius: "8px",
                      fontWeight: 600,
                      fontSize: "16px",
                      border: "none",
                      backgroundColor: colors.deepBlue,
                      color: colors.white,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      gap: "8px",
                      opacity: (isLoading || phoneNumber.replace(/\s/g, "").length !== 8) ? 0.5 : 1,
                      cursor: (isLoading || phoneNumber.replace(/\s/g, "").length !== 8) ? "not-allowed" : "pointer",
                    }}
                  >
                    {isLoading ? <Loader2 size={20} style={{ animation: "spin 1s linear infinite" }} /> : <Send size={20} />}
                    <span>{isLoading ? content.phone.sending : content.phone.buttonSendCode}</span>
                  </button>
                </>
              ) : (
                <>
                  <p style={{ fontSize: "14px", color: colors.gray600, textAlign: "center", marginBottom: "16px" }}>
                    Code envoyé au <strong style={{ color: colors.deepBlue }}>{phoneNumber}</strong>
                  </p>
                  <input
                    id="verification-code"
                    type="text"
                    value={verificationCode}
                    onChange={(e) => {
                      setVerificationCode(e.target.value.replace(/\D/g, "").slice(0, 6));
                      setError("");
                    }}
                    placeholder={content.phone.codePlaceholder}
                    style={{
                      ...inputStyle,
                      textAlign: "center",
                      fontSize: "24px",
                      letterSpacing: "4px",
                      marginBottom: "16px",
                    }}
                    maxLength={6}
                    disabled={isLoading}
                  />
                  {error && <p style={{ fontSize: "14px", color: colors.beninRed, textAlign: "center", marginBottom: "16px" }}>{error}</p>}
                  <button
                    onClick={verifyCode}
                    disabled={isLoading || verificationCode.length !== 6}
                    style={{
                      width: "100%",
                      minHeight: "56px",
                      padding: "12px 24px",
                      borderRadius: "8px",
                      fontWeight: 600,
                      fontSize: "16px",
                      border: "none",
                      backgroundColor: colors.beninGreen,
                      color: colors.white,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      gap: "8px",
                      marginBottom: "16px",
                      opacity: (isLoading || verificationCode.length !== 6) ? 0.5 : 1,
                      cursor: (isLoading || verificationCode.length !== 6) ? "not-allowed" : "pointer",
                    }}
                  >
                    {isLoading ? <Loader2 size={20} style={{ animation: "spin 1s linear infinite" }} /> : null}
                    <span>{isLoading ? content.phone.verifying : content.phone.buttonVerify}</span>
                  </button>
                  <div style={{ textAlign: "center" }}>
                    <button
                      onClick={() => countdown === 0 && sendVerificationCode()}
                      disabled={countdown > 0}
                      style={{
                        fontSize: "14px",
                        color: colors.deepBlue,
                        background: "none",
                        border: "none",
                        cursor: countdown > 0 ? "not-allowed" : "pointer",
                        opacity: countdown > 0 ? 0.5 : 1,
                        textDecoration: "underline",
                      }}
                    >
                      {countdown > 0 
                        ? `${content.phone.resendIn} ${countdown} ${content.phone.seconds}`
                        : content.phone.resendCode}
                    </button>
                  </div>
                </>
              )}
            </div>

            <div style={{ display: "flex", justifyContent: "center" }}>
              <button
                onClick={() => setStep("document")}
                style={btnSecondaryStyle}
                onMouseEnter={(e) => e.currentTarget.style.backgroundColor = `${colors.deepBlue}10`}
                onMouseLeave={(e) => e.currentTarget.style.backgroundColor = "transparent"}
              >
                {content.phone.buttonBack}
              </button>
            </div>
          </div>
        )}

        {/* Indicateur de progression */}
        <div style={{
          position: "fixed",
          bottom: "24px",
          left: 0,
          right: 0,
          display: "flex",
          justifyContent: "center",
          gap: "8px",
        }}>
          {["language", "profile", "document", "phone"].map((s, i) => (
            <div
              key={s}
              style={{
                height: "4px",
                borderRadius: "4px",
                transition: "all 300ms ease",
                width: step === s ? "32px" : "8px",
                backgroundColor: step === s 
                  ? colors.beninGreen 
                  : i < ["language", "profile", "document", "phone"].indexOf(step) 
                    ? colors.deepBlue 
                    : colors.gray200,
              }}
            />
          ))}
        </div>
      </div>

      {/* Modal d'autorisation audio */}
      {isAudioModalOpen && (
        <div style={{
          position: "fixed",
          inset: 0,
          backgroundColor: "rgba(0,0,0,0.7)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          zIndex: 50,
        }}>
          <div style={{
            width: "calc(100% - 48px)",
            maxWidth: "400px",
            backgroundColor: colors.white,
            borderRadius: "12px",
            overflow: "hidden",
            boxShadow: "0 20px 25px -5px rgba(0,0,0,0.1)",
          }}>
            <div style={{ height: "4px", display: "flex" }}>
              <div style={{ flex: 1, backgroundColor: colors.beninGreen }} />
              <div style={{ flex: 1, backgroundColor: colors.beninYellow }} />
              <div style={{ flex: 1, backgroundColor: colors.beninRed }} />
            </div>
            <div style={{ padding: "24px", textAlign: "center" }}>
              <div style={{
                width: "48px",
                height: "48px",
                borderRadius: "9999px",
                backgroundColor: colors.gray100,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                margin: "0 auto 16px",
              }}>
                <Headphones size={24} color={colors.deepBlue} />
              </div>
              <h2 style={{
                fontSize: "24px",
                fontWeight: 700,
                fontFamily: "'Playfair Display', serif",
                color: colors.deepBlue,
                marginBottom: "12px",
              }}>
                {LANGUAGES.find(l => l.code === selectedLang)?.name === "Fon" ? "Mi kwabo" : 
                 LANGUAGES.find(l => l.code === selectedLang)?.name === "Yorùbá" ? "E kaabo" : "Bienvenue"}
              </h2>
              <p style={{ fontSize: "16px", color: colors.gray600, marginBottom: "24px" }}>
                Activez l&apos;audio pour profiter d&apos;un guidage vocal tout au long de votre inscription.
              </p>
              <button
                onClick={handleEnableAudio}
                style={{
                  width: "100%",
                  minHeight: "56px",
                  padding: "12px 24px",
                  borderRadius: "8px",
                  fontWeight: 600,
                  fontSize: "16px",
                  border: "none",
                  cursor: "pointer",
                  backgroundColor: colors.deepBlue,
                  color: colors.white,
                }}
                onMouseEnter={(e) => e.currentTarget.style.backgroundColor = colors.deepBlueDark}
                onMouseLeave={(e) => e.currentTarget.style.backgroundColor = colors.deepBlue}
              >
                Activer l&apos;audio
              </button>
            </div>
          </div>
        </div>
      )}

      <style>{`
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
}
