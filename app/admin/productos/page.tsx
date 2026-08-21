'use client';

import React, { useState, useEffect, useCallback } from 'react';
import Link from 'next/link';
import {
  Package, Plus, Pencil, Trash2, Eye, EyeOff,
  AlertCircle, CheckCircle2, Search, RefreshCw,
  ArrowLeft, Star, Layers, Tag
} from 'lucide-react';

interface ProductVariant {
  id: string;
  name: string;
  sku: string;
  price: number;
  stock: number;
}

interface Category {
  id: string;
  name: string;
  slug: string;
}

interface Product {
  id: string;
  name: string;
  slug: string;
  sku: string;
  price: number;
  compareAtPrice?: number | null;
  isPublished: boolean;
  isAcademyRecommended: boolean;
  categoryId: string;
  category: Category;
  variants: ProductVariant[];
  images: { url: string; alt?: string }[];
  createdAt: string;
}

const EMPTY_FORM = {
  name: '',
  slug: '',
  sku: '',
  description: '',
  shortDescription: '',
  price: '',
  compareAtPrice: '',
  categoryId: '',
  isPublished: true,
  isAcademyRecommended: false,
  masterComment: '',
  imageUrl: '',
  variantName: 'Estándar',
  variantSku: '',
  variantPrice: '',
  variantStock: '0',
};

export default function AdminProductosPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [search, setSearch] = useState('');
  const [form, setForm] = useState(EMPTY_FORM);
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  const fetchData = useCallback(async () => {
    setLoading(true);
    try {
      const [prodRes, catRes] = await Promise.all([
        fetch('/api/admin/productos'),
        fetch('/api/admin/categorias'),
      ]);
      const prodData = await prodRes.json();
      if (prodData.products) setProducts(prodData.products);

      // Fallback: si no hay ruta de categorías, las extraemos de los productos
      if (catRes.ok) {
        const catData = await catRes.json();
        if (catData.categories) setCategories(catData.categories);
      } else {
        // Extraer categorías únicas de los productos cargados
        const cats = prodData.products?.map((p: Product) => p.category).filter(Boolean) ?? [];
        const uniqueCats = Array.from(new Map(cats.map((c: Category) => [c.id, c])).values()) as Category[];
        setCategories(uniqueCats);
      }
    } catch {
      setMessage({ type: 'error', text: 'Error al cargar los datos.' });
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { fetchData(); }, [fetchData]);

  // Auto-generar slug desde el nombre
  const handleNameChange = (val: string) => {
    const slug = val.toLowerCase().trim()
      .replace(/[áàä]/g, 'a').replace(/[éèë]/g, 'e')
      .replace(/[íìï]/g, 'i').replace(/[óòö]/g, 'o')
      .replace(/[úùü]/g, 'u').replace(/ñ/g, 'n')
      .replace(/[^a-z0-9\s-]/g, '').replace(/\s+/g, '-').replace(/-+/g, '-');
    setForm(f => ({ ...f, name: val, slug }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setMessage(null);
    try {
      const res = await fetch('/api/admin/productos', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...form,
          price: parseFloat(form.price),
          compareAtPrice: form.compareAtPrice ? parseFloat(form.compareAtPrice) : null,
          variantPrice: form.variantPrice ? parseFloat(form.variantPrice) : null,
          variantStock: parseInt(form.variantStock),
          imageUrl: form.imageUrl || null,
          shortDescription: form.shortDescription || null,
          masterComment: form.masterComment || null,
          variantSku: form.variantSku || null,
        }),
      });
      const data = await res.json();
      if (!res.ok) {
        setMessage({ type: 'error', text: data.error || 'Error al crear producto.' });
      } else {
        setMessage({ type: 'success', text: `✅ Producto "${data.product.name}" creado exitosamente.` });
        setForm(EMPTY_FORM);
        setShowForm(false);
        fetchData();
      }
    } catch {
      setMessage({ type: 'error', text: 'Error de conexión.' });
    } finally {
      setSubmitting(false);
    }
  };

  const togglePublish = async (id: string, current: boolean) => {
    const res = await fetch('/api/admin/productos', {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id, isPublished: !current }),
    });
    if (res.ok) {
      setProducts(ps => ps.map(p => p.id === id ? { ...p, isPublished: !current } : p));
    }
  };

  const deleteProduct = async (id: string, name: string) => {
    if (!confirm(`¿Eliminar el producto "${name}"? Esta acción no se puede deshacer.`)) return;
    const res = await fetch(`/api/admin/productos?id=${id}`, { method: 'DELETE' });
    if (res.ok) {
      setProducts(ps => ps.filter(p => p.id !== id));
      setMessage({ type: 'success', text: 'Producto eliminado.' });
    } else {
      setMessage({ type: 'error', text: 'Error al eliminar el producto.' });
    }
  };

  const filtered = products.filter(p =>
    p.name.toLowerCase().includes(search.toLowerCase()) ||
    p.sku.toLowerCase().includes(search.toLowerCase()) ||
    p.category?.name?.toLowerCase().includes(search.toLowerCase())
  );

  const totalStock = products.reduce((acc, p) =>
    acc + p.variants.reduce((a, v) => a + v.stock, 0), 0
  );

  return (
    <div className="max-w-7xl mx-auto px-4 py-10 space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-stone-border pb-6">
        <div>
          <Link href="/admin" className="inline-flex items-center gap-1 text-xs text-ivory-dim hover:text-champagne mb-2 transition">
            <ArrowLeft className="w-3.5 h-3.5" /> Panel Admin
          </Link>
          <h1 className="font-serif-editorial text-3xl font-bold text-ivory flex items-center gap-3">
            <Package className="w-7 h-7 text-champagne" />
            Gestión de Productos
          </h1>
          <p className="text-xs text-ivory-dim mt-1">{products.length} productos · {totalStock} unidades en stock total</p>
        </div>
        <div className="flex gap-2">
          <button onClick={fetchData} className="btn-outline-gold py-2 px-3 flex items-center gap-2 text-xs">
            <RefreshCw className="w-3.5 h-3.5" /> Actualizar
          </button>
          <button
            onClick={() => { setShowForm(!showForm); setMessage(null); }}
            className="btn-champagne py-2 px-4 flex items-center gap-2 text-xs"
          >
            <Plus className="w-4 h-4" />
            {showForm ? 'Cancelar' : 'Nuevo Producto'}
          </button>
        </div>
      </div>

      {/* Mensaje de estado */}
      {message && (
        <div className={`p-3.5 rounded-lg border text-sm flex items-start gap-2.5 ${message.type === 'success'
          ? 'bg-emerald-950/50 border-emerald-800/60 text-emerald-200'
          : 'bg-red-950/50 border-red-800/60 text-red-200'}`}>
          {message.type === 'success'
            ? <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
            : <AlertCircle className="w-4 h-4 text-red-400 shrink-0 mt-0.5" />}
          {message.text}
        </div>
      )}

      {/* Formulario de nuevo producto */}
      {showForm && (
        <div className="card-carbon p-6 space-y-5 border-champagne/30">
          <h2 className="font-serif-editorial text-xl font-bold text-ivory flex items-center gap-2">
            <Plus className="w-5 h-5 text-champagne" /> Agregar Nuevo Producto
          </h2>
          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Información básica */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="block text-xs font-semibold text-ivory-muted">Nombre del Producto *</label>
                <input
                  required
                  value={form.name}
                  onChange={e => handleNameChange(e.target.value)}
                  placeholder="Ej. Tablero DGT Smart Board"
                  className="w-full px-3 py-2.5 rounded-lg bg-carbon-dark border border-stone-border text-ivory text-sm placeholder-ivory-dim focus:outline-none focus:border-champagne transition"
                />
              </div>
              <div className="space-y-1">
                <label className="block text-xs font-semibold text-ivory-muted">Slug (URL) *</label>
                <input
                  required
                  value={form.slug}
                  onChange={e => setForm(f => ({ ...f, slug: e.target.value }))}
                  placeholder="tablero-dgt-smart-board"
                  className="w-full px-3 py-2.5 rounded-lg bg-carbon-dark border border-stone-border text-ivory text-sm placeholder-ivory-dim focus:outline-none focus:border-champagne transition font-mono"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="space-y-1">
                <label className="block text-xs font-semibold text-ivory-muted">SKU del Producto *</label>
                <input
                  required
                  value={form.sku}
                  onChange={e => setForm(f => ({ ...f, sku: e.target.value.toUpperCase() }))}
                  placeholder="DGT-SMART-001"
                  className="w-full px-3 py-2.5 rounded-lg bg-carbon-dark border border-stone-border text-ivory text-sm placeholder-ivory-dim focus:outline-none focus:border-champagne transition font-mono"
                />
              </div>
              <div className="space-y-1">
                <label className="block text-xs font-semibold text-ivory-muted">Precio (MXN) *</label>
                <input
                  required
                  type="number"
                  step="0.01"
                  min="0"
                  value={form.price}
                  onChange={e => setForm(f => ({ ...f, price: e.target.value }))}
                  placeholder="1500.00"
                  className="w-full px-3 py-2.5 rounded-lg bg-carbon-dark border border-stone-border text-ivory text-sm placeholder-ivory-dim focus:outline-none focus:border-champagne transition"
                />
              </div>
              <div className="space-y-1">
                <label className="block text-xs font-semibold text-ivory-muted">Precio Tachado (opcional)</label>
                <input
                  type="number"
                  step="0.01"
                  min="0"
                  value={form.compareAtPrice}
                  onChange={e => setForm(f => ({ ...f, compareAtPrice: e.target.value }))}
                  placeholder="1800.00"
                  className="w-full px-3 py-2.5 rounded-lg bg-carbon-dark border border-stone-border text-ivory text-sm placeholder-ivory-dim focus:outline-none focus:border-champagne transition"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="block text-xs font-semibold text-ivory-muted">Categoría *</label>
                <select
                  required
                  value={form.categoryId}
                  onChange={e => setForm(f => ({ ...f, categoryId: e.target.value }))}
                  className="w-full px-3 py-2.5 rounded-lg bg-carbon-dark border border-stone-border text-ivory text-sm focus:outline-none focus:border-champagne transition"
                >
                  <option value="">— Selecciona categoría —</option>
                  {categories.map(c => (
                    <option key={c.id} value={c.id}>{c.name}</option>
                  ))}
                </select>
              </div>
              <div className="space-y-1">
                <label className="block text-xs font-semibold text-ivory-muted">URL de Imagen Principal</label>
                <input
                  type="url"
                  value={form.imageUrl}
                  onChange={e => setForm(f => ({ ...f, imageUrl: e.target.value }))}
                  placeholder="https://ejemplo.com/imagen.jpg"
                  className="w-full px-3 py-2.5 rounded-lg bg-carbon-dark border border-stone-border text-ivory text-sm placeholder-ivory-dim focus:outline-none focus:border-champagne transition"
                />
              </div>
            </div>

            <div className="space-y-1">
              <label className="block text-xs font-semibold text-ivory-muted">Descripción completa *</label>
              <textarea
                required
                rows={4}
                value={form.description}
                onChange={e => setForm(f => ({ ...f, description: e.target.value }))}
                placeholder="Describe el producto en detalle: características, materiales, dimensiones..."
                className="w-full px-3 py-2.5 rounded-lg bg-carbon-dark border border-stone-border text-ivory text-sm placeholder-ivory-dim focus:outline-none focus:border-champagne transition resize-none"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="block text-xs font-semibold text-ivory-muted">Descripción corta</label>
                <input
                  value={form.shortDescription}
                  onChange={e => setForm(f => ({ ...f, shortDescription: e.target.value }))}
                  placeholder="Resumen de 1 línea para listados..."
                  className="w-full px-3 py-2.5 rounded-lg bg-carbon-dark border border-stone-border text-ivory text-sm placeholder-ivory-dim focus:outline-none focus:border-champagne transition"
                />
              </div>
              <div className="space-y-1">
                <label className="block text-xs font-semibold text-ivory-muted">Comentario del Maestro (opcional)</label>
                <input
                  value={form.masterComment}
                  onChange={e => setForm(f => ({ ...f, masterComment: e.target.value }))}
                  placeholder="Recomendación especial del MI Roberto..."
                  className="w-full px-3 py-2.5 rounded-lg bg-carbon-dark border border-stone-border text-ivory text-sm placeholder-ivory-dim focus:outline-none focus:border-champagne transition"
                />
              </div>
            </div>

            {/* Variante principal */}
            <div className="bg-carbon-dark rounded-xl p-4 border border-stone-border space-y-3">
              <h3 className="text-xs font-bold text-champagne uppercase tracking-wide flex items-center gap-2">
                <Layers className="w-3.5 h-3.5" /> Variante Principal
              </h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                <div className="space-y-1">
                  <label className="block text-xs font-semibold text-ivory-dim">Nombre variante</label>
                  <input
                    value={form.variantName}
                    onChange={e => setForm(f => ({ ...f, variantName: e.target.value }))}
                    placeholder="Estándar"
                    className="w-full px-3 py-2 rounded-lg bg-[#0B1510] border border-stone-border text-ivory text-xs focus:outline-none focus:border-champagne transition"
                  />
                </div>
                <div className="space-y-1">
                  <label className="block text-xs font-semibold text-ivory-dim">SKU variante</label>
                  <input
                    value={form.variantSku}
                    onChange={e => setForm(f => ({ ...f, variantSku: e.target.value.toUpperCase() }))}
                    placeholder="Auto (SKU-STD)"
                    className="w-full px-3 py-2 rounded-lg bg-[#0B1510] border border-stone-border text-ivory text-xs font-mono focus:outline-none focus:border-champagne transition"
                  />
                </div>
                <div className="space-y-1">
                  <label className="block text-xs font-semibold text-ivory-dim">Precio variante</label>
                  <input
                    type="number"
                    step="0.01"
                    value={form.variantPrice}
                    onChange={e => setForm(f => ({ ...f, variantPrice: e.target.value }))}
                    placeholder="= precio prod."
                    className="w-full px-3 py-2 rounded-lg bg-[#0B1510] border border-stone-border text-ivory text-xs focus:outline-none focus:border-champagne transition"
                  />
                </div>
                <div className="space-y-1">
                  <label className="block text-xs font-semibold text-ivory-dim">Stock inicial *</label>
                  <input
                    required
                    type="number"
                    min="0"
                    value={form.variantStock}
                    onChange={e => setForm(f => ({ ...f, variantStock: e.target.value }))}
                    placeholder="0"
                    className="w-full px-3 py-2 rounded-lg bg-[#0B1510] border border-stone-border text-ivory text-xs focus:outline-none focus:border-champagne transition"
                  />
                </div>
              </div>
            </div>

            {/* Opciones */}
            <div className="flex flex-wrap gap-5 text-xs">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={form.isPublished}
                  onChange={e => setForm(f => ({ ...f, isPublished: e.target.checked }))}
                  className="w-4 h-4 accent-champagne"
                />
                <span className="text-ivory-muted">Publicado (visible en tienda)</span>
              </label>
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={form.isAcademyRecommended}
                  onChange={e => setForm(f => ({ ...f, isAcademyRecommended: e.target.checked }))}
                  className="w-4 h-4 accent-champagne"
                />
                <span className="text-ivory-muted">⭐ Recomendado por la Academia</span>
              </label>
            </div>

            <div className="flex gap-3 pt-2">
              <button
                type="submit"
                disabled={submitting}
                className="btn-champagne py-2.5 px-6 flex items-center gap-2 text-sm disabled:opacity-60"
              >
                {submitting ? 'Guardando...' : '✓ Guardar Producto'}
              </button>
              <button
                type="button"
                onClick={() => { setShowForm(false); setForm(EMPTY_FORM); }}
                className="btn-outline-gold py-2.5 px-4 text-sm"
              >
                Cancelar
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Buscador */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-ivory-dim" />
        <input
          value={search}
          onChange={e => setSearch(e.target.value)}
          placeholder="Buscar por nombre, SKU o categoría..."
          className="w-full pl-10 pr-4 py-2.5 rounded-lg bg-carbon-dark border border-stone-border text-ivory text-sm placeholder-ivory-dim focus:outline-none focus:border-champagne transition"
        />
      </div>

      {/* Lista de productos */}
      {loading ? (
        <div className="text-center py-16 text-ivory-dim text-sm">Cargando productos...</div>
      ) : filtered.length === 0 ? (
        <div className="text-center py-16 space-y-3">
          <Package className="w-12 h-12 text-ivory-dim mx-auto" />
          <p className="text-ivory-dim text-sm">
            {search ? 'No hay productos que coincidan con la búsqueda.' : 'No hay productos. ¡Crea el primero!'}
          </p>
          {!search && (
            <button onClick={() => setShowForm(true)} className="btn-champagne py-2 px-5 text-xs">
              <Plus className="w-3.5 h-3.5 inline mr-1" /> Agregar Producto
            </button>
          )}
        </div>
      ) : (
        <div className="space-y-3">
          <p className="text-xs text-ivory-dim">{filtered.length} productos encontrados</p>
          <div className="space-y-2">
            {filtered.map(product => {
              const totalVariantStock = product.variants.reduce((a, v) => a + v.stock, 0);
              const mainImage = product.images[0]?.url;
              return (
                <div
                  key={product.id}
                  className="card-carbon p-4 flex flex-col sm:flex-row sm:items-center gap-4 hover:border-champagne/30 transition"
                >
                  {/* Imagen */}
                  <div className="w-14 h-14 rounded-lg bg-carbon-dark border border-stone-border overflow-hidden shrink-0 flex items-center justify-center">
                    {mainImage ? (
                      <img src={mainImage} alt={product.name} className="w-full h-full object-cover" />
                    ) : (
                      <Package className="w-6 h-6 text-ivory-dim" />
                    )}
                  </div>

                  {/* Info */}
                  <div className="flex-1 min-w-0">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="font-serif-editorial font-bold text-ivory text-sm truncate">{product.name}</span>
                      {product.isAcademyRecommended && (
                        <span className="text-[10px] bg-amber-900/50 border border-amber-700/50 text-amber-300 px-1.5 py-0.5 rounded">
                          ⭐ Recomendado
                        </span>
                      )}
                      <span className={`text-[10px] px-1.5 py-0.5 rounded font-semibold border ${product.isPublished
                        ? 'bg-emerald-900/40 border-emerald-700/40 text-emerald-300'
                        : 'bg-stone-800/40 border-stone-600/40 text-stone-400'}`}>
                        {product.isPublished ? '● Publicado' : '○ Oculto'}
                      </span>
                    </div>
                    <div className="flex flex-wrap gap-3 mt-1 text-[11px] text-ivory-dim">
                      <span className="font-mono">SKU: {product.sku}</span>
                      <span className="flex items-center gap-1"><Tag className="w-3 h-3" />{product.category?.name}</span>
                      <span className="text-champagne font-semibold">${product.price.toFixed(2)} MXN</span>
                      <span className={totalVariantStock <= 5 ? 'text-amber-400 font-semibold' : ''}>
                        Stock: {totalVariantStock} uds.
                      </span>
                    </div>
                  </div>

                  {/* Acciones */}
                  <div className="flex items-center gap-2 shrink-0">
                    <Link
                      href={`/producto/${product.slug}`}
                      target="_blank"
                      className="p-2 rounded-lg bg-carbon-dark border border-stone-border text-ivory-dim hover:text-champagne hover:border-champagne/40 transition"
                      title="Ver en tienda"
                    >
                      <Eye className="w-3.5 h-3.5" />
                    </Link>
                    <button
                      onClick={() => togglePublish(product.id, product.isPublished)}
                      className="p-2 rounded-lg bg-carbon-dark border border-stone-border text-ivory-dim hover:text-champagne hover:border-champagne/40 transition"
                      title={product.isPublished ? 'Ocultar' : 'Publicar'}
                    >
                      {product.isPublished ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
                    </button>
                    <button
                      onClick={() => deleteProduct(product.id, product.name)}
                      className="p-2 rounded-lg bg-red-950/40 border border-red-800/40 text-red-400 hover:bg-red-900/60 transition"
                      title="Eliminar"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
