import { Link } from "react-router-dom";

interface CardProps {
  title: string;
  description: string;
  category: string;
  expectedResults: string[];
  imageSrc: string;
  imageAlt: string;
  link: string;
  isDarkMode?: boolean;
}

const Card = ({
  title,
  description,
  category,
  expectedResults,
  imageSrc,
  imageAlt,
  isDarkMode = false,
  link,
}: CardProps) => {
  const textColor = isDarkMode
    ? "text-[var(--color-dark-text)]"
    : "text-[var(--color-text)]";
  const descColor = isDarkMode ? "text-gray-400" : "text-gray-700";
  const borderColor = isDarkMode
    ? "border-[var(--color-dark-secondary)]"
    : "border-gray-200";

  // Gradient background definition
  const gradientClass = isDarkMode
    ? "bg-gradient-to-br from-[var(--color-dark-background)] to-[var(--color-dark-secondary)]"
    : "bg-gradient-to-br from-[var(--color-background)] to-[var(--color-secondary)]";

  // Category badge colors
  const categoryBg = isDarkMode
    ? "bg-[var(--color-dark-accent)] text-[var(--color-dark-text)]" // Dark background for badge in dark mode
    : "bg-[var(--color-accent)] text-[var(--color-text)]";

  // Checkmark and link color
  const primaryColor = isDarkMode
    ? "text-[var(--color-dark-primary)]"
    : "text-[var(--color-primary)]";
  const primaryBorderHover = isDarkMode
    ? "hover:border-[var(--color-dark-primary)]/50"
    : "hover:border-[var(--color-primary)]/50";

  return (
    <Link
      to={link}
      className={`w-full max-w-sm group relative block 
        rounded-2xl border ${borderColor} shadow-xl 
        ${gradientClass} transition-all duration-300 
        hover:shadow-2xl ${primaryBorderHover} 
        transform hover:-translate-y-1`}
    >
      <div className="p-5 flex flex-col h-full">
        {/* Model Image/Diagram Section */}
        <div className="relative w-full h-40 overflow-hidden rounded-xl shadow-md mb-4">
          <img
            src={imageSrc}
            alt={imageAlt}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-[1.03] transform"
          />
          <span
            className={`absolute top-3 right-3 px-3 py-1 text-xs font-bold uppercase rounded-full shadow ${categoryBg}`}
          >
            {category}
          </span>
        </div>

        {/* Title and Description */}
        <div className="space-y-3 flex-grow">
          <h2 className={`text-xl font-heading font-extrabold ${textColor}`}>
            {title}
          </h2>

          <p className={`text-sm text-pretty line-clamp-3 ${descColor}`}>
            {description}
          </p>

          {/* Key Metrics Section */}
          <div className="pt-2">
            <h4 className={`text-sm font-bold mb-1 ${textColor}`}>
              Key Metrics:
            </h4>
            <ul className="grid grid-cols-2 gap-y-1">
              {expectedResults.slice(0, 4).map((result, index) => (
                <li
                  key={index}
                  className={`text-xs flex items-center gap-1 ${descColor}`}
                >
                  {/* SVG Checkmark */}
                  <svg
                    className={`w-3 h-3 ${primaryColor}`}
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.052-.143z"
                      clipRule="evenodd"
                    />
                  </svg>
                  {result}
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* CTA Link Indicator */}
        <div className="mt-4 pt-4 border-t border-gray-300/50 dark:border-gray-600/50">
          <p
            className={`text-sm font-semibold ${primaryColor} flex items-center justify-between`}
          >
            Simulate Now
            <span className="text-xl transition-transform duration-300 group-hover:translate-x-1">
              →
            </span>
          </p>
        </div>
      </div>
    </Link>
  );
};

export default Card;
