/**
 * Shared container component to ensure consistent spacing across all sections
 */

interface SectionContainerProps {
  children: React.ReactNode;
  className?: string;
}

export function SectionContainer({ children, className = "" }: SectionContainerProps) {
  return (
    <div className={`w-full px-4 py-12 sm:px-6 md:px-8 lg:px-16 lg:py-20 ${className}`}>
      <div className="mx-auto w-full max-w-7xl">
        {children}
      </div>
    </div>
  );
}
