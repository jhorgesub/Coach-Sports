
export default function PageHeader({ title, subtitle, children }) {
  return (
    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-7 font-inter">
      <div>
        <h1 className="font-bold text-2xl md:text-3xl text-white tracking-tight leading-tight">
          {title}
        </h1>
        {subtitle && (
          <p className="mt-1 text-xs md:text-sm text-[#94A3B8]">
            {subtitle}
          </p>
        )}
      </div>
      {children && <div className="flex items-center gap-3">{children}</div>}
    </div>
  );
}
