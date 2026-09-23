/**
 * Utilidad de efectos de audio de la Academia de Ajedrez Alekhins
 * Sintetiza el sonido característico de una pieza de ajedrez Staunton de madera noble
 * al colocarse sobre el tablero (impacto acústico + resonancia dorada armónica),
 * utilizando la Web Audio API nativa del navegador.
 *
 * Ventajas:
 * - Cero latencia (reproducción instantánea)
 * - Cero dependencias de archivos externos o peticiones HTTP
 * - Funciona en navegadores de escritorio y móviles
 */

let sharedAudioCtx: AudioContext | null = null;

function getAudioContext(): AudioContext | null {
  if (typeof window === 'undefined') return null;
  try {
    const AudioCtx = window.AudioContext || (window as any).webkitAudioContext;
    if (!AudioCtx) return null;
    if (!sharedAudioCtx || sharedAudioCtx.state === 'closed') {
      sharedAudioCtx = new AudioCtx();
    }
    if (sharedAudioCtx.state === 'suspended') {
      sharedAudioCtx.resume();
    }
    return sharedAudioCtx;
  } catch {
    return null;
  }
}

export function playLogoClickSound() {
  try {
    const ctx = getAudioContext();
    if (!ctx) return;

    const now = ctx.currentTime;

    // 1. IMPACTO DE PIEZA DE AJEDREZ DE MADERA (Golpe cuerpo grave)
    const bodyOsc = ctx.createOscillator();
    const bodyGain = ctx.createGain();
    bodyOsc.type = 'triangle';
    bodyOsc.frequency.setValueAtTime(240, now);
    bodyOsc.frequency.exponentialRampToValueAtTime(70, now + 0.07);

    bodyGain.gain.setValueAtTime(0.45, now);
    bodyGain.gain.exponentialRampToValueAtTime(0.001, now + 0.07);

    bodyOsc.connect(bodyGain);
    bodyGain.connect(ctx.destination);

    bodyOsc.start(now);
    bodyOsc.stop(now + 0.075);

    // 2. CLIC MECÁNICO DE IMPACTO (Transient de madera / tap)
    const bufferSize = Math.floor(ctx.sampleRate * 0.03);
    const clickBuffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
    const channelData = clickBuffer.getChannelData(0);
    for (let i = 0; i < bufferSize; i++) {
      channelData[i] = (Math.random() * 2 - 1) * Math.exp(-i / (ctx.sampleRate * 0.005));
    }

    const noiseSource = ctx.createBufferSource();
    noiseSource.buffer = clickBuffer;

    const noiseFilter = ctx.createBiquadFilter();
    noiseFilter.type = 'bandpass';
    noiseFilter.frequency.setValueAtTime(1400, now);
    noiseFilter.Q.setValueAtTime(3.0, now);

    const noiseGain = ctx.createGain();
    noiseGain.gain.setValueAtTime(0.3, now);
    noiseGain.gain.exponentialRampToValueAtTime(0.001, now + 0.03);

    noiseSource.connect(noiseFilter);
    noiseFilter.connect(noiseGain);
    noiseGain.connect(ctx.destination);

    noiseSource.start(now);

    // 3. RESONANCIA ARMÓNICA DORADA DE LA ACADEMIA (Campanilla suave y sutil)
    const chimeOsc1 = ctx.createOscillator();
    const chimeOsc2 = ctx.createOscillator();
    const chimeGain = ctx.createGain();

    chimeOsc1.type = 'sine';
    chimeOsc1.frequency.setValueAtTime(587.33, now + 0.015); // D5
    chimeOsc2.type = 'sine';
    chimeOsc2.frequency.setValueAtTime(880.0, now + 0.015);  // A5

    chimeGain.gain.setValueAtTime(0.0001, now);
    chimeGain.gain.setValueAtTime(0.12, now + 0.02);
    chimeGain.gain.exponentialRampToValueAtTime(0.0001, now + 0.35);

    chimeOsc1.connect(chimeGain);
    chimeOsc2.connect(chimeGain);
    chimeGain.connect(ctx.destination);

    chimeOsc1.start(now + 0.015);
    chimeOsc2.start(now + 0.015);
    chimeOsc1.stop(now + 0.36);
    chimeOsc2.stop(now + 0.36);
  } catch (err) {
    // Si el navegador tiene políticas restrictivas o no soporta audio, continúa en silencio sin interrumpir
    console.debug('Error en efecto de sonido:', err);
  }
}
