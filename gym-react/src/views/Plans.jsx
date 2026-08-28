import React, { useState, useEffect } from 'react';
import PageHeader from '../components/ui/PageHeader';
import Button from '../components/ui/Button';
import { planService } from '../services/planService';

export default function Plans() {
  const [plans, setPlans] = useState([]);
  const [billingCycle, setBillingCycle] = useState('monthly');

  useEffect(() => {
    async function loadPlans() {
      const data = await planService.getAll();
      setPlans(data);
    }
    loadPlans();
  }, []);

  return (
    <div className="font-inter">
      <PageHeader 
        title="Planes" 
        subtitle="Configuración de tarifas, paquetes de entrenamiento y beneficios."
      >
        {/* Selector de Ciclo */}
        <div className="flex bg-[#040a17] p-1 border border-[rgba(0,191,255,0.15)] rounded-lg font-inter">
          <button
            onClick={() => setBillingCycle('monthly')}
            className={`px-3.5 py-1.5 text-xs font-semibold rounded-md transition-all cursor-pointer ${
              billingCycle === 'monthly'
                ? 'bg-brand-blue text-slate-950 shadow-[0_0_12px_rgba(0,191,255,0.4)]'
                : 'text-gray-400 hover:text-white'
            }`}
          >
            Mensual
          </button>
          <button
            onClick={() => setBillingCycle('annual')}
            className={`px-3.5 py-1.5 text-xs font-semibold rounded-md transition-all cursor-pointer ${
              billingCycle === 'annual'
                ? 'bg-brand-blue text-slate-950 shadow-[0_0_12px_rgba(0,191,255,0.4)]'
                : 'text-gray-400 hover:text-white'
            }`}
          >
            Anual (-20%)
          </button>
        </div>
      </PageHeader>

      {/* Catálogo de Planes */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {plans.map((plan) => {
          const basePrice = billingCycle === 'annual' ? plan.price * 0.8 : plan.price;
          const displayPrice = basePrice.toFixed(2);
          const isFeatured = plan.name === 'VIP Coach';

          return (
            <div 
              key={plan.id} 
              className={`card-glow rounded-xl p-6 flex flex-col justify-between relative overflow-hidden transition-all hover:-translate-y-1 ${
                isFeatured 
                  ? 'border-brand-blue border-t-[3px] shadow-[0_0_30px_rgba(0,191,255,0.25)]' 
                  : ''
              }`}
            >
              {isFeatured && (
                <div className="absolute top-0 right-0 bg-brand-blue text-slate-950 text-[9px] font-black uppercase tracking-widest px-3 py-1 rounded-bl italic font-barlow shadow-glow-blue">
                  Más Popular
                </div>
              )}

              <div>
                <h3 className="font-bold text-lg text-white mb-2">
                  {plan.name}
                </h3>
                <div className="flex items-baseline gap-1 mb-4">
                  <span className="font-bold text-3xl text-brand-blue font-barlow text-glow">${displayPrice}</span>
                  <span className="text-xs text-gray-400">/ {billingCycle === 'annual' ? 'año' : 'mes'}</span>
                </div>

                <div className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-6">
                  {plan.membersCount} Atletas Suscriptos
                </div>

                <div className="border-t border-[rgba(0,191,255,0.1)] my-4" />

                <ul className="flex flex-col gap-3 mb-8">
                  {plan.features.map((feature, index) => (
                    <li key={index} className="flex items-start gap-2.5 text-xs text-gray-300 leading-normal">
                      <svg className="w-3.5 h-3.5 text-brand-blue shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                      </svg>
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>

              <Button 
                variant={isFeatured ? 'brand' : 'secondary'}
                className="w-full text-xs font-semibold py-2.5"
              >
                Configurar Plan
              </Button>
            </div>
          );
        })}
      </div>
    </div>
  );
}
