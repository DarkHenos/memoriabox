// app/contact/page.tsx
"use client";

import {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
  FormEvent,
  Suspense,
} from "react";
import { useSearchParams } from "next/navigation";
import {
  Send,
  Mail,
  MapPin,
  CheckCircle2,
  AlertCircle,
  CalendarDays,
  Clock,
  Shield,
  Upload,
  X,
  File,
  Image as ImageIcon,
  FileText,
  AlertTriangle,
  Loader2,
} from "lucide-react";

/* ----------------------------- Types & config ----------------------------- */

type SubmitStatus =
  | { type: "success"; message: string; details?: string }
  | { type: "warning"; message: string; details?: string }
  | { type: "error"; message: string; details?: string }
  | { type: null; message: "" };

interface UploadedFile {
  id: string;
  name: string;
  size: number;
  type: string;
  data: string; // base64 (sans prefixe)
  preview?: string;
  status: "uploading" | "success" | "error";
  error?: string;
}

const UPLOAD_CONFIG = {
  maxFileSize: 10 * 1024 * 1024, // 10 Mo / fichier
  maxFiles: 5,
  maxTotalSize: 50 * 1024 * 1024, // 50 Mo total
  allowedTypes: {
    "image/jpeg": { extension: "jpg", icon: ImageIcon, color: "text-green-600" },
    "image/jpg": { extension: "jpg", icon: ImageIcon, color: "text-green-600" },
    "image/png": { extension: "png", icon: ImageIcon, color: "text-green-600" },
    "image/webp": { extension: "webp", icon: ImageIcon, color: "text-green-600" },
    "application/pdf": { extension: "pdf", icon: FileText, color: "text-red-600" },
    "application/msword": { extension: "doc", icon: FileText, color: "text-blue-600" },
    "application/vnd.openxmlformats-officedocument.wordprocessingml.document": {
      extension: "docx",
      icon: FileText,
      color: "text-blue-600",
    },
  } as Record<string, { extension: string; icon: any; color: string }>,
};

/* -------------------------- Mapping des offres --------------------------- */

const PLAN_LABELS = {
  essai: "Essai Découverte",
  celebration: "Pack Classique",
  premium: "Pack Premium",
} as const;

const PLAN_OPTIONS: string[] = [
  "Essai Découverte",
  "Pack Classique",
  "Pack Premium",
  "Je ne sais pas encore",
];

function slugToPlanLabel(slug: string | null): string {
  if (!slug) return "";
  const s = slug.toLowerCase();
  if (PLAN_LABELS[s as keyof typeof PLAN_LABELS])
    return PLAN_LABELS[s as keyof typeof PLAN_LABELS];
  return slug.charAt(0).toUpperCase() + slug.slice(1);
}

/* ------------------------------ Formulaire ------------------------------ */

function ContactFormInner() {
  const qs = useSearchParams();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    eventType: "",
    eventDate: "",
    plan: "",
    message: "",
    website: "", // honeypot
  });

  const [uploadedFiles, setUploadedFiles] = useState<UploadedFile[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<SubmitStatus>({
    type: null,
    message: "",
  });

  // Réfs & timer pour l’alerte
  const alertRef = useRef<HTMLDivElement | null>(null);
  const alertTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Pré-remplir l’offre depuis ?plan=…
  useEffect(() => {
    const plan = qs.get("plan");
    if (plan) setFormData((d) => ({ ...d, plan: slugToPlanLabel(plan) }));
  }, [qs]);

  // Date min = aujourd’hui
  const minDate = useMemo(() => {
    const d = new Date();
    const yyyy = d.getFullYear();
    const mm = String(d.getMonth() + 1).padStart(2, "0");
    const dd = String(d.getDate()).padStart(2, "0");
    return `${yyyy}-${mm}-${dd}`;
  }, []);

  // Caractères restants / poids total
  const remaining = 800 - (formData.message?.length || 0);
  const totalFileSize = uploadedFiles.reduce((s, f) => s + f.size, 0);

  /* ------------------ Alerte centrée + auto-dismiss 15s ------------------ */
  const showAlert = useCallback((next: SubmitStatus) => {
    if (alertTimerRef.current) clearTimeout(alertTimerRef.current);
    setSubmitStatus(next);
  }, []);

  useEffect(() => {
    if (!submitStatus.type) return;

    const t = setTimeout(() => {
      alertRef.current?.scrollIntoView({ behavior: "smooth", block: "center" });
      alertRef.current?.focus();
    }, 50);

    alertTimerRef.current = setTimeout(() => {
      setSubmitStatus({ type: null, message: "" });
    }, 15000);

    return () => clearTimeout(t);
  }, [submitStatus]);

  /* ---------------------------- Drag & drop ---------------------------- */

  const [dragOver, setDragOver] = useState(false);
  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(true);
  }, []);
  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(false);
  }, []);
  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(false);
    const files = Array.from(e.dataTransfer.files || []);
    handleFileSelection(files);
  }, []);

  const validateFile = (file: File): { valid: boolean; message?: string } => {
    if (!UPLOAD_CONFIG.allowedTypes[file.type]) {
      return {
        valid: false,
        message:
          `Type non autorisé: ${file.name}. ` +
          `Types acceptés: images (JPG, PNG, WEBP), PDF, Word.`,
      };
    }
    if (file.size > UPLOAD_CONFIG.maxFileSize) {
      return {
        valid: false,
        message: `Fichier trop volumineux: ${file.name} (${Math.round(
          file.size / (1024 * 1024)
        )} Mo). Limite: ${Math.round(
          UPLOAD_CONFIG.maxFileSize / (1024 * 1024)
        )} Mo.`,
      };
    }
    if (totalFileSize + file.size > UPLOAD_CONFIG.maxTotalSize) {
      return {
        valid: false,
        message: `Taille totale dépassée. Maximum ${Math.round(
          UPLOAD_CONFIG.maxTotalSize / (1024 * 1024)
        )} Mo pour tous les fichiers.`,
      };
    }
    if (file.name.length > 255) {
      return { valid: false, message: "Nom de fichier trop long." };
    }
    if (/[<>:"/\\|?*\x00-\x1f]/.test(file.name)) {
      return { valid: false, message: "Le nom contient des caractères invalides." };
    }
    return { valid: true };
  };

  const fileToBase64 = (file: File) =>
    new Promise<string>((resolve, reject) => {
      const r = new FileReader();
      r.onload = () => {
        const result = r.result as string;
        resolve(result.split(",")[1] || "");
      };
      r.onerror = () => reject(new Error("Erreur lecture fichier"));
      r.readAsDataURL(file);
    });

  const handleFileSelection = useCallback(
    async (files: File[]) => {
      if (uploadedFiles.length + files.length > UPLOAD_CONFIG.maxFiles) {
        showAlert({
          type: "error",
          message: `Maximum ${UPLOAD_CONFIG.maxFiles} fichiers autorisés.`,
        });
        return;
      }

      for (const file of files) {
        const id = `file_${Date.now()}_${Math.random().toString(36).slice(2, 8)}`;

        const v = validateFile(file);
        if (!v.valid) {
          showAlert({
            type: "error",
            message: v.message || "Fichier invalide.",
          });
          continue;
        }

        setUploadedFiles((prev) => [
          ...prev,
          { id, name: file.name, size: file.size, type: file.type, data: "", status: "uploading" },
        ]);

        try {
          const data = await fileToBase64(file);
          const preview = file.type.startsWith("image/")
            ? URL.createObjectURL(file)
            : undefined;

          setUploadedFiles((prev) =>
            prev.map((f) => (f.id === id ? { ...f, data, preview, status: "success" } : f))
          );
        } catch (e) {
          setUploadedFiles((prev) =>
            prev.map((f) =>
              f.id === id
                ? {
                    ...f,
                    status: "error",
                    error: e instanceof Error ? e.message : "Erreur inconnue",
                  }
                : f
            )
          );
          showAlert({
            type: "error",
            message: `Échec du traitement: ${file.name}`,
          });
        }
      }
    },
    [uploadedFiles.length, showAlert, totalFileSize]
  );

  const removeFile = (fileId: string) => {
    setUploadedFiles((prev) => {
      const f = prev.find((x) => x.id === fileId);
      if (f?.preview) URL.revokeObjectURL(f.preview);
      return prev.filter((x) => x.id !== fileId);
    });
  };

  const formatFileSize = (bytes: number) => {
    if (!bytes) return "0 B";
    const k = 1024;
    const sizes = ["B", "KB", "MB", "GB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return `${parseFloat((bytes / Math.pow(k, i)).toFixed(1))} ${sizes[i]}`;
  };

  const getFileIcon = (type: string) =>
    UPLOAD_CONFIG.allowedTypes[type]?.icon || File;
  const getFileColor = (type: string) =>
    UPLOAD_CONFIG.allowedTypes[type]?.color || "text-gray-600";

  /* --------------------------------- Submit --------------------------------- */

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    // reset alerte pour relancer focus/scroll
    showAlert({ type: null, message: "" });
    setIsSubmitting(true);

    if (uploadedFiles.some((f) => f.status === "uploading")) {
      setIsSubmitting(false);
      return showAlert({
        type: "warning",
        message: "Veuillez attendre la fin du traitement des fichiers.",
      });
    }
    if (uploadedFiles.some((f) => f.status === "error")) {
      setIsSubmitting(false);
      return showAlert({
        type: "error",
        message:
          "Un ou plusieurs fichiers sont en erreur. Supprimez-les ou réessayez.",
      });
    }
    if (formData.website.trim() !== "") {
      setIsSubmitting(false);
      return showAlert({
        type: "error",
        message:
          "Une erreur est survenue. Réessayez ou contactez-nous directement par e-mail.",
      });
    }

    try {
      const payload = {
        ...formData,
        files: uploadedFiles
          .filter((f) => f.status === "success")
          .map((f) => ({
            name: f.name,
            type: f.type,
            size: f.size,
            data: f.data,
          })),
      };

      const res = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-Requested-With": "XMLHttpRequest",
        },
        body: JSON.stringify(payload),
      });

      const json = await res.json().catch(() => ({}));

      if (res.ok && json?.success) {
        showAlert({
          type: "success",
          message:
            json.message ||
            "Merci ! Nous revenons vers vous rapidement avec une proposition personnalisée.",
          details: json.fallback ? "Envoi en mode de secours." : undefined,
        });

        setFormData({
          name: "",
          email: "",
          phone: "",
          eventType: "",
          eventDate: "",
          plan: "",
          message: "",
          website: "",
        });
        uploadedFiles.forEach((f) => f.preview && URL.revokeObjectURL(f.preview));
        setUploadedFiles([]);
      } else {
        showAlert({
          type: "error",
          message:
            json?.message ||
            "Impossible d'envoyer votre demande. Essayez de nouveau ou écrivez-nous à contact@memoriabox.fr.",
          details:
            res.status === 429
              ? `Trop de demandes. Réessayez dans ${json.retryAfter || "60"} secondes.`
              : undefined,
        });
      }
    } catch {
      showAlert({
        type: "error",
        message: "Connexion momentanément indisponible. Vérifiez votre réseau et réessayez.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  /* ---------------------------------- UI ---------------------------------- */

  return (
    <div className="grid lg:grid-cols-3 gap-8">
      {/* Sidebar, MASQUÉE SUR MOBILE */}
      <aside className="lg:col-span-1 space-y-4">
        <div className="card p-6 hidden sm:block">
          <Mail className="w-6 h-6 text-or mb-2" />
          <h3 className="font-semibold mb-1">Email</h3>
          <p className="text-sm text-gray-700">contact@memoriabox.fr</p>
        </div>

        <div className="card p-6 hidden sm:block">
          <MapPin className="w-6 h-6 text-or mb-2" />
          <h3 className="font-semibold mb-1">Zone d’intervention</h3>
          <p className="text-sm text-gray-700">France métropolitaine</p>
        </div>

        <div className="rounded-2xl border border-or/30 bg-or/10 p-5 hidden sm:block">
          <Shield className="w-5 h-5 text-or mb-2" />
          <p className="text-sm text-gray-800">
            <strong>Sécurité :</strong> données protégées. Les fichiers sont scannés automatiquement.
          </p>
        </div>
      </aside>

      {/* Formulaire */}
      <section className="lg:col-span-2">
        {/* Alerte centrée/focus + auto-dismiss */}
        {submitStatus.type && (
          <div
            role="alert"
            tabIndex={-1}
            ref={alertRef}
            className={`mb-5 rounded-xl p-4 outline-none ${
              submitStatus.type === "success"
                ? "bg-green-50 border border-green-200 text-green-800"
                : submitStatus.type === "warning"
                ? "bg-yellow-50 border border-yellow-200 text-yellow-800"
                : "bg-red-50 border border-red-200 text-red-800"
            }`}
          >
            <div className="flex items-start gap-3">
              {submitStatus.type === "success" ? (
                <CheckCircle2 className="w-5 h-5 mt-0.5 flex-shrink-0" />
              ) : submitStatus.type === "warning" ? (
                <AlertTriangle className="w-5 h-5 mt-0.5 flex-shrink-0" />
              ) : (
                <AlertCircle className="w-5 h-5 mt-0.5 flex-shrink-0" />
              )}
              <div>
                <p className="font-medium">{submitStatus.message}</p>
                {submitStatus.details && (
                  <p className="text-sm mt-1 opacity-75">{submitStatus.details}</p>
                )}
              </div>
            </div>
          </div>
        )}

        <form onSubmit={handleSubmit} className="card p-8 space-y-6" noValidate>
          <div className="text-center mb-2">
            <h1 className="text-2xl font-bold text-gray-900 mb-2">
              Créons ensemble votre page de souvenirs
            </h1>
            <p className="text-gray-600">
              Partagez vos idées et (si besoin) joignez des documents d’inspiration
            </p>
          </div>

          {/* Identité */}
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label htmlFor="name" className="block text-sm font-medium mb-2">
                Nom complet <span className="text-red-500">*</span>
              </label>
              <input
                id="name"
                type="text"
                required
                maxLength={100}
                value={formData.name}
                onChange={(e) => setFormData((d) => ({ ...d, name: e.target.value }))}
                className="w-full p-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-or focus:border-transparent"
                placeholder="Votre nom"
                autoComplete="name"
              />
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-medium mb-2">
                Email <span className="text-red-500">*</span>
              </label>
              <input
                id="email"
                type="email"
                required
                maxLength={200}
                value={formData.email}
                onChange={(e) => setFormData((d) => ({ ...d, email: e.target.value }))}
                className="w-full p-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-or focus:border-transparent"
                placeholder="votre@email.com"
                autoComplete="email"
              />
            </div>
          </div>

          {/* Contexte */}
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label htmlFor="phone" className="block text-sm font-medium mb-2">
                Téléphone <span className="text-gray-400">(optionnel)</span>
              </label>
              <input
                id="phone"
                type="tel"
                maxLength={20}
                value={formData.phone}
                onChange={(e) => setFormData((d) => ({ ...d, phone: e.target.value }))}
                className="w-full p-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-or focus:border-transparent"
                placeholder="06 12 34 56 78"
                autoComplete="tel"
              />
            </div>

            <div>
              <label htmlFor="eventType" className="block text-sm font-medium mb-2">
                Type d’événement <span className="text-red-500">*</span>
              </label>
              <select
                id="eventType"
                required
                value={formData.eventType}
                onChange={(e) => setFormData((d) => ({ ...d, eventType: e.target.value }))}
                className="w-full p-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-or focus:border-transparent"
              >
                <option value="">Sélectionnez…</option>
                <option value="Mariage">Mariage</option>
                <option value="Anniversaire">Anniversaire</option>
                <option value="Naissance">Naissance</option>
                <option value="Baptême">Baptême</option>
                <option value="Communion">Communion</option>
                <option value="Retraite">Départ en retraite</option>
                <option value="Entreprise">Événement d’entreprise</option>
                <option value="Autre">Autre</option>
              </select>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label htmlFor="eventDate" className="block text-sm font-medium mb-2">
                Date souhaitée <span className="text-gray-400">(optionnel)</span>
              </label>
              <input
                id="eventDate"
                type="date"
                min={minDate}
                value={formData.eventDate}
                onChange={(e) => setFormData((d) => ({ ...d, eventDate: e.target.value }))}
                className="w-full p-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-or focus:border-transparent"
              />
            </div>

            <div>
              <label htmlFor="plan" className="block text-sm font-medium mb-2">
                Offre souhaitée <span className="text-gray-400">(optionnel)</span>
              </label>
              <select
                id="plan"
                value={formData.plan}
                onChange={(e) => setFormData((d) => ({ ...d, plan: e.target.value }))}
                className="w-full p-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-or focus:border-transparent"
              >
                <option value="">Sélectionnez une offre…</option>
                {PLAN_OPTIONS.map((opt) => (
                  <option key={opt} value={opt}>
                    {opt}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Upload */}
          <div>
            <label className="block text-sm font-medium mb-2">
              Fichiers joints <span className="text-gray-400">(optionnel)</span>
            </label>
            <p className="text-sm text-gray-600 mb-3 sm:block hidden">
              Faire-part, photos d’inspiration, documents utiles (max {UPLOAD_CONFIG.maxFiles} fichiers).
            </p>

            <div
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onDrop={handleDrop}
              className={`relative border-2 border-dashed rounded-xl p-6 transition-colors ${
                dragOver ? "border-or bg-or/5" : "border-gray-300 hover:border-gray-400"
              }`}
            >
              <div className="text-center">
                <Upload
                  className={`mx-auto w-8 h-8 mb-3 ${
                    dragOver ? "text-or" : "text-gray-400"
                  }`}
                />
                <p className="text-sm font-medium mb-1">
                  Glissez vos fichiers ici ou{" "}
                  <label htmlFor="file-upload" className="text-or hover:underline cursor-pointer">
                    parcourez
                  </label>
                </p>
                <p className="text-xs text-gray-500">
                  JPG, PNG, WEBP, PDF, Word • 10&nbsp;Mo / fichier • Total {formatFileSize(UPLOAD_CONFIG.maxTotalSize)}
                </p>
              </div>

              <input
                id="file-upload"
                type="file"
                multiple
                accept=".jpg,.jpeg,.png,.webp,.pdf,.doc,.docx"
                onChange={(e) => {
                  const files = Array.from(e.target.files || []);
                  handleFileSelection(files);
                  e.currentTarget.value = ""; // reset
                }}
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
              />
            </div>

            {uploadedFiles.length > 0 && (
              <div className="mt-2 flex items-center justify-between text-sm">
                <span className="text-gray-600">
                  {uploadedFiles.length}/{UPLOAD_CONFIG.maxFiles} fichiers
                </span>
                <span
                  className={`${
                    totalFileSize > UPLOAD_CONFIG.maxTotalSize * 0.8
                      ? "text-orange-600"
                      : "text-gray-600"
                  }`}
                >
                  {formatFileSize(totalFileSize)} / {formatFileSize(UPLOAD_CONFIG.maxTotalSize)}
                </span>
              </div>
            )}
          </div>

          {/* Liste des fichiers */}
          {uploadedFiles.length > 0 && (
            <div className="space-y-2">
              <h4 className="text-sm font-medium text-gray-700">Fichiers joints :</h4>
              {uploadedFiles.map((file) => {
                const Icon = getFileIcon(file.type);
                return (
                  <div
                    key={file.id}
                    className={`flex items-center gap-3 p-3 border rounded-lg ${
                      file.status === "error"
                        ? "border-red-200 bg-red-50"
                        : file.status === "uploading"
                        ? "border-blue-200 bg-blue-50"
                        : "border-gray-200 bg-gray-50"
                    }`}
                  >
                    <div className="w-10 h-10 flex-shrink-0">
                      {file.preview ? (
                        <img
                          src={file.preview}
                          alt={file.name}
                          className="w-full h-full object-cover rounded"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center rounded bg-gray-100">
                          <Icon className={`w-5 h-5 ${getFileColor(file.type)}`} />
                        </div>
                      )}
                    </div>

                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium truncate">{file.name}</p>
                      <p className="text-xs text-gray-500">
                        {formatFileSize(file.size)} •{" "}
                        {UPLOAD_CONFIG.allowedTypes[file.type]?.extension.toUpperCase() || "FILE"}
                      </p>
                      {file.status === "error" && file.error && (
                        <p className="text-xs text-red-600 mt-1">{file.error}</p>
                      )}
                    </div>

                    <div className="flex items-center gap-2">
                      {file.status === "uploading" && (
                        <Loader2 className="w-4 h-4 animate-spin text-blue-600" />
                      )}
                      {file.status === "success" && (
                        <CheckCircle2 className="w-4 h-4 text-green-600" />
                      )}
                      {file.status === "error" && (
                        <AlertCircle className="w-4 h-4 text-red-600" />
                      )}
                      <button
                        type="button"
                        onClick={() => removeFile(file.id)}
                        className="p-1 hover:bg-gray-200 rounded transition-colors"
                        title="Supprimer le fichier"
                      >
                        <X className="w-4 h-4 text-gray-500" />
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          )}

          {/* Message */}
          <div>
            <label htmlFor="message" className="block text-sm font-medium mb-2">
              Votre message <span className="text-gray-400">(optionnel)</span>
            </label>
            <textarea
              id="message"
              rows={6}
              maxLength={800}
              value={formData.message}
              onChange={(e) => setFormData((d) => ({ ...d, message: e.target.value }))}
              placeholder="Nombre d’invités, ambiance souhaitée, contraintes, idées…"
              aria-describedby="message-help"
              className="w-full p-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-or focus:border-transparent
                         resize-y overflow-auto min-h-[160px] max-h-[280px] sm:max-h-[320px]"
            />
            <div id="message-help" className="flex justify-between items-center mt-1">
              <span className="text-xs text-gray-500">
                Dites-nous l’essentiel pour vous aider au mieux
              </span>
              <span className={`text-xs ${remaining < 100 ? "text-orange-600" : "text-gray-400"}`}>
                {remaining} caractères restants
              </span>
            </div>
          </div>

          {/* Honeypot (caché) */}
          <div className="hidden" aria-hidden>
            <input
              type="text"
              name="website"
              value={formData.website}
              onChange={(e) => setFormData((d) => ({ ...d, website: e.target.value }))}
              tabIndex={-1}
              autoComplete="off"
            />
          </div>

          {/* CTA */}
          <div className="flex flex-col sm:flex-row gap-4 items-center justify-between pt-4 border-t">
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <Shield className="w-4 h-4" />
              <span>Données sécurisées et protégées</span>
            </div>

            <button
              type="submit"
              disabled={isSubmitting || uploadedFiles.some((f) => f.status === "uploading")}
              className="w-full sm:w-auto flex items-center justify-center gap-2 bg-or hover:bg-or/90 disabled:bg-gray-300 disabled:cursor-not-allowed text-white font-medium px-8 py-3 rounded-xl transition-colors"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  Envoi en cours…
                </>
              ) : (
                <>
                  <Send className="w-4 h-4" />
                  Envoyer ma demande
                </>
              )}
            </button>
          </div>

          <div className="text-xs text-gray-500 text-center pt-4">
            En soumettant ce formulaire, vous acceptez que vos données soient utilisées
            pour traiter votre demande. Les fichiers sont scannés et supprimés après traitement.
          </div>
        </form>
      </section>
    </div>
  );
}

/* ------------------------- Page (Suspense requis) ------------------------- */

export default function ContactPage() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-rosepale via-white to-beige/20">
      <div className="container-max py-14">
        <header className="max-w-3xl mx-auto text-center mb-10">
          <h1 className="font-title text-4xl text-encre mb-3">
            Créons votre page de souvenirs
          </h1>
          <p className="text-gray-700">
            Racontez-nous votre événement. Nous préparons une proposition claire,
            sur-mesure et sans engagement.
          </p>
          <div className="flex flex-wrap justify-center gap-3 mt-6 text-xs">
            <span className="inline-flex items-center gap-2 rounded-full border border-gray-200 bg-white/70 px-3 py-1 text-gray-700">
              <CalendarDays className="w-3.5 h-3.5" />
              Mise en place express
            </span>
            <span className="hidden sm:inline-flex items-center gap-2 rounded-full border border-gray-200 bg-white/70 px-3 py-1 text-gray-700">
              <Clock className="w-3.5 h-3.5" />
              Réponse sous 24&nbsp;h ouvrées
            </span>
            <span className="hidden sm:inline-flex items-center gap-2 rounded-full border border-gray-200 bg-white/70 px-3 py-1 text-gray-700">
              <Shield className="w-3.5 h-3.5" />
              Données privées par défaut
            </span>
          </div>
        </header>

        <Suspense
          fallback={
            <div className="card p-8">
              <div className="h-4 w-40 bg-gray-200 rounded animate-pulse mb-6" />
              <div className="grid md:grid-cols-2 gap-6">
                <div className="h-10 bg-gray-200 rounded animate-pulse" />
                <div className="h-10 bg-gray-200 rounded animate-pulse" />
                <div className="h-10 bg-gray-200 rounded animate-pulse md:col-span-2" />
              </div>
            </div>
          }
        >
          <ContactFormInner />
        </Suspense>
      </div>
    </main>
  );
}
