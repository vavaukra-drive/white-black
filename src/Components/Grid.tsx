export default function Grid() {
  return (
    <div className="fixed inset-0 pointer-events-none z-0 opacity-10">
      <div className="w-full h-full grid grid-cols-12 gap-px">
        {[...Array(12)].map((_, i) => (
          <div key={i} className="border-r border-black" />
        ))}
      </div>
    </div>
  );
}

