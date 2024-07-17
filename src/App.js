
import { useState, useEffect } from "react";
import "./App.css";

function App() {
  const [city, setCity] = useState("");
  const [wDetails, setWDetails] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const [quote, setQuote] = useState("");

  const quotes = [
    "The best time to plant a tree was 20 years ago. The second best time is now.",
    "An investment in knowledge pays the best interest.",
    "The only way to do great work is to love what you do.",
    "Success is not how high you have climbed, but how you make a positive difference to the world.",
    "Your limitation—it's only your imagination."
  ];

  useEffect(() => {
    setQuote(quotes[Math.floor(Math.random() * quotes.length)]);
  }, []);

  const getData = (event) => {
    setIsLoading(true);
    fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=751d66e130befad396405dc13796a57c&units=metric`
    )
      .then((response) => response.json())
      .then((finalResponse) => {
        if (finalResponse.cod === "404") {
          setWDetails(undefined);
        } else {
          setWDetails(finalResponse);
        }
        setIsLoading(false);
      });
    event.preventDefault();
    setCity("");
  };

  return (
    <div>
      <div className="container">
        <h1>Simple Weather App</h1>

        <form onSubmit={getData}>
          <input
            type="text"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            placeholder="City Name"
          />
          <button>Submit</button>
        </form>

        <div className="weather-container">
          {isLoading && (
            <img
              src="https://media.tenor.com/G7LfW0O5qb8AAAAi/loading-gif.gif"
              className="loading"
              alt="Loading"
            />
          )}
          {wDetails !== undefined ? (
            <>
              <h3>
                {wDetails.name}, <span>{wDetails.sys.country}</span>
              </h3>
              <h2>{wDetails.main.temp}°C</h2>
              <img
                src={`http://openweathermap.org/img/w/${wDetails.weather[0].icon}.png`}
                alt="Weather Icon"
                className="mx-auto mb-2"
              />
              <p>{wDetails.weather[0].description}</p>
            </>
          ) : (
            !isLoading && <p className="text-red-500 font-bold">No Data Found</p>
          )}
        </div>

        <div className="quote">{quote}</div>
      </div>
    </div>
  );
}

export default App;
