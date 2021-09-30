import type { GetStaticProps, NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.css";
import { Card } from "../components/Card";
import { format } from 'date-fns'
import ptBR from 'date-fns/locale/pt-BR'

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
  props: any;
  weather: IWeather;
  rainProbability: any

}

export default function Home({
  weather,
  rainProbability,
  ...props
}: IProps) {
  return (
    <div className={styles.wrapper}>
      <div className={styles.container}>

      <Head>
        <title>Create Next App</title>
        <meta
          name="description"
          content="Generated by create next app"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <h1 className={styles.city}>{weather.name}</h1>
      <h4 className={styles.date}>{weather.data.date}</h4>

      <div className={styles.weatherContainer}>
        <Image
          src={`/${weather.data.icon}.jpg`}
          width={125}
          height={125}
          layout="fixed"
          alt=""
          className={styles.weather}
        />
      </div>

      <p className={styles.todayCondition}>
        {weather.data.condition}
      </p>

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
    </div>
      
    </div>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  const FORMULAPARAATM = 0.000987;
  const monthNames = [
    "jan",
    "fev",
    "mar",
    "apr",
    "may",
    "jun",
    "jul",
    "aug",
    "sep",
    "oct",
    "nov",
    "dec",
  ];

  const averagePrecipitation: any = {
    jan: 288,
    fev: 167,
    mar: 150,
    apr: 69,
    may: 64,
    jun: 46,
    jul: 56,
    aug: 40,
    sep: 92,
    oct: 117,
    nov: 152,
    dec: 175,
  };
  function getFormattedDate(date: Date) {
    const formatedDate = format(date, 'dd/MM/yyyy',{locale:ptBR})

    return formatedDate
  }

  const today = new Date();
  const ptbrDate = getFormattedDate(today);

  const actualMonth: string = monthNames[today.getMonth()];
  const monthPrecipProbability =
    averagePrecipitation[actualMonth];

  const URL_API =
    process.env.URL_CLIMA

   
  

  const responseClima = await fetch(`${URL_API}/api/v1/weather/locale/3477/current?token=${process.env.API_CLIMATOKEN}`);
  const dataClima: IWeather = await responseClima.json();

  const pressure = dataClima.data.pressure * FORMULAPARAATM;

  const responseForecast = await fetch(
    `${URL_API}/api/v1/forecast/locale/3477/hours/72?token=${process.env.API_CLIMATOKEN}`
  );
  const dataForecast = await responseForecast.json();
  const {
    rain: { precipitation },
  } = dataForecast.data[0];

  const actualPrecipitationProbability = precipitation;
  const alagProbability =
    (actualPrecipitationProbability * 100) /
    monthPrecipProbability /
    100;

    const params = {apikey: process.env.API_ACCUTOKEN, language: 'pt-br', details: true, metric: true}
    
  
  const API_ACCU_URL = `${process.env.URL_ACCU}?apikey=${process.env.API_ACCUTOKEN}&language=pt-br&details=true&metric=true`


  const responseAccu = await fetch(
    `${API_ACCU_URL}`
  );
  const dataAccu = await responseAccu.json();

  let formatClima = {
    ...dataClima,
    data: {
      ...dataClima.data,
      date: ptbrDate,
      alagProbability,
      pressure: pressure.toFixed(2),
    },
  };


  return {
    props: {
      weather: formatClima,
      rainProbability: dataAccu[0].RainProbability,
    },

    revalidate: 3600
  };
};
