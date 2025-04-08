
import { Button } from "@/components/ui/button";
import { useState } from "react";
import ElementGuessingGame from "@/components/ElementGuessingGame";

const Index = () => {
  const [gameStarted, setGameStarted] = useState(false);

  if (!gameStarted) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50">
        <div className="text-center max-w-2xl mx-auto px-4">
          <h1 className="text-4xl font-bold mb-4">Periodic Table Challenge</h1>
          <p className="text-xl text-gray-600 mb-8">
            Test your knowledge of the periodic table! Can you identify the highlighted element?
          </p>
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
        </div>
      </div>
    );
  }

  return <ElementGuessingGame />;
};

export default Index;
