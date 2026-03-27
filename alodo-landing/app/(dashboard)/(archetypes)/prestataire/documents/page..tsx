"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { createBrowserClient } from "@supabase/auth-helpers-nextjs";
import { 
  ArrowLeft, 
  Plus, 
  Search, 
  FileText,
  Download,
  Eye,
  Send,
  Printer,
  CheckCircle,
  XCircle,
  Clock,
  Loader2,
  Filter,
  ChevronDown,
  FileCheck,
  FileSignature,
  FileCode,
  Trash2,
  Edit
} from "lucide-react";

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
};

type Client = {
  id: string;
  name: string;
  phone: string;
  email: string | null;
  address: string | null;
};

type Project = {
  id: string;
  title: string;
  status: string;
  client_id: string | null;
  client?: Client;
};

type DocumentTemplate = {
  id: string;
  name: string;
  type: "devis" | "facture" | "contrat";
  html_template: string;
  variables: any;
};

type Document = {
  id: string;
  type: "devis" | "facture" | "contrat";
  status: "draft" | "sent" | "accepted" | "rejected" | "paid";
  data: any;
  file_url: string | null;
  created_at: string;
  project_id: string | null;
  client_id: string | null;
  project?: Project;
  client?: Client;
};

export default function DocumentsPage() {
  const router = useRouter();
  const supabase = createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL ?? "",
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ?? ""
  );
  
  const [documents, setDocuments] = useState<Document[]>([]);
  const [projects, setProjects] = useState<Project[]>([]);
  const [clients, setClients] = useState<Client[]>([]);
  const [templates, setTemplates] = useState<DocumentTemplate[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [typeFilter, setTypeFilter] = useState<string>("all");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showPreviewModal, setShowPreviewModal] = useState<Document | null>(null);
  const [selectedTemplate, setSelectedTemplate] = useState<DocumentTemplate | null>(null);
  const [selectedProject, setSelectedProject] = useState<string>("");
  const [selectedClient, setSelectedClient] = useState<string>("");
  const [isGenerating, setIsGenerating] = useState(false);
  const [customData, setCustomData] = useState<any>({});

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    setIsLoading(true);
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      // Récupérer tous les documents
      const { data: documentsData } = await supabase
        .from("documents")
        .select(`
          *,
          project:projects(*),
          client:clients(*)
        `)
        .eq("user_id", user.id)
        .order("created_at", { ascending: false });

      // Récupérer les projets
      const { data: projectsData } = await supabase
        .from("projects")
        .select(`
          *,
          client:clients(*)
        `)
        .eq("user_id", user.id);

      // Récupérer les clients
      const { data: clientsData } = await supabase
        .from("clients")
        .select("*")
        .eq("user_id", user.id);

      // Récupérer les templates
      const { data: templatesData } = await supabase
        .from("document_templates")
        .select("*")
        .eq("user_id", user.id);

      if (documentsData) setDocuments(documentsData as Document[]);
      if (projectsData) setProjects(projectsData as Project[]);
      if (clientsData) setClients(clientsData);
      if (templatesData) setTemplates(templatesData);

    } catch (error) {
      console.error("Erreur:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const generateDocument = async () => {
    if (!selectedTemplate) return;
    
    setIsGenerating(true);
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      let projectData: Project | null = null;
      let clientData: Client | null = null;

      if (selectedProject) {
        projectData = projects.find(p => p.id === selectedProject) ?? null;
        if (projectData?.client_id) {
          const clientId = projectData.client_id;
          clientData = clients.find(c => c.id === clientId) ?? null;
        }
      } else if (selectedClient) {
        clientData = clients.find(c => c.id === selectedClient) ?? null;
      }

      // Préparer les données pour le document
      const documentData = {
        user_id: user.id,
        type: selectedTemplate.type,
        project_id: selectedProject || null,
        client_id: selectedClient || (projectData?.client_id) || null,
        template_id: selectedTemplate.id,
        status: "draft",
        data: {
          ...customData,
          project_title: projectData?.title || null,
          client_name: clientData?.name || null,
          client_phone: clientData?.phone || null,
          client_email: clientData?.email || null,
          client_address: clientData?.address || null,
          generated_at: new Date().toISOString(),
        }
      };

      const { data: document, error } = await supabase
        .from("documents")
        .insert(documentData)
        .select()
        .single();

      if (error) throw error;

      // Générer un fichier PDF (simulation - à remplacer par un vrai service PDF)
      const mockUrl = `/documents/${document.id}.pdf`;
      await supabase
        .from("documents")
        .update({ file_url: mockUrl })
        .eq("id", document.id);

      setShowCreateModal(false);
      setSelectedTemplate(null);
      setSelectedProject("");
      setSelectedClient("");
      setCustomData({});
      fetchData();

    } catch (error) {
      console.error("Erreur:", error);
    } finally {
      setIsGenerating(false);
    }
  };

  const updateDocumentStatus = async (docId: string, status: string) => {
    try {
      await supabase
        .from("documents")
        .update({ status })
        .eq("id", docId);
      fetchData();
    } catch (error) {
      console.error("Erreur:", error);
    }
  };

  const deleteDocument = async (docId: string) => {
    if (!confirm("Êtes-vous sûr de vouloir supprimer ce document ?")) return;
    
    try {
      await supabase
        .from("documents")
        .delete()
        .eq("id", docId);
      fetchData();
    } catch (error) {
      console.error("Erreur:", error);
    }
  };

  const filteredDocuments = documents.filter(doc => {
    const matchesSearch = 
      (doc.type?.toLowerCase().includes(searchTerm.toLowerCase()) || false) ||
      (doc.project?.title?.toLowerCase().includes(searchTerm.toLowerCase()) || false) ||
      (doc.client?.name?.toLowerCase().includes(searchTerm.toLowerCase()) || false);
    const matchesType = typeFilter === "all" || doc.type === typeFilter;
    const matchesStatus = statusFilter === "all" || doc.status === statusFilter;
    return matchesSearch && matchesType && matchesStatus;
  });

  const getTypeIcon = (type: string) => {
    switch(type) {
      case "devis": return <FileCode size={16} />;
      case "facture": return <FileSignature size={16} />;
      case "contrat": return <FileCheck size={16} />;
      default: return <FileText size={16} />;
    }
  };

  const getTypeColor = (type: string) => {
    switch(type) {
      case "devis": return colors.beninYellow;
      case "facture": return colors.beninGreen;
      case "contrat": return colors.deepBlue;
      default: return colors.gray500;
    }
  };

  const getTypeText = (type: string) => {
    switch(type) {
      case "devis": return "Devis";
      case "facture": return "Facture";
      case "contrat": return "Contrat";
      default: return type;
    }
  };

  const getStatusColor = (status: string) => {
    switch(status) {
      case "draft": return colors.gray500;
      case "sent": return colors.beninYellow;
      case "accepted": return colors.beninGreen;
      case "rejected": return colors.beninRed;
      case "paid": return colors.beninGreen;
      default: return colors.gray500;
    }
  };

  const getStatusText = (status: string) => {
    switch(status) {
      case "draft": return "Brouillon";
      case "sent": return "Envoyé";
      case "accepted": return "Accepté";
      case "rejected": return "Rejeté";
      case "paid": return "Payé";
      default: return status;
    }
  };

  const getStatusIcon = (status: string) => {
    switch(status) {
      case "draft": return <Clock size={12} />;
      case "sent": return <Send size={12} />;
      case "accepted": return <CheckCircle size={12} />;
      case "rejected": return <XCircle size={12} />;
      case "paid": return <CheckCircle size={12} />;
      default: return <Clock size={12} />;
    }
  };

  const stats = {
    total: documents.length,
    devis: documents.filter(d => d.type === "devis").length,
    facture: documents.filter(d => d.type === "facture").length,
    contrat: documents.filter(d => d.type === "contrat").length,
    draft: documents.filter(d => d.status === "draft").length,
    sent: documents.filter(d => d.status === "sent").length,
    accepted: documents.filter(d => d.status === "accepted" || d.status === "paid").length,
  };

  if (isLoading) {
    return (
      <div style={{
        minHeight: "100vh",
        backgroundColor: colors.gray50,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}>
        <Loader2 size={32} style={{ animation: "spin 1s linear infinite", color: colors.deepBlue }} />
        <style>{`@keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }`}</style>
      </div>
    );
  }

  return (
    <div style={{ backgroundColor: colors.gray50, minHeight: "100vh" }}>
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

      <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "80px 24px 40px" }}>
        {/* Header */}
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "32px", flexWrap: "wrap", gap: "16px" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
            <button
              onClick={() => router.back()}
              style={{
                padding: "8px",
                background: "transparent",
                border: "none",
                cursor: "pointer",
                color: colors.gray500,
              }}
            >
              <ArrowLeft size={20} />
            </button>
            <h1 style={{
              fontSize: "28px",
              fontWeight: 700,
              fontFamily: "'Playfair Display', serif",
              color: colors.deepBlue,
            }}>
              Documents
            </h1>
          </div>
          <button
            onClick={() => setShowCreateModal(true)}
            style={{
              display: "flex",
              alignItems: "center",
              gap: "8px",
              padding: "10px 20px",
              backgroundColor: colors.deepBlue,
              color: colors.white,
              border: "none",
              borderRadius: "10px",
              fontWeight: 500,
              cursor: "pointer",
              transition: "all 0.2s",
            }}
            onMouseEnter={(e) => e.currentTarget.style.backgroundColor = colors.deepBlueDark}
            onMouseLeave={(e) => e.currentTarget.style.backgroundColor = colors.deepBlue}
          >
            <Plus size={18} />
            Nouveau document
          </button>
        </div>

        {/* Stats */}
        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(120px, 1fr))",
          gap: "12px",
          marginBottom: "24px",
        }}>
          <div style={{
            backgroundColor: colors.white,
            padding: "16px",
            borderRadius: "12px",
            border: `1px solid ${colors.gray200}`,
            textAlign: "center",
          }}>
            <div style={{ fontSize: "24px", fontWeight: 600, color: colors.deepBlue }}>{stats.total}</div>
            <div style={{ fontSize: "12px", color: colors.gray500 }}>Total</div>
          </div>
          <div style={{
            backgroundColor: colors.white,
            padding: "16px",
            borderRadius: "12px",
            border: `1px solid ${colors.gray200}`,
            textAlign: "center",
          }}>
            <div style={{ fontSize: "24px", fontWeight: 600, color: colors.beninYellow }}>{stats.devis}</div>
            <div style={{ fontSize: "12px", color: colors.gray500 }}>Devis</div>
          </div>
          <div style={{
            backgroundColor: colors.white,
            padding: "16px",
            borderRadius: "12px",
            border: `1px solid ${colors.gray200}`,
            textAlign: "center",
          }}>
            <div style={{ fontSize: "24px", fontWeight: 600, color: colors.beninGreen }}>{stats.facture}</div>
            <div style={{ fontSize: "12px", color: colors.gray500 }}>Factures</div>
          </div>
          <div style={{
            backgroundColor: colors.white,
            padding: "16px",
            borderRadius: "12px",
            border: `1px solid ${colors.gray200}`,
            textAlign: "center",
          }}>
            <div style={{ fontSize: "24px", fontWeight: 600, color: colors.deepBlue }}>{stats.contrat}</div>
            <div style={{ fontSize: "12px", color: colors.gray500 }}>Contrats</div>
          </div>
          <div style={{
            backgroundColor: colors.white,
            padding: "16px",
            borderRadius: "12px",
            border: `1px solid ${colors.gray200}`,
            textAlign: "center",
          }}>
            <div style={{ fontSize: "24px", fontWeight: 600, color: colors.gray500 }}>{stats.draft}</div>
            <div style={{ fontSize: "12px", color: colors.gray500 }}>Brouillons</div>
          </div>
          <div style={{
            backgroundColor: colors.white,
            padding: "16px",
            borderRadius: "12px",
            border: `1px solid ${colors.gray200}`,
            textAlign: "center",
          }}>
            <div style={{ fontSize: "24px", fontWeight: 600, color: colors.beninGreen }}>{stats.accepted}</div>
            <div style={{ fontSize: "12px", color: colors.gray500 }}>Validés</div>
          </div>
        </div>

        {/* Filtres */}
        <div style={{
          display: "flex",
          gap: "12px",
          marginBottom: "24px",
          flexWrap: "wrap",
        }}>
          <div style={{ position: "relative", flex: 1 }}>
            <Search size={16} style={{ position: "absolute", left: "12px", top: "50%", transform: "translateY(-50%)", color: colors.gray400 }} />
            <input
              type="text"
              placeholder="Rechercher par type, projet ou client..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              style={{
                width: "100%",
                padding: "10px 12px 10px 36px",
                border: `1px solid ${colors.gray200}`,
                borderRadius: "10px",
                fontSize: "14px",
                outline: "none",
                backgroundColor: colors.white,
              }}
              onFocus={(e) => e.currentTarget.style.borderColor = colors.deepBlue}
              onBlur={(e) => e.currentTarget.style.borderColor = colors.gray200}
            />
          </div>
          <select
            value={typeFilter}
            onChange={(e) => setTypeFilter(e.target.value)}
            style={{
              padding: "10px 32px 10px 12px",
              border: `1px solid ${colors.gray200}`,
              borderRadius: "10px",
              fontSize: "14px",
              backgroundColor: colors.white,
              outline: "none",
              cursor: "pointer",
            }}
          >
            <option value="all">Tous types</option>
            <option value="devis">Devis</option>
            <option value="facture">Factures</option>
            <option value="contrat">Contrats</option>
          </select>
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            style={{
              padding: "10px 32px 10px 12px",
              border: `1px solid ${colors.gray200}`,
              borderRadius: "10px",
              fontSize: "14px",
              backgroundColor: colors.white,
              outline: "none",
              cursor: "pointer",
            }}
          >
            <option value="all">Tous statuts</option>
            <option value="draft">Brouillon</option>
            <option value="sent">Envoyé</option>
            <option value="accepted">Accepté</option>
            <option value="rejected">Rejeté</option>
            <option value="paid">Payé</option>
          </select>
        </div>

        {/* Liste des documents */}
        {filteredDocuments.length === 0 ? (
          <div style={{
            textAlign: "center",
            padding: "80px",
            backgroundColor: colors.white,
            borderRadius: "16px",
            border: `1px solid ${colors.gray200}`,
          }}>
            <FileText size={48} color={colors.gray300} style={{ marginBottom: "16px" }} />
            <h3 style={{ fontSize: "18px", color: colors.gray600, marginBottom: "8px" }}>Aucun document</h3>
            <p style={{ fontSize: "14px", color: colors.gray500, marginBottom: "24px" }}>
              Commencez par créer votre premier document
            </p>
            <button
              onClick={() => setShowCreateModal(true)}
              style={{
                padding: "10px 20px",
                backgroundColor: colors.deepBlue,
                color: colors.white,
                border: "none",
                borderRadius: "8px",
                cursor: "pointer",
              }}
            >
              Créer un document
            </button>
          </div>
        ) : (
          <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
            {filteredDocuments.map((doc) => (
              <div
                key={doc.id}
                style={{
                  backgroundColor: colors.white,
                  padding: "16px 20px",
                  borderRadius: "12px",
                  border: `1px solid ${colors.gray200}`,
                  transition: "all 0.2s",
                }}
                onMouseEnter={(e) => e.currentTarget.style.boxShadow = "0 2px 8px rgba(0,0,0,0.05)"}
                onMouseLeave={(e) => e.currentTarget.style.boxShadow = "none"}
              >
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", flexWrap: "wrap", gap: "12px" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                    <div style={{
                      width: "40px",
                      height: "40px",
                      borderRadius: "10px",
                      backgroundColor: `${getTypeColor(doc.type)}10`,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      color: getTypeColor(doc.type),
                    }}>
                      {getTypeIcon(doc.type)}
                    </div>
                    <div>
                      <div style={{ display: "flex", alignItems: "center", gap: "8px", flexWrap: "wrap", marginBottom: "4px" }}>
                        <span style={{ fontWeight: 600, color: colors.gray800 }}>
                          {getTypeText(doc.type)}
                        </span>
                        <span style={{
                          display: "inline-flex",
                          alignItems: "center",
                          gap: "4px",
                          padding: "2px 8px",
                          borderRadius: "20px",
                          fontSize: "11px",
                          backgroundColor: `${getStatusColor(doc.status)}10`,
                          color: getStatusColor(doc.status),
                        }}>
                          {getStatusIcon(doc.status)}
                          {getStatusText(doc.status)}
                        </span>
                      </div>
                      {doc.project && (
                        <div style={{ fontSize: "13px", color: colors.gray600 }}>
                          Projet: {doc.project.title}
                        </div>
                      )}
                      {doc.client && !doc.project && (
                        <div style={{ fontSize: "13px", color: colors.gray600 }}>
                          Client: {doc.client.name}
                        </div>
                      )}
                      <div style={{ fontSize: "11px", color: colors.gray400, marginTop: "4px" }}>
                        {new Date(doc.created_at).toLocaleDateString()}
                      </div>
                    </div>
                  </div>
                  <div style={{ display: "flex", gap: "8px" }}>
                    {doc.status === "draft" && (
                      <>
                        <button
                          onClick={() => updateDocumentStatus(doc.id, "sent")}
                          style={{
                            padding: "6px 12px",
                            backgroundColor: `${colors.beninYellow}10`,
                            border: "none",
                            borderRadius: "6px",
                            fontSize: "12px",
                            cursor: "pointer",
                            display: "flex",
                            alignItems: "center",
                            gap: "4px",
                            color: colors.beninYellow,
                          }}
                        >
                          <Send size={12} />
                          Envoyer
                        </button>
                        <button
                          onClick={() => deleteDocument(doc.id)}
                          style={{
                            padding: "6px",
                            backgroundColor: `${colors.beninRed}10`,
                            border: "none",
                            borderRadius: "6px",
                            cursor: "pointer",
                          }}
                        >
                          <Trash2 size={14} color={colors.beninRed} />
                        </button>
                      </>
                    )}
                    {doc.status === "sent" && (
                      <>
                        <button
                          onClick={() => updateDocumentStatus(doc.id, "accepted")}
                          style={{
                            padding: "6px 12px",
                            backgroundColor: `${colors.beninGreen}10`,
                            border: "none",
                            borderRadius: "6px",
                            fontSize: "12px",
                            cursor: "pointer",
                            display: "flex",
                            alignItems: "center",
                            gap: "4px",
                            color: colors.beninGreen,
                          }}
                        >
                          <CheckCircle size={12} />
                          Accepter
                        </button>
                        <button
                          onClick={() => updateDocumentStatus(doc.id, "rejected")}
                          style={{
                            padding: "6px 12px",
                            backgroundColor: `${colors.beninRed}10`,
                            border: "none",
                            borderRadius: "6px",
                            fontSize: "12px",
                            cursor: "pointer",
                            display: "flex",
                            alignItems: "center",
                            gap: "4px",
                            color: colors.beninRed,
                          }}
                        >
                          <XCircle size={12} />
                          Rejeter
                        </button>
                      </>
                    )}
                    {doc.file_url && (
                      <>
                        <button
                          onClick={() => setShowPreviewModal(doc)}
                          style={{
                            padding: "6px",
                            backgroundColor: `${colors.deepBlue}10`,
                            border: "none",
                            borderRadius: "6px",
                            cursor: "pointer",
                          }}
                          title="Aperçu"
                        >
                          <Eye size={14} color={colors.deepBlue} />
                        </button>
                        <button
                          onClick={() => {
                            const link = document.createElement("a");
                            link.href = doc.file_url!;
                            link.download = `${doc.type}_${doc.id}.pdf`;
                            link.click();
                          }}
                          style={{
                            padding: "6px",
                            backgroundColor: `${colors.beninGreen}10`,
                            border: "none",
                            borderRadius: "6px",
                            cursor: "pointer",
                          }}
                          title="Télécharger"
                        >
                          <Download size={14} color={colors.beninGreen} />
                        </button>
                        <button
                          onClick={() => window.print()}
                          style={{
                            padding: "6px",
                            backgroundColor: `${colors.gray100}`,
                            border: "none",
                            borderRadius: "6px",
                            cursor: "pointer",
                          }}
                          title="Imprimer"
                        >
                          <Printer size={14} color={colors.gray600} />
                        </button>
                      </>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Modal Créer Document */}
      {showCreateModal && (
        <div style={{
          position: "fixed",
          inset: 0,
          backgroundColor: "rgba(0,0,0,0.5)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          zIndex: 100,
        }}>
          <div style={{
            backgroundColor: colors.white,
            borderRadius: "24px",
            width: "90%",
            maxWidth: "600px",
            maxHeight: "90vh",
            overflow: "auto",
          }}>
            <div style={{
              padding: "24px",
              borderBottom: `1px solid ${colors.gray100}`,
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}>
              <h2 style={{ fontSize: "20px", fontWeight: 600, color: colors.deepBlue }}>Créer un document</h2>
              <button
                onClick={() => {
                  setShowCreateModal(false);
                  setSelectedTemplate(null);
                  setSelectedProject("");
                  setSelectedClient("");
                }}
                style={{ padding: "8px", background: "transparent", border: "none", cursor: "pointer" }}
              >
                <XCircle size={20} color={colors.gray500} />
              </button>
            </div>

            <div style={{ padding: "24px" }}>
              {/* Étape 1: Choix du template */}
              {!selectedTemplate ? (
                <>
                  <h3 style={{ fontSize: "14px", fontWeight: 500, marginBottom: "12px", color: colors.gray700 }}>Choisissez un type de document</h3>
                  <div style={{ display: "flex", flexDirection: "column", gap: "12px", marginBottom: "24px" }}>
                    {templates.map((template) => (
                      <button
                        key={template.id}
                        onClick={() => setSelectedTemplate(template)}
                        style={{
                          padding: "16px",
                          backgroundColor: colors.gray50,
                          border: `1px solid ${colors.gray200}`,
                          borderRadius: "12px",
                          textAlign: "left",
                          cursor: "pointer",
                          transition: "all 0.2s",
                        }}
                        onMouseEnter={(e) => e.currentTarget.style.borderColor = colors.deepBlue}
                        onMouseLeave={(e) => e.currentTarget.style.borderColor = colors.gray200}
                      >
                        <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                          <div style={{
                            width: "40px",
                            height: "40px",
                            borderRadius: "10px",
                            backgroundColor: `${getTypeColor(template.type)}10`,
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                          }}>
                            {getTypeIcon(template.type)}
                          </div>
                          <div>
                            <div style={{ fontWeight: 600, color: colors.gray800 }}>{template.name}</div>
                            <div style={{ fontSize: "12px", color: colors.gray500 }}>
                              {getTypeText(template.type)}
                            </div>
                          </div>
                        </div>
                      </button>
                    ))}
                  </div>
                  <button
                    onClick={() => setShowCreateModal(false)}
                    style={{
                      width: "100%",
                      padding: "12px",
                      backgroundColor: colors.white,
                      border: `1px solid ${colors.gray200}`,
                      borderRadius: "8px",
                      cursor: "pointer",
                    }}
                  >
                    Annuler
                  </button>
                </>
              ) : (
                <>
                  {/* Étape 2: Choix du projet/client */}
                  <h3 style={{ fontSize: "14px", fontWeight: 500, marginBottom: "12px", color: colors.gray700 }}>
                    Associer à un projet ou un client
                  </h3>
                  
                  <div style={{ marginBottom: "16px" }}>
                    <label style={{ display: "block", fontSize: "13px", marginBottom: "6px", color: colors.gray600 }}>Projet (optionnel)</label>
                    <select
                      value={selectedProject}
                      onChange={(e) => {
                        setSelectedProject(e.target.value);
                        if (e.target.value) setSelectedClient("");
                      }}
                      style={{
                        width: "100%",
                        padding: "12px",
                        border: `1px solid ${colors.gray200}`,
                        borderRadius: "10px",
                        outline: "none",
                        backgroundColor: colors.white,
                      }}
                    >
                      <option value="">Sélectionner un projet</option>
                      {projects.map((project) => (
                        <option key={project.id} value={project.id}>
                          {project.title} {project.client ? `- ${project.client.name}` : ""}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div style={{ marginBottom: "24px" }}>
                    <label style={{ display: "block", fontSize: "13px", marginBottom: "6px", color: colors.gray600 }}>Client (si pas de projet)</label>
                    <select
                      value={selectedClient}
                      onChange={(e) => {
                        setSelectedClient(e.target.value);
                        if (e.target.value) setSelectedProject("");
                      }}
                      style={{
                        width: "100%",
                        padding: "12px",
                        border: `1px solid ${colors.gray200}`,
                        borderRadius: "10px",
                        outline: "none",
                        backgroundColor: colors.white,
                      }}
                    >
                      <option value="">Sélectionner un client</option>
                      {clients.map((client) => (
                        <option key={client.id} value={client.id}>{client.name}</option>
                      ))}
                    </select>
                  </div>

                  <div style={{ display: "flex", gap: "12px" }}>
                    <button
                      onClick={() => setSelectedTemplate(null)}
                      style={{
                        flex: 1,
                        padding: "12px",
                        backgroundColor: colors.white,
                        border: `1px solid ${colors.gray200}`,
                        borderRadius: "8px",
                        cursor: "pointer",
                      }}
                    >
                      Retour
                    </button>
                    <button
                      onClick={generateDocument}
                      disabled={isGenerating}
                      style={{
                        flex: 1,
                        padding: "12px",
                        backgroundColor: colors.deepBlue,
                        color: colors.white,
                        border: "none",
                        borderRadius: "8px",
                        cursor: isGenerating ? "not-allowed" : "pointer",
                        opacity: isGenerating ? 0.5 : 1,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        gap: "8px",
                      }}
                    >
                      {isGenerating ? (
                        <Loader2 size={16} style={{ animation: "spin 1s linear infinite" }} />
                      ) : (
                        <FileText size={16} />
                      )}
                      {isGenerating ? "Génération..." : "Générer"}
                    </button>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Modal Aperçu Document */}
      {showPreviewModal && (
        <div style={{
          position: "fixed",
          inset: 0,
          backgroundColor: "rgba(0,0,0,0.5)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          zIndex: 100,
        }}>
          <div style={{
            backgroundColor: colors.white,
            borderRadius: "24px",
            width: "90%",
            maxWidth: "800px",
            maxHeight: "90vh",
            overflow: "auto",
          }}>
            <div style={{
              padding: "24px",
              borderBottom: `1px solid ${colors.gray100}`,
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}>
              <h2 style={{ fontSize: "20px", fontWeight: 600, color: colors.deepBlue }}>
                Aperçu du document
              </h2>
              <button
                onClick={() => setShowPreviewModal(null)}
                style={{ padding: "8px", background: "transparent", border: "none", cursor: "pointer" }}
              >
                <XCircle size={20} color={colors.gray500} />
              </button>
            </div>
            <div style={{ padding: "24px" }}>
              {showPreviewModal.file_url ? (
                <iframe
                  src={showPreviewModal.file_url}
                  style={{ width: "100%", height: "500px", border: "none", borderRadius: "12px" }}
                  title="Aperçu du document"
                />
              ) : (
                <div style={{ textAlign: "center", padding: "60px", color: colors.gray500 }}>
                  <FileText size={48} style={{ marginBottom: "16px", color: colors.gray300 }} />
                  <p>Aucun aperçu disponible</p>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
