export const LinkButton = ({ size, icon, href, className = "", borderVariant="normal", ...props }) => (
  <a
    href={href}
    {...props}
    className={`hide-cursor group relative ${size == "sm" ? "w-12 h-12" : "w-16 h-16"} rounded-full 
    border ${ borderVariant == "light" ? "border-white/10" : "border-white/20" } flex items-center justify-center 
    transition-all duration-500 hover:scale-110 hover:border-white/60 
    overflow-hidden bg-white/5 ${className}`}
  >
    <div className="absolute inset-0 bg-white scale-0 group-hover:scale-100 transition-transform duration-500 rounded-full" />
    {icon && (
      <i
        className={`${icon} ${size == "sm" ? "text-md" : "text-xl"} relative z-10 
        transition-colors duration-500 group-hover:text-black text-white`}
      />
    )}
  </a>
);