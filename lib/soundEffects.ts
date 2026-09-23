/**
 * Utilidad de sonido oficial de la Academia de Ajedrez Alekhins
 * Reproduce el auténtico sonido acústico real de una pieza de ajedrez Staunton
 * de madera noble al ser movida sobre el tablero de torneo.
 *
 * Características:
 * - Grabación orgánica real (sin sintetizadores electrónicos ni pitidos artificiales)
 * - Pool de audio pre-cargado para reproducción instantánea con 0 latencia
 * - Soporte para clics rápidos consecutivos sin saturación
 */

const AUDIO_SRC = '/sounds/chess-move.mp3';

let audioPool: HTMLAudioElement[] = [];
let poolIndex = 0;
const POOL_SIZE = 3;

function initPool() {
  if (typeof window === 'undefined') return;
  if (audioPool.length > 0) return;

  try {
    for (let i = 0; i < POOL_SIZE; i++) {
      const audio = new Audio(AUDIO_SRC);
      audio.preload = 'auto';
      audio.volume = 0.75;
      audioPool.push(audio);
    }
  } catch {
    // Silencio seguro si el entorno no permite Audio
  }
}

// Inicialización temprana en el cliente
if (typeof window !== 'undefined') {
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initPool, { once: true });
  } else {
    initPool();
  }
}

export function playLogoClickSound() {
  if (typeof window === 'undefined') return;

  try {
    if (audioPool.length === 0) {
      initPool();
    }

    if (audioPool.length > 0) {
      const audio = audioPool[poolIndex];
      poolIndex = (poolIndex + 1) % audioPool.length;

      audio.currentTime = 0;
      audio.volume = 0.75;
      const promise = audio.play();
      if (promise !== undefined) {
        promise.catch(() => {
          // Si el navegador requiere interacción directa previa, creamos fallback instantáneo
          const fallback = new Audio(AUDIO_SRC);
          fallback.volume = 0.75;
          fallback.play().catch(() => {});
        });
      }
    } else {
      const fallback = new Audio(AUDIO_SRC);
      fallback.volume = 0.75;
      fallback.play().catch(() => {});
    }
  } catch (err) {
    console.debug('Audio playback note:', err);
  }
}
