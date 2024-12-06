import React, { useState, useEffect } from 'react';

const TypingText = ({ text, speed }) => {
  const [displayedText, setDisplayedText] = useState('');
  let index = 0;

  useEffect(() => {
    const timer = setInterval(() => {
      setDisplayedText((prevText) => prevText + text[index]);
      index += 1;

      if (index === text.length) {
        clearInterval(timer);
      }
    }, speed);

    return () => clearInterval(timer);
  }, [text, speed]);

  return <span>{displayedText}</span>;
};

export default TypingText;
