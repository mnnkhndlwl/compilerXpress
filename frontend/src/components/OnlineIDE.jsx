import React, { useState } from "react";
import { useSelector } from "react-redux";
import { publicRequest } from "../config";
import Loader from "./Loader";

function OnlineIDE() {
  const isDarkMode = useSelector((state) => state.darkMode);

  const [code, setCode] = useState("");
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [lang, setSelectedLanguage] = useState("c");
  const [inputRadio , setinputRadio] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleCodeChange = (e) => {
    setCode(e.target.value);
  };

  const handleInputChange = (e) => {
    setInput(e.target.value);
    if(input !== "") {
      setinputRadio(true);
    }
  };

  const handleLanguageChange = (e) => {
    setSelectedLanguage(e.target.value);
  };

  const handleRunCode = async () => {
    console.log(input + inputRadio + code + lang);
    setLoading(true);
    try {
      const res = await publicRequest.post('/compilecode', {
        code,
        input,
        inputRadio,
        lang,
      });
      console.log(res.data);
      setOutput(res.data);
      setLoading(false);
    } catch (err) {}
  };

  return (
    <div
      className={`container mt-10 ${
        isDarkMode ? "bg-black text-white" : "bg-white text-black"
      }`}
    >
      <div className="h-full">
        <div className="flex flex-row items-center justify-center h-full w-full">
          <textarea
            className="w-2/5 h-96 resize mb-4 p-2 border border-gray-300 rounded focus:outline-none focus:ring focus:ring-blue-200"
            placeholder="Enter your code here"
            value={code}
            onChange={handleCodeChange}
          ></textarea>

          <div className="w-96 ml-10 items-start justify-center">
            <div className="w-full mb-10">
              <label htmlFor="language" className="text-gray-700">
                Select Language:
              </label>
              <select
                id="language"
                className="w-full h-10 bg-white border border-gray-300 rounded mt-2 focus:outline-none"
                value={lang}
                onChange={handleLanguageChange}
              >
                <option value="C">C</option>
                <option value="C++">C++</option>
                <option value="Python">Python</option>
                <option value="Java">Java</option>
              </select>
            </div>
            <textarea
              className="w-full h-full resize mb-4 p-2 border border-gray-300 rounded focus:outline-none focus:ring focus:ring-blue-200"
              placeholder="Enter input here"
              value={input}
              onChange={handleInputChange}
            ></textarea>
            <div className="mt-4 p-2 h-36 border border-gray-300 rounded">
              <pre>{output}</pre>
            </div>
            {
              loading ? <>
              <Loader />
              </> :
            <button
              className="mt-10 justify-self-center bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded focus:outline-none"
              onClick={handleRunCode}
            >
              Run Code
            </button>
            }
          </div>
        </div>
      </div>
    </div>
  );
}

export default OnlineIDE;
