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
  Phone,
  Mail,
  ShieldAlert,
  Crown,
  ShoppingBag,
  RefreshCw,
  Eye,
  Check,
  Zap,
} from 'lucide-react';
import { useSession } from 'next-auth/react';
import Link from 'next/link';
import { ChessFenViewer } from '@/components/chess/ChessFenViewer';
import { DocumentPreviewModal } from '@/components/homework/DocumentPreviewModal';

interface UserRecord {
  id: string;
  userId: string;
  name: string | null;
  email: string;
  role: string;
  image: string | null;
  createdAt: string;
  phone: string | null;
  studentId: string | null;
  level: string | null;
  status: string;
  approvedAt: string | null;
  approvedBy: string | null;
  rejectionReason: string | null;
  notes: string | null;
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

const ROLES_MAP: Record<string, { label: string; icon: any; color: string }> = {
  SUPERADMIN: { label: '👑 Superadmin', icon: Crown, color: 'text-[#D8B155]' },
  ADMIN: { label: '🛡️ Administrador', icon: Shield, color: 'text-amber-400' },
  COACH: { label: '🎓 Maestro / Coach', icon: GraduationCap, color: 'text-purple-400' },
  STUDENT: { label: '♟️ Alumno', icon: BookOpen, color: 'text-emerald-400' },
  CUSTOMER: { label: '🛒 Cliente Tienda', icon: ShoppingBag, color: 'text-blue-400' },
};

export default function MaestroPage() {
  const { data: session, status } = useSession();
  const [activeTab, setActiveTab] = useState<'usuarios' | 'tareas'>('usuarios');

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
  const [previewDoc, setPreviewDoc] = useState<{ url: string; filename: string; title?: string } | null>(null);

  // Users State
  const [users, setUsers] = useState<UserRecord[]>([]);
  const [loadingUsers, setLoadingUsers] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('ALL');
  const [roleFilter, setRoleFilter] = useState('ALL');
  const [actionLoading, setActionLoading] = useState<string | null>(null);
  const [userMsg, setUserMsg] = useState('');

  const currentUserRole = (session?.user as any)?.role || 'CUSTOMER';

  useEffect(() => {
    if (status === 'authenticated') {
      fetchHomeworks();
      fetchUsers();
    }
  }, [status]);

  async function fetchHomeworks() {
    setLoadingHw(true);
    const res = await fetch('/api/homework');
    const data = await res.json();
    setHomeworks(data.homeworks || []);
    setLoadingHw(false);
  }

  async function fetchUsers() {
    setLoadingUsers(true);
    const res = await fetch('/api/admin/alumnos');
    const data = await res.json();
    setUsers(data.users || []);
    setLoadingUsers(false);
  }

  // Manejo de archivo adjunto para tareas — sube a Supabase Storage
  async function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.size > 10 * 1024 * 1024) {
      alert('El archivo no debe exceder los 10MB.');
      if (fileInputRef.current) fileInputRef.current.value = '';
      return;
    }

    setAttachmentLoading(true);
    setHwMsg('⏳ Subiendo archivo...');

    try {
      const fd = new FormData();
      fd.append('file', file);
      fd.append('folder', 'tareas');

      const res = await fetch('/api/upload', { method: 'POST', body: fd });
      const data = await res.json();

      if (!res.ok) {
        alert(data.error || 'Error al subir el archivo.');
        setHwMsg('');
        setAttachmentLoading(false);
        return;
      }

      setNewHw((prev) => ({
        ...prev,
        attachmentUrl: data.url,
        attachmentName: file.name,
      }));
      setHwMsg(`✅ Archivo "${file.name}" subido correctamente.`);
    } catch (err) {
      console.error('[handleFileChange]', err);
      alert('Error de red al subir el archivo. Intenta de nuevo.');
      setHwMsg('');
    } finally {
      setAttachmentLoading(false);
    }
  }

  function handleRemoveAttachment() {
    setNewHw((prev) => ({
      ...prev,
      attachmentUrl: '',
      attachmentName: '',
    }));
    if (fileInputRef.current) fileInputRef.current.value = '';
    setHwMsg('');
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

  // Asignar Rol a un Usuario
  async function handleUpdateRole(userId: string, newRole: string) {
    setActionLoading(userId);
    setUserMsg('');
    const res = await fetch('/api/admin/alumnos', {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ userId, role: newRole }),
    });
    const data = await res.json();
    if (res.ok) {
      setUserMsg(`✅ Rol actualizado a ${newRole} con éxito.`);
      fetchUsers();
    } else {
      setUserMsg(`❌ ${data.error}`);
    }
    setActionLoading(null);
  }

  // Aceptar o Rechazar Alumno
  async function handleUpdateUserStatus(userId: string, newStatus: 'APPROVED' | 'REJECTED' | 'PENDING') {
    setActionLoading(userId);
    setUserMsg('');
    const res = await fetch('/api/admin/alumnos', {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ userId, status: newStatus }),
    });
    const data = await res.json();
    if (res.ok) {
      setUserMsg(
        newStatus === 'APPROVED'
          ? '✅ Usuario aceptado en la academia.'
          : newStatus === 'REJECTED'
          ? '❌ Usuario rechazado.'
          : '🔄 Estado actualizado.'
      );
      fetchUsers();
    } else {
      setUserMsg(`❌ ${data.error}`);
    }
    setActionLoading(null);
  }

  // Cambiar Nivel del Alumno
  async function handleUpdateUserLevel(userId: string, newLevel: string) {
    setActionLoading(userId);
    const res = await fetch('/api/admin/alumnos', {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ userId, level: newLevel }),
    });
    if (res.ok) {
      setUserMsg('✅ Nivel del alumno actualizado.');
      fetchUsers();
    }
    setActionLoading(null);
  }

  if (status === 'loading') {
    return <div className="min-h-screen flex items-center justify-center text-[#D8B155]">Cargando panel...</div>;
  }

  if (status === 'unauthenticated' || !['SUPERADMIN', 'ADMIN', 'COACH'].includes(currentUserRole)) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center gap-4 text-center px-4">
        <div className="text-4xl">🔒</div>
        <h1 className="text-xl font-bold text-[#F6F3EC]">Acceso restringido</h1>
        <p className="text-sm text-[#A8B2A6]">Esta sección es exclusiva para administradores y maestros.</p>
        <Link href="/login" className="px-4 py-2 bg-[#D8B155] text-[#0B1510] font-bold text-xs rounded">
          Iniciar Sesión
        </Link>
      </div>
    );
  }

  const pendingUsers = users.filter((u) => u.status === 'PENDING').length;
  const approvedUsers = users.filter((u) => u.status === 'APPROVED').length;
  const coachesCount = users.filter((u) => u.role === 'COACH').length;
  const pendingHwReviews = homeworks.reduce(
    (acc, hw) => acc + hw.submissions.filter((s) => s.status === 'SUBMITTED').length,
    0
  );

  const filteredUsers = users.filter((u) => {
    const matchStatus = statusFilter === 'ALL' || u.status === statusFilter;
    const matchRole = roleFilter === 'ALL' || u.role === roleFilter;
    const query = searchQuery.toLowerCase();
    const matchSearch =
      !query ||
      (u.name || '').toLowerCase().includes(query) ||
      u.email.toLowerCase().includes(query) ||
      (u.phone || '').includes(query);
    return matchStatus && matchRole && matchSearch;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 py-10 space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-[#2B3E34] pb-6 gap-4">
        <div>
          <span className="text-xs uppercase font-bold tracking-widest text-[#D8B155] block mb-1">
            Panel de Administración & Control Docente
          </span>
          <h1 className="text-3xl font-serif font-bold text-[#F6F3EC]">
            Gestión de Usuarios, Roles y Tareas
          </h1>
          <p className="text-sm text-[#A8B2A6] mt-1">
            Asigna roles a usuarios registrados (Superadmin, Maestro, Alumno, Cliente), aprueba solicitudes y gestiona tareas escolares.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => {
              fetchUsers();
              fetchHomeworks();
            }}
            className="px-3 py-2 rounded-lg bg-[#0B1510] hover:bg-[#1B3028] text-[#D8B155] border border-[#2B3E34] text-xs font-bold transition flex items-center gap-1.5 cursor-pointer"
            title="Recargar lista de usuarios"
          >
            <RefreshCw className="w-3.5 h-3.5" />
            <span>Actualizar</span>
          </button>
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
          onClick={() => setActiveTab('usuarios')}
          className={`pb-3 px-2 flex items-center gap-2 transition border-b-2 ${
            activeTab === 'usuarios'
              ? 'border-[#D8B155] text-[#D8B155] font-bold'
              : 'border-transparent text-gray-400 hover:text-white'
          }`}
        >
          <Users className="w-4 h-4" />
          <span>Gestión de Usuarios & Asignación de Roles</span>
          {pendingUsers > 0 && (
            <span className="px-2 py-0.5 rounded-full bg-amber-900 text-amber-300 text-[10px] font-bold">
              {pendingUsers} pendientes
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
          <span>Tareas Escolares & Documentos</span>
          {pendingHwReviews > 0 && (
            <span className="px-2 py-0.5 rounded-full bg-blue-900 text-blue-300 text-[10px] font-bold">
              {pendingHwReviews} entregas
            </span>
          )}
        </button>
      </div>

      {/* ============================================================ */}
      {/* TAB 1: GESTIÓN DE USUARIOS & ASIGNACIÓN DE ROLES */}
      {/* ============================================================ */}
      {activeTab === 'usuarios' && (
        <div className="space-y-6">
          {/* KPIs Usuarios */}
          <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
            <div className="bg-[#121E17] border border-[#2B3E34] rounded-xl p-5 space-y-1">
              <div className="flex items-center justify-between text-xs text-[#A8B2A6]">
                <span>Total Registrados</span>
                <Users className="w-4 h-4 text-[#D8B155]" />
              </div>
              <p className="text-2xl font-bold text-white">{users.length}</p>
              <p className="text-[11px] text-[#A8B2A6]">Usuarios en el sistema</p>
            </div>

            <div className="bg-[#121E17] border border-[#2B3E34] rounded-xl p-5 space-y-1">
              <div className="flex items-center justify-between text-xs text-amber-400">
                <span>Por Aceptar (Pendientes)</span>
                <Clock className="w-4 h-4 text-amber-400" />
              </div>
              <p className="text-2xl font-bold text-amber-300">{pendingUsers}</p>
              <p className="text-[11px] text-amber-400/80">Esperando aprobación</p>
            </div>

            <div className="bg-[#121E17] border border-[#2B3E34] rounded-xl p-5 space-y-1">
              <div className="flex items-center justify-between text-xs text-purple-400">
                <span>Maestros / Coaches</span>
                <GraduationCap className="w-4 h-4 text-purple-400" />
              </div>
              <p className="text-2xl font-bold text-purple-300">{coachesCount}</p>
              <p className="text-[11px] text-purple-400/80">Con acceso docente</p>
            </div>

            <div className="bg-[#121E17] border border-[#2B3E34] rounded-xl p-5 space-y-1">
              <div className="flex items-center justify-between text-xs text-emerald-400">
                <span>Alumnos Aprobados</span>
                <UserCheck className="w-4 h-4 text-emerald-400" />
              </div>
              <p className="text-2xl font-bold text-emerald-300">{approvedUsers}</p>
              <p className="text-[11px] text-emerald-400/80">Activos en plataforma</p>
            </div>
          </div>

          {userMsg && (
            <p className="text-sm p-3 rounded-lg bg-[#121E17] border border-[#2B3E34] text-[#D8B155]">
              {userMsg}
            </p>
          )}

          {/* Filtros y Búsqueda */}
          <div className="flex flex-col sm:flex-row gap-3">
            <div className="relative flex-1">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#A8B2A6]" />
              <input
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Buscar por nombre, correo o teléfono..."
                className="w-full pl-10 pr-4 py-2.5 rounded-lg bg-[#121E17] border border-[#2B3E34] text-[#F6F3EC] text-xs focus:outline-none focus:border-[#D8B155]"
              />
            </div>

            {/* Filtro por Rol */}
            <select
              value={roleFilter}
              onChange={(e) => setRoleFilter(e.target.value)}
              className="px-3 py-2 rounded-lg bg-[#121E17] border border-[#2B3E34] text-xs text-[#F6F3EC] focus:outline-none focus:border-[#D8B155]"
            >
              <option value="ALL">Todos los Roles</option>
              <option value="SUPERADMIN">Superadmin 👑</option>
              <option value="ADMIN">Administrador 🛡️</option>
              <option value="COACH">Maestro / Coach 🎓</option>
              <option value="STUDENT">Alumno ♟️</option>
              <option value="CUSTOMER">Cliente Tienda 🛒</option>
            </select>

            {/* Filtro por Estado */}
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="px-3 py-2 rounded-lg bg-[#121E17] border border-[#2B3E34] text-xs text-[#F6F3EC] focus:outline-none focus:border-[#D8B155]"
            >
              <option value="ALL">Todos los Estados</option>
              <option value="PENDING">⏳ Pendientes</option>
              <option value="APPROVED">✓ Aprobados</option>
              <option value="REJECTED">✕ Rechazados</option>
            </select>
          </div>

          {/* Tabla de Usuarios & Asignación de Roles */}
          <div className="bg-[#121E17] border border-[#2B3E34] rounded-xl overflow-hidden shadow-xl">
            {loadingUsers ? (
              <div className="p-12 text-center text-[#A8B2A6] text-xs">Cargando usuarios...</div>
            ) : filteredUsers.length === 0 ? (
              <div className="p-12 text-center text-[#A8B2A6] text-xs space-y-2">
                <Users className="w-8 h-8 mx-auto text-[#2B3E34]" />
                <p>No se encontraron usuarios con los filtros seleccionados.</p>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-xs">
                  <thead>
                    <tr className="border-b border-[#2B3E34] text-[10px] uppercase tracking-wider text-[#A8B2A6] bg-[#0B1510]/60">
                      <th className="text-left py-3.5 px-4">Usuario</th>
                      <th className="text-left py-3.5 px-4">Contacto</th>
                      <th className="text-left py-3.5 px-4">Rol Asignado</th>
                      <th className="text-left py-3.5 px-4">Nivel Ajedrez</th>
                      <th className="text-left py-3.5 px-4">Estado</th>
                      <th className="text-left py-3.5 px-4">Fecha</th>
                      <th className="text-left py-3.5 px-4">Admisión / Acciones</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredUsers.map((u) => {
                      const statusMeta = STATUS_MAP[u.status] || STATUS_MAP.PENDING;
                      const isActing = actionLoading === u.id;
                      const canEditRole = currentUserRole === 'SUPERADMIN' || currentUserRole === 'ADMIN';

                      return (
                        <tr
                          key={u.id}
                          className="border-b border-[#1C3328]/60 hover:bg-[#1B4D3E]/20 transition"
                        >
                          {/* Usuario */}
                          <td className="py-3.5 px-4">
                            <div className="flex items-center gap-3">
                              {u.image ? (
                                <img
                                  src={u.image}
                                  alt={u.name || u.email}
                                  className="w-8 h-8 rounded-full border border-[#D8B155]/40 object-cover shrink-0"
                                />
                              ) : (
                                <div className="w-8 h-8 rounded-full bg-[#1B4D3E] border border-[#D8B155]/40 flex items-center justify-center font-bold text-[#D8B155] text-xs shrink-0">
                                  {u.name ? u.name.charAt(0).toUpperCase() : u.email.charAt(0).toUpperCase()}
                                </div>
                              )}
                              <div>
                                <p className="font-semibold text-white">{u.name || u.email.split('@')[0]}</p>
                                <p className="text-[10px] text-[#A8B2A6]">{u.email}</p>
                              </div>
                            </div>
                          </td>

                          {/* Contacto */}
                          <td className="py-3.5 px-4 text-[#D2DBD0]">
                            {u.phone ? (
                              <span className="flex items-center gap-1 font-mono text-[11px]">
                                <Phone className="w-3 h-3 text-[#D8B155]" />
                                {u.phone}
                              </span>
                            ) : (
                              <span className="text-gray-500 italic text-[11px]">Sin teléfono</span>
                            )}
                          </td>

                          {/* Selector de Rol */}
                          <td className="py-3.5 px-4">
                            {canEditRole ? (
                              <select
                                value={u.role}
                                onChange={(e) => handleUpdateRole(u.id, e.target.value)}
                                disabled={isActing}
                                className="px-2.5 py-1.5 rounded-lg bg-[#0B1510] border border-[#2B3E34] text-xs font-semibold text-white focus:outline-none focus:border-[#D8B155]"
                              >
                                <option value="STUDENT">♟️ Alumno</option>
                                <option value="COACH">🎓 Maestro / Coach</option>
                                <option value="ADMIN">🛡️ Administrador</option>
                                {currentUserRole === 'SUPERADMIN' && (
                                  <option value="SUPERADMIN">👑 Superadmin</option>
                                )}
                                <option value="CUSTOMER">🛒 Cliente Tienda</option>
                              </select>
                            ) : (
                              <span className="font-semibold text-white">
                                {ROLES_MAP[u.role]?.label || u.role}
                              </span>
                            )}
                          </td>

                          {/* Nivel */}
                          <td className="py-3.5 px-4">
                            <select
                              value={u.level || 'Principiante'}
                              onChange={(e) => handleUpdateUserLevel(u.id, e.target.value)}
                              disabled={isActing}
                              className="px-2 py-1 rounded bg-[#0B1510] border border-[#2B3E34] text-xs text-white focus:outline-none focus:border-[#D8B155]"
                            >
                              <option value="Principiante">Principiante</option>
                              <option value="Intermedio">Intermedio (Club)</option>
                              <option value="Avanzado">Avanzado (Torneo)</option>
                              <option value="Alto Rendimiento">Alto Rendimiento (1800+)</option>
                            </select>
                          </td>

                          {/* Estado */}
                          <td className="py-3.5 px-4">
                            <span
                              className={`px-2.5 py-1 rounded-full text-[10px] font-bold border ${statusMeta.color}`}
                            >
                              {statusMeta.label}
                            </span>
                          </td>

                          {/* Fecha */}
                          <td className="py-3.5 px-4 text-[#A8B2A6]">
                            {new Date(u.createdAt).toLocaleDateString('es-MX')}
                          </td>

                          {/* Acciones */}
                          <td className="py-3.5 px-4">
                            <div className="flex items-center gap-2">
                              {u.status !== 'APPROVED' && (
                                <button
                                  onClick={() => handleUpdateUserStatus(u.id, 'APPROVED')}
                                  disabled={isActing}
                                  className="px-3 py-1.5 rounded bg-emerald-700 hover:bg-emerald-600 text-white text-xs font-bold flex items-center gap-1 transition disabled:opacity-60 shadow cursor-pointer"
                                  title="Aceptar usuario en la academia"
                                >
                                  <UserCheck className="w-3.5 h-3.5" />
                                  <span>Aceptar</span>
                                </button>
                              )}

                              {u.status !== 'REJECTED' && (
                                <button
                                  onClick={() => handleUpdateUserStatus(u.id, 'REJECTED')}
                                  disabled={isActing}
                                  className="px-3 py-1.5 rounded bg-red-950/80 hover:bg-red-900 border border-red-800 text-red-300 text-xs font-bold flex items-center gap-1 transition disabled:opacity-60 cursor-pointer"
                                  title="Rechazar solicitud"
                                >
                                  <UserX className="w-3.5 h-3.5" />
                                  <span>Rechazar</span>
                                </button>
                              )}

                              {u.status === 'APPROVED' && (
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
      {/* TAB 2: TAREAS ESCOLARES & DOCUMENTOS TECNOLÓGICOS */}
      {/* ============================================================ */}
      {activeTab === 'tareas' && (
        <div className="space-y-8">
          {/* Formulario Crear Tarea Tecnológico */}
          <div className="bg-[#121E17] border-2 border-[#D8B155]/60 rounded-2xl p-6 sm:p-8 space-y-6 shadow-2xl relative overflow-hidden">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-[#2B3E34] pb-4 gap-2">
              <div>
                <span className="text-[10px] uppercase font-bold tracking-widest text-[#D8B155] block">
                  LMS & Asignación Pedagógica
                </span>
                <h2 className="font-serif-editorial font-bold text-white text-xl sm:text-2xl flex items-center gap-2">
                  <BookOpen className="w-6 h-6 text-[#D8B155]" />
                  <span>Publicar Tarea, Material Didáctico o Ejercicio</span>
                </h2>
              </div>
              <span className="px-3 py-1 rounded-full bg-[#0B1510] border border-[#2B3E34] text-xs font-mono text-emerald-400 font-bold flex items-center gap-1.5 self-start sm:self-auto">
                <Sparkles className="w-3.5 h-3.5 text-[#D8B155]" />
                Visor Interactivo FEN & Documentos
              </span>
            </div>

            {hwMsg && (
              <div className="p-3.5 rounded-xl bg-[#0B1510] border border-[#D8B155]/50 text-xs text-[#D8B155] font-semibold flex items-center gap-2 animate-in fade-in">
                <span>{hwMsg}</span>
              </div>
            )}

            <form onSubmit={handleCreateHomework} className="space-y-6">
              {/* Título */}
              <div className="space-y-1.5">
                <label className="text-xs text-[#D2DBD0] font-bold block">
                  Título de la Asignación / Tema *
                </label>
                <input
                  required
                  value={newHw.title}
                  onChange={(e) => setNewHw((p) => ({ ...p, title: e.target.value }))}
                  placeholder="Ej: Táctica Avanzada Semana 4 — Desviación, Clavadas y Redes de Mate"
                  className="w-full px-4 py-3 rounded-xl bg-[#0B1510] border border-[#2B3E34] text-white text-sm focus:outline-none focus:border-[#D8B155] transition"
                />
              </div>

              {/* Instrucciones Pedagógicas */}
              <div className="space-y-1.5">
                <label className="text-xs text-[#D2DBD0] font-bold block">
                  Instrucciones & Análisis Solicitado al Alumno *
                </label>
                <textarea
                  required
                  value={newHw.description}
                  onChange={(e) => setNewHw((p) => ({ ...p, description: e.target.value }))}
                  placeholder="Indica al alumno los objetivos del ejercicio, jugadas a calcular, número de variantes y plazo de entrega..."
                  rows={3}
                  className="w-full px-4 py-3 rounded-xl bg-[#0B1510] border border-[#2B3E34] text-white text-sm focus:outline-none focus:border-[#D8B155] resize-none transition"
                />
              </div>

              {/* Posición FEN de Ajedrez con Visor Interactivo en Tiempo Real */}
              <div className="space-y-3 p-4 rounded-xl bg-[#0B1510] border border-[#2B3E34]">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                  <label className="text-xs text-[#D8B155] font-bold flex items-center gap-1.5">
                    <Crown className="w-4 h-4 text-[#D8B155]" />
                    <span>Diagrama de Ajedrez FEN (Visualización en Tiempo Real):</span>
                  </label>

                  {/* Botones de Posiciones Predefinidas */}
                  <div className="flex flex-wrap gap-1.5 text-[11px]">
                    <span className="text-[#A8B2A6] text-[10px] self-center mr-1">Cargar plantilla:</span>
                    <button
                      type="button"
                      onClick={() =>
                        setNewHw((p) => ({
                          ...p,
                          fen: 'rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1',
                        }))
                      }
                      className="px-2 py-0.5 rounded bg-[#121E17] hover:bg-[#1B4D3E] border border-[#2B3E34] text-[#A8B2A6] hover:text-white transition text-[10px]"
                    >
                      Inicial
                    </button>
                    <button
                      type="button"
                      onClick={() =>
                        setNewHw((p) => ({
                          ...p,
                          fen: 'r1bqkb1r/pppp1ppp/2n5/4p3/2B1n3/5N2/PPPP1PPP/RNBQK2R w KQkq - 0 4',
                        }))
                      }
                      className="px-2 py-0.5 rounded bg-[#121E17] hover:bg-[#1B4D3E] border border-[#2B3E34] text-[#A8B2A6] hover:text-white transition text-[10px]"
                    >
                      Clavada e4
                    </button>
                    <button
                      type="button"
                      onClick={() =>
                        setNewHw((p) => ({
                          ...p,
                          fen: '8/8/8/4k3/8/4K3/4P3/8 w - - 0 1',
                        }))
                      }
                      className="px-2 py-0.5 rounded bg-[#121E17] hover:bg-[#1B4D3E] border border-[#2B3E34] text-[#A8B2A6] hover:text-white transition text-[10px]"
                    >
                      Final Rey+P
                    </button>
                    <button
                      type="button"
                      onClick={() =>
                        setNewHw((p) => ({
                          ...p,
                          fen: 'r1b2rk1/pp3ppp/2n5/8/4q3/1NP5/PP2B1PP/R2Q1RK1 b - - 0 15',
                        }))
                      }
                      className="px-2 py-0.5 rounded bg-[#121E17] hover:bg-[#1B4D3E] border border-[#2B3E34] text-[#A8B2A6] hover:text-white transition text-[10px]"
                    >
                      Medio Juego
                    </button>
                  </div>
                </div>

                <input
                  value={newHw.fen}
                  onChange={(e) => setNewHw((p) => ({ ...p, fen: e.target.value }))}
                  placeholder="Ej: r1bqkb1r/pppp1ppp/2n5/4p3/2B1n3/5N2/PPPP1PPP/RNBQK2R w KQkq - 0 4"
                  className="w-full px-4 py-2.5 rounded-lg bg-[#121E17] border border-[#2B3E34] text-[#D8B155] text-xs font-mono focus:outline-none focus:border-[#D8B155]"
                />

                {/* Vista previa en vivo del tablero FEN si se ingresó */}
                {newHw.fen.trim() && (
                  <div className="pt-2 flex flex-col items-center justify-center p-3 rounded-xl bg-[#0B1510] border border-[#1C3328]">
                    <ChessFenViewer fen={newHw.fen} size="md" caption="Vista previa interactiva que verá el alumno" />
                  </div>
                )}
              </div>

              {/* Zona Tecnológica de Carga & Vista Previa de Documentos */}
              <div className="space-y-3 p-4 rounded-xl bg-[#0B1510] border border-[#2B3E34]">
                <label className="text-xs text-[#D8B155] font-bold flex items-center justify-between">
                  <span className="flex items-center gap-1.5">
                    <Paperclip className="w-4 h-4 text-[#D8B155]" />
                    <span>Material Adjunto (PDF, PGN, Word, Imagen, Ejercicios en Guía):</span>
                  </span>
                  <span className="text-[10px] text-[#A8B2A6] font-mono">Máx 10 MB</span>
                </label>

                {newHw.attachmentUrl ? (
                  /* Tarjeta Tecnológica de Documento Listo con Vista Previa */
                  <div className="p-4 rounded-xl bg-[#121E17] border-2 border-emerald-500/50 space-y-3 shadow-lg">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                      <div className="flex items-center gap-3 truncate">
                        <div className="w-10 h-10 rounded-lg bg-emerald-950/80 border border-emerald-500 flex items-center justify-center text-emerald-400 shrink-0">
                          <FileText className="w-5 h-5" />
                        </div>
                        <div className="truncate">
                          <span className="px-2 py-0.5 rounded text-[9px] font-bold uppercase tracking-wider bg-emerald-950 text-emerald-300 border border-emerald-700/60 inline-block mb-0.5">
                            ✓ Documento Verificado
                          </span>
                          <p className="text-xs font-bold text-white truncate max-w-sm">
                            {newHw.attachmentName}
                          </p>
                        </div>
                      </div>

                      <div className="flex items-center gap-2 self-end sm:self-auto">
                        <button
                          type="button"
                          onClick={() =>
                            setPreviewDoc({
                              url: newHw.attachmentUrl,
                              filename: newHw.attachmentName || 'Documento de Tarea',
                              title: newHw.title || 'Vista Previa del Documento',
                            })
                          }
                          className="px-3 py-1.5 rounded-lg bg-[#1B4D3E] hover:bg-[#236653] text-[#D8B155] border border-[#D8B155]/50 text-xs font-bold transition flex items-center gap-1.5 cursor-pointer shadow"
                        >
                          <Eye className="w-3.5 h-3.5" />
                          <span>Previsualizar Documento</span>
                        </button>

                        <button
                          type="button"
                          onClick={handleRemoveAttachment}
                          className="p-1.5 rounded-lg bg-red-950/60 hover:bg-red-900 border border-red-800 text-red-300 transition cursor-pointer"
                          title="Quitar archivo"
                        >
                          <X className="w-4 h-4" />
                        </button>
                      </div>
                    </div>

                    {/* Previsualización en miniatura si es imagen */}
                    {newHw.attachmentName?.match(/\.(jpg|jpeg|png|webp|gif)$/i) && (
                      <div className="pt-2 border-t border-[#2B3E34] flex items-center gap-3">
                        <img
                          src={newHw.attachmentUrl}
                          alt="Previsualización miniatura"
                          className="h-20 w-32 object-cover rounded-lg border border-[#2B3E34]"
                        />
                        <span className="text-[11px] text-[#A8B2A6]">
                          Imagen cargada correctamente. Se mostrará en el visor de alta resolución para los alumnos.
                        </span>
                      </div>
                    )}
                  </div>
                ) : (
                  /* Selector Dropzone */
                  <div className="border-2 border-dashed border-[#2B3E34] hover:border-[#D8B155]/60 rounded-xl p-6 text-center space-y-3 transition bg-[#070E0A]/40">
                    <FileText className="w-8 h-8 text-[#D8B155] mx-auto opacity-70" />
                    <div>
                      <p className="text-xs font-bold text-white">
                        Selecciona o arrastra el archivo de la tarea
                      </p>
                      <p className="text-[11px] text-[#A8B2A6]">
                        Compatible con PDF, bases PGN, documentos Word (.docx), imágenes JPG/PNG o archivos ZIP.
                      </p>
                    </div>

                    <div className="pt-1">
                      <input
                        ref={fileInputRef}
                        type="file"
                        onChange={handleFileChange}
                        accept=".pdf,.pgn,.doc,.docx,.txt,.jpg,.jpeg,.png,.webp,.zip"
                        className="text-xs text-[#A8B2A6] file:mr-3 file:py-2 file:px-4 file:rounded-xl file:border-0 file:text-xs file:font-bold file:bg-[#1B4D3E] file:text-[#D8B155] hover:file:bg-[#226350] file:cursor-pointer cursor-pointer"
                      />
                    </div>
                    {attachmentLoading && (
                      <p className="text-xs text-[#D8B155] font-semibold animate-pulse">
                        ⏳ Subiendo documento al almacenamiento seguro...
                      </p>
                    )}
                  </div>
                )}
              </div>

              {/* Fecha y Botón de Publicación */}
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pt-2 border-t border-[#2B3E34]">
                <div className="space-y-1">
                  <label className="text-xs text-[#A8B2A6] font-semibold block">Fecha Límite de Entrega:</label>
                  <input
                    type="date"
                    value={newHw.dueDate}
                    onChange={(e) => setNewHw((p) => ({ ...p, dueDate: e.target.value }))}
                    className="px-4 py-2.5 rounded-lg bg-[#0B1510] border border-[#2B3E34] text-[#F6F3EC] text-xs focus:outline-none focus:border-[#D8B155]"
                  />
                </div>

                <button
                  type="submit"
                  disabled={creatingHw || attachmentLoading}
                  className="flex items-center gap-2 px-7 py-3 rounded-xl bg-[#D8B155] hover:bg-[#E8C865] text-[#0B1510] text-sm font-bold transition disabled:opacity-60 shadow-xl shadow-[#D8B155]/20 cursor-pointer"
                >
                  <Send className="w-4 h-4" />
                  <span>{creatingHw ? 'Publicando en Plataforma...' : 'Publicar Tarea Oficial'}</span>
                </button>
              </div>
            </form>
          </div>

          {/* Lista de Tareas Publicadas con Vista Previa */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="font-serif font-bold text-[#F6F3EC] text-xl">
                  Tareas Publicadas & Entregas de Alumnos
                </h2>
                <p className="text-xs text-[#A8B2A6]">
                  Revisa el material asignado, consulta los documentos adjuntos y califica las respuestas.
                </p>
              </div>
              <span className="px-3 py-1 rounded-full bg-[#121E17] border border-[#2B3E34] text-xs font-mono text-[#D8B155] font-bold">
                {homeworks.length} tareas activas
              </span>
            </div>

            {loadingHw ? (
              <p className="text-[#A8B2A6] text-sm py-8 text-center">Cargando tareas...</p>
            ) : homeworks.length === 0 ? (
              <div className="text-center py-12 p-6 rounded-2xl bg-[#121E17] border border-[#2B3E34] space-y-2">
                <BookOpen className="w-8 h-8 text-[#A8B2A6] mx-auto opacity-50" />
                <p className="text-sm font-bold text-white">Aún no hay tareas publicadas</p>
                <p className="text-xs text-[#A8B2A6]">Crea tu primera tarea con el formulario superior.</p>
              </div>
            ) : (
              homeworks.map((hw) => {
                const pending = hw.submissions.filter((s) => s.status === 'SUBMITTED').length;
                const isOpen = expandedHw === hw.id;
                return (
                  <div
                    key={hw.id}
                    className="bg-[#121E17] border border-[#2B3E34] rounded-2xl overflow-hidden shadow-lg transition-all"
                  >
                    <button
                      onClick={() => setExpandedHw(isOpen ? null : hw.id)}
                      className="w-full flex items-center justify-between p-5 text-left hover:bg-[#1B3028]/40 transition cursor-pointer"
                    >
                      <div className="flex items-center gap-3.5">
                        <div className="w-10 h-10 rounded-xl bg-[#1B4D3E] border border-[#D8B155]/40 flex items-center justify-center text-[#D8B155] shrink-0">
                          <BookOpen className="w-5 h-5" />
                        </div>
                        <div>
                          <p className="font-bold text-[#F6F3EC] text-base">{hw.title}</p>
                          <div className="flex flex-wrap items-center gap-2 text-xs text-[#A8B2A6] mt-0.5">
                            <span>
                              {hw.dueDate
                                ? `Entrega: ${new Date(hw.dueDate).toLocaleDateString('es-MX')}`
                                : 'Sin fecha límite'}
                            </span>
                            <span>•</span>
                            <span className="font-bold text-white">{hw.submissions.length} entregas</span>
                            {hw.attachmentUrl && (
                              <span className="text-emerald-400 font-semibold inline-flex items-center gap-1 bg-emerald-950/60 px-2 py-0.5 rounded border border-emerald-800 text-[10px]">
                                <Paperclip className="w-3 h-3" /> Con archivo adjunto
                              </span>
                            )}
                            {hw.fen && (
                              <span className="text-[#D8B155] font-semibold inline-flex items-center gap-1 bg-[#0B1510] px-2 py-0.5 rounded border border-[#2B3E34] text-[10px]">
                                <Crown className="w-3 h-3" /> Diagrama FEN
                              </span>
                            )}
                            {pending > 0 && (
                              <span className="px-2 py-0.5 rounded bg-amber-900/60 border border-amber-600/50 text-amber-200 text-[10px] font-bold animate-pulse">
                                {pending} por calificar
                              </span>
                            )}
                          </div>
                        </div>
                      </div>
                      {isOpen ? (
                        <ChevronUp className="w-5 h-5 text-[#D8B155]" />
                      ) : (
                        <ChevronDown className="w-5 h-5 text-[#A8B2A6]" />
                      )}
                    </button>

                    {isOpen && (
                      <div className="border-t border-[#2B3E34] p-6 space-y-6 bg-[#070E0A]/40">
                        {/* Indicaciones */}
                        <div className="space-y-1">
                          <span className="text-[10px] uppercase font-bold tracking-wider text-[#A8B2A6]">
                            Indicaciones para el Alumno:
                          </span>
                          <div className="text-xs sm:text-sm text-[#D2DBD0] bg-[#0B1510] rounded-xl p-4 leading-relaxed border border-[#1C3328]">
                            {hw.description}
                          </div>
                        </div>

                        {/* FEN Visualizer */}
                        {hw.fen && (
                          <div className="p-4 rounded-xl bg-[#0B1510] border border-[#2B3E34] flex flex-col sm:flex-row items-center justify-between gap-4">
                            <div className="space-y-1">
                              <span className="text-xs font-bold text-[#D8B155] block">
                                Posición de la Tarea:
                              </span>
                              <p className="font-mono text-[11px] text-[#A8B2A6] break-all max-w-sm">
                                {hw.fen}
                              </p>
                            </div>
                            <ChessFenViewer fen={hw.fen} size="sm" />
                          </div>
                        )}

                        {/* Material Adjunto con Botón de Previsualización */}
                        {hw.attachmentUrl && (
                          <div className="p-4 rounded-xl bg-[#0B1510] border border-[#2B3E34] flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                            <div className="flex items-center gap-3">
                              <div className="w-9 h-9 rounded-lg bg-[#1B4D3E] flex items-center justify-center text-[#D8B155] shrink-0">
                                <FileText className="w-5 h-5" />
                              </div>
                              <div>
                                <span className="text-[10px] text-[#A8B2A6] uppercase font-bold block">
                                  Documento del Maestro:
                                </span>
                                <span className="font-bold text-sm text-white">
                                  {hw.attachmentName || 'Material Didáctico'}
                                </span>
                              </div>
                            </div>

                            <div className="flex items-center gap-2">
                              <button
                                type="button"
                                onClick={() =>
                                  setPreviewDoc({
                                    url: hw.attachmentUrl!,
                                    filename: hw.attachmentName || 'Material de Tarea',
                                    title: hw.title,
                                  })
                                }
                                className="px-3.5 py-2 rounded-lg bg-[#1B4D3E] hover:bg-[#236653] text-[#D8B155] border border-[#D8B155]/40 text-xs font-bold flex items-center gap-1.5 transition cursor-pointer"
                              >
                                <Eye className="w-3.5 h-3.5" />
                                <span>Ver Vista Previa</span>
                              </button>

                              <a
                                href={hw.attachmentUrl}
                                download={hw.attachmentName || 'tarea-alekhins'}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="px-3.5 py-2 rounded-lg bg-[#121E17] hover:bg-[#1C3328] text-white border border-[#2B3E34] text-xs font-bold flex items-center gap-1.5 transition"
                              >
                                <Download className="w-3.5 h-3.5" />
                                <span>Descargar</span>
                              </a>
                            </div>
                          </div>
                        )}

                        {/* Entregas de Alumnos */}
                        {hw.submissions.length === 0 ? (
                          <div className="text-center py-6 text-xs text-[#A8B2A6] bg-[#0B1510] rounded-xl border border-[#1C3328]">
                            Ningún alumno ha entregado esta tarea todavía.
                          </div>
                        ) : (
                          <div className="space-y-3 pt-2">
                            <h4 className="text-xs font-bold text-[#D8B155] uppercase tracking-wider flex items-center gap-2">
                              <span>Respuestas & Entregas de Alumnos ({hw.submissions.length}):</span>
                            </h4>

                            {hw.submissions.map((sub) => (
                              <div
                                key={sub.id}
                                className="bg-[#0B1510] rounded-xl p-4 border border-[#2B3E34] space-y-3 shadow-md"
                              >
                                <div className="flex items-start justify-between gap-2">
                                  <div>
                                    <p className="text-sm font-bold text-white">
                                      {sub.student?.user?.name || 'Alumno'}
                                    </p>
                                    <p className="text-[11px] text-[#A8B2A6]">
                                      {sub.student?.user?.email}
                                    </p>
                                    <p className="text-xs text-[#D2DBD0] mt-2 whitespace-pre-wrap bg-[#121E17] p-3 rounded-lg border border-[#1C3328]">
                                      {sub.solutionText}
                                    </p>
                                  </div>
                                  <span
                                    className={`px-2.5 py-1 rounded-full text-[10px] font-bold ${
                                      sub.status === 'REVIEWED'
                                        ? 'bg-emerald-950 text-emerald-300 border border-emerald-800'
                                        : 'bg-amber-950 text-amber-300 border border-amber-800'
                                    }`}
                                  >
                                    {sub.status === 'REVIEWED'
                                      ? `✓ Calificada (${sub.grade}/10)`
                                      : '⏳ Pendiente'}
                                  </span>
                                </div>

                                {/* Archivo del Alumno con Vista Previa */}
                                {sub.attachmentUrl && (
                                  <div className="p-3 rounded-lg bg-[#121E17] border border-[#2B3E34] flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs">
                                    <div className="flex items-center gap-2 text-white">
                                      <Paperclip className="w-4 h-4 text-[#D8B155]" />
                                      <span>
                                        Archivo del alumno:{' '}
                                        <strong className="text-[#D8B155]">
                                          {sub.attachmentName || 'Ver archivo'}
                                        </strong>
                                      </span>
                                    </div>

                                    <div className="flex items-center gap-2">
                                      <button
                                        type="button"
                                        onClick={() =>
                                          setPreviewDoc({
                                            url: sub.attachmentUrl!,
                                            filename: sub.attachmentName || 'Entrega de Alumno',
                                            title: `Entrega de ${sub.student?.user?.name || 'Alumno'}`,
                                          })
                                        }
                                        className="px-2.5 py-1 rounded bg-[#1B4D3E] hover:bg-[#236653] text-[#D8B155] text-xs font-semibold flex items-center gap-1 cursor-pointer"
                                      >
                                        <Eye className="w-3 h-3" />
                                        <span>Vista Previa</span>
                                      </button>

                                      <a
                                        href={sub.attachmentUrl}
                                        download={sub.attachmentName || 'entrega-alumno'}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="text-xs text-[#A8B2A6] hover:text-white flex items-center gap-1"
                                      >
                                        <Download className="w-3 h-3" /> Descargar
                                      </a>
                                    </div>
                                  </div>
                                )}

                                {sub.feedback && (
                                  <div className="text-xs text-[#A8B2A6] bg-[#121E17] rounded-lg p-3 border border-[#2B3E34]">
                                    <span className="font-bold text-[#D8B155]">Retroalimentación del Maestro: </span>
                                    {sub.feedback}
                                  </div>
                                )}

                                <div className="flex flex-wrap gap-2 items-center pt-1 border-t border-[#1C3328]">
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
                                    className="w-24 px-3 py-1.5 rounded-lg bg-[#121E17] border border-[#2B3E34] text-white text-xs focus:outline-none focus:border-[#D8B155] font-bold"
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
                                    placeholder="Escribe la retroalimentación técnica pedagógica..."
                                    className="flex-1 min-w-[200px] px-3 py-1.5 rounded-lg bg-[#121E17] border border-[#2B3E34] text-white text-xs focus:outline-none focus:border-[#D8B155]"
                                  />
                                  <button
                                    onClick={() => handleGrade(sub.id)}
                                    disabled={submittingGrade === sub.id}
                                    className="px-4 py-1.5 rounded-lg bg-[#D8B155] text-[#0B1510] text-xs font-bold hover:bg-[#E8C865] transition disabled:opacity-60 cursor-pointer shadow"
                                  >
                                    {submittingGrade === sub.id ? 'Guardando...' : 'Calificar'}
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

      {/* Modal Tecnológico para Vista Previa de Documentos (PDF, Imágenes, etc.) */}
      {previewDoc && (
        <DocumentPreviewModal
          url={previewDoc.url}
          filename={previewDoc.filename}
          title={previewDoc.title}
          isOpen={true}
          onClose={() => setPreviewDoc(null)}
        />
      )}
    </div>
  );
}
