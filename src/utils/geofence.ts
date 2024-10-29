import { GEO_FENCES } from "./consts";

const CHOSEN_BOUNDS = GEO_FENCES.CHANGI_BOUNDS;
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
