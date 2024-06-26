import { ChangeEvent, FormEvent, useState } from "react";
import { countries } from "../../data/countries";
import styles from './Form.module.css';
import type { SearchType } from "../../types";
import Alert from "../Alert/Alert";

type FormProps = {
    fetchWeather: ()=> void
}

export default function Form({
    fetchWeather
}: FormProps) {
    const [search, setSearch ] = useState<SearchType>({
        city: '',
        country: ''
    })

    const [alert, setAlert] = useState('');

    const handleForm = (e: ChangeEvent<HTMLInputElement|HTMLSelectElement>)=> {
        setSearch({
            ...search,
            [e.target.id]: e.target.value
        })
    }

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if(Object.values(search).includes('')) {
            setAlert('Todos los campos son obligatorios')
            return
        }

        fetchWeather()
        setAlert('');
    }

    return(
        <form 
            className={styles.form}
            onSubmit={handleSubmit}
        >
            {
                alert && <Alert alert={alert}/>
            }
            <div className={styles.field}>
                <label htmlFor="city">Cuidad:</label>
                <input
                    id="city" 
                    type="text"
                    name="city"
                    placeholder="Cuidad"
                    value={search.city}
                    onChange={handleForm}
                />
            </div>

            <div className={styles.field}>
                <label htmlFor="country">País:</label>
                <select 
                    id="country"
                    name="country" 
                    value={search.country}
                    onChange={handleForm}
                    > 
                    <option value="">-- Seleccione un país ---</option>
                    {
                        countries.map(country => (
                            <option 
                                key={country.code}
                                value={country.code}
                            >
                                {country.name}
                            </option>
                        ))
                    }
                </select>
            </div>

            <input 
                type="submit" 
                value='Consultar Clima'
                className={styles.submit}
            />
        </form>
    )
}