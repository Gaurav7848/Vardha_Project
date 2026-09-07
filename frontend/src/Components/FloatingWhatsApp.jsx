import React from 'react';
import { MessageCircle } from 'lucide-react';
import WhatsAppButton from './WhatsAppButton';

const FloatingWhatsApp = ({ message = "Hello Vardha Warehousing, I'm interested in your warehouse space." }) => {
  return (
    <div className="fixed bottom-6 right-6 z-50">
      <WhatsAppButton
        message={message}
        className="w-16 h-16 rounded-full bg-green-600 hover:bg-green-700 text-white shadow-2xl hover:shadow-green-500/50 flex items-center justify-center p-0 transition-all duration-300 hover:scale-110 animate-bounce-slow"
      >
        <MessageCircle className="w-8 h-8" />
      </WhatsAppButton>
    </div>
  );
};

export default React.memo(FloatingWhatsApp);
