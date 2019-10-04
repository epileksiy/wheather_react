import React from "react";
import Info from "./components/info";
import Form from "./components/form";
import Weather from "./components/weather";

const API_KEY="057852d7aae043b2611ca7f87cbf09a0";

class App extends React.Component{

  state={
    temp: undefined,
    city: undefined,
    country: undefined,
    sunrise: undefined,
    sunset: undefined,
    error:undefined
}

  gettingWeather= async (e) => {
    e.preventDefault();
    var city = e.target.elements.city.value;
    const api_url = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`);
    const data = await api_url.json();
    if (data.cod != 404) {
      if (city) {
        const api_url = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`);
        const data = await api_url.json();
        console.log(data);
        var sunset = data.sys.sunset;
        var date = new Date();
        date.setTime(sunset);
        var sunset_date = date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds();

        this.setState({
          temp: data.main.temp,
          city: data.name,
          country: data.sys.country,
          sunrise: data.sys.sunrise,
          sunset: sunset_date,
          error: undefined
        });
      } else {
        this.setState({
          temp: undefined,
          city: undefined,
          country: undefined,
          sunrise: undefined,
          sunset: undefined,
          error: "Введите название города!"
        });
      }
    }
    else{
      this.setState(
          {
            temp: undefined,
            city: undefined,
            country: undefined,
            sunrise: undefined,
            sunset: undefined,
            error: "Такого города нет в базе!"
          }
      );
    }
  }
  render(){
    return(
        <div className="okoshko">
          <div className="main">
            <div className="container">
              <div className="row">
                <div className="col-sm-5 info">
                  <Info />
                </div>
                <div className="col-sm-7 form">
                  <Form weatherMethod={this.gettingWeather}/>
                  <Weather
                  temp={this.state.temp}
                  city={this.state.city}
                  country={this.state.country}
                  sunrise={this.state.sunrise}
                  sunset={this.state.sunset}
                  error={this.state.error}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
    )
  }
}
export default App;