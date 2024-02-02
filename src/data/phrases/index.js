const PHRASES = {
  hello: ['Мої вітання!', "Мої вітання! Я на зв'язку"]
};

export const data = PHRASES;

export default function random(phrase) {
  if (!phrase) return '';
  const phrases = PHRASES[phrase];
  if (!phrases) return '';
  if (!phrases.length) return '';
  const randomIndex = Math.floor(Math.random() * phrases.length);
  return phrases[randomIndex];
}
