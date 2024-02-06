"use client"
import React, { useState, ChangeEvent } from 'react';

const Home: React.FC = () => {
  const [inputText, setInputText] = useState<string>('');
  const [apiResponse, setApiResponse] = useState<{ [key: string]: number }>({});

  const handleInputChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setInputText(e.target.value);
  };

  const handleApiCall = async () => {
    try {
      const formattedInput = inputText.replaceAll(" ", "+");
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_ENDPOINT}/search/${formattedInput}`, {
        mode: "cors", headers: {
          'Content-Type': 'application/json',
        }
      });
      const data = await response.json();
      console.log(data);
      setApiResponse(data);
    } catch (error) {
      console.error('Error fetching data from the API:', error);
    }
  };

  return (
    <div className="container mx-auto my-8 dark:text-white sm:mx-28">
      <h1 className="text-4xl font-bold mb-6">Nenhuma dessas palavras está na bíblia</h1>
      <textarea
        className="w-full h-64 p-4 border rounded focus:outline-none focus:shadow-outline dark:bg-gray-800 dark:border-gray-700 dark:text-white"
        placeholder="Insira palavras separadas por espaço..."
        value={inputText}
        onChange={handleInputChange}
      ></textarea>
      <button
        className="mt-4 bg-blue-500 text-white py-2 px-4 rounded dark:bg-blue-700"
        onClick={handleApiCall}
      >
        Buscar
      </button>
      <h2 className="text-lg font-bold my-4">Respostas:</h2>
      <div className="mt-4 overflow-y-auto max-h-72">
        <ul className={`dark:bg-gray-800 dark:border-gray-700 dark:text-white p-4 rounded-md ${apiResponse.length > 0 ? 'mt-4' : ''}`}>
          {Object.entries(apiResponse).map(([word, count], index) => (
            <li key={index} className="mb-2 bg-gray-200 dark:bg-gray-700 rounded-md p-2">
              <span className="font-bold">{word}:</span> {count}
            </li>
          ))}
        </ul>
      </div>
      <footer className="mt-8 text-gray-500 fixed bottom-4 flex justify-center inset-x-0">
        <p></p>
        <p>
          Desenvolvido por Gabriel Antonelli -{' '}
          <a className="text-gray-50" href="https://github.com/gabriel-antonelli" target="_blank" rel="noopener noreferrer">
            GitHub
          </a>
        </p>
      </footer>
    </div>
  );
};

export default Home;
