import React from "react";
import { Card } from "../Card";
import { IProps } from "../../pages";

import styles from "../../styles/Section.module.css";

export default function Section({
  weather,
  rainProbability,
}: IProps) {
  return (
    <section className={styles.grid}>
      <Card
        title="Prob. de Alagamento"
        value={`${weather.data.alagProbability}%`}
      />
      <Card
        title="Temperatura"
        value={`${weather.data.temperature}ºC`}
      />
      <Card
        title="Sensação Térmica"
        value={`${weather.data.sensation}ºC`}
      />
      <Card
        title="Prob. Chuva"
        value={`${rainProbability}%`}
      />
      <Card
        title="Direção do Vento"
        value={`${weather.data.wind_direction}`}
      />
      <Card
        title="Humidade"
        value={`${weather.data.humidity}%`}
      />
      <Card
        title="Pressão Atmosférica"
        value={`${weather.data.pressure}ATM`}
      />
    </section>
  );
}
