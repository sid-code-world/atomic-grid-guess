
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useToast } from '@/components/ui/use-toast';
import PeriodicTable from './PeriodicTable';
import { Element, getRandomElement, getNeighborElements } from '@/data/periodicTableData';

const ElementGuessingGame: React.FC = () => {
  const { toast } = useToast();
  const [targetElement, setTargetElement] = useState<Element | null>(null);
  const [guessInput, setGuessInput] = useState('');
  const [attempts, setAttempts] = useState<string[]>([]);
  const [gameState, setGameState] = useState<'playing' | 'won' | 'lost'>('playing');
  const [hints, setHints] = useState<string[]>([]);
  const [score, setScore] = useState(0);
  const [revealedElements, setRevealedElements] = useState<Element[]>([]);
  const [neighborElements, setNeighborElements] = useState<Element[]>([]);

  // Maximum number of attempts
  const maxAttempts = 5;

  // Initialize or reset the game
  const initGame = () => {
    const newElement = getRandomElement();
    setTargetElement(newElement);
    setGuessInput('');
    setAttempts([]);
    setGameState('playing');
    setHints([]);
    setRevealedElements([]);
    setNeighborElements([]);
    console.log('New target element:', newElement.name); // For debugging
  };

  // Start the game when the component mounts
  useEffect(() => {
    initGame();
  }, []);

  // Handle form submit for guesses
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!guessInput.trim() || gameState !== 'playing') return;

    const guess = guessInput.trim().toLowerCase();
    
    // Add the guess to attempts
    setAttempts(prev => [...prev, guessInput]);
    setGuessInput('');

    // Check if the guess is correct
    if (targetElement && 
        (guess === targetElement.name.toLowerCase() || 
         guess === targetElement.symbol.toLowerCase())) {
      // Correct guess
      setGameState('won');
      setScore(prev => prev + (maxAttempts - attempts.length) * 10);
      setRevealedElements(prev => [...prev, targetElement]);
      
      toast({
        title: "Correct!",
        description: `You've correctly identified ${targetElement.name} (${targetElement.symbol})!`,
        variant: "default",
      });
    } else {
      // Incorrect guess
      toast({
        title: "Incorrect Guess",
        description: `${guessInput} is not the correct element. Try again!`,
        variant: "destructive",
      });

      // Check if we should provide hints
      const attemptsCount = attempts.length + 1;
      
      // After 2 incorrect guesses, show properties hint
      if (attemptsCount === 2 && targetElement) {
        const randomProperty = targetElement.properties[Math.floor(Math.random() * targetElement.properties.length)];
        setHints(prev => [...prev, `Hint: ${randomProperty}`]);
        
        toast({
          title: "Hint Unlocked",
          description: `Here's a property hint: ${randomProperty}`,
        });
      }
      
      // After 4 incorrect guesses, show neighbor elements
      if (attemptsCount === 4 && targetElement) {
        const neighbors = getNeighborElements(targetElement);
        setNeighborElements(neighbors);
        
        toast({
          title: "Hint Unlocked",
          description: "Neighboring elements are now revealed!",
        });

        setHints(prev => [...prev, `Hint: This element is near ${neighbors.map(n => n.symbol).join(', ')}`]);
      }
      
      // Check if max attempts reached
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

  // Handle click on element cell
  const handleElementClick = (row: number, col: number) => {
    // This would be used if you want to implement clicking elements instead of typing
    // For now, we'll just log the position
    console.log(`Clicked element at row ${row}, col ${col}`);
  };

  return (
    <div className="container mx-auto px-4 py-8">
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
          showLanthanoids={true}
          showActinoids={true}
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
