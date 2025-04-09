
import React from 'react';
import ElementCell from './ElementCell';
import { Element, getElementByPosition } from '@/data/periodicTableData';

interface PeriodicTableProps {
  highlightedElement: Element | null;
  revealedElements: Element[];
  neighborElements: Element[];
  onElementClick: (row: number, col: number) => void;
  showLanthanoids?: boolean;
  showActinoids?: boolean;
}

const PeriodicTable: React.FC<PeriodicTableProps> = ({
  highlightedElement,
  revealedElements,
  neighborElements,
  onElementClick,
  showLanthanoids = false,
  showActinoids = false
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

  // Render lanthanoids (row 8, cols 3-16)
  const renderLanthanoids = () => {
    if (!showLanthanoids) return null;
    
    const lanthanoidRow = [];
    for (let col = 3; col <= 16; col++) {
      const element = getElementByPosition(8, col);
      
      const isHighlighted = highlightedElement && element ? 
        (highlightedElement.atomicNumber === element.atomicNumber) : 
        false;
      
      const isRevealed = element ? 
        revealedElements.some(e => e.atomicNumber === element.atomicNumber) : 
        false;
      
      const isNeighborRevealed = element ? 
        neighborElements.some(e => e.atomicNumber === element.atomicNumber) : 
        false;
      
      lanthanoidRow.push(
        <div key={`lanthanoid-${col}`} className="m-0.5">
          <ElementCell
            position={{ row: 8, col }}
            element={element}
            isHighlighted={isHighlighted}
            isRevealed={isRevealed}
            isNeighborRevealed={isNeighborRevealed}
            onClick={onElementClick}
          />
        </div>
      );
    }
    
    return (
      <div className="mt-4">
        <div className="text-center text-sm text-gray-600 mb-1">Lanthanoids</div>
        <div className="flex flex-row flex-wrap justify-center">
          {lanthanoidRow}
        </div>
      </div>
    );
  };

  // Render actinoids (row 9, cols 3-16)
  const renderActinoids = () => {
    if (!showActinoids) return null;
    
    const actinoidRow = [];
    for (let col = 3; col <= 16; col++) {
      const element = getElementByPosition(9, col);
      
      const isHighlighted = highlightedElement && element ? 
        (highlightedElement.atomicNumber === element.atomicNumber) : 
        false;
      
      const isRevealed = element ? 
        revealedElements.some(e => e.atomicNumber === element.atomicNumber) : 
        false;
      
      const isNeighborRevealed = element ? 
        neighborElements.some(e => e.atomicNumber === element.atomicNumber) : 
        false;
      
      actinoidRow.push(
        <div key={`actinoid-${col}`} className="m-0.5">
          <ElementCell
            position={{ row: 9, col }}
            element={element}
            isHighlighted={isHighlighted}
            isRevealed={isRevealed}
            isNeighborRevealed={isNeighborRevealed}
            onClick={onElementClick}
          />
        </div>
      );
    }
    
    return (
      <div className="mt-2">
        <div className="text-center text-sm text-gray-600 mb-1">Actinoids</div>
        <div className="flex flex-row flex-wrap justify-center">
          {actinoidRow}
        </div>
      </div>
    );
  };

  return (
    <div className="overflow-x-auto">
      <div className="min-w-max">
        {renderGrid()}
        {renderLanthanoids()}
        {renderActinoids()}
      </div>
    </div>
  );
};

export default PeriodicTable;
