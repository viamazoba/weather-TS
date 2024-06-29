import styles from './App.module.css'
import Alert from './components/Alert/Alert'
import Form from './components/Form/Form'
import Spinner from './components/Spinner/Spinner'
import WeatherDetail from './components/WeatherDetail/WeatherDetail'
import useWeather from './hooks/useWeather'

function App() {

  const { fetchWeather, weather, hasWeatherData, loading, notFound } = useWeather()

  return (
    <>
      <h1 className={styles.title}>Aplicación del clima</h1>

      <div className={styles.container}>
        <Form 
          fetchWeather = {fetchWeather}
        />
        {
          loading &&
          <Spinner />
        }
        {
          hasWeatherData &&
          <WeatherDetail 
            weather={weather}
          />
        }
        {
          notFound &&
          <Alert 
            alert='Cuidad no encontrada'
          />
        }
      </div>
    </>
  )
}

export default App
