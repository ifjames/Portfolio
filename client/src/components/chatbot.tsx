import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { MessageCircle, X, Send, Bot, User } from "lucide-react";

interface Message {
  id: string;
  text: string;
  isBot: boolean;
  timestamp: Date;
}

const botResponses: Record<string, string> = {
  "hello": "Hi there! I'm James's assistant. How can I help you today?",
  "hi": "Hello! I'm here to answer any questions about James Castillo. What would you like to know?",
  "location": "James is based in San Francisco, CA and is open to both local and remote opportunities.",
  "where": "James is located in San Francisco, CA. He's available for work worldwide through remote collaboration.",
  "availability": "James is currently available for new opportunities! He's open to discussing projects and job opportunities.",
  "available": "Yes, James is available for new projects and job opportunities. Feel free to reach out through the contact form!",
  "time": "James is available during Pacific Time business hours (9 AM - 6 PM PST) but can accommodate different time zones for international clients.",
  "hours": "James typically works during Pacific Time business hours but is flexible with scheduling for client needs.",
  "skills": "James specializes in full-stack development with expertise in React, Node.js, TypeScript, and modern web technologies.",
  "experience": "James has 5+ years of experience in full-stack development, creating modern web applications and user-centered designs.",
  "projects": "You can view James's latest projects in the Projects section. He's worked on e-commerce platforms, task management apps, and analytics dashboards.",
  "contact": "You can reach James through the contact form on this website, or connect with him on LinkedIn, Facebook, or Instagram.",
  "email": "You can email James at james.castillo@email.com or use the contact form on this website.",
  "phone": "James can be reached at +1 (555) 123-4567 for urgent inquiries.",
  "resume": "You can download James's resume from the About section of this website.",
  "technologies": "James works with React, Vue.js, Angular, Node.js, Python, PostgreSQL, MongoDB, AWS, Docker, and many other modern technologies.",
  "default": "I'm here to help! You can ask me about James's location, availability, skills, experience, or how to contact him. What would you like to know?"
};

function getBotResponse(userMessage: string): string {
  const message = userMessage.toLowerCase().trim();
  
  for (const [key, response] of Object.entries(botResponses)) {
    if (message.includes(key)) {
      return response;
    }
  }
  
  return botResponses.default;
}

export function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      text: "Hi! I'm James's virtual assistant. Ask me about his availability, location, skills, or how to contact him!",
      isBot: true,
      timestamp: new Date(),
    },
  ]);
  const [inputValue, setInputValue] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const sendMessage = async () => {
    if (!inputValue.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      text: inputValue,
      isBot: false,
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue("");
    setIsTyping(true);

    // Simulate typing delay
    setTimeout(() => {
      const botResponse: Message = {
        id: (Date.now() + 1).toString(),
        text: getBotResponse(inputValue),
        isBot: true,
        timestamp: new Date(),
      };

      setMessages(prev => [...prev, botResponse]);
      setIsTyping(false);
    }, 1000);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      sendMessage();
    }
  };

  return (
    <>
      {/* Chat Toggle Button */}
      <motion.div
        className="fixed bottom-6 right-6 z-50"
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 2 }}
      >
        <Button
          onClick={() => setIsOpen(!isOpen)}
          className="h-14 w-14 rounded-full shadow-lg hover:shadow-xl transition-shadow"
          size="icon"
        >
          {isOpen ? <X className="h-6 w-6" /> : <MessageCircle className="h-6 w-6" />}
        </Button>
      </motion.div>

      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 100, scale: 0.8 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 100, scale: 0.8 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="fixed bottom-24 right-6 z-40 w-80 h-96"
          >
            <Card className="h-full flex flex-col shadow-2xl">
              <CardHeader className="bg-primary text-primary-foreground rounded-t-lg">
                <CardTitle className="flex items-center gap-2 text-sm">
                  <Bot className="h-5 w-5" />
                  James's Assistant
                </CardTitle>
              </CardHeader>
              
              <CardContent className="flex-1 p-0 flex flex-col">
                <div className="flex-1 overflow-hidden">
                  <ScrollArea className="h-full">
                    <div className="p-4 space-y-4">
                      {messages.map((message) => (
                        <motion.div
                          key={message.id}
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          className={`flex ${message.isBot ? "justify-start" : "justify-end"}`}
                        >
                          <div
                            className={`flex items-start gap-2 max-w-[80%] ${
                              message.isBot ? "flex-row" : "flex-row-reverse"
                            }`}
                          >
                            <div
                              className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                                message.isBot
                                  ? "bg-primary text-primary-foreground"
                                  : "bg-muted text-muted-foreground"
                              }`}
                            >
                              {message.isBot ? <Bot className="h-4 w-4" /> : <User className="h-4 w-4" />}
                            </div>
                            <div
                              className={`rounded-lg p-3 text-sm break-words ${
                                message.isBot
                                  ? "bg-muted text-muted-foreground"
                                  : "bg-primary text-primary-foreground"
                              }`}
                            >
                              {message.text}
                            </div>
                          </div>
                        </motion.div>
                      ))}
                      
                      {isTyping && (
                        <motion.div
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          className="flex justify-start"
                        >
                          <div className="flex items-start gap-2">
                            <div className="w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center flex-shrink-0">
                              <Bot className="h-4 w-4" />
                            </div>
                            <div className="bg-muted rounded-lg p-3">
                              <div className="flex space-x-1">
                                <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce"></div>
                                <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce" style={{ animationDelay: "0.1s" }}></div>
                                <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce" style={{ animationDelay: "0.2s" }}></div>
                              </div>
                            </div>
                          </div>
                        </motion.div>
                      )}
                      <div ref={messagesEndRef} />
                    </div>
                  </ScrollArea>
                </div>
                
                <div className="p-4 border-t">
                  <div className="flex gap-2">
                    <Input
                      value={inputValue}
                      onChange={(e) => setInputValue(e.target.value)}
                      onKeyPress={handleKeyPress}
                      placeholder="Ask me anything..."
                      className="flex-1"
                    />
                    <Button onClick={sendMessage} size="icon">
                      <Send className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}