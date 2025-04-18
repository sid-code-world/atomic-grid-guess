import React, { useState, useEffect, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useToast } from '@/components/ui/use-toast';
import PeriodicTable from './PeriodicTable';
import { Element, getRandomElement } from '@/data/periodicTableData';
import { formatTime } from '@/lib/timeUtils';
import { getRandomElementExcluding } from '@/lib/elementUtils';
import { ArrowLeft } from 'lucide-react';

interface TimedElementGameProps {
  timeLimit: number;
  onBackToMenu: () => void;
}

const TimedElementGame: React.FC<TimedElementGameProps> = ({ timeLimit, onBackToMenu }) => {
  const { toast } = useToast();
  const [targetElement, setTargetElement] = useState<Element | null>(null);
  const [guessInput, setGuessInput] = useState('');
  const [gameState, setGameState] = useState<'playing' | 'finished'>('playing');
  const [score, setScore] = useState(0);
  const [correctlyGuessed, setCorrectlyGuessed] = useState<Element[]>([]);
  const [timeRemaining, setTimeRemaining] = useState(timeLimit);
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const selectRandomElement = () => {
    const excludeAtomicNumbers = correctlyGuessed.map(e => e.atomicNumber);
    const newElement = excludeAtomicNumbers.length > 0 
      ? getRandomElementExcluding(excludeAtomicNumbers)
      : getRandomElement();
    setTargetElement(newElement);
    console.log('New target element:', newElement.name);
  };

  useEffect(() => {
    selectRandomElement();
    
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
    
    if (inputRef.current) {
      inputRef.current.focus();
    }
    
    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    };
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!guessInput.trim() || gameState !== 'playing' || !targetElement) return;

    const guess = guessInput.trim().toLowerCase();
    setGuessInput('');
    
    if (guess === targetElement.name.toLowerCase() || guess === targetElement.symbol.toLowerCase()) {
      setScore(prev => prev + 10);
      setCorrectlyGuessed(prev => [...prev, targetElement]);
      
      toast({
        title: "Correct!",
        description: `${targetElement.name} (${targetElement.symbol}) is correct!`,
        variant: "default",
      });
      
      selectRandomElement();
    } else {
      toast({
        title: "Incorrect",
        description: `That's not the correct element. Try the next one!`,
        variant: "destructive",
      });
      
      selectRandomElement();
    }
    
    if (inputRef.current) {
      inputRef.current.focus();
    }
  };

  const handleRestart = () => {
    setScore(0);
    setCorrectlyGuessed([]);
    setTimeRemaining(timeLimit);
    setGameState('playing');
    selectRandomElement();
    
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
