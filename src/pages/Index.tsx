
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const Index = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="text-center space-y-6">
        <h1 className="text-4xl font-bold mb-4">AI Conversation Space</h1>
        <p className="text-xl text-gray-600 max-w-md mx-auto">
          A platform to test and interact with AI models through your local server connections.
        </p>
        <div>
          <Button asChild size="lg">
            <Link to="/chat">Start Chatting with AI</Link>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Index;
