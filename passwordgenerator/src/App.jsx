import { useState, useCallback, useEffect, useRef } from "react";

function App() {
  const [length, setLength] = useState(8);
  const [numberAllowed, setNumberAllowed] = useState(false);
  const [charAllowed, setCharAllowed] = useState(false);
  const [password, setPassword] = useState("");
  const [copied, setCopied] = useState(false);

  const passwordRef = useRef(null);

  const passwordGenerator = useCallback(() => {
    let pass = "";
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";

    if (numberAllowed) str += "0123456789";
    if (charAllowed) str += "!@#$%^&*-_+=[]{}~`";

    for (let i = 0; i < length; i++) {
      let char = Math.floor(Math.random() * str.length);
      pass += str.charAt(char);
    }

    setPassword(pass);
  }, [length, numberAllowed, charAllowed]);

  const copyPasswordToClipboard = useCallback(() => {
    passwordRef.current?.select();
    passwordRef.current?.setSelectionRange(0, 999);

    navigator.clipboard.writeText(password);

    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  }, [password]);

  useEffect(() => {
    passwordGenerator();
  }, [passwordGenerator]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-950 via-slate-900 to-black flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-slate-900 rounded-2xl shadow-2xl p-8 border border-slate-700">
        <h1 className="text-slate-100 text-center text-3xl font-bold mb-8 tracking-wide">
          Password Generator
        </h1>

        <div className="flex gap-2 mb-8 rounded-lg overflow-hidden">
          <input
            type="text"
            value={password}
            className="flex-1 outline-none py-3 px-4 bg-slate-800 text-green-400 font-mono text-sm border border-slate-600 focus:border-slate-400 rounded-lg transition"
            placeholder="Password"
            readOnly
            ref={passwordRef}
          />

          <button
            onClick={copyPasswordToClipboard}
            className="bg-slate-700 hover:bg-slate-600 text-white px-5 py-3 font-semibold rounded-lg transition-all duration-200"
          >
            {copied ? "Copied ✓" : "Copy"}
          </button>
        </div>

        <div className="space-y-5">
          {/* Length Slider */}
          <div className="flex items-center gap-3">
            <input
              type="range"
              min={6}
              max={100}
              value={length}
              className="flex-1 cursor-pointer accent-slate-400"
              onChange={(e) => setLength(Number(e.target.value))}
            />

            <span className="text-slate-200 font-bold min-w-fit bg-slate-700 px-3 py-1 rounded-lg">
              {length}
            </span>
          </div>

          {/* Options */}
          <div className="flex flex-col gap-4 text-sm">
            <label className="flex items-center gap-3 cursor-pointer hover:text-slate-300 transition">
              <input
                type="checkbox"
                checked={numberAllowed}
                className="w-5 h-5 accent-slate-400 cursor-pointer"
                onChange={() => setNumberAllowed((prev) => !prev)}
              />
              <span className="text-gray-200">Include Numbers (0-9)</span>
            </label>

            <label className="flex items-center gap-3 cursor-pointer hover:text-slate-300 transition">
              <input
                type="checkbox"
                checked={charAllowed}
                className="w-5 h-5 accent-slate-400 cursor-pointer"
                onChange={() => setCharAllowed((prev) => !prev)}
              />
              <span className="text-gray-200">Include Symbols (!@#$%^&*)</span>
            </label>
          </div>

          <button
            onClick={passwordGenerator}
            className="w-full mt-4 bg-slate-700 hover:bg-slate-600 text-white py-3 rounded-lg font-semibold transition-all duration-200"
          >
            Generate New Password
          </button>
        </div>
      </div>
    </div>
  );
}

export default App;
