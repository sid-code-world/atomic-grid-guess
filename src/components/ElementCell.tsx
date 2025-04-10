
import React from 'react';
import { cn } from "@/lib/utils";
import { Element } from "@/data/periodicTableData";

interface ElementCellProps {
  position: { row: number; col: number };
  element?: Element;
  isHighlighted: boolean;
  isRevealed: boolean;
  isNeighborRevealed: boolean;
  onClick: (row: number, col: number) => void;
}

const ElementCell: React.FC<ElementCellProps> = ({
  position,
  element,
  isHighlighted,
  isRevealed,
  isNeighborRevealed,
  onClick
}) => {
  const { row, col } = position;
  
  // Determine cell classes based on state
  const cellClasses = cn(
    "w-14 h-14 border rounded flex flex-col items-center justify-center text-center cursor-pointer transition-all duration-300 text-xs md:text-sm",
    isHighlighted ? "bg-element-highlighted text-white animate-pulse-highlight" : "bg-element-default",
    isRevealed ? "bg-element-correct text-white" : "",
    isNeighborRevealed && !isHighlighted && !isRevealed ? "bg-element-hints text-gray-800" : "",
    !element && "opacity-50 cursor-not-allowed bg-gray-50"
  );

  // Only render content if there's an element assigned to this position
  return (
    <div 
      className={cellClasses}
      onClick={() => element && onClick(row, col)}
    >
      {element && (
        <>
          {/* Show symbol only for revealed or neighbor elements, NOT for highlighted */}
          {(isRevealed || isNeighborRevealed) && (
            <div className="font-bold">{element.symbol}</div>
          )}
          {/* Only show name for fully revealed elements */}
          {isRevealed && (
            <div className="text-[8px] leading-tight">{element.name}</div>
          )}
        </>
      )}
    </div>
  );
};

export default ElementCell;
