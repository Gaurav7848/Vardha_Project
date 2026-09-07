import React from 'react';
import { MessageCircle } from 'lucide-react';
import { getWhatsAppUrl } from '../utils/whatsapp';

const WhatsAppButton = ({ message = "Hello Vardha Warehousing, I'm interested in your warehouse space.", className = "", children }) => {
  const url = getWhatsAppUrl(message);

  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      className={`inline-flex items-center justify-center gap-2 bg-green-600 hover:bg-green-700 text-white font-bold rounded-xl transition-all duration-300 hover:-translate-y-1 hover:shadow-lg active:scale-95 ${className}`}
    >
      {children || (
        <>
          <MessageCircle className="w-5 h-5" />
          WhatsApp Vardha
        </>
      )}
    </a>
  );
};

export default React.memo(WhatsAppButton);
