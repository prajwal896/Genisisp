export default function Icon({ name, size = 18, className = '' }) {
  return <span className={`material-symbols-outlined ${className}`} style={{ fontSize: size }}>{name}</span>;
}
