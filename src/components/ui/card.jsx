// src/components/ui/card.jsx
export function Card({ children }) {
  return (
    <div className="rounded-xl border p-4 shadow-md bg-white dark:bg-gray-900">
      {children}
    </div>
  );
}

export function CardContent({ children }) {
  return <div className="mt-2">{children}</div>;
}

