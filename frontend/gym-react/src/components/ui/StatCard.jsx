
export default function StatCard({ label, value, icon: Icon }) {
  return (
    <div
      className="relative overflow-hidden rounded-2xl p-6 backdrop-blur-sm transition-all duration-300 glow-blue"
      style={{ border: '1px solid rgba(0,191,255,0.15)', backgroundColor: 'rgba(17,24,39,0.6)' }}
    >
      {/* Decorative blurred circle top-right */}
      <div
        className="absolute -right-8 -top-8 h-24 w-24 rounded-full blur-2xl"
        style={{ backgroundColor: 'rgba(0,191,255,0.12)' }}
      />

      {/* Content Row */}
      <div className="flex items-center justify-start">
        {/* Icon Container */}
        {Icon && (
          <div
            className="flex h-20 w-20 items-center justify-center rounded-xl mr-3 shrink-0"
            style={{ backgroundColor: 'rgba(0,191,255,0.1)', color: '#00BFFF' }}
          >
            <Icon className="w-6 h-6" />
          </div>
        )}

        {/* Label + Value */}
        <div>
          <p className="text-sm font-medium text-neutral-400">{label}</p>
          <p className="mt-2 text-4xl font-bold tracking-tight text-white">{value}</p>
        </div>
      </div>
    </div>
  );
}
