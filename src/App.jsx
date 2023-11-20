import { useEffect, useState } from "react";

export default function App() {
  const [advice, setAdvice] = useState("");
  const [error, setError] = useState(null);

  const fetchData = async () => {
    try {
      const response = await fetch("https://api.adviceslip.com/advice");

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const data = await response.json();
      setAdvice(data.slip.advice);
      setError(null); // Reset error on successful fetch
    } catch (error) {
      setError(error.message);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleClick = () => {
    // Delay this funtion by 1 second
    setTimeout(() => {
      fetchData();
    }, 1000);
  };

  return (
    <main className="min-h-screen bg-[#ECF763] text-[#0B0A07] flex items-center justify-center text-center">
      <div>
        <h1 className="text-xl md:text-4xl font-poppins font-light tracking-widest my-6">
          Advice Of The Day
        </h1>

        <p className="text-4xl md:text-6xl w-full md:w-[60%] mx-auto">
          &rdquo; {advice} &rdquo;
        </p>

        {error && <p className="text-red-500">{error}</p>}

        <button
          onClick={handleClick}
          className="my-12 bg-[#0B0A07] text-xl font-bold py-3 px-6 text-white"
        >
          Get Advice
        </button>
      </div>
    </main>
  );
}
