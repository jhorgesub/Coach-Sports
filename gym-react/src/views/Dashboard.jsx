import PageHeader from '../components/ui/PageHeader';
import StatCard from '../components/ui/StatCard';
import Badge from '../components/ui/Badge';
import Button from '../components/ui/Button';
import { MembersIcon, DumbbellIcon, CheckCircleIcon } from '../components/ui/Icons';
import { memberService } from '../services/memberService';
import { checkinService } from '../services/checkinService';
import { useState, useEffect } from 'react';

export default function Dashboard() {
  const [members, setMembers] = useState([]);
  const [checkins, setCheckins] = useState([]);
  const [memberIdQuery, setMemberIdQuery] = useState('');
  const [notification, setNotification] = useState(null);

  useEffect(() => {
    async function loadData() {
      const allMembers = await memberService.getAll();
      const allCheckins = await checkinService.getAll();
      setMembers(allMembers);
      setCheckins(allCheckins);
    }
    loadData();
  }, []);

  const handleRegisterAsistencia = async (e) => {
    e.preventDefault();
    if (!memberIdQuery.trim()) return;

    try {
      const result = await checkinService.validate(memberIdQuery.trim(), members);
      setCheckins(prev => [result.checkin, ...prev]);
      setNotification({
        type: result.type,
        message: result.message
      });
    } catch (err) {
      setNotification({
        type: 'error',
        message: err.message || "Error al registrar asistencia."
      });
    }

    setMemberIdQuery('');
  };

  const totalMembers = members.length;
  const activeMembers = members.filter(member => member.status === 'Active').length;
  const todayCheckins = checkins.length;

  return (
    <div className="font-inter">
      {/* Page Header */}
      <PageHeader 
        title="Inicio" 
        subtitle="Resumen de actividades del gimnasio y acciones rápidas." 
      />

      {/* Metrics Row: 3 Columns matching Screenshot */}
      <div className="grid grid-cols-3 gap-3 mb-8">
        <StatCard 
          label="Total Miembros" 
          value={totalMembers} 
          icon={MembersIcon}
        />
        <StatCard 
          label="Planes Activos" 
          value={activeMembers} 
          icon={DumbbellIcon}
        />
        <StatCard 
          label="Asistencias Hoy" 
          value={todayCheckins} 
          icon={CheckCircleIcon}
        />
      </div>

      {/* Operations Area: 2 Columns matching Screenshot */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Left Column: Asistencia Rápida */}
        <div className="card-glow rounded-xl p-6 flex flex-col justify-between">
          <div>
            <h2 className="text-xl font-bold text-brand-blue tracking-tight mb-1">
              Asistencia Rápida
            </h2>
            <p className="text-xs text-[#94A3B8] mb-6">
              Ingresa el ID del miembro para registrar su ingreso.
            </p>

            <form onSubmit={handleRegisterAsistencia} className="space-y-4">
              <div>
                <label className="block text-[10px] text-[#64748B] font-bold tracking-wider uppercase mb-2">
                  ID DEL MIEMBRO
                </label>
                <input 
                  type="text" 
                  value={memberIdQuery}
                  onChange={(e) => setMemberIdQuery(e.target.value)}
                  placeholder="Ej. 1"
                  className="w-full bg-[#040a17] border border-[rgba(0,191,255,0.15)] rounded-lg px-4 py-3 text-sm text-white placeholder-gray-600 transition-all"
                />
              </div>

              <Button 
                type="submit" 
                variant="brand"
                className="w-full py-3 rounded-lg text-sm font-semibold tracking-wide shadow-[0_0_20px_rgba(0,191,255,0.35)] hover:shadow-[0_0_30px_rgba(0,191,255,0.6)]"
              >
                Registrar Asistencia
              </Button>
            </form>
          </div>

          {/* Inline alert notification */}
          {notification && (
            <div className={`mt-4 p-3.5 rounded-lg border text-xs leading-normal animate-fadeIn ${
              notification.type === 'success'
                ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30 shadow-[0_0_15px_rgba(16,185,129,0.15)]'
                : notification.type === 'warning'
                ? 'bg-amber-500/10 text-amber-400 border-amber-500/30'
                : 'bg-rose-500/10 text-rose-400 border-rose-500/30'
            }`}>
              <div className="font-bold uppercase tracking-wider mb-0.5">
                {notification.type === 'success' ? 'Verificación Aprobada' : 'Verificación Rechazada'}
              </div>
              <div>{notification.message}</div>
            </div>
          )}
        </div>

        {/* Right Column: Últimas Asistencias */}
        <div className="card-glow rounded-xl p-6">
          <h2 className="text-xl font-bold text-brand-blue tracking-tight mb-1">
            Últimas Asistencias
          </h2>
          <p className="text-xs text-[#94A3B8] mb-6">
            Últimos ingresos de miembros registrados.
          </p>

          <div className="overflow-y-auto max-h-[280px] pr-2 space-y-2.5">
            {checkins.length > 0 ? (
              checkins.map((checkin) => (
                <div 
                  key={checkin.id} 
                  className="flex justify-between items-center p-3 rounded-lg bg-[#040a17]/60 border border-[rgba(0,191,255,0.08)] hover:border-[rgba(0,191,255,0.2)] transition-colors"
                >
                  <div>
                    <div className="font-semibold text-sm text-gray-200">{checkin.name}</div>
                    <div className="text-[10px] text-[#64748B] font-mono mt-0.5">ID: {checkin.memberId} &middot; {checkin.plan}</div>
                  </div>
                  <div className="text-right flex flex-col items-end gap-1">
                    <span className="text-xs font-medium text-gray-400">{checkin.time}</span>
                    <Badge status={checkin.status === 'Success' ? 'Aprobado' : 'Rechazado'} />
                  </div>
                </div>
              ))
            ) : (
              <div className="text-center py-12 text-[#64748B] text-xs font-semibold uppercase tracking-wider">
                Sin asistencias registradas
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
