import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/lib/auth-options';
import { prisma } from '@/lib/db';
import { z } from 'zod';

export const dynamic = 'force-dynamic';

const productSchema = z.object({
  name: z.string().min(2, 'El nombre debe tener al menos 2 caracteres.'),
  slug: z.string().min(2, 'El slug es requerido.').regex(/^[a-z0-9-]+$/, 'El slug solo puede contener letras minúsculas, números y guiones.'),
  sku: z.string().min(1, 'El SKU es requerido.'),
  description: z.string().min(10, 'La descripción debe tener al menos 10 caracteres.'),
  shortDescription: z.string().optional(),
  price: z.number().positive('El precio debe ser mayor a 0.'),
  compareAtPrice: z.number().positive().optional().nullable(),
  categoryId: z.string().min(1, 'Selecciona una categoría.'),
  isPublished: z.boolean().default(true),
  isAcademyRecommended: z.boolean().default(false),
  masterComment: z.string().optional().nullable(),
  imageUrl: z.string().optional().nullable(),
  // Variante principal
  variantName: z.string().default('Estándar'),
  variantSku: z.string().optional(),
  variantPrice: z.number().positive().optional().nullable(),
  variantStock: z.number().int().min(0).default(0),
});

async function requireAdmin(req: Request) {
  const session = await getServerSession(authOptions);
  const role = (session?.user as any)?.role;
  if (!session || !['ADMIN', 'SUPERADMIN'].includes(role)) {
    return null;
  }
  return session;
}

// GET /api/admin/productos — lista todos los productos
export async function GET(req: Request) {
  const session = await requireAdmin(req);
  if (!session) return NextResponse.json({ error: 'No autorizado.' }, { status: 401 });

  try {
    const products = await prisma.product.findMany({
      include: {
        category: true,
        images: { take: 1, orderBy: { sortOrder: 'asc' } },
        variants: true,
      },
      orderBy: { createdAt: 'desc' },
    });
    return NextResponse.json({ products });
  } catch (error) {
    console.error('[Admin/Productos GET]', error);
    return NextResponse.json({ error: 'Error al obtener productos.' }, { status: 500 });
  }
}

// POST /api/admin/productos — crea un nuevo producto
export async function POST(req: Request) {
  const session = await requireAdmin(req);
  if (!session) return NextResponse.json({ error: 'No autorizado.' }, { status: 401 });

  try {
    const body = await req.json();
    const parsed = productSchema.safeParse(body);

    if (!parsed.success) {
      const msg = parsed.error.issues[0]?.message || 'Datos inválidos.';
      return NextResponse.json({ error: msg }, { status: 400 });
    }

    const {
      name, slug, sku, description, shortDescription,
      price, compareAtPrice, categoryId, isPublished,
      isAcademyRecommended, masterComment, imageUrl,
      variantName, variantSku, variantPrice, variantStock,
    } = parsed.data;

    // Verificar slug y sku únicos
    const [existingSlug, existingSku] = await Promise.all([
      prisma.product.findUnique({ where: { slug } }),
      prisma.product.findUnique({ where: { sku } }),
    ]);
    if (existingSlug) return NextResponse.json({ error: 'Ya existe un producto con ese slug.' }, { status: 409 });
    if (existingSku) return NextResponse.json({ error: 'Ya existe un producto con ese SKU.' }, { status: 409 });

    const finalVariantSku = variantSku || `${sku}-STD`;
    const existingVariantSku = await prisma.productVariant.findUnique({ where: { sku: finalVariantSku } });
    if (existingVariantSku) return NextResponse.json({ error: 'El SKU de variante ya está en uso.' }, { status: 409 });

    const product = await prisma.product.create({
      data: {
        name,
        slug,
        sku,
        description,
        shortDescription: shortDescription || null,
        price,
        compareAtPrice: compareAtPrice || null,
        categoryId,
        isPublished,
        isAcademyRecommended,
        masterComment: masterComment || null,
        images: imageUrl ? {
          create: { url: imageUrl, alt: name, sortOrder: 0 },
        } : undefined,
        variants: {
          create: {
            name: variantName || 'Estándar',
            sku: finalVariantSku,
            price: variantPrice || price,
            stock: variantStock || 0,
          },
        },
      },
      include: { images: true, variants: true, category: true },
    });

    return NextResponse.json({ product, message: 'Producto creado exitosamente.' }, { status: 201 });
  } catch (error: any) {
    console.error('[Admin/Productos POST]', error);
    return NextResponse.json({ error: 'Error interno al crear el producto.' }, { status: 500 });
  }
}

// PATCH /api/admin/productos — actualiza publicación o datos básicos
export async function PATCH(req: Request) {
  const session = await requireAdmin(req);
  if (!session) return NextResponse.json({ error: 'No autorizado.' }, { status: 401 });

  try {
    const { id, isPublished, stock, ...rest } = await req.json();
    if (!id) return NextResponse.json({ error: 'ID de producto requerido.' }, { status: 400 });

    const updated = await prisma.product.update({
      where: { id },
      data: {
        ...(isPublished !== undefined && { isPublished }),
        ...(rest.price !== undefined && { price: rest.price }),
        ...(rest.name !== undefined && { name: rest.name }),
      },
    });
    return NextResponse.json({ product: updated });
  } catch (error) {
    return NextResponse.json({ error: 'Error al actualizar producto.' }, { status: 500 });
  }
}

// DELETE /api/admin/productos — elimina un producto
export async function DELETE(req: Request) {
  const session = await requireAdmin(req);
  if (!session) return NextResponse.json({ error: 'No autorizado.' }, { status: 401 });

  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get('id');
    if (!id) return NextResponse.json({ error: 'ID de producto requerido.' }, { status: 400 });

    await prisma.product.delete({ where: { id } });
    return NextResponse.json({ message: 'Producto eliminado.' });
  } catch (error) {
    return NextResponse.json({ error: 'Error al eliminar producto.' }, { status: 500 });
  }
}
