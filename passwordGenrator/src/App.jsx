import { useState, useCallback, useEffect, useRef } from 'react';

function App() {
  const [length, setLength] = useState(8);
  const [numallow, setNumallow] = useState(false);
  const [charallow, setCharallow] = useState(false);
  const [password, setPassword] = useState("");

  const passwordRef = useRef(null);

  const passwordGen = useCallback(() => {
    let pass = "";
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";

    if (numallow) str += "0123456789";
    if (charallow) str += "!@#$%^&*-_=+[]{}`~";

    // Handle empty string pool
    if (str.length === 0) {
      setPassword("Select at least one option!");
      return;
    }

    for (let i = 0; i < length; i++) {
      const char = Math.floor(Math.random() * str.length); // Corrected off-by-one error
      pass += str.charAt(char);
    }
    setPassword(pass);
  }, [length, numallow, charallow]);

  const copypassClipboard = useCallback(() => {
    if (password) {
      passwordRef.current?.select();
     //to set how many word you want to copy
      passwordRef.current?.setSelectionRange(0,20);
      window.navigator.clipboard.writeText(password);
      // alert("Password copied to clipboard!");
    }
  }, [password]);

  useEffect(() => {
    passwordGen();
  }, [length, numallow, charallow, passwordGen]);

  return (
    <>
      <div className="w-full max-w-md mx-auto shadow-md rounded-lg px-4 my-8 text-orange-500 bg-gray-800">
        <h1 className="text-center text-white my-3">Password Generator</h1>

        <div className="flex shadow rounded-lg overflow-hidden mb-4">
          <input
            type="text"
            value={password}
            className="outline-none w-full py-1 px-3"
            placeholder="password"
            readOnly
            ref={passwordRef}
          />
          <button
            className="outline-none bg-blue-700 text-white px-3 py-0.5 shrink-0"
            onClick={copypassClipboard}
          >
            Copy
          </button>
        </div>
        <div className="flex text-sm gap-x-2">
          <div className="flex items-center gap-x-1">
            <input
              type="range"
              min={6}
              max={100}
              className="text-blue-600 cursor-pointer"
              value={length}
              onChange={(e) => setLength(parseInt(e.target.value, 10))} // Parse to integer
            />
            <label>Length: {length}</label>
          </div>
          <div className="flex items-center gap-x-1">
            <input
              type="checkbox"
              defaultChecked={numallow}
              id="numberInput"
              onChange={() => setNumallow((prev) => !prev)}
            />
            <label htmlFor="numberInput">Numbers</label>
          </div>
          <div className="flex items-center gap-x-1">
            <input
              type="checkbox"
              defaultChecked={charallow}
              id="charInput"
              onChange={() => setCharallow((prev) => !prev)}
            />
            <label htmlFor="charInput">Characters</label>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
