import { useAppSelector } from "@/lib/redux/hooks";

import { mbbrKeyLabels } from "@/features/mbbr/constants/parameterKeys";

export const renderObject = (obj: Record<string, any>, level = 0) => {
  const isDarkMode = useAppSelector((state) => state.theme.isDarkMode);

  return (
    <div className={`${level > 0 ? "ml-4 pl-4 " : ""} `}>
      {Object.entries(obj).map(([key, value]) => {
        const label = mbbrKeyLabels[key] || key;
        const isObject =
          value &&
          typeof value === "object" &&
          !Array.isArray(value) &&
          Object.keys(value).length > 0;

        const isArray = Array.isArray(value);

        return (
          <div
            key={key}
            className={`py-1 border-b last:border-b-0 ${
              isDarkMode ? "border-secondary" : "border-text"
            }`}
          >
            <div className="flex justify-between items-start">
              <span className="font-medium">{label}</span>
              {!isObject && !isArray && (
                <span className="ml-4 text-right">
                  {String(Number(value).toFixed(2))}
                </span>
              )}
            </div>

            {isObject && (
              <div className="mt-1">{renderObject(value, level + 1)}</div>
            )}

            {isArray && (
              <div
                className={`mt-1 ml-4 border-l pl-4 space-y-1 ${
                  isDarkMode ? "border-secondary" : "border-primary"
                }`}
              >
                {value.map((item, index) =>
                  typeof item === "object" ? (
                    <div key={index}>{renderObject(item, level + 1)}</div>
                  ) : (
                    <div key={index} className="">
                      ➡️ {String(item)}
                    </div>
                  )
                )}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
};
