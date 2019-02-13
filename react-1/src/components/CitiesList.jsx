import React, { Component } from 'react'
import { getCities, getForecastByCoordinates } from '../api'
import CityPreview from './CityPreview'
import List from '@material-ui/core/List'

class CitiesList extends Component {
    constructor(props) {
        super(props)

        this.state = { cities: [], forecasts: {} }
    }

    componentDidMount() {
        const favIDs = JSON.parse(localStorage.getItem('favIDs')) || []
        const cities = getCities()

        for (let favID of favIDs) {
            const favCity = cities.find(x => x.id === favID)

            if (favCity)
                favCity.fav = true
        }

        this.loadForecasts(cities)
        this.setState({ cities })

        // add event listener to save state to localStorage
        // when user leaves/refreshes the page
        window.addEventListener(
            "beforeunload",
            this.stateToLocalStorage.bind(this)
        )
    }

    componentWillUnmount() {
        window.removeEventListener(
            "beforeunload",
            this.stateToLocalStorage.bind(this)
        )
    }

    stateToLocalStorage = () => 
        localStorage.setItem('favIDs', JSON.stringify(this.state.cities.filter(x => x.fav).map(x => x.id)))

    loadForecasts = (cities) => {
        const { forecasts } = this.state

        for (const city of cities) {
            // forecasts[city.id] = { ...forecasts[city.id], lastUpdated: Date.now(), summary: 'something', temperature: 30, pressure: 1020, windSpeed: 0.5 }
            forecasts[city.id] = { ...forecasts[city.id], loading: true }
            getForecastByCoordinates(city.lat, city.lng)
                .then(x => this.updateStateForecast(city.id, x))
        }

        this.setState({ forecasts })
    }

    updateStateForecast = (cityID, forecast) => {
        const { forecasts } = this.state
        this.setState({ forecasts: { ...forecasts, [cityID]: { ...forecast.currently, lastUpdated: Date.now() } } })
    }

    favCity = (cityId) => {
        const { cities } = this.state

        this.setState({ cities: cities.map(x => {
            if (x.id === cityId)
                x.fav = !x.fav

            return x
        })})
    }

    render() {
        const { cities, forecasts } = this.state
        const orderedCities = cities.sort((x, y) => x.name > y.name).sort((x, y) => !!y.fav - !!x.fav)

        return (      
            <List>             
                {orderedCities.map(x => 
                    <CityPreview 
                        key={x.id} 
                        city={{...x, forecast: forecasts[x.id] }} 
                        onClick={() => this.favCity(x.id)}
                    />
                )}
            </List>
        )
    }
}

export default CitiesList