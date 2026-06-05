import { Link } from "react-router-dom";
import { MapPin } from "lucide-react";

export default function PetCard({ pet, layout = "grid" }) {
  return (
    <article className={`overflow-hidden rounded-xl border border-slate-700 bg-slate-800 shadow-lg ${layout === "list" ? "sm:flex" : ""}`}>
      <div className={`aspect-[3/2] bg-slate-950 ${layout === "list" ? "sm:w-56" : ""}`}>
        <img
          src={pet.image || pet.image_url}
          alt={pet.name}
          className="h-full w-full object-cover"
          loading="lazy"
        />
      </div>
      <div className="flex flex-1 flex-col p-5">
        <div>
          <h3 className="text-xl font-bold text-white">{pet.name}</h3>
          <p className="text-sm text-slate-400">{pet.breed} - {pet.age}</p>
        </div>
        <p className="mt-3 flex items-center gap-2 text-sm text-slate-400">
          <MapPin className="h-4 w-4" />
          {pet.location || pet.city}
        </p>
        <p className="mt-3 line-clamp-2 text-sm text-slate-300">{pet.description}</p>
        <div className="mt-4 flex flex-wrap gap-2">
          {pet.tags?.slice(0, 3).map((tag) => (
            <span key={tag} className="rounded-md bg-blue-500/15 px-2 py-1 text-xs text-blue-200">{tag}</span>
          ))}
        </div>
        <Link to={`/pet/${pet.id}`} className="mt-5 rounded-lg bg-blue-600 px-4 py-2 text-center text-sm font-semibold text-white hover:bg-blue-700">
          Quero adotar
        </Link>
      </div>
    </article>
  );
}
