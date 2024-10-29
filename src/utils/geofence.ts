import { GEO_FENCES } from "./consts";
import { GeoFenceBounds } from "./type";

//TODO: Make both a Setting
export const CHOSEN_BOUNDS = GEO_FENCES.JALAN_BESAR_BOUNDS;
export const GEO_FENCING_ON = true;

export const getChosenGeoFence = () => {
    return GEO_FENCING_ON ? CHOSEN_BOUNDS.name : "Off";
}

export const isWithinBounds = (lat: number, lon: number, bounds: GeoFenceBounds) => {
    const isWIthin = (
        lat <= bounds.north &&
        lat >= bounds.south &&
        lon <= bounds.east &&
        lon >= bounds.west
    );

    if(lat === 0 || lon === 0) {
        console.warn("Geolocation Headers Aren’t Enabled. In Vercel Dashbaord, go to Settings > General > Headers and add the following headers: x-vercel-ip-latitude and x-vercel-ip-longitude")
        console.warn("Ignore for local development")
    }

    console.log(`lat: ${lat} lon: ${lon} 
        bounds: ${JSON.stringify(bounds)} 
        ${lat <= bounds.north} ${lat >= bounds.south} ${lon <= bounds.east} ${lon >= bounds.west}
        isWIthin: ${isWIthin}`);
    return isWIthin;
}

//should be changed to isWithinGeoFence
export function isWithinCBD(latitude: number, longitude: number): boolean {
    console.log(`
        isWithinCBD: GEO_FENCING_ON ?: ${GEO_FENCING_ON} for ${getChosenGeoFence()}`)
    if (GEO_FENCING_ON) {
        return isWithinBounds(latitude, longitude, CHOSEN_BOUNDS);
    }
    return true;
}
