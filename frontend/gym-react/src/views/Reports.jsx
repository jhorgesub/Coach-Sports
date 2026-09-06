import React from 'react';
import PageHeader from '../components/ui/PageHeader';
import { monthlyRevenue, peakHours } from '../data/reportsData';
import { initialPlans } from '../data/plansData';

export default function Reports() {
  const maxRevenue = Math.max(...monthlyRevenue.map(r => r.revenue));

  return (
    <div className="font-inter">
      <PageHeader 
        title="Reportes" 
        subtitle="Analíticas visuales, ingresos mensuales y aforo del gimnasio."
      />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
        {/* Gráfico de Ingresos */}
        <div className="card-glow rounded-xl p-6">
          <h3 className="font-bold text-lg text-white mb-6">
            Rendimiento de Ingresos Mensuales (USD)
          </h3>
          
          <div className="flex justify-between items-end h-48 gap-3 px-2">
            {monthlyRevenue.map((r, i) => {
              const heightPercent = `${(r.revenue / maxRevenue) * 100}%`;
              return (
                <div key={i} className="flex-1 flex flex-col items-center group h-full justify-end">
                  <div className="text-[10px] text-brand-blue font-bold mb-2 opacity-0 group-hover:opacity-100 transition-opacity">
                    ${r.revenue}
                  </div>
                  <div 
                    style={{ height: heightPercent }}
                    className="w-full bg-gradient-to-t from-brand-blue-dark to-brand-blue rounded-t-sm transition-all hover:bg-brand-blue-light shadow-[0_0_12px_rgba(0,191,255,0.3)]"
                  />
                  <div className="text-xs text-gray-400 mt-2 font-medium">
                    {r.month}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Capacidad en Horas Pico */}
        <div className="card-glow rounded-xl p-6">
          <h3 className="font-bold text-lg text-white mb-6">
            Ocupación por Franja Horaria (Horas Pico)
          </h3>

          <div className="flex flex-col gap-4">
            {peakHours.map((h, i) => (
              <div key={i}>
                <div className="flex justify-between text-xs text-gray-300 font-medium mb-1">
                  <span>{h.hour}</span>
                  <span className="text-brand-blue">{h.percentage}% Capacidad</span>
                </div>
                <div className="w-full bg-[#040a17] h-2 rounded-full overflow-hidden border border-[rgba(0,191,255,0.15)]">
                  <div 
                    style={{ width: `${h.percentage}%` }}
                    className={`h-full rounded-full transition-all ${
                      h.percentage > 85 
                        ? 'bg-rose-500 shadow-[0_0_8px_rgba(244,63,94,0.4)]' 
                        : h.percentage > 60 
                        ? 'bg-amber-500 shadow-[0_0_8px_rgba(245,158,11,0.4)]' 
                        : 'bg-brand-blue shadow-[0_0_8px_rgba(0,191,255,0.4)]'
                    }`}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Distribución de Suscriptores por Plan */}
      <div className="card-glow rounded-xl p-6">
        <h3 className="font-bold text-lg text-white mb-5">
          Distribución de Suscriptores por Plan
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {initialPlans.map((plan) => (
            <div key={plan.id} className="bg-[#040a17] border border-[rgba(0,191,255,0.12)] rounded-lg p-4">
              <div className="text-xs text-gray-400 uppercase font-bold tracking-wider mb-1">
                {plan.name}
              </div>
              <div className="text-2xl font-bold text-brand-blue font-barlow text-glow mb-2">
                {plan.membersCount} <span className="text-xs text-gray-400 font-normal lowercase font-inter">atletas</span>
              </div>
              <div className="w-full bg-[#081126] h-1.5 rounded-full overflow-hidden">
                <div 
                  style={{ width: `${(plan.membersCount / 312) * 100}%` }}
                  className="h-full bg-brand-blue shadow-[0_0_6px_rgba(0,191,255,0.5)]"
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
