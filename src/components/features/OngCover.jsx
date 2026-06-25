import { useState } from "react";
import { Building2 } from "lucide-react";

export default function OngCover({ src, alt, className = "" }) {
  const [failed, setFailed] = useState(false);

  if (!src || failed) {
    return (
      <div
        className={`flex items-center justify-center bg-slate-700 text-slate-400 ${className}`}
        role="img"
        aria-label={alt}
      >
        <Building2 className="h-12 w-12" aria-hidden="true" />
      </div>
    );
  }

  return (
    <img
      src={src}
      alt={alt}
      className={className}
      loading="lazy"
      onError={() => setFailed(true)}
    />
  );
}
