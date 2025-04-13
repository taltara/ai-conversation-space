
import { useState, useRef, useEffect } from "react";
import { Send, Mic, MoreVertical, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Separator } from "@/components/ui/separator";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import { toast } from "@/components/ui/sonner";
import { Avatar } from "@/components/ui/avatar";
import ChatMessage from "@/components/ChatMessage";
import { cn } from "@/lib/utils";

// Temporary API key configuration
const GPT_API_KEY = "12345";

interface Message {
  id: string;
  content: string;
  role: "user" | "assistant";
  timestamp: Date;
}

const Chat = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [selectedModel, setSelectedModel] = useState("gpt-4o");
  
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = async () => {
    if (inputValue.trim() === "") return;
    
    const userMessage: Message = {
      id: Date.now().toString(),
      content: inputValue,
      role: "user",
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputValue("");
    setIsLoading(true);

    // Simulate AI response with API key check
    setTimeout(() => {
      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: `API Key used: ${GPT_API_KEY ? 'Valid' : 'Missing'}. This is a simulated response. In a real implementation, this would connect to the AI API using the provided key.`,
        role: "assistant",
        timestamp: new Date(),
      };
      
      setMessages((prev) => [...prev, aiMessage]);
      setIsLoading(false);
    }, 1500);

    // Focus back on the textarea
    if (textareaRef.current) {
      textareaRef.current.focus();
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const handleModelChange = (value: string) => {
    setSelectedModel(value);
    toast(`Switched to ${value} model`);
  };

  return (
    <div className="flex flex-col h-screen bg-background text-foreground">
      {/* Header */}
      <header className="border-b p-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <h1 className="font-semibold text-xl">AI Chat</h1>
          <Select value={selectedModel} onValueChange={handleModelChange}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Select model" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="gpt-4o">GPT-4o</SelectItem>
              <SelectItem value="claude-3">Claude 3</SelectItem>
              <SelectItem value="llama-3">Llama 3</SelectItem>
              <SelectItem value="mistral">Mistral AI</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="icon">
            <ChevronDown className="h-5 w-5" />
          </Button>
          <Button variant="ghost" size="icon">
            <MoreVertical className="h-5 w-5" />
          </Button>
        </div>
      </header>

      {/* Chat messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-full text-muted-foreground">
            <div className="text-center max-w-md space-y-4">
              <h2 className="text-xl font-medium">Start a conversation</h2>
              <p>
                Ask anything to test your connections with your local server.
              </p>
            </div>
          </div>
        ) : (
          messages.map((message) => (
            <ChatMessage key={message.id} message={message} />
          ))
        )}
        {isLoading && (
          <div className="flex items-start gap-3">
            <Avatar className="h-8 w-8 bg-primary/10">
              <div className="h-full w-full flex items-center justify-center">
                <span className="animate-pulse">•••</span>
              </div>
            </Avatar>
            <div className="rounded-lg bg-muted py-2 px-3 text-sm w-fit max-w-3xl">
              AI is thinking...
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Input area */}
      <div className="border-t bg-background p-4">
        <div className="mx-auto max-w-4xl relative">
          <Textarea
            ref={textareaRef}
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Ask anything..."
            className="min-h-24 resize-none pr-20 py-3 bg-background border-input"
            rows={1}
          />
          <div className="absolute right-3 bottom-3 flex items-center gap-2">
            <Button
              variant="ghost"
              size="icon"
              className="rounded-full h-9 w-9"
              type="button"
            >
              <Mic className="h-5 w-5" />
              <span className="sr-only">Voice input</span>
            </Button>
            <Button
              onClick={handleSendMessage}
              disabled={inputValue.trim() === "" || isLoading}
              className={cn(
                "rounded-full h-9 w-9",
                inputValue.trim() === "" ? "opacity-50" : "opacity-100"
              )}
              type="button"
            >
              <Send className="h-5 w-5" />
              <span className="sr-only">Send message</span>
            </Button>
          </div>
        </div>
        <div className="text-xs text-center text-muted-foreground mt-2">
          This is a demo implementation. Connect your own AI API endpoints.
        </div>
      </div>
    </div>
  );
};

export default Chat;
