export default function ProductSkeleton() {
  return (
    <div className="bg-white p-6 rounded-[2.5rem] shadow-sm border border-gray-100 flex flex-col min-h-[420px] animate-pulse">
      {/* Afbeelding Placeholder */}
      <div className="h-40 bg-gray-200 rounded-2xl mb-4 w-3/4 mx-auto" />

      {/* Info Sectie */}
      <div className="flex-grow flex flex-col">
        {/* ID/Badge Placeholder */}
        <div className="h-3 bg-gray-100 rounded-full w-12 mb-2" />
        
        {/* Naam Placeholder (2 regels) */}
        <div className="h-4 bg-gray-200 rounded-full w-full mb-2" />
        <div className="h-4 bg-gray-200 rounded-full w-2/3 mb-4" />

        {/* Prijs Placeholder */}
        <div className="h-8 bg-gray-100 rounded-xl w-1/3 mb-6" />

        {/* Controls/Button Rij */}
        <div className="mt-auto flex flex-col gap-2">
          <div className="h-10 bg-gray-100 rounded-xl w-full" /> {/* Dropdown */}
          <div className="h-12 bg-gray-200 rounded-full w-full" /> {/* Button */}
        </div>
      </div>
    </div>
  );
}