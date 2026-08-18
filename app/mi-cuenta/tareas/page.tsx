'use client';

import React, { useEffect, useState, useRef } from 'react';
import { useSession } from 'next-auth/react';
import Link from 'next/link';
import {
  BookOpen,
  Send,
  CheckCircle2,
  Clock,
  Star,
  AlertCircle,
  Paperclip,
  FileText,
  Download,
  X,
  ExternalLink
} from 'lucide-react';

interface Submission {
  id: string;
  status: string;
  grade: number | null;
  feedback: string | null;
  solutionText: string;
  attachmentUrl?: string | null;
  attachmentName?: string | null;
  submittedAt: string;
}

interface Homework {
  id: string;
  title: string;
  description: string;
  fen: string | null;
  dueDate: string | null;
  coachName: string;
  attachmentUrl?: string | null;
  attachmentName?: string | null;
  submissions: Submission[];
}

export default function TareasAlumnoPage() {
  const { data: session, status } = useSession();
  const [homeworks, setHomeworks] = useState<Homework[]>([]);
  const [loading, setLoading] = useState(true);
  const [solutions, setSolutions] = useState<Record<string, string>>({});
  const [studentFiles, setStudentFiles] = useState<Record<string, { url: string; name: string }>>({});
  const [submitting, setSubmitting] = useState<string | null>(null);
  const [msg, setMsg] = useState<Record<string, string>>({});

  useEffect(() => {
    if (status === 'authenticated') {
      fetch('/api/homework')
        .then((r) => r.json())
        .then((data) => {
          setHomeworks(data.homeworks || []);
          setLoading(false);
        })
        .catch(() => setLoading(false));
    }
  }, [status]);

  function handleStudentFileChange(hwId: string, e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.size > 10 * 1024 * 1024) {
      alert('El archivo adjunto no debe superar los 10MB.');
      return;
    }

    const reader = new FileReader();
    reader.onload = () => {
      setStudentFiles((p) => ({
        ...p,
        [hwId]: { url: reader.result as string, name: file.name },
      }));
    };
    reader.readAsDataURL(file);
  }

  function handleRemoveStudentFile(hwId: string) {
    setStudentFiles((p) => {
      const next = { ...p };
      delete next[hwId];
      return next;
    });
  }

  async function handleSubmit(homeworkId: string) {
    const text = solutions[homeworkId];
    if (!text?.trim()) {
      setMsg((p) => ({ ...p, [homeworkId]: '⚠️ Escribe tu análisis antes de enviar.' }));
      return;
    }
    setSubmitting(homeworkId);
    const file = studentFiles[homeworkId];
    const res = await fetch('/api/homework/submit', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        homeworkId,
        solutionText: text,
        attachmentUrl: file?.url || null,
        attachmentName: file?.name || null,
      }),
    });
    const data = await res.json();
    setMsg((p) => ({
      ...p,
      [homeworkId]: res.ok ? '✅ Tarea entregada exitosamente.' : `❌ ${data.error}`,
    }));
    setSubmitting(null);
    if (res.ok) {
      setSolutions((p) => ({ ...p, [homeworkId]: '' }));
      handleRemoveStudentFile(homeworkId);
      const r = await fetch('/api/homework');
      const d = await r.json();
      setHomeworks(d.homeworks || []);
    }
  }

  if (status === 'loading' || loading) {
    return <div className="min-h-screen flex items-center justify-center text-[#D8B155]">Cargando tareas...</div>;
  }

  if (status === 'unauthenticated') {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center gap-4 text-center px-4">
        <div className="text-4xl">🔒</div>
        <h1 className="text-xl font-bold text-[#F6F3EC]">Inicia sesión para ver tus tareas</h1>
        <Link href="/login" className="px-6 py-2.5 rounded-lg bg-[#D8B155] text-[#0B1510] text-sm font-bold">
          Iniciar sesión
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-10 space-y-8">
      <div className="border-b border-[#2B3E34] pb-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <span className="text-xs uppercase font-bold tracking-widest text-[#D8B155] block mb-1">
            Portal del Alumno
          </span>
          <h1 className="text-3xl font-serif font-bold text-[#F6F3EC]">Mis Tareas & Ejercicios de Ajedrez</h1>
          <p className="text-sm text-[#A8B2A6] mt-1">
            Resuelve posiciones FEN, consulta los documentos de estudio del maestro y entrega tus respuestas.
          </p>
        </div>

        <Link
          href="/mi-cuenta"
          className="px-4 py-2 rounded-lg bg-[#121E17] hover:bg-[#1B3028] text-xs font-semibold text-[#D8B155] border border-[#2B3E34] transition shrink-0"
        >
          ← Volver a Mi Cuenta
        </Link>
      </div>

      {homeworks.length === 0 ? (
        <div className="text-center py-16 space-y-3 bg-[#121E17] border border-[#2B3E34] rounded-xl p-8">
          <BookOpen className="w-12 h-12 text-[#2B3E34] mx-auto" />
          <p className="text-white font-serif text-lg">No hay tareas pendientes en este momento</p>
          <p className="text-xs text-[#A8B2A6]">Tu maestro publicará nuevos ejercicios pronto. ¡Sigue entrenando!</p>
        </div>
      ) : (
        <div className="space-y-6">
          {homeworks.map((hw) => {
            const mySubmission = hw.submissions[0];
            const submitted = !!mySubmission;
            const reviewed = mySubmission?.status === 'REVIEWED';

            return (
              <div key={hw.id} className="bg-[#121E17] border border-[#2B3E34] rounded-xl overflow-hidden shadow-lg">
                {/* Header */}
                <div className="p-5 flex items-start justify-between gap-3 border-b border-[#2B3E34]/60">
                  <div className="flex items-start gap-3">
                    <div className="w-9 h-9 rounded-lg bg-[#1B4D3E] flex items-center justify-center text-[#D8B155] shrink-0">
                      <BookOpen className="w-4 h-4" />
                    </div>
                    <div>
                      <h2 className="font-serif font-bold text-[#F6F3EC] text-base">{hw.title}</h2>
                      <p className="text-[11px] text-[#A8B2A6]">
                        Maestro: {hw.coachName}
                        {hw.dueDate && ` · Fecha límite: ${new Date(hw.dueDate).toLocaleDateString('es-MX')}`}
                      </p>
                    </div>
                  </div>
                  <span
                    className={`shrink-0 px-2.5 py-1 rounded-full text-[10px] font-bold ${
                      reviewed
                        ? 'bg-emerald-900/50 text-emerald-300'
                        : submitted
                        ? 'bg-blue-900/50 text-blue-300'
                        : 'bg-amber-900/50 text-amber-300'
                    }`}
                  >
                    {reviewed
                      ? `✓ Calificada: ${mySubmission?.grade}/10`
                      : submitted
                      ? '⏳ Entregada'
                      : '📝 Pendiente'}
                  </span>
                </div>

                <div className="p-5 space-y-4">
                  {/* Descripción */}
                  <p className="text-sm text-[#D2DBD0] leading-relaxed whitespace-pre-wrap">{hw.description}</p>

                  {/* Documento adjunto por el maestro */}
                  {hw.attachmentUrl && (
                    <div className="p-3.5 rounded-lg bg-[#0B1510] border border-[#2B3E34] flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                      <div className="flex items-center gap-2 text-xs text-white">
                        <FileText className="w-4 h-4 text-[#D8B155] shrink-0" />
                        <span>Material adjunto por el maestro: <strong className="text-[#D8B155]">{hw.attachmentName || 'Descargar archivo'}</strong></span>
                      </div>
                      <a
                        href={hw.attachmentUrl}
                        download={hw.attachmentName || 'material-tarea'}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-3 py-1.5 rounded bg-[#1B4D3E] hover:bg-[#236653] text-[#D8B155] border border-[#D8B155]/40 text-xs font-bold flex items-center justify-center gap-1.5 transition shrink-0"
                      >
                        <Download className="w-3.5 h-3.5" />
                        <span>Descargar Documento</span>
                      </a>
                    </div>
                  )}

                  {/* Posición FEN */}
                  {hw.fen && (
                    <div className="bg-[#0B1510] border border-[#2B3E34] rounded-lg p-3 space-y-2">
                      <p className="text-[10px] uppercase font-bold text-[#D8B155]">Posición del Ejercicio (FEN):</p>
                      <p className="text-xs font-mono text-[#D2DBD0] break-all">{hw.fen}</p>
                      <a
                        href={`https://lichess.org/editor/${encodeURIComponent(hw.fen)}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 text-xs text-[#D8B155] hover:underline font-semibold"
                      >
                        ♟️ Analizar en Tablero Interactivo de Lichess →
                      </a>
                    </div>
                  )}

                  {/* Feedback del maestro */}
                  {reviewed && mySubmission?.feedback && (
                    <div className="bg-emerald-950/30 border border-emerald-800/40 rounded-lg p-4 space-y-2">
                      <p className="text-[10px] uppercase font-bold text-emerald-400">
                        Retroalimentación del Maestro:
                      </p>
                      <p className="text-sm text-[#D2DBD0]">{mySubmission.feedback}</p>
                      <div className="flex items-center gap-1 pt-1">
                        {Array.from({ length: 10 }).map((_, i) => (
                          <div
                            key={i}
                            className={`h-1.5 flex-1 rounded ${
                              i < (mySubmission?.grade || 0) ? 'bg-[#D8B155]' : 'bg-[#2B3E34]'
                            }`}
                          />
                        ))}
                        <span className="text-xs font-bold text-[#D8B155] ml-2">
                          {mySubmission?.grade}/10
                        </span>
                      </div>
                    </div>
                  )}

                  {/* Formulario de entrega */}
                  {!reviewed && (
                    <div className="space-y-3 pt-2">
                      {submitted && (
                        <div className="flex items-center gap-2 p-3 rounded-lg bg-blue-950/30 border border-blue-800/40 text-xs text-blue-300">
                          <Clock className="w-4 h-4 shrink-0" />
                          <span>
                            Entregado el {new Date(mySubmission!.submittedAt).toLocaleDateString('es-MX')}. Puedes
                            actualizar tu respuesta hasta que el maestro califique.
                          </span>
                        </div>
                      )}

                      <textarea
                        value={solutions[hw.id] || (submitted ? mySubmission?.solutionText || '' : '')}
                        onChange={(e) => setSolutions((p) => ({ ...p, [hw.id]: e.target.value }))}
                        placeholder="Escribe aquí tu análisis, jugadas de la solución y conclusiones..."
                        rows={4}
                        className="w-full px-4 py-3 rounded-lg bg-[#0B1510] border border-[#2B3E34] text-[#F6F3EC] text-sm placeholder-[#6E7D73] focus:outline-none focus:border-[#D8B155] resize-none"
                      />

                      {/* Adjuntar archivo opcional del alumno */}
                      <div className="p-3 rounded-lg bg-[#0B1510] border border-[#2B3E34] space-y-2">
                        <label className="text-xs text-[#A8B2A6] font-semibold flex items-center gap-1.5">
                          <Paperclip className="w-3.5 h-3.5 text-[#D8B155]" />
                          <span>Adjuntar archivo a tu solución (Opcional: foto, PDF, PGN):</span>
                        </label>

                        {studentFiles[hw.id] ? (
                          <div className="flex items-center justify-between p-2 rounded bg-[#121E17] text-xs text-white">
                            <span className="truncate">{studentFiles[hw.id].name}</span>
                            <button
                              type="button"
                              onClick={() => handleRemoveStudentFile(hw.id)}
                              className="text-red-400 hover:text-red-300 p-1"
                            >
                              <X className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        ) : (
                          <input
                            type="file"
                            onChange={(e) => handleStudentFileChange(hw.id, e)}
                            accept=".pdf,.pgn,.doc,.docx,.txt,.jpg,.jpeg,.png,.webp,.zip"
                            className="text-xs text-[#A8B2A6] file:mr-3 file:py-1.5 file:px-3 file:rounded file:border-0 file:text-xs file:font-bold file:bg-[#1B4D3E] file:text-[#D8B155] hover:file:bg-[#226350] file:cursor-pointer cursor-pointer"
                          />
                        )}
                      </div>

                      {msg[hw.id] && <p className="text-xs text-[#D8B155]">{msg[hw.id]}</p>}

                      <button
                        onClick={() => handleSubmit(hw.id)}
                        disabled={submitting === hw.id}
                        className="flex items-center gap-2 px-5 py-2.5 rounded-lg bg-[#D8B155] hover:bg-[#E8C865] text-[#0B1510] text-sm font-bold transition disabled:opacity-60 cursor-pointer shadow-md"
                      >
                        <Send className="w-4 h-4" />
                        {submitting === hw.id
                          ? 'Enviando...'
                          : submitted
                          ? 'Actualizar entrega'
                          : 'Entregar solución'}
                      </button>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
