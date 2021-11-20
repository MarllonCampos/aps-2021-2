import React from "react";
import Image from "next/image";

import styles from "../../styles/Header.module.css";

type IWeather = {
  id: number;
  name: string;
  state: string;
  country: string;
  data: {
    temperature: number;
    wind_direction: string;
    wind_velocity: number;
    humidity: number;
    condition: string;
    pressure: number;
    icon: string;
    sensation: number;
    date: string;
    alagProbability: number;
  };
};

interface IProps {
  props?: any;
  weather: IWeather;
}
export default function Header({ weather, props }: IProps) {
  return (
    <>
      <h1 className={styles.city}>{weather.name}</h1>
      <h4 className={styles.date}>{weather.data.date}</h4>

      <div className={styles.weatherContainer}>
        <Image
          src={`/${weather.data.icon}.png`}
          width={125}
          height={125}
          layout="fixed"
          alt=""
          className={styles.weather}
        />
      </div>
    </>
  );
}
