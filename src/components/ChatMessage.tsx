
import { formatDistanceToNow } from "date-fns";
import { Avatar } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Copy } from "lucide-react";
import { toast } from "@/components/ui/sonner";

interface Message {
  id: string;
  content: string;
  role: "user" | "assistant";
  timestamp: Date;
}

interface ChatMessageProps {
  message: Message;
}

const ChatMessage = ({ message }: ChatMessageProps) => {
  const isUser = message.role === "user";
  
  const copyToClipboard = () => {
    navigator.clipboard.writeText(message.content);
    toast("Message copied to clipboard");
  };
  
  return (
    <div className={`flex items-start gap-3 group animate-fade-in ${isUser ? "justify-end" : ""}`}>
      {!isUser && (
        <Avatar className="h-8 w-8 bg-primary/10">
          <div className="h-full w-full flex items-center justify-center">
            <span className="text-xs font-semibold">AI</span>
          </div>
        </Avatar>
      )}
      
      <div className="space-y-1 max-w-3xl">
        <div
          className={`rounded-lg py-2 px-3 text-sm ${
            isUser
              ? "bg-primary text-primary-foreground"
              : "bg-muted"
          }`}
        >
          {message.content}
        </div>
        <div className="flex items-center gap-2 text-xs text-muted-foreground">
          <span>{formatDistanceToNow(message.timestamp, { addSuffix: true })}</span>
          <Button
            variant="ghost"
            size="sm"
            className="h-6 w-6 rounded-full p-0 opacity-0 group-hover:opacity-100 transition-opacity"
            onClick={copyToClipboard}
          >
            <Copy className="h-3 w-3" />
            <span className="sr-only">Copy</span>
          </Button>
        </div>
      </div>
      
      {isUser && (
        <Avatar className="h-8 w-8 bg-primary">
          <div className="h-full w-full flex items-center justify-center">
            <span className="text-xs font-semibold text-primary-foreground">You</span>
          </div>
        </Avatar>
      )}
    </div>
  );
};

export default ChatMessage;
