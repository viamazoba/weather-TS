import axios from 'axios'
import { z } from 'zod'
import { SearchType } from '../types'
import { useMemo, useState } from 'react'
// import { object, string, number, Output, parse } from 'valibot'


// Guard o Assetion
// function isWeatherResponse(weather: unknown) : weather is Weather {
//     return (
//         Boolean(weather) &&
//         typeof weather === 'object' &&
//         typeof (weather as Weather).name === 'string' &&
//         typeof (weather as Weather).main.temp === 'number' &&
//         typeof (weather as Weather).main.temp_max === 'number' &&
//         typeof (weather as Weather).main.temp_min === 'number'
//     )
// }

// Zod

const WeatherZ = z.object({
    name: z.string(),
    main: z.object({
        temp: z.number(),
        temp_max: z.number(),
        temp_min: z.number()
    })
})

//Esta es la forma de generar el type desde el esquema de Zod
export type Weather = z.infer<typeof WeatherZ>

// Valibot

// const WeatherSchema = object({
//     name: string(),
//     main: object({
//         temp: number(),
//         temp_max: number(),
//         temp_min: number()
    
//     })
// })

// Manera de generar type con valibot

// type Weather = Output<typeof WeatherSchema>

const initialState = {
    name: '',
    main: {
        temp: 0,
        temp_max: 0,
        temp_min: 0
    }
}

export default function useWeather() {

    const [ weather, setWeather ] = useState<Weather>(initialState)

    const [ loading, setLoading ] = useState(false)
    const [ notFound, setNotFound ] = useState(false)

    const appId = import.meta.env.VITE_API_KEY

    const fetchWeather = async (search: SearchType) => {

        setLoading(true)
        setWeather(initialState)
        setNotFound(false)

        try {
            const geoUrl = `http://api.openweathermap.org/geo/1.0/direct?q=${search.city},${search.country}&appid=${appId}`
            const { data } = await axios(geoUrl)

            if(!data[0]) {
                setNotFound(true)
            }
            
            const lat = data[0].lat
            const lon = data[0].lon
            
            // Implementación con Guards o assetions

            // const weatherUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${appId}`
            // const { data: weatherResult } = await axios(weatherUrl)
            // const result = isWeatherResponse(weatherResult)
            
            // if(result) {
            //     console.log(weatherResult.name)
            // }else {
            //     console.log('La respuesta de la api es incorrecta')
            // }

            // Implementación con ZOD

            const weatherUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${appId}`
            const { data: weatherResult } = await axios(weatherUrl)

            const result = WeatherZ.safeParse(weatherResult)

            if(result.success) {
                setWeather(result.data)
            } else {
                console.log('La respuesta de la api es incorrecta')
            }

            // Valibot
            // const weatherUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${appId}`
            // const { data: weatherResult } = await axios(weatherUrl)

            // const result = parse(WeatherSchema, weatherResult)

            // if(result) {
            //     console.log(result.name)
            // }


        } catch (error) {
            console.log(error)
        } finally {
            setLoading(false)
        }
    }

    const hasWeatherData = useMemo(()=> weather.name, [weather])
    
    return {
        weather,
        loading,
        notFound,
        fetchWeather,
        hasWeatherData
    }
}