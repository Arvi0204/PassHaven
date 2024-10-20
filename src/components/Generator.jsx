import React, { useState } from "react";
import toast from "react-hot-toast";

const Generator = (props) => {
  const [length, setLength] = useState(12);
  const [includeNumbers, setIncludeNumbers] = useState(false);
  const [includeSpecialChars, setIncludeSpecialChars] = useState(false);
  const [includeSpaces, setIncludeSpaces] = useState(false);
  const [generatedPassword, setGeneratedPassword] = useState("");

  const generatePassword = () => {
    let charset = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
    let password = "";
    let requiredChars = []; // To ensure at least one char from each selected category

    // Add digits if selected
    if (includeNumbers) {
      charset += "0123456789";
      requiredChars.push("0123456789".charAt(Math.floor(Math.random() * 10))); // Ensure at least one digit
    }

    // Add special characters if selected
    if (includeSpecialChars) {
      charset += "!@#$%^&*()_+[]{}|;:,.<>?";
      requiredChars.push(
        "!@#$%^&*()_+[]{}|;:,.<>?".charAt(Math.floor(Math.random() * 26))
      ); // Ensure at least one special character
    }

    // Add spaces if selected
    if (includeSpaces) {
      charset += " ";
      requiredChars.push(" "); // Ensure at least one space
    }

    // Fill remaining characters randomly from the charset
    for (let i = 0; i < length - requiredChars.length; i++) {
      password += charset.charAt(Math.floor(Math.random() * charset.length));
    }

    // Shuffle requiredChars into the password to ensure randomness
    requiredChars.forEach((char) => {
      const randomIndex = Math.floor(Math.random() * (password.length + 1));
      password =
        password.slice(0, randomIndex) + char + password.slice(randomIndex);
    });

    setGeneratedPassword(password);
  };

  const copyText = (text) => {
    navigator.clipboard.writeText(text);
    toast.success("Copied to clipboard!");
    props.setIsGeneratorModalOpen(false);
  };

  return (
    <div className="flex justify-center items-center p-5">
      <div className="bg-white rounded-lg shadow-lg p-8 w-full max-w-lg">
        <h2 className="text-2xl font-semibold text-center text-blue-600 mb-4">
          Password Generator
        </h2>

        <div className="mb-5">
          <label
            htmlFor="password-length"
            className="block mb-2 text-sm font-medium text-gray-700"
          >
            Password Length: {length}
          </label>
          <input
            type="range"
            id="password-length"
            min="1"
            max="40"
            value={length}
            onChange={(e) => setLength(Number(e.target.value))}
            className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700"
          />
        </div>

        <div className="mb-5">
          <div className="flex items-center mb-4">
            <input
              id="include-numbers"
              type="checkbox"
              checked={includeNumbers}
              onChange={() => setIncludeNumbers(!includeNumbers)}
              className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
            />
            <label
              htmlFor="include-numbers"
              className="ml-2 text-sm font-medium text-gray-700"
            >
              Include Numbers
            </label>
          </div>

          <div className="flex items-center mb-4">
            <input
              id="include-special-chars"
              type="checkbox"
              checked={includeSpecialChars}
              onChange={() => setIncludeSpecialChars(!includeSpecialChars)}
              className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
            />
            <label
              htmlFor="include-special-chars"
              className="ml-2 text-sm font-medium text-gray-700"
            >
              Include Special Characters
            </label>
          </div>

          <div className="flex items-center">
            <input
              id="include-spaces"
              type="checkbox"
              checked={includeSpaces}
              onChange={() => setIncludeSpaces(!includeSpaces)}
              className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
            />
            <label
              htmlFor="include-spaces"
              className="ml-2 text-sm font-medium text-gray-700"
            >
              Include Spaces
            </label>
          </div>
        </div>

        <button
          type="button"
          onClick={generatePassword}
          className="w-full py-2 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          Generate Password
        </button>

        {generatedPassword && (
          <div className="mt-5">
            <label
              htmlFor="generated-password"
              className="block mb-2 text-sm font-medium text-gray-700"
            >
              Generated Password
            </label>
            <div className="relative">
              <input
                type="text"
                id="generated-password"
                value={generatedPassword}
                readOnly
                className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 pr-12"
              />
              <span
                className="absolute right-2 top-2 cursor-pointer"
                onClick={() => copyText(generatedPassword)}
              >
                <img src="icons/copy.gif" alt="Copy" width={24} />
              </span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Generator;
