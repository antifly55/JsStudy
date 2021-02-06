import React from 'react';
import {Alert} from "react-native";
import Loading from "./Loading";
import * as Location from 'expo-location';
import axios from "axios";

const API_KEY= "f2d6ac2e4421a9566cfeb38c0312cf5d";

export default class extends React.Component {
  state = {
    isLoading: true,
    temp: 0
  }
  getWeather = async(latitude, longitude) => {
    const {data} = await axios.get(
      `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${API_KEY}`
    );
    this.setState({isLoading: false, temp: data.main.temp});
  }
  getLocation = async() => {
    try{
      await Location.requestPermissionsAsync();
      const {coords: {latitude, longitude}} = await Location.getCurrentPositionAsync();
      this.getWeather(latitude, longitude);
    } catch(e) {
      Alert.alert("Can\'t find you.", "So sad");
    }
  }
  componentDidMount(){
   this.getLocation(); 
  }
  render(){
    const {isLoading} = this.state;
    return (
      isLoading ? <Loading /> : null
    );
  }
}
