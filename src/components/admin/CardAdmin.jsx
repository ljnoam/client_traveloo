import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function CardAdmin({ title, count, icon, color, children }) {
  const [expanded, setExpanded] = useState(false);
  const childrenArray = React.Children.toArray(children);
  const showButton = childrenArray.length > 5;
  const visibleItems = expanded ? childrenArray : childrenArray.slice(0, 5);

  return (
    <div className="rounded-xl shadow-md p-5 bg-white dark:bg-gray-800 transition-all flex flex-col justify-start flex-grow border border-gray-200 dark:border-gray-700">
      <div className="flex justify-between items-center mb-4">
        <div className="flex items-center gap-3">
          <div className="text-2xl">{icon}</div>
          <h2 className="text-lg font-semibold text-gray-800 dark:text-white">{title}</h2>
        </div>
        {count !== undefined && (
          <span className="bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-white rounded-full px-3 py-1 text-xs font-medium">
            {count}
          </span>
        )}
      </div>

      <div className="text-sm space-y-3">
        <AnimatePresence initial={false}>
          {visibleItems.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: -5 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -5 }}
              transition={{ duration: 0.2 }}
            >
              {item}
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {showButton && (
        <div className="mt-4 text-right">
          <button
            onClick={() => setExpanded(!expanded)}
            className="text-sm text-blue-600 dark:text-blue-400 hover:underline transition-all"
          >
            {expanded ? "Voir moins" : "Voir plus"}
          </button>
        </div>
      )}
    </div>
  );
}
