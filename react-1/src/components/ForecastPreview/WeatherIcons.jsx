import React from 'react'
import styled from 'styled-components'
import partlyCloudy from '../../icons/weather-partlycloudy.svg'
import clear from '../../icons/weather-sunny.svg'
import cloudy from '../../icons/weather-cloudy.svg'
import rainy from '../../icons/weather-rainy.svg'
import snowy from '../../icons/weather-snowy.svg'
import snowyRainy from '../../icons/weather-snowy-rainy.svg'
import fog from '../../icons/weather-fog.svg'

export const PartlyCloudyIcon = () => <WeatherIcon src={partlyCloudy} alt="Partly cloudy" />
export const ClearIcon = () => <WeatherIcon src={clear} alt="Clear" />
export const CloudyIcon = () => <WeatherIcon src={cloudy} alt="Clouds" />
export const RainyIcon = () => <WeatherIcon src={rainy} alt="Rain" />
export const SnowyIcon = () => <WeatherIcon src={snowy} alt="Snow" />
export const SnowyRainyIcon = () => <WeatherIcon src={snowyRainy} alt="Snow and rain" />
export const FogIcon = () => <WeatherIcon src={fog} alt="Fog" />

const WeatherIcon = styled.img`
    padding 0 .5rem;
    height: 2rem;
`