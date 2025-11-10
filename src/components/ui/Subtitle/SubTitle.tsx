export function SubTitle({ label }: { label: string }) {
  return (
    <div className="w-max mb-4 px-4 py-2 text-gray-400 bg-white rounded-full text-[14px] uppercase font-semibold shadow-[0_2px_8px_0_rgba(0,0,0,0.1)]">
      {label}
    </div>
  );
}
