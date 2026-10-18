interface LogoProps {
  className?: string;
}

export function Logo({ className = 'w-8 h-8' }: LogoProps) {
  return (
    <svg
      viewBox="0 0 48 48"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <circle cx="24" cy="24" r="10" fill="#F59E0B" />
      
      <path d="M24 4V10" stroke="#F59E0B" strokeWidth="3" strokeLinecap="round" />
      <path d="M24 38V44" stroke="#F59E0B" strokeWidth="3" strokeLinecap="round" />
      <path d="M4 24H10" stroke="#F59E0B" strokeWidth="3" strokeLinecap="round" />
      <path d="M38 24H44" stroke="#F59E0B" strokeWidth="3" strokeLinecap="round" />
      <path d="M9.86 9.86L14.1 14.1" stroke="#F59E0B" strokeWidth="3" strokeLinecap="round" />
      <path d="M33.9 33.9L38.14 38.14" stroke="#F59E0B" strokeWidth="3" strokeLinecap="round" />
      <path d="M9.86 38.14L14.1 33.9" stroke="#F59E0B" strokeWidth="3" strokeLinecap="round" />
      <path d="M33.9 14.1L38.14 9.86" stroke="#F59E0B" strokeWidth="3" strokeLinecap="round" />

      <path
        d="M34 32C37.3137 32 40 29.3137 40 26C40 22.6863 37.3137 20 34 20C33.5314 20 33.0748 20.0537 32.6367 20.1565C31.5482 16.2342 27.9597 13.3333 23.6667 13.3333C18.5201 13.3333 14.3333 17.5201 14.3333 22.6667C14.3333 23.0295 14.3539 23.3877 14.3943 23.7408C12.4029 24.5514 11 26.5287 11 28.8333C11 31.7789 13.3878 34.1667 16.3333 34.1667H34Z"
        fill="#3B82F6"
        fillOpacity="0.9"
      />
    </svg>
  );
}