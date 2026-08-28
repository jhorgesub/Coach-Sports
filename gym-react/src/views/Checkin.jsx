import React, { useState } from 'react';
import PageHeader from '../components/ui/PageHeader';

const initialAttendanceMembers = [
  { id: 1, name: "Jennifer Lopez" },
  { id: 2, name: "Cecilia Gómez" },
  { id: 3, name: "Lucia Cáceres" },
  { id: 4, name: "Jorge Subeldia" },
  { id: 5, name: "Bart Simpson" },
  { id: 6, name: "Ignacio Ruiz" },
  { id: 7, name: "Agustina Herrera" },
  { id: 8, name: "Jhon Connor" },
  { id: 9, name: "Santiago Ramirez" },
  { id: 10, name: "Carlos Menem" },
  { id: 11, name: "Lionel Messi" },
  { id: 12, name: "Florencia Costa" },
];

// Generate days for the selected month
function generateDays(year, month) {
  const days = [];
  const daysInMonth = new Date(year, month, 0).getDate();
  for (let d = 1; d <= daysInMonth; d++) {
    const date = new Date(year, month - 1, d);
    const dayName = date.toLocaleDateString('es-AR', { weekday: 'short' }).replace('.', '').toUpperCase();
    const isSunday = date.getDay() === 0;
    const dateKey = `${year}-${String(month).padStart(2, '0')}-${String(d).padStart(2, '0')}`;
    const formattedDate = `${String(d).padStart(2, '0')}/${String(month).padStart(2, '0')}`;
    days.push({ dateKey, dayName, formattedDate, isSunday });
  }
  return days;
}

const MONTHS = [
  { label: 'Enero 2026',    year: 2026, month: 1 },
  { label: 'Febrero 2026',  year: 2026, month: 2 },
  { label: 'Marzo 2026',    year: 2026, month: 3 },
  { label: 'Agosto 2026',   year: 2026, month: 8 },
];

export default function Checkin() {
  const [selectedMonthIdx, setSelectedMonthIdx] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);

  // attendanceMap: { memberId: { dateKey: boolean } }
  const [attendanceMap, setAttendanceMap] = useState({});

  const selectedMonth = MONTHS[selectedMonthIdx];
  const displayedDays = generateDays(selectedMonth.year, selectedMonth.month);

  const itemsPerPage = 10;
  const totalPages = Math.ceil(initialAttendanceMembers.length / itemsPerPage);
  const pagedMembers = initialAttendanceMembers.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const toggleAttendance = (memberId, dateKey) => {
    setAttendanceMap(prev => ({
      ...prev,
      [memberId]: {
        ...(prev[memberId] || {}),
        [dateKey]: !((prev[memberId] || {})[dateKey]),
      }
    }));
  };

  const getTotalPresent = (memberId) => {
    const memberDays = attendanceMap[memberId] || {};
    return Object.values(memberDays).filter(Boolean).length;
  };

  return (
    <div className="font-inter">
      {/* Page Header */}
      <PageHeader
        title="Asistencias"
        subtitle="Haz click en cualquier celda para marcar o desmarcar la asistencia."
      >
        <div className="flex items-center gap-3">
          {/* Month Selector */}
          <div className="flex items-center gap-2 text-xs text-neutral-400">
            <span>Mes:</span>
            <select
              value={selectedMonthIdx}
              onChange={e => { setSelectedMonthIdx(Number(e.target.value)); setCurrentPage(1); }}
              className="bg-[#081126] border border-[rgba(0,191,255,0.25)] rounded-lg px-3 py-1.5 text-xs text-white focus:outline-none focus:border-brand-blue cursor-pointer shadow-[0_0_10px_rgba(0,191,255,0.1)]"
            >
              {MONTHS.map((m, idx) => (
                <option key={idx} value={idx}>{m.label}</option>
              ))}
            </select>
          </div>

          {/* Prev / Next buttons */}
          <div className="flex border border-[rgba(0,191,255,0.25)] rounded-lg overflow-hidden bg-[#081126]">
            <button
              onClick={() => setCurrentPage(p => Math.max(p - 1, 1))}
              disabled={currentPage === 1}
              className="px-3 py-1.5 text-xs text-gray-300 hover:bg-[rgba(0,191,255,0.1)] hover:text-brand-blue disabled:opacity-40 disabled:cursor-not-allowed transition-all border-r border-[rgba(0,191,255,0.15)] cursor-pointer"
            >
              &lsaquo; Anterior
            </button>
            <button
              onClick={() => setCurrentPage(p => Math.min(p + 1, totalPages))}
              disabled={currentPage === totalPages}
              className="px-3 py-1.5 text-xs text-gray-300 hover:bg-[rgba(0,191,255,0.1)] hover:text-brand-blue disabled:opacity-40 disabled:cursor-not-allowed transition-all cursor-pointer"
            >
              Siguiente &rsaquo;
            </button>
          </div>
        </div>
      </PageHeader>

      {/* Table Container — matching Angular */}
      <div className="overflow-hidden bg-neutral-900/45 border border-neutral-800/50 rounded-2xl backdrop-blur-sm shadow-xl">
        <div className="overflow-x-auto">
          <table className="w-full text-xs text-center border-collapse">

            {/* THEAD */}
            <thead>
              <tr className="border-b border-neutral-800/80 bg-neutral-900/90 text-neutral-400">

                {/* Miembro — sticky left */}
                <th className="px-4 py-3 text-left font-bold uppercase tracking-wider sticky left-0 bg-neutral-900 z-10 border-r border-neutral-800/80 min-w-[180px]">
                  Miembro
                </th>

                {/* Day Columns */}
                {displayedDays.map(dayInfo => (
                  <th
                    key={dayInfo.dateKey}
                    className={
                      dayInfo.isSunday
                        ? 'px-2 py-3 font-medium min-w-[55px] border-r border-neutral-800/60 bg-neutral-950/90 text-neutral-500'
                        : 'px-2 py-3 font-semibold min-w-[55px] border-r border-neutral-800/40 text-neutral-300'
                    }
                  >
                    <div className="text-[10px] text-sky-400/90 font-bold uppercase mb-0.5">
                      {dayInfo.dayName}
                    </div>
                    <div className="text-[11px] font-mono whitespace-nowrap">
                      {dayInfo.formattedDate}
                    </div>
                  </th>
                ))}

                {/* Total — sticky right */}
                <th className="px-4 py-3 font-bold uppercase tracking-wider text-sky-400 min-w-[85px] bg-neutral-900 sticky right-0 z-10 border-l border-neutral-800/80">
                  Total
                </th>
              </tr>
            </thead>

            {/* TBODY */}
            <tbody className="divide-y divide-neutral-800/50">
              {pagedMembers.length > 0 ? (
                pagedMembers.map(member => (
                  <tr key={member.id} className="hover:bg-neutral-800/20 transition-colors duration-150">

                    {/* Member Name — sticky left */}
                    <td className="px-4 py-3 text-left font-medium text-white sticky left-0 bg-neutral-900/95 z-10 border-r border-neutral-800/80 shadow-md">
                      <div className="truncate max-w-[170px]">
                        {member.name}
                      </div>
                    </td>

                    {/* Day Cells */}
                    {displayedDays.map(dayInfo => {
                      const isPresent = (attendanceMap[member.id] || {})[dayInfo.dateKey];
                      return (
                        <td
                          key={dayInfo.dateKey}
                          onClick={() => !dayInfo.isSunday && toggleAttendance(member.id, dayInfo.dateKey)}
                          className={
                            dayInfo.isSunday
                              ? 'px-1 py-3 border-r border-neutral-800/30 bg-neutral-950/80 pointer-events-none select-none'
                              : 'px-1 py-3 border-r border-neutral-800/30 hover:bg-neutral-800/40 cursor-pointer transition-colors select-none'
                          }
                        >
                          {!dayInfo.isSunday && isPresent ? (
                            <span
                              className="inline-flex items-center justify-center w-7 h-7 rounded-lg bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 font-bold text-[11px] shadow-sm"
                              title="Presente — Haz clic para cambiar"
                            >
                              P
                            </span>
                          ) : !dayInfo.isSunday ? (
                            <span
                              className="inline-flex items-center justify-center w-7 h-7 rounded-lg hover:bg-neutral-800/50 transition-colors"
                              title="Ausente — Haz clic para marcar Presente"
                            />
                          ) : null}
                        </td>
                      );
                    })}

                    {/* Total — sticky right */}
                    <td className="px-4 py-3 font-bold text-sky-400 sticky right-0 bg-neutral-900/95 z-10 border-l border-neutral-800/80">
                      {getTotalPresent(member.id)}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={displayedDays.length + 2} className="px-6 py-10 text-neutral-500">
                    No hay miembros registrados para mostrar en la matriz.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Footer pagination */}
        <div className="py-4 px-6 border-t border-neutral-800/60 bg-neutral-900/60 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-neutral-400">
          <div>
            Mostrando {(currentPage - 1) * itemsPerPage + 1}–{Math.min(currentPage * itemsPerPage, initialAttendanceMembers.length)} de {initialAttendanceMembers.length} miembros
          </div>

          <div className="flex items-center gap-1.5">
            <button
              onClick={() => setCurrentPage(p => Math.max(p - 1, 1))}
              disabled={currentPage === 1}
              className="px-2.5 py-1 hover:text-white disabled:opacity-40 disabled:cursor-not-allowed transition-colors cursor-pointer"
            >
              Anterior
            </button>

            {Array.from({ length: totalPages }, (_, idx) => idx + 1).map(page => (
              <button
                key={page}
                onClick={() => setCurrentPage(page)}
                className={`w-7 h-7 rounded flex items-center justify-center font-bold transition-all cursor-pointer ${
                  currentPage === page
                    ? 'bg-brand-blue/15 border border-brand-blue text-brand-blue shadow-[0_0_10px_rgba(0,191,255,0.3)]'
                    : 'text-neutral-400 hover:text-white'
                }`}
              >
                {page}
              </button>
            ))}

            <button
              onClick={() => setCurrentPage(p => Math.min(p + 1, totalPages))}
              disabled={currentPage === totalPages}
              className="px-2.5 py-1 hover:text-white disabled:opacity-40 disabled:cursor-not-allowed transition-colors cursor-pointer"
            >
              Siguiente
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
