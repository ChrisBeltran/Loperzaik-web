export interface Producto {
  id: string;
  slug: string;
  nombre: string;
  descripcion: string;
  descripcionLarga?: string;
  precio: number;
  precioAnterior?: number;
  imagen: string;
  imagenes: string[];
  video?: string;
  videoThumbnail?: string;
  categoria: string;
  subcategoria: string;
  marca: string;
  stock: number;
  rating: number;
  reviews: number;
  etiquetas: string[];
  especificaciones: Record<string, string>;
  destacado: boolean;
  oferta: boolean;
}

export interface Categoria {
  id: string;
  nombre: string;
  imagen: string;
  descripcion: string;
  subcategorias: string[];
}

export interface Post {
  slug: string;
  titulo: string;
  resumen: string;
  contenido: string;
  imagen: string;
  categoria: string;
  fecha: string;
  autor: string;
  tiempoLectura: number;
  etiquetas: string[];
}

export interface CartItem {
  producto: Producto;
  cantidad: number;
}
