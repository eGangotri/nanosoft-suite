import { GEO_FENCES } from "./consts";

const CHOSEN_BOUNDS = GEO_FENCES.JALAN_BESAR_BOUNDS;
const GEO_FENCING_ON = true;


export const getChosenGeoFence = () => {
    return GEO_FENCING_ON ? CHOSEN_BOUNDS.name : "Off";
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
