import { NextRequest, NextResponse } from 'next/server';
import { getToken } from 'next-auth/jwt';
import { createClient } from '@supabase/supabase-js';

// Bucket público en Supabase Storage
const BUCKET = 'alekhins-files';

// Cliente admin (server-side) con service_role
function getSupabaseAdmin() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !serviceKey) {
    throw new Error('Supabase env vars missing: NEXT_PUBLIC_SUPABASE_URL / SUPABASE_SERVICE_ROLE_KEY');
  }
  return createClient(url, serviceKey, {
    auth: { persistSession: false },
  });
}

// 10 MB límite
const MAX_SIZE_BYTES = 10 * 1024 * 1024;

// Tipos de archivo permitidos
const ALLOWED_MIME = new Set([
  'image/jpeg',
  'image/png',
  'image/webp',
  'image/gif',
  'application/pdf',
  'application/vnd.chess-pgn',
  'text/plain',
  // PGN como texto
  'application/octet-stream',
]);

export async function POST(req: NextRequest) {
  // 1. Autenticación — solo usuarios logueados
  const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });
  if (!token?.sub) {
    return NextResponse.json({ error: 'No autenticado.' }, { status: 401 });
  }

  // 2. Parsear multipart
  let formData: FormData;
  try {
    formData = await req.formData();
  } catch {
    return NextResponse.json({ error: 'Formato inválido. Usa multipart/form-data.' }, { status: 400 });
  }

  const file = formData.get('file') as File | null;
  const folder = (formData.get('folder') as string) || 'misc';

  if (!file) {
    return NextResponse.json({ error: 'Campo "file" requerido.' }, { status: 400 });
  }

  // 3. Validaciones
  if (file.size > MAX_SIZE_BYTES) {
    return NextResponse.json({ error: 'El archivo excede el límite de 10 MB.' }, { status: 413 });
  }

  if (!ALLOWED_MIME.has(file.type)) {
    return NextResponse.json(
      { error: `Tipo de archivo no permitido: ${file.type}` },
      { status: 415 }
    );
  }

  // Carpetas permitidas (whitelist)
  const ALLOWED_FOLDERS = ['tareas', 'partidas', 'avatars', 'misc'];
  if (!ALLOWED_FOLDERS.includes(folder)) {
    return NextResponse.json({ error: 'Carpeta de destino inválida.' }, { status: 400 });
  }

  // 4. Generar ruta única en Storage
  const ext = file.name.split('.').pop() || 'bin';
  const safeFileName = file.name.replace(/[^a-zA-Z0-9._-]/g, '_');
  const timestamp = Date.now();
  const userId = token.sub;
  const storagePath = `${folder}/${userId}/${timestamp}_${safeFileName}`;

  // 5. Subir a Supabase Storage
  const supabase = getSupabaseAdmin();
  const arrayBuffer = await file.arrayBuffer();
  const buffer = Buffer.from(arrayBuffer);

  const { error: uploadError } = await supabase.storage
    .from(BUCKET)
    .upload(storagePath, buffer, {
      contentType: file.type,
      upsert: false,
    });

  if (uploadError) {
    console.error('[/api/upload] Supabase upload error:', uploadError);

    // Si el bucket no existe, devolver mensaje claro
    if (uploadError.message?.includes('Bucket not found')) {
      return NextResponse.json(
        {
          error:
            'El bucket de almacenamiento "alekhins-files" no existe en Supabase. Créalo desde el Dashboard → Storage.',
        },
        { status: 503 }
      );
    }

    return NextResponse.json(
      { error: `Error al subir el archivo: ${uploadError.message}` },
      { status: 500 }
    );
  }

  // 6. Obtener URL pública
  const { data: publicUrlData } = supabase.storage
    .from(BUCKET)
    .getPublicUrl(storagePath);

  return NextResponse.json(
    {
      url: publicUrlData.publicUrl,
      path: storagePath,
      name: file.name,
      size: file.size,
      type: file.type,
    },
    { status: 201 }
  );
}
