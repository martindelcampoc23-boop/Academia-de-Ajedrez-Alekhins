import React from 'react';
import Link from 'next/link';
import { prisma } from '@/lib/db';
import { BookOpen, Video, FileCode, Calendar, ArrowLeft, Download, CheckCircle } from 'lucide-react';

export const metadata = {
  title: 'Área del Alumno | Academia Alekhins',
};

export default async function StudentAcademyPage() {
  let videos: any[] = [];
  try {
    videos = await prisma.video.findMany({ take: 3 });
  } catch (error) {
    console.warn('⚠️ [StudentAcademyPage] Database query fallback:', error);
  }

  return (
    <div className="max-w-6xl mx-auto px-4 py-12 space-y-10">
      <Link href="/mi-cuenta" className="text-xs text-champagne hover:underline inline-flex items-center gap-1">
        <ArrowLeft className="w-3.5 h-3.5" /> Volver a Mi Cuenta
      </Link>

      <div className="border-b border-stone-border pb-4 flex justify-between items-end">
        <div>
          <span className="text-xs uppercase font-bold tracking-widest text-champagne block">
            Campus Virtual
          </span>
          <h1 className="font-serif-editorial text-2xl md:text-4xl font-bold text-ivory">
            Área Privada del Alumno
          </h1>
        </div>
      </div>

      {/* Próxima Clase Live Alert */}
      <div className="card-carbon p-6 border-champagne bg-walnut/20 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="space-y-1">
          <span className="text-[10px] font-extrabold uppercase px-2 py-0.5 bg-champagne text-carbon-dark rounded">
            En Vivo Próximamente
          </span>
          <h3 className="font-serif-editorial text-lg font-bold text-ivory">
            Clase en Vivo: Estrategias de Peón Aislado (IQP)
          </h3>
          <p className="text-xs text-ivory-muted">
            Profesor: MI Roberto Martín del Campo • Jueves 20 de Agosto, 18:00 hrs (CDMX)
          </p>
        </div>
        <a
          href="https://zoom.us"
          target="_blank"
          rel="noreferrer"
          className="btn-champagne text-xs px-5 py-2.5 shrink-0"
        >
          Unirse a Clase Zoom
        </a>
      </div>

      {/* Grid Features */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Column: Videoteca Accesible */}
        <div className="lg:col-span-8 space-y-6">
          <h2 className="font-serif-editorial text-xl font-bold text-ivory">Lecciones & Videoteca Asignada</h2>
          <div className="space-y-4">
            {videos.map((v) => (
              <div key={v.id} className="card-carbon p-4 flex gap-4 items-center">
                <img src={v.thumbnail} alt="" className="w-24 h-16 bg-carbon-dark rounded object-cover border border-stone-border shrink-0" />
                <div className="flex-1">
                  <span className="text-[10px] text-champagne font-bold uppercase">{v.level}</span>
                  <h4 className="font-serif-editorial text-sm font-bold text-ivory">{v.title}</h4>
                  <p className="text-xs text-ivory-dim">{v.durationMinutes} min • Prof. {v.instructorName}</p>
                </div>
                <Link href="/videos" className="btn-outline-gold text-xs px-3 py-1.5 shrink-0">
                  Ver Lección
                </Link>
              </div>
            ))}
          </div>
        </div>

        {/* Right Column: Materiales & PGN */}
        <div className="lg:col-span-4 space-y-6">
          <h2 className="font-serif-editorial text-xl font-bold text-ivory">Bases de Datos & PGN</h2>
          <div className="card-carbon p-6 space-y-4 text-xs text-ivory-muted">
            <div className="flex items-center justify-between border-b border-stone-border pb-3">
              <div>
                <strong className="text-ivory block">Repertorio e4 Blancas.pgn</strong>
                <span className="text-[11px] text-ivory-dim">Actualizado hace 3 días</span>
              </div>
              <button className="p-2 text-champagne hover:bg-carbon-dark rounded border border-stone-border">
                <Download className="w-4 h-4" />
              </button>
            </div>

            <div className="flex items-center justify-between">
              <div>
                <strong className="text-ivory block">Táctica_Semana_12.pgn</strong>
                <span className="text-[11px] text-ivory-dim">24 Ejercicios de cálculo</span>
              </div>
              <button className="p-2 text-champagne hover:bg-carbon-dark rounded border border-stone-border">
                <Download className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
