import { HomeIcon, MembersIcon, PlansIcon, ReportsIcon, CheckCircleIcon, HamburgerIcon, NotificationIcon, UserIcon } from '../ui/Icons';

export default function Navbar({ activeSection, onSelectSection }) {
  const menuItems = [
    { id: 'dashboard', label: 'Inicio', icon: HomeIcon },
    { id: 'members', label: 'Miembros', icon: MembersIcon },
    { id: 'plans', label: 'Planes', icon: PlansIcon },
    { id: 'reports', label: 'Reportes', icon: ReportsIcon },
    { id: 'checkin', label: 'Asistencias', icon: CheckCircleIcon },
  ];

  return (
    <aside className="w-[240px] min-h-screen bg-[#040916] border-r border-[#0e1b33]/60 flex flex-col justify-between fixed left-0 top-0 bottom-0 z-40">
      <div>
        {/* Header con Logo y Botón Hamburguesa */}
        <div className="pt-6 px-5 pb-5 flex items-center justify-between">
          <div className="w-24 h-24 mx-auto cursor-pointer select-none">
            <img 
              src="/logo.jpg" 
              alt="Coach Sports & Fitness Logo" 
              className="w-full h-full object-contain rounded-full shadow-[0_0_20px_rgba(0,191,255,0.3)]" 
            />
          </div>
          <button className="text-gray-400 hover:text-white transition-colors cursor-pointer p-1.5 rounded-lg hover:bg-white/5">
            <HamburgerIcon className="w-5 h-5" />
          </button>
        </div>

        {/* Navegación Principal */}
        <nav className="py-4 px-3">
          <div className="flex flex-col gap-1.5">
            {menuItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeSection === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => onSelectSection(item.id)}
                  className={`flex items-center gap-3 w-full py-3 px-4 rounded-xl text-left transition-all duration-200 cursor-pointer ${
                    isActive ? 'nav-item-active' : 'nav-item-inactive'
                  }`}
                >
                  <Icon className={`w-4 h-4 ${isActive ? 'text-brand-blue drop-shadow-[0_0_6px_rgba(0,191,255,0.6)]' : 'text-gray-400'}`} />
                  <span className="text-sm font-semibold tracking-wide font-inter">
                    {item.label}
                  </span>
                </button>
              );
            })}
          </div>
        </nav>
      </div>

      {/* Footer con Notificaciones y Perfil */}
      <div className="p-5 border-t border-[#0e1b33]/60 flex items-center justify-between">
        <button className="text-gray-400 hover:text-brand-blue transition-colors cursor-pointer p-1 hover:bg-white/5 rounded-lg">
          <NotificationIcon className="w-5 h-5" />
        </button>
        <button className="w-8 h-8 rounded-full border border-brand-blue flex items-center justify-center text-brand-blue hover:bg-brand-blue/10 transition-all shadow-[0_0_15px_rgba(0,191,255,0.4)] cursor-pointer">
          <UserIcon className="w-4 h-4" />
        </button>
      </div>
    </aside>
  );
}
