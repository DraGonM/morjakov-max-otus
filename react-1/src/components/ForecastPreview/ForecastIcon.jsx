import React from 'react'
import { ClearIcon, CloudyIcon, PartlyCloudyIcon, SnowyRainyIcon, RainyIcon, SnowyIcon, FogIcon } from './WeatherIcons'

export const ForecastIcon = ({ forecast }) => {
    if (!forecast.lastUpdated || !forecast.icon)
        return null

    const { icon } = forecast;
    if (icon.includes("partly-cloudy"))
        return <PartlyCloudyIcon />

    if (icon.includes("cloudy"))
        return <CloudyIcon />

    if (icon.includes("clear"))
        return <ClearIcon />

    if (icon.includes("sleet"))
        return <SnowyRainyIcon />

    if (icon.includes("rain"))
        return <RainyIcon />

    if (icon.includes("snow"))
        return <SnowyIcon />

    if (icon.includes("fog"))
        return <FogIcon />

    return <PartlyCloudyIcon />
}
