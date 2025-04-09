
import React, { useState, useEffect, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useToast } from '@/components/ui/use-toast';
import PeriodicTable from './PeriodicTable';
import { Element, getRandomElement } from '@/data/periodicTableData';
import { formatTime } from '@/lib/timeUtils';

interface TimedElementGameProps {
  timeLimit: number;
}

const TimedElementGame: React.FC<TimedElementGameProps> = ({ timeLimit }) => {
  const { toast } = useToast();
  const [targetElement, setTargetElement] = useState<Element | null>(null);
  const [guessInput, setGuessInput] = useState('');
  const [gameState, setGameState] = useState<'playing' | 'finished'>('playing');
  const [score, setScore] = useState(0);
  const [correctlyGuessed, setCorrectlyGuessed] = useState<Element[]>([]);
  const [timeRemaining, setTimeRemaining] = useState(timeLimit);
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Select a random element that hasn't been correctly guessed yet
  const selectRandomElement = () => {
    const newElement = getRandomElement(correctlyGuessed.map(e => e.atomicNumber));
    setTargetElement(newElement);
    console.log('New target element:', newElement.name); // For debugging
  };

  // Initialize the game
  useEffect(() => {
    selectRandomElement();
    
    // Start the timer
    timerRef.current = setInterval(() => {
      setTimeRemaining(prev => {
        if (prev <= 1) {
          // Time's up
          clearInterval(timerRef.current!);
          setGameState('finished');
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    
    // Focus on the input field
    if (inputRef.current) {
      inputRef.current.focus();
    }
    
    // Cleanup on unmount
    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    };
  }, []);

  // Handle form submit for guesses
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!guessInput.trim() || gameState !== 'playing' || !targetElement) return;

    const guess = guessInput.trim().toLowerCase();
    setGuessInput('');
    
    // Check if the guess is correct
    if (guess === targetElement.name.toLowerCase() || guess === targetElement.symbol.toLowerCase()) {
      // Correct guess
      setScore(prev => prev + 10);
      setCorrectlyGuessed(prev => [...prev, targetElement]);
      
      toast({
        title: "Correct!",
        description: `${targetElement.name} (${targetElement.symbol}) is correct!`,
        variant: "default",
      });
      
      // Select a new element
      selectRandomElement();
    } else {
      // Incorrect guess
      toast({
        title: "Incorrect",
        description: `That's not ${targetElement.name}. Try the next one!`,
        variant: "destructive",
      });
      
      // Select a new element
      selectRandomElement();
    }
    
    // Focus back on input
    if (inputRef.current) {
      inputRef.current.focus();
    }
  };

  // Handle restarting the game
  const handleRestart = () => {
    setScore(0);
    setCorrectlyGuessed([]);
    setTimeRemaining(timeLimit);
    setGameState('playing');
    selectRandomElement();
    
    // Restart the timer
    if (timerRef.current) {
      clearInterval(timerRef.current);
    }
    
    timerRef.current = setInterval(() => {
      setTimeRemaining(prev => {
        if (prev <= 1) {
          clearInterval(timerRef.current!);
          setGameState('finished');
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold">Timed Periodic Table Challenge</h1>
        
        <div className="flex flex-col sm:flex-row justify-center gap-6 items-center mt-4">
          <div className="font-medium text-xl">Score: {score}</div>
          <div className={`font-bold text-2xl ${timeRemaining < 10 ? 'text-red-600 animate-pulse' : ''}`}>
            Time: {formatTime(timeRemaining)}
          </div>
          <div className="font-medium">
            Elements Guessed: {correctlyGuessed.length}
          </div>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-lg p-4 mb-6 overflow-hidden">
        <PeriodicTable
          highlightedElement={targetElement}
          revealedElements={correctlyGuessed}
          neighborElements={[]}
          onElementClick={() => {}}
        />
      </div>

      {gameState === 'playing' ? (
        <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-2 justify-center mb-6">
          <Input
            type="text"
            value={guessInput}
            onChange={(e) => setGuessInput(e.target.value)}
            placeholder="Enter element name or symbol"
            className="flex-grow max-w-md"
            disabled={gameState !== 'playing'}
            ref={inputRef}
          />
          <Button type="submit" disabled={gameState !== 'playing'}>
            Guess
          </Button>
        </form>
      ) : (
        <div className="flex justify-center mb-6">
          <Button onClick={handleRestart} className="px-8">
            Play Again
          </Button>
        </div>
      )}

      {gameState === 'finished' && (
        <div className="text-center mt-6 p-6 rounded-lg bg-blue-50 border border-blue-200">
          <h2 className="text-2xl font-bold mb-2">Time's Up!</h2>
          <p className="text-lg mb-4">
            You correctly identified <span className="font-bold">{correctlyGuessed.length}</span> elements 
            and scored <span className="font-bold">{score}</span> points.
          </p>
          
          {correctlyGuessed.length > 0 && (
            <div className="mt-4">
              <h3 className="font-medium">Elements you identified:</h3>
              <div className="flex flex-wrap gap-2 justify-center mt-2">
                {correctlyGuessed.map(element => (
                  <span key={element.atomicNumber} className="bg-green-100 text-green-800 px-3 py-1 rounded text-sm">
                    {element.symbol} ({element.name})
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default TimedElementGame;
