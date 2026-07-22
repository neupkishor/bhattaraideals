'use client';

import { useState } from 'react';
import { ArrowLeft, MessageCircle, Send, X } from 'lucide-react';
import { Button } from '@/components/ui/button';

const whatsappNumber = '9779860729833';

const actionOptions = [
  { id: 'sell', label: 'I want to sell.' },
  { id: 'buy', label: 'I want to buy.' },
  { id: 'repair', label: 'I want to repair.' },
  { id: 'exchange', label: 'I want to Exchange.' },
  { id: 'chat', label: 'Just chat.' },
] as const;

const productOptions = ['iPhone', 'Macbooks', 'Mac', 'Phone'] as const;

type ActionOption = (typeof actionOptions)[number];
type ActionId = ActionOption['id'];
type ProductOption = (typeof productOptions)[number];

const actionText: Record<Exclude<ActionId, 'chat'>, string> = {
  sell: 'sell',
  buy: 'buy',
  repair: 'repair',
  exchange: 'exchange',
};

function getWhatsAppHref(message: string) {
  return `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;
}

function getActionMessage(action: Exclude<ActionId, 'chat'>, product: ProductOption) {
  return `Hi Bhattarai Deals, I want to ${actionText[action]} ${product}.`;
}

const chatHref = getWhatsAppHref('Hi Bhattarai Deals, I want to chat.');

function WhatsAppIcon({ className }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      className={className}
      aria-hidden="true"
    >
      <path
        fill="currentColor"
        d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 1.75.48 3.44 1.35 4.91L2 22l5.33-1.42c1.42.79 3.03 1.24 4.71 1.24 5.46 0 9.91-4.45 9.91-9.91S17.5 2 12.04 2Zm0 1.67c4.52 0 8.24 3.72 8.24 8.24s-3.72 8.24-8.24 8.24c-1.56 0-3.04-.42-4.29-1.15l-.46-.27-2.36.61.65-2.28-.29-.47c-.87-1.4-1.49-3.01-1.49-4.68 0-4.52 3.72-8.24 8.24-8.24Zm-2.23 2.62c-.23-.59-.46-.71-.71-.71-.21 0-.4.19-.56.52-.16.33-.72 1.28-.72 2.35s.74 2.1.89 2.28c.16.18 1.56 2.43 3.81 3.35 1.92.81 2.59.5 3.11.44.6-.07 1.59-.65 1.83-1.32.24-.67.24-1.24.13-1.42-.11-.18-.27-.27-.5-.39-.23-.12-1.41-.7-1.64-.79-.23-.09-.39-.14-.55.1-.16.24-.66.82-.82.99-.16.18-.32.23-.55.11-.23-.12-1.11-.41-2.15-1.33-.82-.71-1.35-1.56-1.51-1.83-.16-.27-.04-.42.1-.54.12-.11.28-.3.44-.46.16-.16.21-.28.31-.45.1-.17.05-.32-.02-.41-.07-.09-.66-1.54-.89-2.13Z"
      />
    </svg>
  );
}

export function WhatsAppChat() {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedAction, setSelectedAction] = useState<Exclude<ActionId, 'chat'> | null>(null);

  const handleActionSelect = (action: ActionId) => {
    if (action === 'chat') {
      window.open(chatHref, '_blank', 'noopener,noreferrer');
      return;
    }

    setSelectedAction(action);
  };

  const resetChat = () => {
    setSelectedAction(null);
  };

  return (
    <div className="fixed bottom-5 right-5 z-50 flex flex-col items-end gap-3">
      <div
        className={`w-[min(calc(100vw-2.5rem),22rem)] overflow-hidden rounded-lg border bg-card text-card-foreground shadow-2xl transition-all duration-300 ease-out ${
          isOpen
            ? 'translate-y-0 scale-100 opacity-100'
            : 'pointer-events-none translate-y-4 scale-95 opacity-0'
        }`}
      >
        <div className="flex items-center justify-between border-b bg-primary px-4 py-3 text-primary-foreground">
          <div className="flex items-center gap-2">
            <WhatsAppIcon className="h-5 w-5" />
            <span className="text-sm font-semibold">Bhattarai Deals</span>
          </div>
          <button
            type="button"
            aria-label="Close WhatsApp chat"
            className="rounded-md p-1 transition-colors hover:bg-primary-foreground/10 focus:outline-none focus:ring-2 focus:ring-ring"
            onClick={() => setIsOpen(false)}
          >
            <X className="h-4 w-4" />
          </button>
        </div>
        <div className="space-y-4 bg-background p-4">
          <div className="max-w-[85%] rounded-lg border bg-card px-3 py-2 text-sm text-card-foreground shadow-sm">
            Hi, how can we help with buying, selling, repair, or exchange?
          </div>
          {selectedAction ? (
            <div className="space-y-3">
              <button
                type="button"
                className="inline-flex items-center gap-2 text-xs font-medium text-muted-foreground transition-colors hover:text-foreground"
                onClick={resetChat}
              >
                <ArrowLeft className="h-3.5 w-3.5" />
                Back
              </button>
              <div className="text-sm font-medium">
                What do you want to {actionText[selectedAction]}?
              </div>
              <div className="grid grid-cols-2 gap-2">
                {productOptions.map((product) => (
                  <Button
                    key={product}
                    variant="outline"
                    className="h-auto justify-start whitespace-normal py-2 text-left"
                    asChild
                  >
                    <a
                      href={getWhatsAppHref(getActionMessage(selectedAction, product))}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <Send className="h-4 w-4" />
                      {product}
                    </a>
                  </Button>
                ))}
              </div>
            </div>
          ) : (
            <div className="space-y-2">
              {actionOptions.map((option) => (
                <Button
                  key={option.id}
                  variant="outline"
                  className="h-auto w-full justify-start whitespace-normal py-2 text-left"
                  onClick={() => handleActionSelect(option.id)}
                >
                  {option.id === 'chat' ? (
                    <MessageCircle className="h-4 w-4" />
                  ) : (
                    <Send className="h-4 w-4" />
                  )}
                  {option.label}
                </Button>
              ))}
            </div>
          )}
        </div>
      </div>
      <button
        type="button"
        aria-label={isOpen ? 'Close WhatsApp chat' : 'Open WhatsApp chat'}
        aria-expanded={isOpen}
        className="flex h-14 w-14 items-center justify-center rounded-full bg-[hsl(264_60%_54%)] text-white shadow-xl ring-1 ring-black/5 transition-all duration-300 hover:-translate-y-1 hover:bg-[hsl(264_70%_40%)] focus:outline-none focus:ring-4 focus:ring-[hsl(264_60%_54%)]/30"
        onClick={() => setIsOpen((current) => !current)}
      >
        {isOpen ? <X className="h-6 w-6" /> : <WhatsAppIcon className="h-7 w-7" />}
        <span className="sr-only">{isOpen ? 'Close chat' : 'Open chat'}</span>
      </button>
    </div>
  );
}
