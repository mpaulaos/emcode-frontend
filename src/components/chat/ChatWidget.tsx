import { useState, useRef, useEffect } from "react";
import {
  Button,
  Dialog,
  DialogTrigger,
  Popover,
  TextField,
  Label,
  Input,
} from "react-aria-components";
import { tv } from "tailwind-variants";
import { useChat } from "../../hooks/useChat";
import { useAccessibility } from "../../hooks/useAccessibility";
import { X, Send } from "lucide-react";

import gekobot from "../../assets/gekobot.png";
import welcomeGekobot from "../../assets/gekobot-welcome.png";

const chatButton = tv({
  base: "fixed bottom-4 right-4 z-50 w-18 h-18 rounded-full text-white shadow-lg flex items-center justify-center cursor-pointer motion-safe:hover:h-20 motion-safe:hover:w-20 pressed:bg-purple-800 focus-visible:outline focus-visible:outline-2 focus-visible:outline-purple-600",
});

const messageBubble = tv({
  base: "max-w-[75%] px-3 py-2 text-sm rounded-lg relative",
  variants: {
    role: {
      user: "bg-primary text-white self-end rounded-tr-none",
      assistant: "bg-neutral-white text-neutral-800 border border-neutral-100 rounded-tl-none",
    },
  },
});

const inputStyle = tv({
  base: "flex-1 border border-primary rounded-sm px-3 py-2 text-sm outline-none focus:border-primary dark:bg-neutral-white dark:border-primary dark:text-neutral-600 w-full",
});

const sendButton = tv({
  base: "bg-neutral-white text-primary px-3 py-2 rounded-lg text-sm hover:bg-primary hover:text-white pressed:bg-blue-800 focus-visible:outline focus-visible:outline-2 focus-visible:outline-blue-600 disabled:opacity-50 cursor-pointer",
});

function ChatWidget() {
  const { messages, isLoading, error, sendMessage} = useChat();
  const { settings } = useAccessibility();
  const [input, setInput] = useState("");
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const prefersReduced = settings.reducedMotion !== 'off' || settings.pauseAnimations;
    bottomRef.current?.scrollIntoView({ behavior: prefersReduced ? 'auto' : 'smooth' });
  }, [messages, settings.reducedMotion, settings.pauseAnimations]);

  const handleSubmit = async () => {
    if (!input.trim() || isLoading) return;
    const text = input;
    setInput("");
    await sendMessage(text);
  };

  const [isOpen, setIsOpen] = useState(false);

  return (
    <DialogTrigger isOpen={isOpen} onOpenChange={setIsOpen}>
      {/* Botón flotante */}
      <Button
        aria-label="Abrir asistente de Emcode"
        className={chatButton()}
      >
        <img src={gekobot} alt="Gekobot" className="w-full h-full object-cover" />
      </Button>

      {/* Popover con el chat */}
      <Popover placement="left" offset={12} shouldFlip={false}>
        <Dialog
          aria-label="Asistente de Emcode Gekobot"
          className="fixed bottom-25 right-8 w-90 h-110 bg-neutral-white border border-neutral-100 rounded-xl shadow-sm flex flex-col outline-none z-50"
        >
          {/* Header */}
          <div className="flex justify-between items-center p-3 border-b border-neutral-200 bg-neutral-100 rounded-t-xl">
            <h2 className="text-neutral-black font-bold text-sm">
              Chatbot Gekobot
            </h2>
            <Button
              onPress={() => setIsOpen(false)}
              aria-label="Limpiar conversación"
              className="hover:opacity-100 cursor-pointer focus-visible:outline-2 focus-visible:outline-white rounded-xxl border border-primary p-2xs"
            >
              <X className="w-4 h-4 text-primary" />
            </Button>
          </div>

          {/* Mensajes */}
          <div
            className="flex-1 overflow-y-auto px-lg space-y-3"
            aria-live="polite"
            aria-label="Conversación con el asistente"
          >
            {messages.length === 0 && (
              <div className="flex flex-col items-center gap-xs mt-4">
                <div>
                  <img src={welcomeGekobot} alt="Gekobot" className="w-30 h-30 object-cover" />
                </div>
                <div>
                  <p className="text-center text-neutral-black text-sm font-bold">¡Hola! </p>
                  <p className="text-center text-neutral-black text-sm font-bold">
                    Soy <span className="text-primary">Gekobot</span>, tu asistente virtual inteligente
                  </p>
                </div>
                <p className="text-center text-neutral-400 text-xs mt-4">
                  Estoy listo para guiarte, resolver tus dudas y acompañarte en lo que necesites.
                </p>
              </div>
            )}

            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"} py-3`}
              >
                <article
                  className={messageBubble({ role: msg.role })}
                  aria-label={msg.role === "user" ? "Tu mensaje" : "Respuesta del asistente"}
                >
                  {msg.content}
                </article>
              </div>
            ))}

            {isLoading && (
              <div className="flex justify-start">
                <div
                  className="bg-neutral-100 px-3 py-2 rounded-2xl text-sm text-neutral-500"
                  aria-live="polite"
                  aria-label="El asistente está escribiendo"
                >
                  Escribiendo...
                </div>
              </div>
            )}

            {error && (
              <p role="alert" className="text-center text-red-500 text-xs">
                {error}
              </p>
            )}

            <div ref={bottomRef} />
          </div>

          <div className="px-lg">
            <hr className="border border-neutral-100" />
          </div>

          {/* Input */}
          <div className="flex gap-xs p-lg">
            <TextField
              aria-label="Mensaje para el asistente"
              value={input}
              onChange={setInput}
              className="flex-1"
            >
              <Label className="sr-only">Escribe aquí tus dudas</Label>
              <Input
                className={inputStyle()}
                placeholder="Escribe aquí tus dudas"
                disabled={isLoading}
                onKeyDown={(e) => e.key === "Enter" && handleSubmit()}
              />
            </TextField>
            <Button
              onPress={handleSubmit}
              isDisabled={isLoading || !input.trim()}
              aria-label="Enviar mensaje"
              className={sendButton()}
            >
              <Send className="w-5 h-5" />
            </Button>
          </div>
        </Dialog>
      </Popover>
    </DialogTrigger>
  );
}

export default ChatWidget;