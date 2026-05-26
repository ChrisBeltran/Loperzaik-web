import type { Post } from '@/types';

// ================================================================
// BLOG — ARTÍCULOS
// Para agregar un artículo nuevo, copia el template de abajo.
// El campo 'contenido' acepta HTML básico: <p>, <h2>, <ul>, <li>, <strong>
// ================================================================
export const posts: Post[] = [
  {
    slug: 'audifonos-con-cable-vs-inalambricos',
    titulo: 'Audífonos con cable vs inalámbricos: ¿cuál te conviene?',
    resumen: 'Te explicamos las diferencias reales entre audífonos con cable y Bluetooth para que elijas el que mejor se adapta a tu vida.',
    imagen: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800',
    categoria: 'Audio',
    fecha: '2026-01-15',
    autor: 'Loperzaik',
    tiempoLectura: 4,
    etiquetas: ['Audífonos', 'Bluetooth', 'Guía de compra'],
    contenido: `
      <p>Una de las preguntas más frecuentes al comprar audífonos es: ¿con cable o inalámbricos? Cada opción tiene sus ventajas y aquí te explicamos cuál es mejor según tu caso.</p>

      <h2>Audífonos con cable</h2>
      <p>Los audífonos con cable tienen una ventaja clara: <strong>nunca se quedan sin batería</strong>. Son perfectos para usar con el computador, estudiar o trabajar en casa. Además, su precio suele ser mucho más accesible.</p>
      <ul>
        <li>Sin preocupación por la batería</li>
        <li>Precio más económico</li>
        <li>Calidad de audio consistente</li>
        <li>Compatibles con cualquier dispositivo con entrada 3.5mm</li>
      </ul>

      <h2>Audífonos Bluetooth inalámbricos</h2>
      <p>Los audífonos Bluetooth te dan <strong>libertad de movimiento</strong>. Son ideales si los usas en el gym, en el transporte o caminando. Con tecnología Bluetooth 5.0 la conexión es estable y la batería puede durar hasta 20 horas.</p>
      <ul>
        <li>Sin cables que estorben</li>
        <li>Perfectos para hacer deporte</li>
        <li>Micrófono integrado para llamadas</li>
        <li>Se conectan a varios dispositivos</li>
      </ul>

      <h2>¿Cuál te conviene?</h2>
      <p>Si los usas principalmente en casa o en el trabajo con tu PC, los <strong>audífonos con cable</strong> son la opción más práctica y económica. Si eres de los que se mueven mucho o hacen deporte, los <strong>audífonos Bluetooth</strong> son la mejor inversión.</p>
      <p>En Loperzaik tenemos ambas opciones disponibles con envío a domicilio. ¡Escríbenos y te asesoramos!</p>
    `,
  },
  {
    slug: 'como-elegir-cargador-que-no-dane-tu-celular',
    titulo: '¿Cómo elegir un cargador que no dañe tu celular?',
    resumen: 'Usar un cargador de mala calidad puede dañar tu batería. Te enseñamos qué mirar antes de comprar uno.',
    imagen: 'https://images.unsplash.com/photo-1583863788434-e58a36330cf0?w=800',
    categoria: 'Cargadores',
    fecha: '2026-01-28',
    autor: 'Loperzaik',
    tiempoLectura: 3,
    etiquetas: ['Cargadores', 'Batería', 'Celular'],
    contenido: `
      <p>Un cargador de mala calidad no solo carga más lento — puede dañar la batería de tu celular con el tiempo o incluso ser peligroso. Aquí te decimos qué mirar al comprar uno.</p>

      <h2>Lo más importante: el amperaje</h2>
      <p>El amperaje (A) determina la velocidad de carga. Un cargador de <strong>1A</strong> carga lento, mientras que uno de <strong>2A</strong> carga el doble de rápido. Para la mayoría de celulares Android actuales, un cargador de 2A es ideal.</p>

      <h2>Voltaje universal</h2>
      <p>Busca cargadores con entrada <strong>100-240V</strong>. Esto significa que funcionan en cualquier toma eléctrica, incluso si viajas.</p>

      <h2>El cable también importa</h2>
      <p>Un buen cargador con un cable dañado no sirve de mucho. Los cables <strong>Micro USB</strong> son los más comunes en celulares Android. Asegúrate de que el cable sea para carga y datos, no solo para carga.</p>

      <h2>¿Qué evitar?</h2>
      <ul>
        <li>Cargadores sin marca con precio muy bajo</li>
        <li>Cables muy delgados o sin refuerzo en las puntas</li>
        <li>Cargadores que se calientan mucho</li>
      </ul>

      <p>En Loperzaik vendemos cargadores TC de 2A y cables Micro USB probados. <strong>Envío a domicilio</strong> y te asesoramos por WhatsApp.</p>
    `,
  },
  {
    slug: 'mejores-accesorios-pc-menos-50000-pesos',
    titulo: 'Los mejores accesorios para PC por menos de $50.000 en Colombia',
    resumen: 'Arma tu puesto de trabajo sin gastar una fortuna. Te mostramos los mejores accesorios para PC disponibles en Loperzaik.',
    imagen: 'https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=800',
    categoria: 'Accesorios PC',
    fecha: '2026-02-05',
    autor: 'Loperzaik',
    tiempoLectura: 4,
    etiquetas: ['Accesorios PC', 'Teclado', 'Mouse', 'USB'],
    contenido: `
      <p>Tener un buen puesto de trabajo no tiene que costar millones. Con menos de $50.000 pesos puedes conseguir accesorios de calidad que mejoran tu productividad todos los días.</p>

      <h2>Teclado USB — $35.000</h2>
      <p>Un teclado en español con conexión USB es todo lo que necesitas para trabajar cómodamente. Las teclas de membrana son silenciosas y cómodas para sesiones largas. Compatible con Windows, Mac y Linux sin instalar nada.</p>

      <h2>Mouse óptico — $22.000</h2>
      <p>El mouse óptico con cable USB es el más confiable. No necesita baterías, no falla la conexión y su sensor de 1000 DPI es más que suficiente para trabajo y navegación. Su diseño ergonómico evita el cansancio en la mano.</p>

      <h2>Memoria USB 32GB — $28.000</h2>
      <p>Imprescindible para llevar tus documentos, música y fotos siempre contigo. Compatible con PC, televisor y carro. 32GB es suficiente para miles de documentos y cientos de fotos.</p>

      <h2>La combinación perfecta</h2>
      <p>Teclado + Mouse + USB 32GB = $85.000 por un puesto de trabajo completo. En Loperzaik tienes todo disponible con envío a domicilio. ¡Escríbenos por WhatsApp y hacemos el pedido!</p>
    `,
  },
];

export const getPostBySlug = (slug: string) => posts.find((p) => p.slug === slug);
export const getPostsRecientes = (n = 3) => [...posts].sort((a, b) => new Date(b.fecha).getTime() - new Date(a.fecha).getTime()).slice(0, n);
export const getPostsByCategoria = (cat: string) => posts.filter((p) => p.categoria === cat);
