'use client';

import React, { useEffect, useState, useRef } from 'react';
import {
  BookOpen,
  ClipboardList,
  Users,
  CheckCircle2,
  Clock,
  ChevronDown,
  ChevronUp,
  Star,
  Send,
  Paperclip,
  FileText,
  Download,
  X,
  UploadCloud,
  ExternalLink
} from 'lucide-react';
import { useSession } from 'next-auth/react';
import Link from 'next/link';

interface Submission {
  id: string;
  studentId: string;
  solutionText: string;
  attachmentUrl?: string | null;
  attachmentName?: string | null;
  status: string;
  grade: number | null;
  feedback: string | null;
  submittedAt: string;
  student: { user: { name: string | null; email: string } };
}

interface Homework {
  id: string;
  title: string;
  description: string;
  fen: string | null;
  pgn: string | null;
  solution: string | null;
  dueDate: string | null;
  coachName: string;
  attachmentUrl?: string | null;
  attachmentName?: string | null;
  createdAt: string;
  submissions: Submission[];
}

export default function MaestroPage() {
  const { data: session, status } = useSession();
  const [homeworks, setHomeworks] = useState<Homework[]>([]);
  const [loading, setLoading] = useState(true);
  const [expandedHw, setExpandedHw] = useState<string | null>(null);
  const [gradeData, setGradeData] = useState<Record<string, { grade: string; feedback: string }>>({});
  const [submitting, setSubmitting] = useState<string | null>(null);
  const [newHw, setNewHw] = useState({
    title: '',
    description: '',
    fen: '',
    dueDate: '',
    attachmentUrl: '',
    attachmentName: '',
  });
  const [attachmentLoading, setAttachmentLoading] = useState(false);
  const [creating, setCreating] = useState(false);
  const [msg, setMsg] = useState('');
  const fileInputRef = useRef<HTMLInputElement>(null);

  const role = (session?.user as any)?.role;

  useEffect(() => {
    if (status === 'authenticated') {
      fetchHomeworks();
    }
  }, [status]);

  async function fetchHomeworks() {
    setLoading(true);
    const res = await fetch('/api/homework');
    const data = await res.json();
    setHomeworks(data.homeworks || []);
    setLoading(false);
  }

  // Manejo de archivo adjunto (PDF, PGN, DOC, JPG, etc.)
  function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;

    // Máximo 10MB
    if (file.size > 10 * 1024 * 1024) {
      alert('El archivo no debe exceder los 10MB.');
      return;
    }

    setAttachmentLoading(true);
    const reader = new FileReader();
    reader.onload = () => {
      setNewHw((prev) => ({
        ...prev,
        attachmentUrl: reader.result as string,
        attachmentName: file.name,
      }));
      setAttachmentLoading(false);
    };
    reader.onerror = () => {
      alert('Error al procesar el archivo.');
      setAttachmentLoading(false);
    };
    reader.readAsDataURL(file);
  }

  function handleRemoveAttachment() {
    setNewHw((prev) => ({
      ...prev,
      attachmentUrl: '',
      attachmentName: '',
    }));
    if (fileInputRef.current) fileInputRef.current.value = '';
  }

  async function handleCreateHomework(e: React.FormEvent) {
    e.preventDefault();
    setCreating(true);
    setMsg('');
    const res = await fetch('/api/homework', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newHw),
    });
    const data = await res.json();
    if (res.ok) {
      setMsg('✅ Tarea con material adjunto creada exitosamente.');
      setNewHw({
        title: '',
        description: '',
        fen: '',
        dueDate: '',
        attachmentUrl: '',
        attachmentName: '',
      });
      if (fileInputRef.current) fileInputRef.current.value = '';
      fetchHomeworks();
    } else {
      setMsg(`❌ ${data.error}`);
    }
    setCreating(false);
  }

  async function handleGrade(submissionId: string) {
    setSubmitting(submissionId);
    const g = gradeData[submissionId] || { grade: '', feedback: '' };
    const res = await fetch('/api/homework/grade', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ submissionId, grade: g.grade, feedback: g.feedback }),
    });
    if (res.ok) {
      setMsg('✅ Calificación guardada con éxito.');
      fetchHomeworks();
    }
    setSubmitting(null);
  }

  if (status === 'loading') {
    return <div className="min-h-screen flex items-center justify-center text-[#D8B155]">Cargando panel del maestro...</div>;
  }

  if (status === 'unauthenticated' || !['SUPERADMIN', 'ADMIN', 'COACH'].includes(role)) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center gap-4 text-center px-4">
        <div className="text-4xl">🔒</div>
        <h1 className="text-xl font-bold text-[#F6F3EC]">Acceso restringido</h1>
        <p className="text-sm text-[#A8B2A6]">Esta sección es exclusiva para maestros y administradores.</p>
        <Link href="/login" className="px-4 py-2 bg-[#D8B155] text-[#0B1510] font-bold text-xs rounded">Iniciar Sesión</Link>
      </div>
    );
  }

  const pendingReviews = homeworks.reduce(
    (acc, hw) => acc + hw.submissions.filter((s) => s.status === 'SUBMITTED').length,
    0
  );

  return (
    <div className="max-w-6xl mx-auto px-4 py-10 space-y-10">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-[#2B3E34] pb-6 gap-4">
        <div>
          <span className="text-xs uppercase font-bold tracking-widest text-[#D8B155] block mb-1">
            Panel Pedagógico & Docente
          </span>
          <h1 className="text-3xl font-serif font-bold text-[#F6F3EC]">Gestión de Tareas y Material Escolar</h1>
          <p className="text-sm text-[#A8B2A6] mt-1">
            Crea ejercicios, asigna posiciones FEN, adjunta documentos (PDF, PGN, imágenes) y califica entregas.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <Link
            href="/admin"
            className="px-4 py-2 rounded-lg bg-[#1B4D3E] hover:bg-[#236653] text-[#D8B155] border border-[#D8B155]/30 text-xs font-bold transition"
          >
            ← Volver a Admin
          </Link>
        </div>
      </div>

      {/* KPIs */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {[
          { label: 'Tareas Activas', value: homeworks.length, icon: BookOpen, color: 'text-[#D8B155]' },
          { label: 'Entregas Pendientes', value: pendingReviews, icon: ClipboardList, color: 'text-amber-400' },
          {
            label: 'Total Entregas Recibidas',
            value: homeworks.reduce((acc, hw) => acc + hw.submissions.length, 0),
            icon: Users,
            color: 'text-emerald-400',
          },
        ].map(({ label, value, icon: Icon, color }) => (
          <div key={label} className="bg-[#121E17] border border-[#2B3E34] rounded-xl p-5 flex items-center gap-4">
            <div className={`p-3 rounded-lg bg-[#0B1510] border border-[#2B3E34] ${color}`}>
              <Icon className="w-5 h-5" />
            </div>
            <div>
              <p className="text-2xl font-bold text-[#F6F3EC]">{value}</p>
              <p className="text-xs text-[#A8B2A6]">{label}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Formulario Crear Tarea */}
      <div className="bg-[#121E17] border border-[#2B3E34] rounded-xl p-6 space-y-4">
        <h2 className="font-serif font-bold text-[#F6F3EC] text-lg flex items-center gap-2">
          <BookOpen className="w-5 h-5 text-[#D8B155]" />
          Crear Nueva Tarea con Documentos
        </h2>
        {msg && <p className="text-sm p-3 rounded-lg bg-[#0B1510] border border-[#2B3E34] text-[#D8B155]">{msg}</p>}

        <form onSubmit={handleCreateHomework} className="space-y-4">
          <div className="space-y-1">
            <label className="text-xs text-[#A8B2A6] font-semibold">Título de la Tarea / Ejercicio:</label>
            <input
              required
              value={newHw.title}
              onChange={(e) => setNewHw((p) => ({ ...p, title: e.target.value }))}
              placeholder="Ej: Táctica Semana 4 - Clavadas y Ataques Dobles"
              className="w-full px-4 py-2.5 rounded-lg bg-[#0B1510] border border-[#2B3E34] text-[#F6F3EC] text-sm focus:outline-none focus:border-[#D8B155]"
            />
          </div>

          <div className="space-y-1">
            <label className="text-xs text-[#A8B2A6] font-semibold">Instrucciones Pedagógicas:</label>
            <textarea
              required
              value={newHw.description}
              onChange={(e) => setNewHw((p) => ({ ...p, description: e.target.value }))}
              placeholder="Escribe las indicaciones para el alumno (por ejemplo: Juegan blancas y ganan material en 3 jugadas...)"
              rows={3}
              className="w-full px-4 py-2.5 rounded-lg bg-[#0B1510] border border-[#2B3E34] text-[#F6F3EC] text-sm focus:outline-none focus:border-[#D8B155] resize-none"
            />
          </div>

          <div className="space-y-1">
            <label className="text-xs text-[#A8B2A6] font-semibold">Posición FEN de Ajedrez (Opcional):</label>
            <input
              value={newHw.fen}
              onChange={(e) => setNewHw((p) => ({ ...p, fen: e.target.value }))}
              placeholder="Ej: r1bqkb1r/pppp1ppp/2n5/4p3/2B1n3/5N2/PPPP1PPP/RNBQK2R w KQkq - 0 4"
              className="w-full px-4 py-2.5 rounded-lg bg-[#0B1510] border border-[#2B3E34] text-[#F6F3EC] text-sm font-mono focus:outline-none focus:border-[#D8B155]"
            />
          </div>

          {/* Adjuntar Documentos */}
          <div className="space-y-2 p-4 rounded-lg bg-[#0B1510] border border-[#2B3E34]">
            <label className="text-xs text-[#D8B155] font-bold flex items-center gap-1.5">
              <Paperclip className="w-4 h-4" />
              Adjuntar Archivo o Documento (PDF, PGN, Word, Imagen, etc.):
            </label>

            {newHw.attachmentName ? (
              <div className="flex items-center justify-between p-3 rounded-lg bg-[#121E17] border border-[#2B3E34] text-xs text-white">
                <div className="flex items-center gap-2 truncate">
                  <FileText className="w-4 h-4 text-[#D8B155] shrink-0" />
                  <span className="truncate font-semibold">{newHw.attachmentName}</span>
                </div>
                <button
                  type="button"
                  onClick={handleRemoveAttachment}
                  className="p-1 rounded hover:bg-red-950/60 text-red-400 hover:text-red-300 transition"
                  title="Quitar archivo"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            ) : (
              <div className="flex flex-col sm:flex-row items-center gap-3">
                <input
                  ref={fileInputRef}
                  type="file"
                  onChange={handleFileChange}
                  accept=".pdf,.pgn,.doc,.docx,.txt,.jpg,.jpeg,.png,.webp,.zip"
                  className="text-xs text-[#A8B2A6] file:mr-3 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-xs file:font-bold file:bg-[#1B4D3E] file:text-[#D8B155] hover:file:bg-[#226350] file:cursor-pointer cursor-pointer"
                />
                {attachmentLoading && <span className="text-xs text-[#D8B155]">Cargando documento...</span>}
              </div>
            )}
            <p className="text-[10px] text-[#6E7D73]">
              Formatos soportados: PDF, PGN de partidas, Word (.docx), Imágenes (.jpg, .png) y ZIP. Máx 10MB.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pt-2">
            <div className="space-y-1">
              <label className="text-xs text-[#A8B2A6] font-semibold block">Fecha Límite de Entrega:</label>
              <input
                type="date"
                value={newHw.dueDate}
                onChange={(e) => setNewHw((p) => ({ ...p, dueDate: e.target.value }))}
                className="px-4 py-2 rounded-lg bg-[#0B1510] border border-[#2B3E34] text-[#F6F3EC] text-xs focus:outline-none focus:border-[#D8B155]"
              />
            </div>

            <button
              type="submit"
              disabled={creating || attachmentLoading}
              className="flex items-center gap-2 px-6 py-2.5 rounded-lg bg-[#D8B155] hover:bg-[#E8C865] text-[#0B1510] text-sm font-bold transition disabled:opacity-60 shadow-md cursor-pointer"
            >
              <Send className="w-4 h-4" />
              {creating ? 'Publicando...' : 'Publicar Tarea'}
            </button>
          </div>
        </form>
      </div>

      {/* Lista de Tareas y Entregas */}
      <div className="space-y-4">
        <h2 className="font-serif font-bold text-[#F6F3EC] text-lg">Tareas Publicadas & Entregas de Alumnos</h2>
        {loading ? (
          <p className="text-[#A8B2A6] text-sm">Cargando tareas...</p>
        ) : homeworks.length === 0 ? (
          <p className="text-[#A8B2A6] text-sm">Aún no hay tareas publicadas.</p>
        ) : (
          homeworks.map((hw) => {
            const pending = hw.submissions.filter((s) => s.status === 'SUBMITTED').length;
            const isOpen = expandedHw === hw.id;
            return (
              <div key={hw.id} className="bg-[#121E17] border border-[#2B3E34] rounded-xl overflow-hidden shadow-lg">
                <button
                  onClick={() => setExpandedHw(isOpen ? null : hw.id)}
                  className="w-full flex items-center justify-between p-5 text-left hover:bg-[#1B3028]/50 transition cursor-pointer"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-lg bg-[#1B4D3E] flex items-center justify-center text-[#D8B155]">
                      <BookOpen className="w-5 h-5" />
                    </div>
                    <div>
                      <p className="font-bold text-[#F6F3EC] text-sm">{hw.title}</p>
                      <p className="text-xs text-[#A8B2A6]">
                        {hw.dueDate
                          ? `Entrega: ${new Date(hw.dueDate).toLocaleDateString('es-MX')}`
                          : 'Sin fecha límite'}
                        {' · '}
                        {hw.submissions.length} entregas
                        {hw.attachmentUrl && (
                          <span className="ml-2 text-emerald-400 font-semibold inline-flex items-center gap-1">
                            <Paperclip className="w-3 h-3" /> Archivo adjunto
                          </span>
                        )}
                        {pending > 0 && (
                          <span className="ml-2 px-1.5 py-0.5 rounded bg-amber-900/50 text-amber-300 text-[10px] font-bold">
                            {pending} pendientes
                          </span>
                        )}
                      </p>
                    </div>
                  </div>
                  {isOpen ? (
                    <ChevronUp className="w-4 h-4 text-[#A8B2A6]" />
                  ) : (
                    <ChevronDown className="w-4 h-4 text-[#A8B2A6]" />
                  )}
                </button>

                {isOpen && (
                  <div className="border-t border-[#2B3E34] p-5 space-y-4">
                    <div className="text-xs text-[#D2DBD0] bg-[#0B1510] rounded-lg p-3 leading-relaxed">
                      {hw.description}
                    </div>

                    {/* Documento adjunto por el maestro */}
                    {hw.attachmentUrl && (
                      <div className="p-3 rounded-lg bg-[#0B1510] border border-[#2B3E34] flex items-center justify-between">
                        <div className="flex items-center gap-2 text-xs text-white">
                          <FileText className="w-4 h-4 text-[#D8B155]" />
                          <span>Documento adjunto: <strong className="text-[#D8B155]">{hw.attachmentName || 'Descargar archivo'}</strong></span>
                        </div>
                        <a
                          href={hw.attachmentUrl}
                          download={hw.attachmentName || 'tarea-alekhins'}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="px-3 py-1.5 rounded bg-[#1B4D3E] hover:bg-[#236653] text-[#D8B155] border border-[#D8B155]/40 text-xs font-bold flex items-center gap-1 transition"
                        >
                          <Download className="w-3.5 h-3.5" />
                          <span>Descargar</span>
                        </a>
                      </div>
                    )}

                    {hw.fen && (
                      <div className="text-xs font-mono text-[#D8B155] bg-[#0B1510] rounded-lg p-3 border border-[#2B3E34]">
                        <span className="text-[#A8B2A6] block mb-1">Posición FEN:</span>
                        {hw.fen}
                      </div>
                    )}

                    {hw.submissions.length === 0 ? (
                      <p className="text-xs text-[#A8B2A6]">Ningún alumno ha entregado esta tarea todavía.</p>
                    ) : (
                      <div className="space-y-3 pt-2">
                        <p className="text-xs font-bold text-[#D2DBD0] uppercase tracking-wider">
                          Entregas de los Alumnos:
                        </p>
                        {hw.submissions.map((sub) => (
                          <div
                            key={sub.id}
                            className="bg-[#0B1510] rounded-lg p-4 border border-[#2B3E34] space-y-3"
                          >
                            <div className="flex items-start justify-between gap-2">
                              <div>
                                <p className="text-sm font-bold text-[#F6F3EC]">
                                  {sub.student?.user?.name || 'Alumno'}
                                </p>
                                <p className="text-[10px] text-[#A8B2A6]">{sub.student?.user?.email}</p>
                                <p className="text-xs text-[#D2DBD0] mt-2 whitespace-pre-wrap">{sub.solutionText}</p>
                              </div>
                              <span
                                className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                                  sub.status === 'REVIEWED'
                                    ? 'bg-emerald-900/50 text-emerald-300'
                                    : 'bg-amber-900/50 text-amber-300'
                                }`}
                              >
                                {sub.status === 'REVIEWED' ? `✓ Calificada (${sub.grade}/10)` : '⏳ Pendiente de revisar'}
                              </span>
                            </div>

                            {/* Documento adjunto por el alumno */}
                            {sub.attachmentUrl && (
                              <div className="p-2.5 rounded bg-[#121E17] border border-[#2B3E34] flex items-center justify-between text-xs">
                                <div className="flex items-center gap-1.5 text-gray-300">
                                  <Paperclip className="w-3.5 h-3.5 text-[#D8B155]" />
                                  <span>Archivo del alumno: <strong>{sub.attachmentName || 'Ver adjunto'}</strong></span>
                                </div>
                                <a
                                  href={sub.attachmentUrl}
                                  download={sub.attachmentName || 'entrega-alumno'}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="text-xs text-[#D8B155] hover:underline flex items-center gap-1"
                                >
                                  <Download className="w-3 h-3" /> Descargar
                                </a>
                              </div>
                            )}

                            {sub.feedback && (
                              <div className="text-xs text-[#A8B2A6] bg-[#121E17] rounded p-2.5 border border-[#2B3E34]">
                                <span className="font-bold text-[#D8B155]">Retroalimentación: </span>
                                {sub.feedback}
                              </div>
                            )}

                            <div className="flex flex-wrap gap-2 items-center pt-1">
                              <input
                                type="number"
                                min="0"
                                max="10"
                                step="0.5"
                                value={gradeData[sub.id]?.grade || ''}
                                onChange={(e) =>
                                  setGradeData((p) => ({
                                    ...p,
                                    [sub.id]: {
                                      ...(p[sub.id] || { grade: '', feedback: '' }),
                                      grade: e.target.value,
                                    },
                                  }))
                                }
                                placeholder="Nota /10"
                                className="w-24 px-2 py-1.5 rounded bg-[#121E17] border border-[#2B3E34] text-[#F6F3EC] text-xs focus:outline-none focus:border-[#D8B155]"
                              />
                              <input
                                value={gradeData[sub.id]?.feedback || ''}
                                onChange={(e) =>
                                  setGradeData((p) => ({
                                    ...p,
                                    [sub.id]: {
                                      ...(p[sub.id] || { grade: '', feedback: '' }),
                                      feedback: e.target.value,
                                    },
                                  }))
                                }
                                placeholder="Escribe tu retroalimentación pedagógica para el alumno..."
                                className="flex-1 min-w-[200px] px-2.5 py-1.5 rounded bg-[#121E17] border border-[#2B3E34] text-[#F6F3EC] text-xs focus:outline-none focus:border-[#D8B155]"
                              />
                              <button
                                onClick={() => handleGrade(sub.id)}
                                disabled={submitting === sub.id}
                                className="px-3.5 py-1.5 rounded bg-[#D8B155] text-[#0B1510] text-xs font-bold hover:bg-[#E8C865] transition disabled:opacity-60 cursor-pointer"
                              >
                                {submitting === sub.id ? 'Guardando...' : 'Calificar'}
                              </button>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                )}
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}
