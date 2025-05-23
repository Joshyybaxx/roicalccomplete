export function Button({ children, onClick, className }) {
  return <button onClick={onClick} className={`bg-black text-white px-4 py-2 rounded ${className}`}>{children}</button>;
}
