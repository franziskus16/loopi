const STAR =
  "M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.006 5.404.434c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.434 2.082-5.005Z";

/** Five stars filled to the nearest half, with the exact value for screen readers. */
const Rating = ({ value, size = "size-5" }: { value: number; size?: string }) => {
  const rounded = Math.round(value * 2) / 2;

  return (
    <div className="flex items-center gap-1">
      <span className="sr-only">Rated {value.toFixed(1)} out of 5</span>
      <div className="flex" aria-hidden="true">
        {[1, 2, 3, 4, 5].map((star) => {
          const fill = rounded >= star ? 100 : rounded >= star - 0.5 ? 50 : 0;
          const gradient = `star-fill-${fill}`;
          return (
            <svg key={star} viewBox="0 0 24 24" className={`${size} text-amber-500`}>
              <defs>
                <linearGradient id={gradient}>
                  <stop offset={`${fill}%`} stopColor="currentColor" />
                  <stop offset={`${fill}%`} stopColor="#e5e7eb" />
                </linearGradient>
              </defs>
              <path fill={`url(#${gradient})`} d={STAR} />
            </svg>
          );
        })}
      </div>
      <span className="text-sm text-gray-600" aria-hidden="true">
        {value.toFixed(1)}
      </span>
    </div>
  );
};

export default Rating;
