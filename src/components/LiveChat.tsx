import { useState } from "react";
import { MessageCircle, X, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";

interface Message {
  id: string;
  text: string;
  sender: "user" | "support";
  timestamp: Date;
}

const LiveChat = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      text: "Hello! Welcome to Nzuri Mobiles. How can we help you today?",
      sender: "support",
      timestamp: new Date(),
    },
  ]);
  const [inputValue, setInputValue] = useState("");

  const handleSend = () => {
    if (!inputValue.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      text: inputValue,
      sender: "user",
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputValue("");

    // Simulate support response
    setTimeout(() => {
      const supportMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: "Thank you for your message! Our support team will get back to you shortly. For urgent matters, please call us at +254 700 123 456.",
        sender: "support",
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, supportMessage]);
    }, 1000);
  };

  return (
    <>
      {/* Chat Button */}
      <button
        onClick={() => setIsOpen(true)}
        className={`fixed bottom-6 right-6 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-lg transition-all hover:scale-105 ${
          isOpen ? "hidden" : ""
        }`}
      >
        <MessageCircle className="h-6 w-6" />
      </button>

      {/* Chat Window */}
      {isOpen && (
        <div className="fixed bottom-6 right-6 z-50 flex h-[450px] w-[350px] flex-col overflow-hidden rounded-2xl border border-border bg-card shadow-xl">
          {/* Header */}
          <div className="flex items-center justify-between bg-primary px-4 py-3">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary-foreground/20">
                <MessageCircle className="h-5 w-5 text-primary-foreground" />
              </div>
              <div>
                <h3 className="font-semibold text-primary-foreground">Live Support</h3>
                <p className="text-xs text-primary-foreground/80">We typically reply instantly</p>
              </div>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="rounded-full p-1 text-primary-foreground/80 hover:bg-primary-foreground/20 hover:text-primary-foreground"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          {/* Messages */}
          <ScrollArea className="flex-1 p-4">
            <div className="flex flex-col gap-3">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex ${message.sender === "user" ? "justify-end" : "justify-start"}`}
                >
                  <div
                    className={`max-w-[80%] rounded-2xl px-4 py-2 ${
                      message.sender === "user"
                        ? "bg-primary text-primary-foreground"
                        : "bg-muted text-foreground"
                    }`}
                  >
                    <p className="text-sm">{message.text}</p>
                    <p
                      className={`mt-1 text-xs ${
                        message.sender === "user"
                          ? "text-primary-foreground/70"
                          : "text-muted-foreground"
                      }`}
                    >
                      {message.timestamp.toLocaleTimeString([], {
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </ScrollArea>

          {/* Input */}
          <div className="border-t border-border p-3">
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSend();
              }}
              className="flex gap-2"
            >
              <Input
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                placeholder="Type your message..."
                className="flex-1"
              />
              <Button type="submit" size="icon" className="shrink-0">
                <Send className="h-4 w-4" />
              </Button>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default LiveChat;
