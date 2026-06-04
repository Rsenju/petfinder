import { PawPrint } from "lucide-react";

export default function Logo({ size = "md" }) {
  const textSize = size === "xl" ? "text-3xl" : size === "lg" ? "text-2xl" : "text-xl";
  return (
    <div className={`inline-flex items-center gap-2 font-bold text-white ${textSize}`}>
      <span className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-blue-600">
        <PawPrint className="h-6 w-6" />
      </span>
      PetFinder
    </div>
  );
}
