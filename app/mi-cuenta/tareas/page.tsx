'use client';

import React, { useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';
import Link from 'next/link';
import { BookOpen, Send, CheckCircle2, Clock, Star, AlertCircle } from 'lucide-react';

interface Submission {
  id: string;
  status: string;
  grade: number | null;
  feedback: string | null;
  solutionText: string;
  submittedAt: string;
}

interface Homework {
  id: string;
  title: string;
  description: string;
  fen: string | null;
  dueDate: string | null;
  coachName: string;
  submissions: Submission[];
}

export default function TareasAlumnoPage() {
  const { data: session, status } = useSession();
  const [homeworks, setHomeworks] = useState<Homework[]>([]);
  const [loading, setLoading] = useState(true);
  const [solutions, setSolutions] = useState<Record<string, string>>({});
  const [submitting, setSubmitting] = useState<string | null>(null);
  const [msg, setMsg] = useState<Record<string, string>>({});

  useEffect(() => {
    if (status === 'authenticated') {
      fetch('/api/homework')
        .then(r => r.json())
        .then(data => { setHomeworks(data.homeworks || []); setLoading(false); })
        .catch(() => setLoading(false));
    }
  }, [status]);

  async function handleSubmit(homeworkId: string) {
    const text = solutions[homeworkId];
    if (!text?.trim()) {
      setMsg(p => ({...p, [homeworkId]: '⚠️ Escribe tu solución antes de enviar.'}));
      return;
    }
    setSubmitting(homeworkId);
    const res = await fetch('/api/homework/submit', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ homeworkId, solutionText: text }),
    });
    const data = await res.json();
    setMsg(p => ({...p, [homeworkId]: res.ok ? '✅ Tarea entregada exitosamente.' : `❌ ${data.error}`}));
    setSubmitting(null);
    if (res.ok) {
      setSolutions(p => ({...p, [homeworkId]: ''}));
      const r = await fetch('/api/homework');
      const d = await r.json();
      setHomeworks(d.homeworks || []);
    }
  }

  if (status === 'loading' || loading) {
    return <div className="min-h-screen flex items-center justify-center text-[#C8AA6E]">Cargando tareas...</div>;
  }

  if (status === 'unauthenticated') {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center gap-4 text-center px-4">
        <div className="text-4xl">🔒</div>
        <h1 className="text-xl font-bold text-[#F6F3EC]">Inicia sesión para ver tus tareas</h1>
        <Link href="/login" className="px-6 py-2.5 rounded-lg bg-[#C8AA6E] text-[#0B1510] text-sm font-bold">Iniciar sesión</Link>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-10 space-y-8">
      <div className="border-b border-[#2B3E34] pb-6">
        <span className="text-xs uppercase font-bold tracking-widest text-[#C8AA6E] block mb-1">Portal del Alumno</span>
        <h1 className="text-3xl font-serif font-bold text-[#F6F3EC]">Mis Tareas de Ajedrez</h1>
        <p className="text-sm text-[#A8B2A6] mt-1">Ejercicios asignados por tu maestro. Analiza y entrega tu solución.</p>
      </div>

      {homeworks.length === 0 ? (
        <div className="text-center py-16 space-y-3">
          <BookOpen className="w-12 h-12 text-[#2B3E34] mx-auto" />
          <p className="text-[#A8B2A6]">Aún no hay tareas asignadas. ¡Vuelve pronto!</p>
        </div>
      ) : (
        <div className="space-y-6">
          {homeworks.map(hw => {
            const mySubmission = hw.submissions[0];
            const submitted = !!mySubmission;
            const reviewed = mySubmission?.status === 'REVIEWED';

            return (
              <div key={hw.id} className="bg-[#121E17] border border-[#2B3E34] rounded-xl overflow-hidden">
                {/* Header */}
                <div className="p-5 flex items-start justify-between gap-3 border-b border-[#2B3E34]/60">
                  <div className="flex items-start gap-3">
                    <div className="w-9 h-9 rounded-lg bg-[#1B4D3E] flex items-center justify-center text-[#C8AA6E] shrink-0">
                      <BookOpen className="w-4 h-4" />
                    </div>
                    <div>
                      <h2 className="font-serif font-bold text-[#F6F3EC]">{hw.title}</h2>
                      <p className="text-[11px] text-[#A8B2A6]">Maestro: {hw.coachName}
                        {hw.dueDate && ` · Fecha límite: ${new Date(hw.dueDate).toLocaleDateString('es-MX')}`}
                      </p>
                    </div>
                  </div>
                  <span className={`shrink-0 px-2.5 py-1 rounded-full text-[10px] font-bold ${reviewed ? 'bg-emerald-900/50 text-emerald-300' : submitted ? 'bg-blue-900/50 text-blue-300' : 'bg-amber-900/50 text-amber-300'}`}>
                    {reviewed ? `✓ Calificada: ${mySubmission?.grade}/10` : submitted ? '⏳ Entregada' : '📝 Pendiente'}
                  </span>
                </div>

                <div className="p-5 space-y-4">
                  {/* Descripción */}
                  <p className="text-sm text-[#D2DBD0] leading-relaxed">{hw.description}</p>

                  {/* Posición FEN */}
                  {hw.fen && (
                    <div className="bg-[#0B1510] border border-[#2B3E34] rounded-lg p-3">
                      <p className="text-[10px] uppercase font-bold text-[#C8AA6E] mb-1">Posición del Ejercicio (FEN):</p>
                      <p className="text-xs font-mono text-[#D2DBD0] break-all">{hw.fen}</p>
                      <a
                        href={`https://lichess.org/editor/${encodeURIComponent(hw.fen)}`}
                        target="_blank" rel="noopener noreferrer"
                        className="mt-2 inline-flex items-center gap-1.5 text-xs text-[#C8AA6E] hover:underline"
                      >
                        ♟️ Abrir en Lichess Board Editor →
                      </a>
                    </div>
                  )}

                  {/* Feedback del maestro */}
                  {reviewed && mySubmission?.feedback && (
                    <div className="bg-emerald-950/30 border border-emerald-800/40 rounded-lg p-4">
                      <p className="text-[10px] uppercase font-bold text-emerald-400 mb-1">Retroalimentación del Maestro:</p>
                      <p className="text-sm text-[#D2DBD0]">{mySubmission.feedback}</p>
                      <div className="flex items-center gap-1 mt-2">
                        {Array.from({ length: 10 }).map((_, i) => (
                          <div key={i} className={`h-1.5 flex-1 rounded ${i < (mySubmission?.grade || 0) ? 'bg-[#C8AA6E]' : 'bg-[#2B3E34]'}`} />
                        ))}
                        <span className="text-xs font-bold text-[#C8AA6E] ml-1">{mySubmission?.grade}/10</span>
                      </div>
                    </div>
                  )}

                  {/* Formulario de entrega */}
                  {!reviewed && (
                    <div className="space-y-3">
                      {submitted && (
                        <div className="flex items-center gap-2 p-3 rounded-lg bg-blue-950/30 border border-blue-800/40 text-xs text-blue-300">
                          <Clock className="w-4 h-4 shrink-0" />
                          <span>Entregado el {new Date(mySubmission!.submittedAt).toLocaleDateString('es-MX')}. Puedes actualizar tu respuesta hasta que sea revisada.</span>
                        </div>
                      )}
                      <textarea
                        value={solutions[hw.id] || (submitted ? mySubmission?.solutionText || '' : '')}
                        onChange={e => setSolutions(p => ({...p, [hw.id]: e.target.value}))}
                        placeholder="Escribe aquí tu análisis y solución..."
                        rows={4}
                        className="w-full px-4 py-3 rounded-lg bg-[#0B1510] border border-[#2B3E34] text-[#F6F3EC] text-sm placeholder-[#6E7D73] focus:outline-none focus:border-[#C8AA6E] resize-none"
                      />
                      {msg[hw.id] && <p className="text-xs text-[#A8B2A6]">{msg[hw.id]}</p>}
                      <button
                        onClick={() => handleSubmit(hw.id)}
                        disabled={submitting === hw.id}
                        className="flex items-center gap-2 px-5 py-2.5 rounded-lg bg-[#C8AA6E] hover:bg-[#D8BE85] text-[#0B1510] text-sm font-bold transition disabled:opacity-60 cursor-pointer"
                      >
                        <Send className="w-4 h-4" />
                        {submitting === hw.id ? 'Enviando...' : submitted ? 'Actualizar entrega' : 'Entregar solución'}
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
