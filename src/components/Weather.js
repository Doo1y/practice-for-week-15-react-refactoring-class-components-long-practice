import React, { useState, useEffect } from "react";
import { toQueryString } from "../utils";

const Weather = () => {
  const [weather, setWeather] = useState(null);

  let content = <div className="loading">loading weather...</div>;

  if (weather) {
    const temp = (weather.main.temp - 273.15) * 1.8 + 32;
    content = (
      <div>
        <p>{weather.name}</p>
        <p>{temp.toFixed(1)} degrees</p>
      </div>
    );
  }

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      async function (location) {
        let url = "http://api.openweathermap.org/data/2.5/weather?";

        /* Remember that it's unsafe to expose your API key. (Note that pushing
      files that include your key to Github will expose your key!) In
      production, you would definitely save your key in an environment variable,
      so do that here. Since this project runs in your local environment
      (localhost), save your key as an environment variable in a .env file in
      the root directory of your app. You can then access the key here as
      "process.env.<variable_name>". Make sure to .gitignore your .env file!
      Also remember to restart your server (i.e., re-run "npm start") whenever
      you change your .env file. */
        const apiKey = process.env.REACT_APP_WEATHER_API;

        const params = {
          lat: location.coords.latitude,
          lon: location.coords.longitude,
          appid: apiKey,
        };

        url += toQueryString(params);

        const res = await fetch(url);
        if (res.ok) {
          const data = await res.json();
          setWeather(data);
        } else {
          alert("Check Weather API key!");
        }
      },
      (err) => console.log(err),
      { timeout: 10000 }
    );
  }, []);

  return (
    <section className="weather-section">
      <h1>Weather</h1>
      <div className="weather">{content}</div>
    </section>
  );
};

export default Weather;

// class Weather extends React.Component {
//     constructor(props) {
//       super(props);
//       this.state = {
//         weather: null
//       };
//     }

//     componentDidMount() {
//       navigator.geolocation.getCurrentPosition(
//         this.pollWeather,
//         (err) => console.log(err),
//         { timeout: 10000 }
//       );
//     }

//     pollWeather = async (location) => {
//       let url = 'http://api.openweathermap.org/data/2.5/weather?';

//       /* Remember that it's unsafe to expose your API key. (Note that pushing
//       files that include your key to Github will expose your key!) In
//       production, you would definitely save your key in an environment variable,
//       so do that here. Since this project runs in your local environment
//       (localhost), save your key as an environment variable in a .env file in
//       the root directory of your app. You can then access the key here as
//       "process.env.<variable_name>". Make sure to .gitignore your .env file!
//       Also remember to restart your server (i.e., re-run "npm start") whenever
//       you change your .env file. */
//       const apiKey = '???';

//       const params = {
//         lat: location.coords.latitude,
//         lon: location.coords.longitude,
//         appid: apiKey
//       };

//       url += toQueryString(params);

//       const res = await fetch(url);
//       if (res.ok) {
//         const weather = await res.json();
//         this.setState({ weather });
//       }
//       else {
//         alert ("Check Weather API key!")
//       }
//     }

//   render() {
//     const weather = this.state.weather;
//     let content = <div className='loading'>loading weather...</div>;

//     if (weather) {
//       const temp = (weather.main.temp - 273.15) * 1.8 + 32;
//       content = (
//         <div>
//           <p>{weather.name}</p>
//           <p>{temp.toFixed(1)} degrees</p>
//         </div>
//       );
//     }

//     return (
//       <section className="weather-section">
//         <h1>Weather</h1>
//         <div className='weather'>
//           {content}
//         </div>
//       </section>
//     );
//   }
// }

// export default Weather;
