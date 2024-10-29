import { CHANGI_BOUNDS, GEO_FENCES, JALAN_BESAR_BOUNDS } from "./consts";

//const CHOSEN_BOUNDS = GEO_FENCES.SINGAPORE_BOUNDS
const CHOSEN_BOUNDS = GEO_FENCES.SINGAPORE_BOUNDS;
const GEO_FENCING_ON = true;


export const getChosenGeoFence = () => {
    if (!GEO_FENCING_ON) {
        return "Off";
    }
    for (const [key, value] of Object.entries(GEO_FENCES)) {
        if (value === CHOSEN_BOUNDS) {
            return key;
        }
    }
    return "Off";
}
//should be changed to isWithinGeoFence
export function isWithinCBD(latitude: number, longitude: number): boolean {
    console.log(`isWithinCBD: GEO_FENCING_ON ?: ${GEO_FENCING_ON} for ${getChosenGeoFence()}`)
    if (GEO_FENCING_ON) {
        return (
            latitude <= CHOSEN_BOUNDS.north &&
            latitude >= CHOSEN_BOUNDS.south &&
            longitude <= CHOSEN_BOUNDS.east &&
            longitude >= CHOSEN_BOUNDS.west
        );
    }
    return true;
}

export function isWithinChangi(latitude: number, longitude: number): boolean {
    return (
        latitude <= CHANGI_BOUNDS.north &&
        latitude >= CHANGI_BOUNDS.south &&
        longitude <= CHANGI_BOUNDS.east &&
        longitude >= CHANGI_BOUNDS.west
    );
}

export function isWithinJalanBesar(latitude: number, longitude: number): boolean {
    return (
        latitude <= JALAN_BESAR_BOUNDS.north &&
        latitude >= JALAN_BESAR_BOUNDS.south &&
        longitude <= JALAN_BESAR_BOUNDS.east &&
        longitude >= JALAN_BESAR_BOUNDS.west
    );
}