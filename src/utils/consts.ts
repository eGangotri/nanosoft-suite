// Approximate coordinates for Singapore's CBD
export const CBD_BOUNDS = {
    name: "Central Business District-SG",
    north: 1.2930,
    south: 1.2720,
    east: 103.8570,
    west: 103.8390
};

// Approximate coordinates for Changi neighborhood, Singapore
export const CHANGI_BOUNDS = {
    name: "Changi",
    north: 1.3900, // Northernmost point (approximately north of Changi Airport)
    south: 1.3200, // Southernmost point (approximately south of Changi Beach Park)
    east: 104.0100, // Easternmost point (east of Changi Point)
    west: 103.9600 // Westernmost point (approximately west of Changi Airport)
};

// Approximate coordinates for Jalan Besar neighborhood, Singapore
export const JALAN_BESAR_BOUNDS = {
    name: "Jalan Besar",
    north: 1.3180, // Northernmost point (approximately north of Lavender MRT)
    south: 1.3020, // Southernmost point (approximately south of Bendemeer MRT)
    east: 103.8650, // Easternmost point (approximately east of Kallang River)
    west: 103.8520 // Westernmost point (approximately west of Farrer Park MRT)
};

export const SINGAPORE_BOUNDS = {
    name: "Singapore",
    north: 1.4705, // Northernmost point (approximately north of Pulau Ubin)
    south: 1.1300, // Southernmost point (approximately south of Pulau Satumu)
    east: 104.0950, // Easternmost point (approximately east of Pedra Branca)
    west: 103.6000 // Westernmost point (approximately west of Tuas)
};


export const GEO_FENCES = {
    CBD_BOUNDS,
    CHANGI_BOUNDS,
    JALAN_BESAR_BOUNDS,
    SINGAPORE_BOUNDS
}
