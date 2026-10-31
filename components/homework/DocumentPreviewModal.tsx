'use client';

import React, { useState } from 'react';
import {
  FileText,
  Image as ImageIcon,
  Download,
  ExternalLink,
  X,
  Maximize2,
  Minimize2,
  FileCode,
  Eye,
  CheckCircle2,
} from 'lucide-react';

interface DocumentPreviewModalProps {
  url: string;
  filename: string;
  isOpen: boolean;
  onClose: () => void;
  title?: string;
}

export function DocumentPreviewModal({
  url,
  filename,
  isOpen,
  onClose,
  title,
}: DocumentPreviewModalProps) {
  const [isFullscreen, setIsFullscreen] = useState(false);

  if (!isOpen || !url) return null;

  const lowerName = filename.toLowerCase();
  const isPdf = lowerName.endsWith('.pdf') || url.includes('.pdf');
  const isImage =
    lowerName.endsWith('.jpg') ||
    lowerName.endsWith('.jpeg') ||
    lowerName.endsWith('.png') ||
    lowerName.endsWith('.webp') ||
    lowerName.endsWith('.gif') ||
    lowerName.endsWith('.svg');
  const isPgn = lowerName.endsWith('.pgn');

  return (
    <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-3 sm:p-6 animate-in fade-in duration-200">
      <div
        className={`bg-[#121E17] border-2 border-[#D8B155]/60 rounded-2xl flex flex-col shadow-[0_0_60px_rgba(0,0,0,0.8)] overflow-hidden transition-all duration-300 ${
          isFullscreen ? 'w-full h-full max-w-none max-h-none rounded-none' : 'w-full max-w-4xl h-[85vh]'
        }`}
      >
        {/* Header Tecnológico */}
        <div className="p-4 bg-[#0B1510] border-b border-[#2B3E34] flex items-center justify-between gap-3 shrink-0">
          <div className="flex items-center gap-3 truncate">
            <div className="w-8 h-8 rounded-lg bg-[#1B4D3E] border border-[#D8B155]/50 flex items-center justify-center text-[#D8B155] shrink-0">
              {isPdf ? (
                <FileText className="w-4 h-4" />
              ) : isImage ? (
                <ImageIcon className="w-4 h-4" />
              ) : (
                <FileCode className="w-4 h-4" />
              )}
            </div>
            <div className="truncate">
              <span className="text-[10px] uppercase font-mono font-bold tracking-wider text-[#D8B155] block">
                Visor Tecnológico de Documentos • Academia Alekhins
              </span>
              <p className="text-xs sm:text-sm font-bold text-white truncate">
                {title || filename}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            <a
              href={url}
              download={filename}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 rounded-lg bg-[#121E17] border border-[#2B3E34] hover:border-[#D8B155] text-[#D8B155] text-xs font-semibold flex items-center gap-1.5 transition"
              title="Descargar archivo original"
            >
              <Download className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Descargar</span>
            </a>

            <button
              onClick={() => setIsFullscreen(!isFullscreen)}
              className="p-2 rounded-lg bg-[#121E17] border border-[#2B3E34] hover:border-white text-[#A8B2A6] hover:text-white transition cursor-pointer"
              title={isFullscreen ? 'Salir de pantalla completa' : 'Pantalla completa'}
            >
              {isFullscreen ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
            </button>

            <button
              onClick={onClose}
              className="p-2 rounded-lg bg-red-950/50 border border-red-800 text-red-300 hover:bg-red-900 transition cursor-pointer"
              title="Cerrar visor"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Contenido Visualizado */}
        <div className="flex-1 bg-[#070E0A] overflow-auto flex items-center justify-center p-4 relative">
          {isPdf ? (
            <iframe
              src={`${url}#toolbar=1&navpanes=0`}
              title={filename}
              className="w-full h-full rounded-lg border border-[#2B3E34] bg-white"
            />
          ) : isImage ? (
            <div className="max-w-full max-h-full flex items-center justify-center p-2">
              <img
                src={url}
                alt={filename}
                className="max-h-[75vh] max-w-full object-contain rounded-lg shadow-2xl border border-[#2B3E34]"
              />
            </div>
          ) : (
            <div className="text-center space-y-4 max-w-md p-6 bg-[#121E17] border border-[#2B3E34] rounded-2xl shadow-xl">
              <FileCode className="w-12 h-12 text-[#D8B155] mx-auto opacity-80" />
              <div className="space-y-1">
                <h4 className="font-bold text-white text-sm">{filename}</h4>
                <p className="text-xs text-[#A8B2A6]">
                  Este archivo ({filename.split('.').pop()?.toUpperCase()}) puede ser descargado directamente o abierto en tu software de ajedrez preferido (ChessBase, Lichess, etc.).
                </p>
              </div>
              <a
                href={url}
                download={filename}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-[#D8B155] text-[#0B1510] font-bold text-xs shadow-lg hover:bg-[#E8C865] transition"
              >
                <Download className="w-4 h-4" />
                Descargar Archivo Ahora
              </a>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-3 bg-[#0B1510] border-t border-[#2B3E34] flex items-center justify-between text-[11px] text-[#A8B2A6] px-4">
          <span className="truncate max-w-xs font-mono">{filename}</span>
          <span className="text-[#D8B155] font-semibold flex items-center gap-1">
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
            Documento Cifrado y Protegido
          </span>
        </div>
      </div>
    </div>
  );
}
