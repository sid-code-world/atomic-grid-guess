import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useToast } from '@/components/ui/use-toast';
import PeriodicTable from './PeriodicTable';
import { Element, getRandomElement, getNeighborElements } from '@/data/periodicTableData';
import { ArrowLeft } from 'lucide-react';

interface ElementGuessingGameProps {
  onBackToMenu: () => void;
}

const ElementGuessingGame: React.FC<ElementGuessingGameProps> = ({ onBackToMenu }) => {
  const { toast } = useToast();
  const [targetElement, setTargetElement] = useState<Element | null>(null);
  const [guessInput, setGuessInput] = useState('');
  const [attempts, setAttempts] = useState<string[]>([]);
  const [gameState, setGameState] = useState<'playing' | 'won' | 'lost'>('playing');
  const [hints, setHints] = useState<string[]>([]);
  const [score, setScore] = useState(0);
  const [revealedElements, setRevealedElements] = useState<Element[]>([]);
  const [neighborElements, setNeighborElements] = useState<Element[]>([]);

  const maxAttempts = 5;

  const initGame = () => {
    const newElement = getRandomElement();
    setTargetElement(newElement);
    setGuessInput('');
    setAttempts([]);
    setGameState('playing');
    setHints([]);
    setRevealedElements([]);
    setNeighborElements([]);
    console.log('New target element:', newElement.name);
  };

  useEffect(() => {
    initGame();
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!guessInput.trim() || gameState !== 'playing') return;

    const guess = guessInput.trim().toLowerCase();
    
    setAttempts(prev => [...prev, guessInput]);
    setGuessInput('');

    if (targetElement && 
        (guess === targetElement.name.toLowerCase() || 
         guess === targetElement.symbol.toLowerCase())) {
      setGameState('won');
      setScore(prev => prev + (maxAttempts - attempts.length) * 10);
      setRevealedElements(prev => [...prev, targetElement]);
      
      toast({
        title: "Correct!",
        description: `You've correctly identified ${targetElement.name} (${targetElement.symbol})!`,
        variant: "default",
      });
    } else {
      toast({
        title: "Incorrect Guess",
        description: `${guessInput} is not the correct element. Try again!`,
        variant: "destructive",
      });

      const attemptsCount = attempts.length + 1;
      
      if (attemptsCount === 2 && targetElement) {
        const randomProperty = targetElement.properties[Math.floor(Math.random() * targetElement.properties.length)];
        setHints(prev => [...prev, `Hint: ${randomProperty}`]);
        
        toast({
          title: "Hint Unlocked",
          description: `Here's a property hint: ${randomProperty}`,
        });
      }
      
      if (attemptsCount === 4 && targetElement) {
        const neighbors = getNeighborElements(targetElement);
        setNeighborElements(neighbors);
        
        toast({
          title: "Hint Unlocked",
          description: "Neighboring elements are now revealed!",
        });

        setHints(prev => [...prev, `Hint: This element is near ${neighbors.map(n => n.symbol).join(', ')}`]);
      }
      
      if (attemptsCount >= maxAttempts) {
        setGameState('lost');
        setRevealedElements(prev => [...prev, targetElement]);
        
        toast({
          title: "Game Over",
          description: `The element was ${targetElement.name} (${targetElement.symbol}).`,
          variant: "destructive",
        });
      }
    }
  };

  const handleElementClick = (row: number, col: number) => {
    console.log(`Clicked element at row ${row}, col ${col}`);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-6">
        <Button 
          variant="outline" 
          size="sm" 
          onClick={onBackToMenu}
          className="flex items-center gap-1"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Menu
        </Button>
      </div>

      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold">Periodic Table Guessing Game</h1>
        <p className="text-gray-600 mt-2">
          Try to guess the highlighted element! You have {maxAttempts} chances.
        </p>
        
        <div className="mt-4 mb-6">
          <div className="font-medium">Current Score: {score}</div>
          <div className="text-sm text-gray-600">
            Attempts Remaining: {maxAttempts - attempts.length}
          </div>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-lg p-4 mb-6 overflow-hidden">
        <PeriodicTable
          highlightedElement={targetElement}
          revealedElements={revealedElements}
          neighborElements={neighborElements}
          onElementClick={handleElementClick}
        />
      </div>

      {hints.length > 0 && (
        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-6">
          <h3 className="font-bold text-yellow-800 mb-2">Hints:</h3>
          <ul className="list-disc pl-5">
            {hints.map((hint, index) => (
              <li key={index} className="text-yellow-700">{hint}</li>
            ))}
          </ul>
        </div>
      )}

      {gameState === 'playing' ? (
        <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-2 justify-center mb-6">
          <Input
            type="text"
            value={guessInput}
            onChange={(e) => setGuessInput(e.target.value)}
            placeholder="Enter element name or symbol"
            className="flex-grow max-w-md"
            disabled={gameState !== 'playing'}
          />
          <Button type="submit" disabled={gameState !== 'playing'}>
            Guess
          </Button>
        </form>
      ) : (
        <div className="flex justify-center mb-6">
          <Button onClick={initGame} className="px-8">
            Play Again
          </Button>
        </div>
      )}

      {attempts.length > 0 && (
        <div className="mt-4">
          <h3 className="font-medium text-gray-700 mb-2">Previous Guesses:</h3>
          <div className="flex flex-wrap gap-2 justify-center">
            {attempts.map((attempt, index) => (
              <span key={index} className="bg-gray-100 px-3 py-1 rounded text-sm">
                {attempt}
              </span>
            ))}
          </div>
        </div>
      )}

      {gameState !== 'playing' && (
        <div className={`text-center mt-6 p-4 rounded-lg ${gameState === 'won' ? 'bg-green-50 text-green-700' : 'bg-red-50 text-red-700'}`}>
          <h2 className="text-2xl font-bold mb-2">
            {gameState === 'won' ? 'Congratulations!' : 'Game Over'}
          </h2>
          <p>
            {gameState === 'won' 
              ? `You correctly guessed ${targetElement?.name} in ${attempts.length} attempts!` 
              : `The correct element was ${targetElement?.name} (${targetElement?.symbol}).`}
          </p>
        </div>
      )}
    </div>
  );
};

export default ElementGuessingGame;
