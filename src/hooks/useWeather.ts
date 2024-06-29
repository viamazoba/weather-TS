import axios from 'axios'
import { SearchType } from '../types'

export default function useWeather() {

    const appId = '658ef5107f4821a349fb8fccb676eda9'

    const fetchWeather = async (search: SearchType) => {

        try {
            const geoUrl = `http://api.openweathermap.org/geo/1.0/direct?q=${search.city},${search.country}&appid=${appId}`
            const { data } = await axios(geoUrl)
            console.log(data)

        } catch (error) {
            console.log(error)
        }
    }
    
    return {
        fetchWeather
    }
}