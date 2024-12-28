import React, { useState, useEffect } from 'react';

interface SimpleCaptchaProps {
  onValidate: (isValid: boolean) => void;
}

export function SimpleCaptcha({ onValidate }: SimpleCaptchaProps) {
  const [captchaText, setCaptchaText] = useState('');
  const [userInput, setUserInput] = useState('');

  const generateCaptcha = () => {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let result = '';
    for (let i = 0; i < 6; i++) {
      result += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    setCaptchaText(result);
  };

  useEffect(() => {
    generateCaptcha();
  }, []);

  useEffect(() => {
    onValidate(userInput.toLowerCase() === captchaText.toLowerCase());
  }, [userInput, captchaText, onValidate]);

  return (
    <span className="flex flex-col items-start space-y-2">
      <span className="bg-gray-200 p-2 rounded text-lg font-bold tracking-wide">
        {captchaText}
      </span>
      <input
        type="text"
        value={userInput}
        onChange={(e) => setUserInput(e.target.value)}
        placeholder="Enter the captcha text"
        className="border border-gray-300 rounded p-2"
      />
      <button
        type="button"
        onClick={generateCaptcha}
        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition-colors"
      >
        Refresh Captcha
      </button>
    </span>
  );
}

