import React from 'react';

export default function Badge({ status }) {
  let badgeStyles = "";

  switch (status?.toLowerCase()) {
    case 'active':
    case 'activo':
    case 'aprobado':
    case 'success':
      badgeStyles = "bg-emerald-500/10 text-emerald-400 border-emerald-500/30 shadow-[0_0_8px_rgba(16,185,129,0.2)]";
      break;
    case 'inactive':
    case 'inactivo':
      badgeStyles = "bg-slate-500/10 text-slate-400 border-slate-500/30";
      break;
    case 'expired':
    case 'expirado':
    case 'rechazado':
      badgeStyles = "bg-rose-500/10 text-rose-400 border-rose-500/30 shadow-[0_0_8px_rgba(244,63,94,0.2)]";
      break;
    default:
      badgeStyles = "bg-brand-blue/10 text-brand-blue border-brand-blue/30 shadow-[0_0_8px_rgba(0,191,255,0.2)]";
  }

  return (
    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-[11px] font-semibold border ${badgeStyles} font-inter`}>
      {status}
    </span>
  );
}
