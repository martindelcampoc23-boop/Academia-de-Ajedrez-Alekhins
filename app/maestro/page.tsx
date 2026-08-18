'use client';

import React, { useEffect, useState } from 'react';
import { BookOpen, ClipboardList, Users, CheckCircle2, Clock, ChevronDown, ChevronUp, Star, Send } from 'lucide-react';
import { useSession } from 'next-auth/react';
import { redirect } from 'next/navigation';

interface Submission {
  id: string;
  studentId: string;
  solutionText: string;
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
  const [newHw, setNewHw] = useState({ title: '', description: '', fen: '', dueDate: '' });
  const [creating, setCreating] = useState(false);
  const [msg, setMsg] = useState('');

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
      setMsg('✅ Tarea creada exitosamente.');
      setNewHw({ title: '', description: '', fen: '', dueDate: '' });
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
      setMsg('✅ Calificación guardada.');
      fetchHomeworks();
    }
    setSubmitting(null);
  }

  if (status === 'loading') {
    return <div className="min-h-screen flex items-center justify-center text-[#C8AA6E]">Cargando...</div>;
  }

  if (status === 'unauthenticated' || !['SUPERADMIN', 'ADMIN', 'COACH'].includes(role)) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center gap-4 text-center px-4">
        <div className="text-4xl">🔒</div>
        <h1 className="text-xl font-bold text-[#F6F3EC]">Acceso restringido</h1>
        <p className="text-sm text-[#A8B2A6]">Esta sección es exclusiva para maestros y administradores.</p>
      </div>
    );
  }

  const pendingReviews = homeworks.reduce((acc, hw) =>
    acc + hw.submissions.filter(s => s.status === 'SUBMITTED').length, 0);

  return (
    <div className="max-w-6xl mx-auto px-4 py-10 space-y-10">
      {/* Header */}
      <div className="border-b border-[#2B3E34] pb-6">
        <span className="text-xs uppercase font-bold tracking-widest text-[#C8AA6E] block mb-1">Panel del Maestro</span>
        <h1 className="text-3xl font-serif font-bold text-[#F6F3EC]">Gestión de Tareas Escolares</h1>
        <p className="text-sm text-[#A8B2A6] mt-1">Crea y revisa tareas de ajedrez para tus alumnos.</p>
      </div>

      {/* KPIs */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {[
          { label: 'Tareas Activas', value: homeworks.length, icon: BookOpen, color: 'text-[#C8AA6E]' },
          { label: 'Entregas Pendientes', value: pendingReviews, icon: ClipboardList, color: 'text-amber-400' },
          { label: 'Total Entregas', value: homeworks.reduce((acc, hw) => acc + hw.submissions.length, 0), icon: Users, color: 'text-emerald-400' },
        ].map(({ label, value, icon: Icon, color }) => (
          <div key={label} className="bg-[#121E17] border border-[#2B3E34] rounded-xl p-5 flex items-center gap-4">
            <div className={`p-3 rounded-lg bg-[#0B1510] border border-[#2B3E34] ${color}`}><Icon className="w-5 h-5" /></div>
            <div>
              <p className="text-2xl font-bold text-[#F6F3EC]">{value}</p>
              <p className="text-xs text-[#A8B2A6]">{label}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Crear Tarea */}
      <div className="bg-[#121E17] border border-[#2B3E34] rounded-xl p-6">
        <h2 className="font-serif font-bold text-[#F6F3EC] text-lg mb-4 flex items-center gap-2">
          <BookOpen className="w-5 h-5 text-[#C8AA6E]" />
          Crear Nueva Tarea
        </h2>
        {msg && <p className="text-sm mb-4 text-[#A8B2A6]">{msg}</p>}
        <form onSubmit={handleCreateHomework} className="space-y-3">
          <input required value={newHw.title} onChange={e => setNewHw(p => ({...p, title: e.target.value}))}
            placeholder="Título de la tarea" className="w-full px-4 py-2.5 rounded-lg bg-[#0B1510] border border-[#2B3E34] text-[#F6F3EC] text-sm focus:outline-none focus:border-[#C8AA6E]" />
          <textarea required value={newHw.description} onChange={e => setNewHw(p => ({...p, description: e.target.value}))}
            placeholder="Descripción e instrucciones para el alumno..." rows={3}
            className="w-full px-4 py-2.5 rounded-lg bg-[#0B1510] border border-[#2B3E34] text-[#F6F3EC] text-sm focus:outline-none focus:border-[#C8AA6E] resize-none" />
          <input value={newHw.fen} onChange={e => setNewHw(p => ({...p, fen: e.target.value}))}
            placeholder="Posición FEN (opcional, ej: rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1)"
            className="w-full px-4 py-2.5 rounded-lg bg-[#0B1510] border border-[#2B3E34] text-[#F6F3EC] text-sm font-mono focus:outline-none focus:border-[#C8AA6E]" />
          <div className="flex items-center gap-3">
            <input type="date" value={newHw.dueDate} onChange={e => setNewHw(p => ({...p, dueDate: e.target.value}))}
              className="px-4 py-2.5 rounded-lg bg-[#0B1510] border border-[#2B3E34] text-[#F6F3EC] text-sm focus:outline-none focus:border-[#C8AA6E]" />
            <button type="submit" disabled={creating}
              className="flex items-center gap-2 px-6 py-2.5 rounded-lg bg-[#C8AA6E] hover:bg-[#D8BE85] text-[#0B1510] text-sm font-bold transition disabled:opacity-60">
              <Send className="w-4 h-4" />
              {creating ? 'Creando...' : 'Publicar Tarea'}
            </button>
          </div>
        </form>
      </div>

      {/* Lista de Tareas y Entregas */}
      <div className="space-y-4">
        <h2 className="font-serif font-bold text-[#F6F3EC] text-lg">Tareas Publicadas</h2>
        {loading ? (
          <p className="text-[#A8B2A6] text-sm">Cargando tareas...</p>
        ) : homeworks.length === 0 ? (
          <p className="text-[#A8B2A6] text-sm">Aún no hay tareas publicadas.</p>
        ) : homeworks.map(hw => {
          const pending = hw.submissions.filter(s => s.status === 'SUBMITTED').length;
          const isOpen = expandedHw === hw.id;
          return (
            <div key={hw.id} className="bg-[#121E17] border border-[#2B3E34] rounded-xl overflow-hidden">
              <button onClick={() => setExpandedHw(isOpen ? null : hw.id)}
                className="w-full flex items-center justify-between p-5 text-left hover:bg-[#1B3028]/50 transition cursor-pointer">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-[#1B4D3E] flex items-center justify-center text-[#C8AA6E]">
                    <BookOpen className="w-4 h-4" />
                  </div>
                  <div>
                    <p className="font-bold text-[#F6F3EC] text-sm">{hw.title}</p>
                    <p className="text-xs text-[#A8B2A6]">
                      {hw.dueDate ? `Entrega: ${new Date(hw.dueDate).toLocaleDateString('es-MX')}` : 'Sin fecha límite'}
                      {' · '}{hw.submissions.length} entregas
                      {pending > 0 && <span className="ml-2 px-1.5 py-0.5 rounded bg-amber-900/50 text-amber-300 text-[10px] font-bold">{pending} pendientes</span>}
                    </p>
                  </div>
                </div>
                {isOpen ? <ChevronUp className="w-4 h-4 text-[#A8B2A6]" /> : <ChevronDown className="w-4 h-4 text-[#A8B2A6]" />}
              </button>

              {isOpen && (
                <div className="border-t border-[#2B3E34] p-5 space-y-4">
                  <div className="text-xs text-[#D2DBD0] bg-[#0B1510] rounded-lg p-3">{hw.description}</div>
                  {hw.fen && (
                    <div className="text-xs font-mono text-[#C8AA6E] bg-[#0B1510] rounded-lg p-3 border border-[#2B3E34]">
                      <span className="text-[#A8B2A6] block mb-1">Posición FEN:</span>
                      {hw.fen}
                    </div>
                  )}

                  {hw.submissions.length === 0 ? (
                    <p className="text-xs text-[#A8B2A6]">Ningún alumno ha entregado esta tarea todavía.</p>
                  ) : (
                    <div className="space-y-3">
                      <p className="text-xs font-bold text-[#D2DBD0] uppercase tracking-wider">Entregas recibidas:</p>
                      {hw.submissions.map(sub => (
                        <div key={sub.id} className="bg-[#0B1510] rounded-lg p-4 border border-[#2B3E34] space-y-3">
                          <div className="flex items-start justify-between gap-2">
                            <div>
                              <p className="text-sm font-bold text-[#F6F3EC]">{sub.student?.user?.name || 'Alumno'}</p>
                              <p className="text-[10px] text-[#A8B2A6]">{sub.student?.user?.email}</p>
                              <p className="text-xs text-[#D2DBD0] mt-2">{sub.solutionText}</p>
                            </div>
                            <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${sub.status === 'REVIEWED' ? 'bg-emerald-900/50 text-emerald-300' : 'bg-amber-900/50 text-amber-300'}`}>
                              {sub.status === 'REVIEWED' ? `✓ Revisada (${sub.grade}/10)` : '⏳ Pendiente'}
                            </span>
                          </div>
                          {sub.feedback && (
                            <div className="text-xs text-[#A8B2A6] bg-[#121E17] rounded p-2 border border-[#2B3E34]">
                              <span className="font-bold text-[#C8AA6E]">Feedback: </span>{sub.feedback}
                            </div>
                          )}
                          <div className="flex gap-2 items-center">
                            <input type="number" min="0" max="10" step="0.5"
                              value={gradeData[sub.id]?.grade || ''}
                              onChange={e => setGradeData(p => ({...p, [sub.id]: {...(p[sub.id]||{grade:'',feedback:''}), grade: e.target.value}}))}
                              placeholder="Calificación /10"
                              className="w-32 px-2 py-1.5 rounded bg-[#121E17] border border-[#2B3E34] text-[#F6F3EC] text-xs focus:outline-none focus:border-[#C8AA6E]" />
                            <input
                              value={gradeData[sub.id]?.feedback || ''}
                              onChange={e => setGradeData(p => ({...p, [sub.id]: {...(p[sub.id]||{grade:'',feedback:''}), feedback: e.target.value}}))}
                              placeholder="Retroalimentación..."
                              className="flex-1 px-2 py-1.5 rounded bg-[#121E17] border border-[#2B3E34] text-[#F6F3EC] text-xs focus:outline-none focus:border-[#C8AA6E]" />
                            <button onClick={() => handleGrade(sub.id)} disabled={submitting === sub.id}
                              className="px-3 py-1.5 rounded bg-[#C8AA6E] text-[#0B1510] text-xs font-bold hover:bg-[#D8BE85] transition disabled:opacity-60 cursor-pointer">
                              {submitting === sub.id ? '...' : <Star className="w-3.5 h-3.5" />}
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
        })}
      </div>
    </div>
  );
}
