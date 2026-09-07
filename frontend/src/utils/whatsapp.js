const WHATSAPP_NUMBER = "9670111167";

const getWhatsAppUrl = (message) => {
  const encodedMessage = encodeURIComponent(message);
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodedMessage}`;
};

const getWhatsAppNumber = () => WHATSAPP_NUMBER;

export { getWhatsAppUrl, getWhatsAppNumber };
