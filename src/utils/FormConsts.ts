
const convertEnumToValues = (enumObj: any) => {
  return Object.values(enumObj) as [string, ...string[]];
}

export const ADD_EDIT_ENUM = { "ADD": "Add", "EDIT": "Update" }

export enum RELATIONSHIP_CATEGORIES {
  Spouse = "Spouse",
  Friend = "Friend",
  Parent = "Parent",
  Sibling = "Sibling",
  Landlord = "Landlord",
  Other = "Other"

}

export enum NATIONALITIES {
  Singapore = "Singapore",
  India = "India",
  Malaysia = "Malaysia",
  Philippines = "Philippines",
  China = "China",
  UnitedStates = "United States",
  Afghanistan = "Afghanistan",
  Albania = "Albania",
  Algeria = "Algeria",
  Andorra = "Andorra",
  Angola = "Angola",
  AntiguaAndBarbuda = "Antigua and Barbuda",
  Argentina = "Argentina",
  Armenia = "Armenia",
  Australia = "Australia",
  Austria = "Austria",
  Azerbaijan = "Azerbaijan",
  Bahamas = "Bahamas",
  Bahrain = "Bahrain",
  Bangladesh = "Bangladesh",
  Barbados = "Barbados",
  Belarus = "Belarus",
  Belgium = "Belgium",
  Belize = "Belize",
  Benin = "Benin",
  Bhutan = "Bhutan",
  Bolivia = "Bolivia",
  BosniaAndHerzegovina = "Bosnia and Herzegovina",
  Botswana = "Botswana",
  Brazil = "Brazil",
  Brunei = "Brunei",
  Bulgaria = "Bulgaria",
  BurkinaFaso = "Burkina Faso",
  Burma = "Burma",
  Burundi = "Burundi",
  Cambodia = "Cambodia",
  Cameroon = "Cameroon",
  Canada = "Canada",
  CapeVerde = "Cape Verde",
  CentralAfricanRepublic = "Central African Republic",
  Chad = "Chad",
  Chile = "Chile",
  Colombia = "Colombia",
  Comoros = "Comoros",
  Congo = "Congo",
  CostaRica = "Costa Rica",
  Croatia = "Croatia",
  Cuba = "Cuba",
  Cyprus = "Cyprus",
  CzechRepublic = "Czech Republic",
  Denmark = "Denmark",
  Djibouti = "Djibouti",
  Dominica = "Dominica",
  DominicanRepublic = "Dominican Republic",
  EastTimor = "East Timor",
  Ecuador = "Ecuador",
  Egypt = "Egypt",
  ElSalvador = "El Salvador",
  EquatorialGuinea = "Equatorial Guinea",
  Eritrea = "Eritrea",
  Estonia = "Estonia",
  Ethiopia = "Ethiopia",
  Fiji = "Fiji",
  Finland = "Finland",
  France = "France",
  Gabon = "Gabon",
  Gambia = "Gambia",
  Georgia = "Georgia",
  Germany = "Germany",
  Ghana = "Ghana",
  Greece = "Greece",
  Grenada = "Grenada",
  Guatemala = "Guatemala",
  Guinea = "Guinea",
  GuineaBissau = "Guinea-Bissau",
  Guyana = "Guyana",
  Haiti = "Haiti",
  Honduras = "Honduras",
  Hungary = "Hungary",
  Iceland = "Iceland",
  Indonesia = "Indonesia",
  Iran = "Iran",
  Iraq = "Iraq",
  Ireland = "Ireland",
  Israel = "Israel",
  Italy = "Italy",
  IvoryCoast = "Ivory Coast",
  Jamaica = "Jamaica",
  Japan = "Japan",
  Jordan = "Jordan",
  Kazakhstan = "Kazakhstan",
  Kenya = "Kenya",
  Kiribati = "Kiribati",
  KoreaNorth = "Korea, North",
  KoreaSouth = "Korea, South",
  Kuwait = "Kuwait",
  Kyrgyzstan = "Kyrgyzstan",
  Laos = "Laos",
  Latvia = "Latvia",
  Lebanon = "Lebanon",
  Lesotho = "Lesotho",
  Liberia = "Liberia",
  Libya = "Libya",
  Liechtenstein = "Liechtenstein",
  Lithuania = "Lithuania",
  Luxembourg = "Luxembourg",
  Macedonia = "Macedonia",
  Madagascar = "Madagascar",
  Malawi = "Malawi",
  Maldives = "Maldives",
  Mali = "Mali",
  Malta = "Malta",
  MarshallIslands = "Marshall Islands",
  Mauritania = "Mauritania",
  Mauritius = "Mauritius",
  Mexico = "Mexico",
  Micronesia = "Micronesia",
  Moldova = "Moldova",
  Monaco = "Monaco",
  Mongolia = "Mongolia",
  Montenegro = "Montenegro",
  Morocco = "Morocco",
  Mozambique = "Mozambique",
  Namibia = "Namibia",
  Nauru = "Nauru",
  Nepal = "Nepal",
  Netherlands = "Netherlands",
  NewZealand = "New Zealand",
  Nicaragua = "Nicaragua",
  Niger = "Niger",
  Nigeria = "Nigeria",
  Norway = "Norway",
  Oman = "Oman",
  Pakistan = "Pakistan",
  Palau = "Palau",
  Panama = "Panama",
  PapuaNewGuinea = "Papua New Guinea",
  Paraguay = "Paraguay",
  Peru = "Peru",
  Poland = "Poland",
  Portugal = "Portugal",
  Qatar = "Qatar",
  Romania = "Romania",
  Russia = "Russia",
  Rwanda = "Rwanda",
  SaintKittsAndNevis = "Saint Kitts and Nevis",
  SaintLucia = "Saint Lucia",
  SaintVincentAndTheGrenadines = "Saint Vincent and the Grenadines",
  Samoa = "Samoa",
  SanMarino = "San Marino",
  SaoTomeAndPrincipe = "Sao Tome and Principe",
  SaudiArabia = "Saudi Arabia",
  Senegal = "Senegal",
  Serbia = "Serbia",
  Seychelles = "Seychelles",
  SierraLeone = "Sierra Leone",
  Slovakia = "Slovakia",
  Slovenia = "Slovenia",
  SolomonIslands = "Solomon Islands",
  Somalia = "Somalia",
  SouthAfrica = "South Africa",
  Spain = "Spain",
  SriLanka = "Sri Lanka",
  Sudan = "Sudan",
  Suriname = "Suriname",
  Swaziland = "Swaziland",
  Sweden = "Sweden",
  Switzerland = "Switzerland",
  Syria = "Syria",
  Taiwan = "Taiwan",
  Tajikistan = "Tajikistan",
  Tanzania = "Tanzania",
  Thailand = "Thailand",
  Togo = "Togo",
  Tonga = "Tonga",
  TrinidadAndTobago = "Trinidad and Tobago",
  Tunisia = "Tunisia",
  Turkey = "Turkey",
  Turkmenistan = "Turkmenistan",
  Tuvalu = "Tuvalu",
  Uganda = "Uganda",
  Ukraine = "Ukraine",
  UnitedArabEmirates = "United Arab Emirates",
  UnitedKingdom = "United Kingdom",
  Uruguay = "Uruguay",
  Uzbekistan = "Uzbekistan",
  Vanuatu = "Vanuatu",
  VaticanCity = "Vatican City",
  Venezuela = "Venezuela",
  Vietnam = "Vietnam",
  Yemen = "Yemen",
  Zambia = "Zambia",
  Zimbabwe = "Zimbabwe"
}


export enum MARITAL_CATEGORIES {
  Single = "Single",
  Married = "Married",
  Divorced = "Divorced",
  Defacto = "Defacto",
  Separated = "Separated"
}

export enum CITIZEN_CATEGORIES {
  Citizen = "Citizen",
  PR = "PR",
  Foreigner = "Foreigner"
}


export const getCitizenColor = (citizenCategory: string, active = true) => {
  console.log("citizenCategory", citizenCategory);
  if (active) {
    return `${citizenCategory}`;
  }
  else {
    return `${citizenCategory}-red-gradient-color`;
  }
}

export const getCitizenBgColor = (citizenCategory: string, active = true) => {
  return `bg-${getCitizenColor(citizenCategory, active)}`;
}

export enum VALID_PASS_TYPES {
  EP = "EP",
  PEP = "PEP",
  WP = "WP",
  SPass = "SPass",
  Empty = ""
}

export enum RACE_TYPE {
  Chinese = "Chinese",
  Indian = "Indian",
  Malay = "Malay",
  Others = "Others"
}

export enum GENDER_TYPE {
  Male = "Male",
  Female = "Female"
}
export const NATIONALITY_VALUES = convertEnumToValues(NATIONALITIES);
export const CITIZEN_CATEGORIES_VALUES = convertEnumToValues(CITIZEN_CATEGORIES);
export const MARITAL_CATEGORIES_VALUES = convertEnumToValues(MARITAL_CATEGORIES);
export const VALID_PASS_TYPES_VALUES = convertEnumToValues(VALID_PASS_TYPES);
export const RACE_TYPE_VALUES = convertEnumToValues(RACE_TYPE);
export const GENDER_TYPE_VALUES = convertEnumToValues(GENDER_TYPE);
export const EMERGENCY_CONTACT_CATEGORIES_VALUES = convertEnumToValues(RELATIONSHIP_CATEGORIES);




export const isWepMandatory = (passType?: string | null) => {
  return passType === VALID_PASS_TYPES.WP || passType === VALID_PASS_TYPES.SPass;
}

export const isMalaysianForeigner = (employee: Employee | null) => {
  return employee && employee?.nationality === NATIONALITIES.Malaysia &&
    isForeigner(employee);
}

export const isForeigner = (employee: Employee | null) => {
  return employee &&
    employee?.citizenshipStatus === CITIZEN_CATEGORIES.Foreigner;
}