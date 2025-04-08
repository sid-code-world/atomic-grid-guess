
import React from 'react';
import ElementCell from './ElementCell';
import { Element, getElementByPosition } from '@/data/periodicTableData';

interface PeriodicTableProps {
  highlightedElement: Element | null;
  revealedElements: Element[];
  neighborElements: Element[];
  onElementClick: (row: number, col: number) => void;
}

const PeriodicTable: React.FC<PeriodicTableProps> = ({
  highlightedElement,
  revealedElements,
  neighborElements,
  onElementClick
}) => {
  // Define the table structure: 7 rows, 18 columns
  const rows = 7;
  const cols = 18;

  // Create grid cells
  const renderGrid = () => {
    const grid = [];
    
    for (let row = 1; row <= rows; row++) {
      const rowCells = [];
      
      for (let col = 1; col <= cols; col++) {
        // Get element at this position (if exists)
        const element = getElementByPosition(row, col);
        
        // Check if this element is the highlighted one
        const isHighlighted = highlightedElement ? 
          (highlightedElement.position.row === row && highlightedElement.position.col === col) : 
          false;
        
        // Check if element is revealed (guessed correctly)
        const isRevealed = element ? 
          revealedElements.some(e => e.atomicNumber === element.atomicNumber) : 
          false;
        
        // Check if element is a neighbor that should be revealed
        const isNeighborRevealed = element ? 
          neighborElements.some(e => e.atomicNumber === element.atomicNumber) : 
          false;
        
        rowCells.push(
          <div key={`cell-${row}-${col}`} className="m-0.5">
            <ElementCell
              position={{ row, col }}
              element={element}
              isHighlighted={isHighlighted}
              isRevealed={isRevealed}
              isNeighborRevealed={isNeighborRevealed}
              onClick={onElementClick}
            />
          </div>
        );
      }
      
      grid.push(
        <div key={`row-${row}`} className="flex flex-row flex-wrap">
          {rowCells}
        </div>
      );
    }
    
    return grid;
  };

  return (
    <div className="overflow-x-auto">
      <div className="min-w-max">
        {renderGrid()}
      </div>
    </div>
  );
};

export default PeriodicTable;
