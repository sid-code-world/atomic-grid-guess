
import { Button } from "@/components/ui/button";
import { useState } from "react";
import ElementGuessingGame from "@/components/ElementGuessingGame";
import TimedElementGame from "@/components/TimedElementGame";
import { Clock } from "lucide-react";

const Index = () => {
  const [gameStarted, setGameStarted] = useState(false);
  const [gameMode, setGameMode] = useState<"classic" | "timed">("classic");
  const [timeLimit, setTimeLimit] = useState<number>(0);

  const handleBackToMenu = () => {
    setGameStarted(false);
  };

  if (!gameStarted) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50">
        <div className="text-center max-w-2xl mx-auto px-4">
          <h1 className="text-4xl font-bold mb-4">Periodic Table Challenge</h1>
          <p className="text-xl text-gray-600 mb-8">
            Test your knowledge of the periodic table! Can you identify the highlighted elements?
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
            <Button 
              variant={gameMode === "classic" ? "default" : "outline"} 
              onClick={() => setGameMode("classic")}
              className="px-6 py-3"
            >
              Classic Mode
            </Button>
            <Button 
              variant={gameMode === "timed" ? "default" : "outline"} 
              onClick={() => setGameMode("timed")}
              className="px-6 py-3"
            >
              <Clock className="mr-2 h-4 w-4" />
              Timed Mode
            </Button>
          </div>
          
          {gameMode === "classic" && (
            <div className="space-y-4">
              <p className="text-gray-700">
                You'll have 5 chances to guess correctly. After 2 incorrect guesses, you'll get a hint about the element's properties.
                After 4 incorrect guesses, the neighboring elements will be revealed.
              </p>
              <Button 
                size="lg" 
                onClick={() => setGameStarted(true)}
                className="mt-6 px-8 py-6 text-lg"
              >
                Start Game
              </Button>
            </div>
          )}
          
          {gameMode === "timed" && (
            <div className="space-y-4">
              <p className="text-gray-700">
                Guess as many elements as possible within the time limit. You have one chance per element.
                Correct guesses remain visible on the board and a new element is highlighted.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-3 justify-center mt-4">
                <Button 
                  variant={timeLimit === 60 ? "default" : "outline"}
                  onClick={() => setTimeLimit(60)}
                  className="px-6 py-3"
                >
                  1 Minute
                </Button>
                <Button 
                  variant={timeLimit === 180 ? "default" : "outline"}
                  onClick={() => setTimeLimit(180)}
                  className="px-6 py-3"
                >
                  3 Minutes
                </Button>
                <Button 
                  variant={timeLimit === 300 ? "default" : "outline"}
                  onClick={() => setTimeLimit(300)}
                  className="px-6 py-3"
                >
                  5 Minutes
                </Button>
              </div>
              
              <Button 
                size="lg" 
                onClick={() => setGameStarted(true)}
                disabled={timeLimit === 0}
                className="mt-6 px-8 py-6 text-lg"
              >
                Start Timed Game
              </Button>
            </div>
          )}
        </div>
      </div>
    );
  }

  return gameMode === "classic" 
    ? <ElementGuessingGame onBackToMenu={handleBackToMenu} /> 
    : <TimedElementGame timeLimit={timeLimit} onBackToMenu={handleBackToMenu} />;
};

export default Index;
