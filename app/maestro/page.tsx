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
  Search,
  UserCheck,
  UserX,
  Shield,
  GraduationCap,
  Sparkles,
  Edit,
  Phone,
  Mail,
  AlertTriangle
} from 'lucide-react';
import { useSession } from 'next-auth/react';
import Link from 'next/link';

interface StudentData {
  id: string;
  userId: string;
  level: string | null;
  status: string;
  approvedAt: string | null;
  approvedBy: string | null;
  rejectionReason: string | null;
  notes: string | null;
  createdAt: string;
  user: {
    id: string;
    name: string | null;
    email: string;
    image: string | null;
    role: string;
    createdAt: string;
    customer: { phone: string | null } | null;
  };
  enrollments: { plan: { id: string; name: string; level: string | null } }[];
  submissions: { id: string; status: string; grade: number | null }[];
}

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

const STATUS_MAP: Record<string, { label: string; color: string }> = {
  PENDING: { label: '⏳ Pendiente', color: 'bg-amber-950/60 text-amber-300 border-amber-800' },
  APPROVED: { label: '✓ Aceptado', color: 'bg-emerald-950/60 text-emerald-300 border-emerald-800' },
  REJECTED: { label: '✕ Rechazado', color: 'bg-red-950/60 text-red-300 border-red-800' },
  SUSPENDED: { label: 'Pausado', color: 'bg-gray-800 text-gray-300 border-gray-700' },
};

export default function MaestroPage() {
  const { data: session, status } = useSession();
  const [activeTab, setActiveTab] = useState<'tareas' | 'alumnos'>('alumnos');

  // Homework State
  const [homeworks, setHomeworks] = useState<Homework[]>([]);
  const [loadingHw, setLoadingHw] = useState(true);
  const [expandedHw, setExpandedHw] = useState<string | null>(null);
  const [gradeData, setGradeData] = useState<Record<string, { grade: string; feedback: string }>>({});
  const [submittingGrade, setSubmittingGrade] = useState<string | null>(null);
  const [newHw, setNewHw] = useState({
    title: '',
    description: '',
    fen: '',
    dueDate: '',
    attachmentUrl: '',
    attachmentName: '',
  });
  const [attachmentLoading, setAttachmentLoading] = useState(false);
  const [creatingHw, setCreatingHw] = useState(false);
  const [hwMsg, setHwMsg] = useState('');
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Students State
  const [students, setStudents] = useState<StudentData[]>([]);
  const [loadingStudents, setLoadingStudents] = useState(true);
  const [studentSearch, setStudentSearch] = useState('');
  const [studentFilter, setStudentFilter] = useState('ALL');
  const [actionLoading, setActionLoading] = useState<string | null>(null);
  const [studentMsg, setStudentMsg] = useState('');

  const role = (session?.user as any)?.role;

  useEffect(() => {
    if (status === 'authenticated') {
      fetchHomeworks();
      fetchStudents();
    }
  }, [status]);

  async function fetchHomeworks() {
    setLoadingHw(true);
    const res = await fetch('/api/homework');
    const data = await res.json();
    setHomeworks(data.homeworks || []);
    setLoadingHw(false);
  }

  async function fetchStudents() {
    setLoadingStudents(true);
    const res = await fetch('/api/admin/alumnos');
    const data = await res.json();
    setStudents(data.students || []);
    setLoadingStudents(false);
  }

  // Manejo de archivo adjunto para tareas
  function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;

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
    setCreatingHw(true);
    setHwMsg('');
    const res = await fetch('/api/homework', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newHw),
    });
    const data = await res.json();
    if (res.ok) {
      setHwMsg('✅ Tarea con material adjunto creada exitosamente.');
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
      setHwMsg(`❌ ${data.error}`);
    }
    setCreatingHw(false);
  }

  async function handleGrade(submissionId: string) {
    setSubmittingGrade(submissionId);
    const g = gradeData[submissionId] || { grade: '', feedback: '' };
    const res = await fetch('/api/homework/grade', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ submissionId, grade: g.grade, feedback: g.feedback }),
    });
    if (res.ok) {
      setHwMsg('✅ Calificación guardada con éxito.');
      fetchHomeworks();
    }
    setSubmittingGrade(null);
  }

  // Aceptar o Rechazar Alumno
  async function handleUpdateStudentStatus(studentId: string, newStatus: 'APPROVED' | 'REJECTED' | 'PENDING', level?: string) {
    setActionLoading(studentId);
    setStudentMsg('');
    const res = await fetch('/api/admin/alumnos', {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ studentId, status: newStatus, level }),
    });
    const data = await res.json();
    if (res.ok) {
      setStudentMsg(
        newStatus === 'APPROVED'
          ? '✅ Alumno aceptado en la academia.'
          : newStatus === 'REJECTED'
          ? '❌ Alumno rechazado.'
          : '🔄 Estado actualizado.'
      );
      fetchStudents();
    } else {
      setStudentMsg(`❌ ${data.error}`);
    }
    setActionLoading(null);
  }

  // Cambiar Nivel del Alumno
  async function handleUpdateStudentLevel(studentId: string, newLevel: string) {
    setActionLoading(studentId);
    const res = await fetch('/api/admin/alumnos', {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ studentId, level: newLevel }),
    });
    if (res.ok) {
      setStudentMsg('✅ Nivel del alumno actualizado.');
      fetchStudents();
    }
    setActionLoading(null);
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
        <Link href="/login" className="px-4 py-2 bg-[#D8B155] text-[#0B1510] font-bold text-xs rounded">
          Iniciar Sesión
        </Link>
      </div>
    );
  }

  const pendingStudents = students.filter((s) => s.status === 'PENDING').length;
  const approvedStudents = students.filter((s) => s.status === 'APPROVED').length;
  const pendingHwReviews = homeworks.reduce(
    (acc, hw) => acc + hw.submissions.filter((s) => s.status === 'SUBMITTED').length,
    0
  );

  const filteredStudents = students.filter((s) => {
    const matchStatus = studentFilter === 'ALL' || s.status === studentFilter;
    const query = studentSearch.toLowerCase();
    const matchSearch =
      !query ||
      (s.user.name || '').toLowerCase().includes(query) ||
      s.user.email.toLowerCase().includes(query) ||
      (s.user.customer?.phone || '').includes(query);
    return matchStatus && matchSearch;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 py-10 space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-[#2B3E34] pb-6 gap-4">
        <div>
          <span className="text-xs uppercase font-bold tracking-widest text-[#D8B155] block mb-1">
            Panel Pedagógico & Docente
          </span>
          <h1 className="text-3xl font-serif font-bold text-[#F6F3EC]">
            Gestión Integral de Alumnos y Tareas
          </h1>
          <p className="text-sm text-[#A8B2A6] mt-1">
            Acepta o rechaza alumnos registrados, asigna niveles, crea tareas con documentos y califica ejercicios.
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

      {/* Tabs Selector */}
      <div className="flex border-b border-[#2B3E34] gap-4 text-sm font-semibold">
        <button
          onClick={() => setActiveTab('alumnos')}
          className={`pb-3 px-2 flex items-center gap-2 transition border-b-2 ${
            activeTab === 'alumnos'
              ? 'border-[#D8B155] text-[#D8B155] font-bold'
              : 'border-transparent text-gray-400 hover:text-white'
          }`}
        >
          <Users className="w-4 h-4" />
          <span>Gestión & Admisión de Alumnos</span>
          {pendingStudents > 0 && (
            <span className="px-2 py-0.5 rounded-full bg-amber-900 text-amber-300 text-[10px] font-bold">
              {pendingStudents} nuevos
            </span>
          )}
        </button>

        <button
          onClick={() => setActiveTab('tareas')}
          className={`pb-3 px-2 flex items-center gap-2 transition border-b-2 ${
            activeTab === 'tareas'
              ? 'border-[#D8B155] text-[#D8B155] font-bold'
              : 'border-transparent text-gray-400 hover:text-white'
          }`}
        >
          <BookOpen className="w-4 h-4" />
          <span>Tareas Escolares & Calificaciones</span>
          {pendingHwReviews > 0 && (
            <span className="px-2 py-0.5 rounded-full bg-blue-900 text-blue-300 text-[10px] font-bold">
              {pendingHwReviews} entregas
            </span>
          )}
        </button>
      </div>

      {/* ============================================================ */}
      {/* TAB 1: GESTIÓN DE ALUMNOS & ADMISIÓN */}
      {/* ============================================================ */}
      {activeTab === 'alumnos' && (
        <div className="space-y-6">
          {/* KPIs Alumnos */}
          <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
            <div className="bg-[#121E17] border border-[#2B3E34] rounded-xl p-5 space-y-1">
              <div className="flex items-center justify-between text-xs text-[#A8B2A6]">
                <span>Total Registrados</span>
                <Users className="w-4 h-4 text-[#D8B155]" />
              </div>
              <p className="text-2xl font-bold text-white">{students.length}</p>
              <p className="text-[11px] text-[#A8B2A6]">Alumnos en base de datos</p>
            </div>

            <div className="bg-[#121E17] border border-[#2B3E34] rounded-xl p-5 space-y-1">
              <div className="flex items-center justify-between text-xs text-amber-400">
                <span>Por Aceptar (Pendientes)</span>
                <Clock className="w-4 h-4 text-amber-400" />
              </div>
              <p className="text-2xl font-bold text-amber-300">{pendingStudents}</p>
              <p className="text-[11px] text-amber-400/80">Requieren aprobación</p>
            </div>

            <div className="bg-[#121E17] border border-[#2B3E34] rounded-xl p-5 space-y-1">
              <div className="flex items-center justify-between text-xs text-emerald-400">
                <span>Alumnos Aprobados</span>
                <UserCheck className="w-4 h-4 text-emerald-400" />
              </div>
              <p className="text-2xl font-bold text-emerald-300">{approvedStudents}</p>
              <p className="text-[11px] text-emerald-400/80">Activos en la academia</p>
            </div>

            <div className="bg-[#121E17] border border-[#2B3E34] rounded-xl p-5 space-y-1">
              <div className="flex items-center justify-between text-xs text-red-400">
                <span>Rechazados / Inactivos</span>
                <UserX className="w-4 h-4 text-red-400" />
              </div>
              <p className="text-2xl font-bold text-red-300">
                {students.filter((s) => s.status === 'REJECTED').length}
              </p>
              <p className="text-[11px] text-red-400/80">Sin acceso a clases</p>
            </div>
          </div>

          {studentMsg && (
            <p className="text-sm p-3 rounded-lg bg-[#121E17] border border-[#2B3E34] text-[#D8B155]">
              {studentMsg}
            </p>
          )}

          {/* Filtros y Búsqueda */}
          <div className="flex flex-col sm:flex-row gap-3">
            <div className="relative flex-1">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#A8B2A6]" />
              <input
                value={studentSearch}
                onChange={(e) => setStudentSearch(e.target.value)}
                placeholder="Buscar por nombre, correo o teléfono..."
                className="w-full pl-10 pr-4 py-2.5 rounded-lg bg-[#121E17] border border-[#2B3E34] text-[#F6F3EC] text-xs focus:outline-none focus:border-[#D8B155]"
              />
            </div>

            <div className="flex items-center gap-2">
              {['ALL', 'PENDING', 'APPROVED', 'REJECTED'].map((st) => (
                <button
                  key={st}
                  onClick={() => setStudentFilter(st)}
                  className={`px-3 py-2 rounded-lg text-xs font-semibold border transition ${
                    studentFilter === st
                      ? 'bg-[#D8B155] text-[#0B1510] border-[#D8B155]'
                      : 'bg-[#121E17] text-[#A8B2A6] border-[#2B3E34] hover:text-white'
                  }`}
                >
                  {st === 'ALL' ? 'Todos' : st === 'PENDING' ? 'Pendientes' : st === 'APPROVED' ? 'Aprobados' : 'Rechazados'}
                </button>
              ))}
            </div>
          </div>

          {/* Tabla de Alumnos */}
          <div className="bg-[#121E17] border border-[#2B3E34] rounded-xl overflow-hidden shadow-xl">
            {loadingStudents ? (
              <div className="p-12 text-center text-[#A8B2A6] text-xs">Cargando lista de alumnos...</div>
            ) : filteredStudents.length === 0 ? (
              <div className="p-12 text-center text-[#A8B2A6] text-xs space-y-2">
                <Users className="w-8 h-8 mx-auto text-[#2B3E34]" />
                <p>No se encontraron alumnos con los filtros seleccionados.</p>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-xs">
                  <thead>
                    <tr className="border-b border-[#2B3E34] text-[10px] uppercase tracking-wider text-[#A8B2A6] bg-[#0B1510]/60">
                      <th className="text-left py-3.5 px-4">Alumno</th>
                      <th className="text-left py-3.5 px-4">Contacto</th>
                      <th className="text-left py-3.5 px-4">Nivel Ajedrez</th>
                      <th className="text-left py-3.5 px-4">Estado</th>
                      <th className="text-left py-3.5 px-4">Fecha Registro</th>
                      <th className="text-left py-3.5 px-4">Acciones de Aprobación</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredStudents.map((st) => {
                      const statusMeta = STATUS_MAP[st.status] || STATUS_MAP.PENDING;
                      const isActing = actionLoading === st.id;

                      return (
                        <tr
                          key={st.id}
                          className="border-b border-[#1C3328]/60 hover:bg-[#1B4D3E]/20 transition"
                        >
                          <td className="py-3.5 px-4">
                            <div className="flex items-center gap-3">
                              <div className="w-8 h-8 rounded-full bg-[#1B4D3E] border border-[#D8B155]/40 flex items-center justify-center font-bold text-[#D8B155] text-xs shrink-0">
                                {st.user.name ? st.user.name.charAt(0).toUpperCase() : 'A'}
                              </div>
                              <div>
                                <p className="font-semibold text-white">{st.user.name || 'Sin nombre'}</p>
                                <p className="text-[10px] text-[#A8B2A6]">{st.user.email}</p>
                              </div>
                            </div>
                          </td>

                          <td className="py-3.5 px-4 text-[#D2DBD0]">
                            {st.user.customer?.phone ? (
                              <span className="flex items-center gap-1 font-mono text-[11px]">
                                <Phone className="w-3 h-3 text-[#D8B155]" />
                                {st.user.customer.phone}
                              </span>
                            ) : (
                              <span className="text-gray-500 italic text-[11px]">Sin teléfono</span>
                            )}
                          </td>

                          <td className="py-3.5 px-4">
                            <select
                              value={st.level || 'Principiante'}
                              onChange={(e) => handleUpdateStudentLevel(st.id, e.target.value)}
                              disabled={isActing}
                              className="px-2 py-1 rounded bg-[#0B1510] border border-[#2B3E34] text-xs text-white focus:outline-none focus:border-[#D8B155]"
                            >
                              <option value="Principiante">Principiante (Iniciación)</option>
                              <option value="Intermedio">Intermedio (Club)</option>
                              <option value="Avanzado">Avanzado (Torneo)</option>
                              <option value="Alto Rendimiento">Alto Rendimiento (Elo 1800+)</option>
                            </select>
                          </td>

                          <td className="py-3.5 px-4">
                            <span
                              className={`px-2.5 py-1 rounded-full text-[10px] font-bold border ${statusMeta.color}`}
                            >
                              {statusMeta.label}
                            </span>
                          </td>

                          <td className="py-3.5 px-4 text-[#A8B2A6]">
                            {new Date(st.createdAt || st.user.createdAt).toLocaleDateString('es-MX')}
                          </td>

                          <td className="py-3.5 px-4">
                            <div className="flex items-center gap-2">
                              {st.status !== 'APPROVED' && (
                                <button
                                  onClick={() => handleUpdateStudentStatus(st.id, 'APPROVED')}
                                  disabled={isActing}
                                  className="px-3 py-1.5 rounded bg-emerald-700 hover:bg-emerald-600 text-white text-xs font-bold flex items-center gap-1 transition disabled:opacity-60 shadow cursor-pointer"
                                  title="Aceptar alumno en la academia"
                                >
                                  <UserCheck className="w-3.5 h-3.5" />
                                  <span>Aceptar</span>
                                </button>
                              )}

                              {st.status !== 'REJECTED' && (
                                <button
                                  onClick={() => handleUpdateStudentStatus(st.id, 'REJECTED')}
                                  disabled={isActing}
                                  className="px-3 py-1.5 rounded bg-red-950/80 hover:bg-red-900 border border-red-800 text-red-300 text-xs font-bold flex items-center gap-1 transition disabled:opacity-60 cursor-pointer"
                                  title="Rechazar solicitud de ingreso"
                                >
                                  <UserX className="w-3.5 h-3.5" />
                                  <span>Rechazar</span>
                                </button>
                              )}

                              {st.status === 'APPROVED' && (
                                <span className="text-[11px] text-emerald-400 font-semibold flex items-center gap-1">
                                  <CheckCircle2 className="w-3.5 h-3.5" /> Activo
                                </span>
                              )}
                            </div>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>
      )}

      {/* ============================================================ */}
      {/* TAB 2: TAREAS ESCOLARES & CALIFICACIONES */}
      {/* ============================================================ */}
      {activeTab === 'tareas' && (
        <div className="space-y-8">
          {/* Formulario Crear Tarea */}
          <div className="bg-[#121E17] border border-[#2B3E34] rounded-xl p-6 space-y-4">
            <h2 className="font-serif font-bold text-[#F6F3EC] text-lg flex items-center gap-2">
              <BookOpen className="w-5 h-5 text-[#D8B155]" />
              Crear Nueva Tarea con Documentos
            </h2>
            {hwMsg && (
              <p className="text-sm p-3 rounded-lg bg-[#0B1510] border border-[#2B3E34] text-[#D8B155]">
                {hwMsg}
              </p>
            )}

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
                  placeholder="Escribe las indicaciones para el alumno..."
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
                  disabled={creatingHw || attachmentLoading}
                  className="flex items-center gap-2 px-6 py-2.5 rounded-lg bg-[#D8B155] hover:bg-[#E8C865] text-[#0B1510] text-sm font-bold transition disabled:opacity-60 shadow-md cursor-pointer"
                >
                  <Send className="w-4 h-4" />
                  {creatingHw ? 'Publicando...' : 'Publicar Tarea'}
                </button>
              </div>
            </form>
          </div>

          {/* Lista de Tareas y Entregas */}
          <div className="space-y-4">
            <h2 className="font-serif font-bold text-[#F6F3EC] text-lg">Tareas Publicadas & Entregas</h2>
            {loadingHw ? (
              <p className="text-[#A8B2A6] text-sm">Cargando tareas...</p>
            ) : homeworks.length === 0 ? (
              <p className="text-[#A8B2A6] text-sm">Aún no hay tareas publicadas.</p>
            ) : (
              homeworks.map((hw) => {
                const pending = hw.submissions.filter((s) => s.status === 'SUBMITTED').length;
                const isOpen = expandedHw === hw.id;
                return (
                  <div
                    key={hw.id}
                    className="bg-[#121E17] border border-[#2B3E34] rounded-xl overflow-hidden shadow-lg"
                  >
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
                                <Paperclip className="w-3 h-3" /> Con archivo adjunto
                              </span>
                            )}
                            {pending > 0 && (
                              <span className="ml-2 px-1.5 py-0.5 rounded bg-amber-900/50 text-amber-300 text-[10px] font-bold">
                                {pending} pendientes de revisar
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

                        {hw.attachmentUrl && (
                          <div className="p-3 rounded-lg bg-[#0B1510] border border-[#2B3E34] flex items-center justify-between">
                            <div className="flex items-center gap-2 text-xs text-white">
                              <FileText className="w-4 h-4 text-[#D8B155]" />
                              <span>
                                Archivo adjunto:{' '}
                                <strong className="text-[#D8B155]">
                                  {hw.attachmentName || 'Descargar'}
                                </strong>
                              </span>
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
                              Entregas Recibidas:
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
                                    <p className="text-[10px] text-[#A8B2A6]">
                                      {sub.student?.user?.email}
                                    </p>
                                    <p className="text-xs text-[#D2DBD0] mt-2 whitespace-pre-wrap">
                                      {sub.solutionText}
                                    </p>
                                  </div>
                                  <span
                                    className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                                      sub.status === 'REVIEWED'
                                        ? 'bg-emerald-900/50 text-emerald-300'
                                        : 'bg-amber-900/50 text-amber-300'
                                    }`}
                                  >
                                    {sub.status === 'REVIEWED'
                                      ? `✓ Calificada (${sub.grade}/10)`
                                      : '⏳ Pendiente'}
                                  </span>
                                </div>

                                {sub.attachmentUrl && (
                                  <div className="p-2.5 rounded bg-[#121E17] border border-[#2B3E34] flex items-center justify-between text-xs">
                                    <div className="flex items-center gap-1.5 text-gray-300">
                                      <Paperclip className="w-3.5 h-3.5 text-[#D8B155]" />
                                      <span>
                                        Archivo del alumno:{' '}
                                        <strong>{sub.attachmentName || 'Ver adjunto'}</strong>
                                      </span>
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
                                    placeholder="Retroalimentación pedagógica..."
                                    className="flex-1 min-w-[200px] px-2.5 py-1.5 rounded bg-[#121E17] border border-[#2B3E34] text-[#F6F3EC] text-xs focus:outline-none focus:border-[#D8B155]"
                                  />
                                  <button
                                    onClick={() => handleGrade(sub.id)}
                                    disabled={submittingGrade === sub.id}
                                    className="px-3.5 py-1.5 rounded bg-[#D8B155] text-[#0B1510] text-xs font-bold hover:bg-[#E8C865] transition disabled:opacity-60 cursor-pointer"
                                  >
                                    {submittingGrade === sub.id ? '...' : 'Calificar'}
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
      )}
    </div>
  );
}
