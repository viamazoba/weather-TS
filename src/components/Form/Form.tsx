import { countries } from "../../data/countries";
import styles from './Form.module.css';

export default function Form() {
    return(
        <form className={styles.form}>

            <div className={styles.field}>
                <label htmlFor="city">Cuidad:</label>
                <input
                    id="city" 
                    type="text"
                    name="city"
                    placeholder="Cuidad"
                />
            </div>

            <div className={styles.field}>
                <label htmlFor="pais">País:</label>
                <select name="pais" id="pais">
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

            <input type="submit" value='Consultar Clima'/>
        </form>
    )
}