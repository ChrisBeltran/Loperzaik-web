import Link from 'next/link';
import { FiInstagram, FiFacebook, FiPhone, FiMail } from 'react-icons/fi';
import { categorias } from '@/data/productos';

export default function Footer() {
  return (
    <footer className="bg-[#4410b9] text-white mb-14 md:mb-0">
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          <div className="col-span-2 md:col-span-1">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-9 h-9 bg-white rounded-xl flex items-center justify-center">
                <span className="font-bold text-[#4410b9] text-lg">L</span>
              </div>
              <div>
                <p className="font-bold text-white">Loperzaik</p>
                <p className="text-gray-400 text-xs">Tecnología de Vanguardia</p>
              </div>
            </div>
            <p className="text-gray-400 text-sm mb-4 leading-relaxed">
              Audífonos, parlantes, accesorios para PC, cargadores y cables. Envío a domicilio en Colombia.
            </p>
            <div className="flex gap-2">
              <a href="#" className="w-8 h-8 bg-white/10 rounded-lg flex items-center justify-center hover:bg-white hover:text-[#4410b9] transition-all"><FiFacebook size={15}/></a>
              <a href="#" className="w-8 h-8 bg-white/10 rounded-lg flex items-center justify-center hover:bg-white hover:text-[#4410b9] transition-all"><FiInstagram size={15}/></a>
            </div>
          </div>

          <div>
            <h4 className="font-semibold text-white mb-4 text-sm">Productos</h4>
            <ul className="space-y-2">
              {categorias.map((cat) => (
                <li key={cat.id}>
                  <Link href={`/categoria/${cat.id}`} className="text-gray-400 hover:text-white text-sm transition-colors">{cat.nombre}</Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-white mb-4 text-sm">Información</h4>
            <ul className="space-y-2">
              <li><Link href="/blog" className="text-gray-400 hover:text-white text-sm">Blog</Link></li>
              <li><Link href="/carrito" className="text-gray-400 hover:text-white text-sm">Mi carrito</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-white mb-4 text-sm">Contacto</h4>
            <ul className="space-y-3">
              <li className="flex items-center gap-2 text-gray-400 text-sm"><FiPhone size={14}/> 01 8000 123 456</li>
              <li className="flex items-center gap-2 text-gray-400 text-sm"><FiMail size={14}/> info@loperzaik.com</li>
            </ul>
            <div className="mt-4">
              <p className="text-white text-xs font-medium mb-1">Horario</p>
              <p className="text-gray-400 text-xs">Lun – Vie: 8am – 7pm</p>
              <p className="text-gray-400 text-xs">Sábados: 9am – 5pm</p>
            </div>
          </div>
        </div>
      </div>
      <div className="border-t border-white/10">
        <div className="max-w-7xl mx-auto px-4 py-4 flex flex-col sm:flex-row justify-between items-center gap-2">
          <p className="text-gray-500 text-xs">© 2026 Loperzaik. Todos los derechos reservados.</p>
          <p className="text-gray-500 text-xs">Hecho con ❤️ en Colombia</p>
        </div>
      </div>
    </footer>
  );
}
