'use client';

import React, { useState } from 'react';
import { updateLeadStatusAction } from '@/lib/actions';

interface LeadStatusSelectorProps {
  leadId: string;
  initialStatus: string;
}

const STATUS_LABELS: Record<string, { label: string; colorClass: string }> = {
  NEW: { label: 'Nuevo', colorClass: 'bg-blue-900/60 text-blue-300 border-blue-500' },
  CONTACTED: { label: 'Contactado', colorClass: 'bg-yellow-900/60 text-yellow-300 border-yellow-500' },
  INTERESTED: { label: 'Interesado', colorClass: 'bg-purple-900/60 text-purple-300 border-purple-500' },
  ENROLLED: { label: 'Inscrito', colorClass: 'bg-emerald-900/60 text-emerald-300 border-emerald-500' },
  CLOSED_LOST: { label: 'No concretado', colorClass: 'bg-gray-800 text-gray-400 border-gray-600' },
};

export function LeadStatusSelector({ leadId, initialStatus }: LeadStatusSelectorProps) {
  const [status, setStatus] = useState(initialStatus || 'NEW');
  const [loading, setLoading] = useState(false);

  const handleStatusChange = async (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newStatus = e.target.value;
    setStatus(newStatus);
    setLoading(true);
    try {
      await updateLeadStatusAction(leadId, newStatus);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const currentConfig = STATUS_LABELS[status] || STATUS_LABELS.NEW;

  return (
    <div className="flex items-center gap-2">
      <select
        value={status}
        disabled={loading}
        onChange={handleStatusChange}
        className={`text-xs font-bold px-3 py-1 rounded-lg border focus:outline-none cursor-pointer ${currentConfig.colorClass}`}
      >
        <option value="NEW" className="bg-[#0F1D30] text-white">Nuevo</option>
        <option value="CONTACTED" className="bg-[#0F1D30] text-white">Contactado</option>
        <option value="INTERESTED" className="bg-[#0F1D30] text-white">Interesado</option>
        <option value="ENROLLED" className="bg-[#0F1D30] text-white">Inscrito</option>
        <option value="CLOSED_LOST" className="bg-[#0F1D30] text-white">No concretado</option>
      </select>
      {loading && <span className="text-[10px] text-[#C5A46D] animate-pulse">Guardando...</span>}
    </div>
  );
}

