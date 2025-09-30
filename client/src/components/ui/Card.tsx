interface CardProps {
  title: string;
  description: string;
  category: string;
  expectedResults: string[];
  imageSrc: string;
  imageAlt: string;
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
}: CardProps) => {
  return (
    <div
      className={`w-80 min-h-full group relative rounded-xl border shadow-md overflow-hidden ${
        isDarkMode ? "bg-accent" : "bg-secondary"
      }`}
    >
      <div className="p-4">
        <div className="flex flex-col">
          <div className="relative w-full h-42 overflow-hidden rounded-lg">
            <img
              src={imageSrc}
              alt={imageAlt}
              className="border rounded-lg object-cover transition-scale duration-300 hover:scale-90"
            />
          </div>
          <div className="space-y-3">
            <h1 className="text-lg font-heading font-semibold">{title}</h1>

            <p
              className={`text-sm text-pretty mt-2 line-clamp-3 ${
                isDarkMode ? "text-neutral" : "text-darkGray"
              }`}
            >
              {description}
            </p>

            <div className="flex items-center gap-2">
              <span className="px-3 py-1 text-xs font-semibold text-primary bg-sky-100 rounded-full whitespace-nowrap">
                {category}
              </span>
            </div>

            <div className="">
              <h4 className="text-sm font-semibold">Expected Results:</h4>
              <ul className="grid grid-cols-2">
                {expectedResults.map((result, index) => (
                  <li key={index} className="text-sm flex items-center gap-2">
                    <span className="size-1.5 bg-primary rounded-full"></span>
                    {result}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Card;
