const countries = {

    /* =====================================================
       🟢 COUNTRIES ALREADY VISITED
       ===================================================== */

    "Germany": {
        status: "visited",
        cities: []
    },

    "Austria": {
        status: "visited",
        cities: []
    },

    "Belgium": {
        status: "visited",
        cities: []
    },

    "Spain": {
        status: "visited",
        cities: [
            { name: "Barcelona", lat: 41.3851, lng: 2.1734 },
            { name: "Jávea", lat: 38.7893, lng: 0.1661 },
            { name: "Palma de Mallorca", lat: 39.5696, lng: 2.6502 }
        ]
    },

    "France": {
        status: "visited",
        cities: [
            { name: "Cambrai", lat: 50.1759, lng: 3.2347 },
            { name: "Amiens", lat: 49.8941, lng: 2.2958 },
            { name: "Le Havre", lat: 49.4944, lng: 0.1079 },
            { name: "Fougères", lat: 48.3517, lng: -1.2010 },
            { name: "Rennes", lat: 48.1173, lng: -1.6778 },
            { name: "Plumelec", lat: 47.8377, lng: -2.6407 },
            { name: "Lille", lat: 50.6292, lng: 3.0573 },
            { name: "Reims", lat: 49.2583, lng: 4.0317 },
            { name: "Nancy", lat: 48.6921, lng: 6.1844 },
            { name: "Gérardmer", lat: 48.0706, lng: 6.8772 },
            { name: "Mulhouse", lat: 47.7508, lng: 7.3359 },
            { name: "Besançon", lat: 47.2378, lng: 6.0241 },
            { name: "Saint-Étienne", lat: 45.4397, lng: 4.3872 },
            { name: "Grenoble", lat: 45.1885, lng: 5.7245 },
            { name: "Nîmes", lat: 43.8367, lng: 4.3601 },
            { name: "Bergerac", lat: 44.8519, lng: 0.4836 },
            { name: "Périgueux", lat: 45.1843, lng: 0.7217 },
            { name: "Hautacam", lat: 42.9508, lng: -0.0306 },
            { name: "Pau", lat: 43.2951, lng: -0.3708 },
            { name: "Saint-Gaudens", lat: 43.1086, lng: 0.7247 },
            { name: "Carcassonne", lat: 43.2130, lng: 2.3491 },
            { name: "Paris", lat: 48.8566, lng: 2.3522 }
        ]
    },

    "Italy": {
        status: "visited",
        cities: [
            { name: "Venice", lat: 45.4408, lng: 12.3155 },
            { name: "Bassano del Grappa", lat: 45.7667, lng: 11.7333 },
            { name: "Vicenza", lat: 45.5455, lng: 11.5354 },
            { name: "Verona", lat: 45.4384, lng: 10.9916 },
            { name: "Milan", lat: 45.4642, lng: 9.1900 },
            { name: "Marostica", lat: 45.7456, lng: 11.6555 },
            { name: "Trieste", lat: 45.6495, lng: 13.7768 },
            { name: "Saronno", lat: 45.6258, lng: 9.0352 }
        ]
    },

    "Luxembourg": {
        status: "visited",
        cities: []
    },

    "Malta": {
        status: "visited",
        cities: [
            { name: "Valletta", lat: 35.8989, lng: 14.5146 }
        ]
    },

    "Netherlands": {
        status: "visited",
        cities: [
            { name: "The Hague", lat: 52.0705, lng: 4.3007 },
            { name: "Amsterdam", lat: 52.3676, lng: 4.9041 },
            { name: "Rotterdam", lat: 51.9244, lng: 4.4777 }
        ]
    },

    "Albania": {
        status: "visited",
        cities: [
            { name: "Tirana", lat: 41.3275, lng: 19.8187 },
            { name: "Durrës", lat: 41.3231, lng: 19.4414 },
            { name: "Elbasan", lat: 41.1125, lng: 20.0822 }
        ]
    },

    "Switzerland": {
        status: "visited",
        cities: []
    },

    "Turkey": {
        status: "visited",
        cities: []
    },

    "Indonesia": {
        status: "visited",
        upcoming: true,
        cities: [
            { name: "Denpasar", lat: -8.6500, lng: 115.2167 },
            { name: "Ubud", lat: -8.5069, lng: 115.2625 },
            { name: "Uluwatu", lat: -8.8291, lng: 115.0849 },
            { name: "Nusa Penida", lat: -8.7336, lng: 115.4568 }
        ]
    },

    "Saudi Arabia": {
        status: "visited",
        cities: [
            { name: "Jeddah", lat: 21.5433, lng: 39.1728 },
            { name: "Mecca", lat: 21.3891, lng: 39.8579 }
        ]
    },

    "Jordan": {
        status: "visited",
        cities: [
            { name: "Amman", lat: 31.9539, lng: 35.9106 },
            { name: "Petra", lat: 30.3285, lng: 35.4444 },
            { name: "Wadi Rum", lat: 29.5767, lng: 35.4194 },
            { name: "Aqaba", lat: 29.5319, lng: 35.0061 }
        ]
    },

    "United Arab Emirates": {
        status: "visited",
        cities: [
            { name: "Dubai", lat: 25.2048, lng: 55.2708 },
            { name: "Abu Dhabi", lat: 24.4539, lng: 54.3773 }
        ]
    },

    "Qatar": {
        status: "visited",
        cities: [
            { name: "Doha", lat: 25.2854, lng: 51.5310 }
        ]
    },

    "Oman": {
        status: "visited",
        cities: [
            { name: "Muscat", lat: 23.5880, lng: 58.3829 }
        ]
    },

    "Greece": {
        status: "visited",
        cities: [
            { name: "Corfu", lat: 39.6243, lng: 19.9217 },
            { name: "Katakolon", lat: 37.6488, lng: 21.3189 },
            { name: "Heraklion", lat: 35.3387, lng: 25.1442 }
        ]
    },

    "Croatia": {
        status: "visited",
        cities: [
            { name: "Split", lat: 43.5081, lng: 16.4402 },
            { name: "Dubrovnik", lat: 42.6507, lng: 18.0944 }
        ]
    },

    "Finland": {
        status: "visited",
        cities: [
            { name: "Rovaniemi", lat: 66.5039, lng: 25.7294 }
        ]
    },

    "United Kingdom": {
        status: "visited",
        cities: [
            { name: "Canterbury", lat: 51.2802, lng: 1.0789 },
            { name: "London", lat: 51.5074, lng: -0.1278 }
        ]
    },

    "Romania": {
        status: "visited",
        cities: [
            { name: "Constanța", lat: 44.1598, lng: 28.6348 },
            { name: "Bucharest", lat: 44.4268, lng: 26.1025 }
        ]
    },

    "Bahrain": {
        status: "visited",
        cities: [
            { name: "Manama", lat: 26.2235, lng: 50.5876 }
        ]
    },

    "Andorra": {
        status: "visited",
        cities: [
            { name: "Andorra la Vella", lat: 42.5063, lng: 1.5218 }
        ]
    },

    "Czechia": {
        status: "visited",
        cities: []
    },

    "San Marino": {
        status: "visited",
        cities: [
            { name: "San Marino", lat: 43.9424, lng: 12.4578 }
        ]
    },

    "Hungary": {
        status: "visited",
        cities: [
            { name: "Budapest", lat: 47.4979, lng: 19.0402 }
        ]
    },

    "Serbia": {
        status: "visited",
        cities: [
            { name: "Belgrade", lat: 44.7866, lng: 20.4489 }
        ]
    },

    "Bosnia and Herzegovina": {
        status: "visited",
        cities: [
            { name: "Mostar", lat: 43.3438, lng: 17.8078 }
        ]
    },


    /* =====================================================
       🟠 UPCOMING — TES ADVENTURE
       ===================================================== */

    "Thailand": {
        status: "upcoming",
        cities: []
    },

    "Vietnam": {
        status: "upcoming",
        cities: []
    },

    "Cambodia": {
        status: "upcoming",
        cities: []
    },

    "Laos": {
        status: "upcoming",
        cities: []
    },

    "Malaysia": {
        status: "upcoming",
        cities: []
    },

    "Singapore": {
        status: "upcoming",
        cities: []
    },

    "Philippines": {
        status: "upcoming",
        cities: []
    },

    "Nepal": {
        status: "upcoming",
        cities: []
    },

    "India": {
        status: "upcoming",
        cities: []
    },

    "China": {
        status: "upcoming",
        cities: []
    },

    "Hong Kong": {
        status: "upcoming",
        type: "territory",
        cities: []
    },

    "South Korea": {
        status: "upcoming",
        cities: []
    },

    "Japan": {
        status: "upcoming",
        cities: []
    },

    "Mongolia": {
        status: "upcoming",
        cities: []
    },

    "Maldives": {
        status: "upcoming",
        cities: []
    },

    "South Africa": {
        status: "upcoming",
        cities: []
    },

    "Namibia": {
        status: "upcoming",
        cities: []
    },

    "Botswana": {
        status: "upcoming",
        cities: []
    },

    "Zambia": {
        status: "upcoming",
        cities: []
    },

    "Tanzania": {
        status: "upcoming",
        cities: []
    },

    "Rwanda": {
        status: "upcoming",
        cities: []
    },

    "Kenya": {
        status: "upcoming",
        cities: []
    },

    "Mexico": {
        status: "upcoming",
        cities: []
    },

    "Guatemala": {
        status: "upcoming",
        cities: []
    },

    "Honduras": {
        status: "upcoming",
        cities: []
    },

    "Nicaragua": {
        status: "upcoming",
        cities: []
    },

    "Costa Rica": {
        status: "upcoming",
        cities: []
    },

    "Panama": {
        status: "upcoming",
        cities: []
    },

    "Saint Lucia": {
        status: "upcoming",
        cities: []
    },

    "Dominica": {
        status: "upcoming",
        cities: []
    },

    "Jamaica": {
        status: "upcoming",
        cities: []
    },

    "Cuba": {
        status: "upcoming",
        cities: []
    },

    "Colombia": {
        status: "upcoming",
        cities: []
    },

    "Ecuador": {
        status: "upcoming",
        cities: []
    },

    "Galapagos": {
        status: "upcoming",
        type: "territory",
        parent: "Ecuador",
        cities: []
    },

    "Peru": {
        status: "upcoming",
        cities: []
    },

    "Bolivia": {
        status: "upcoming",
        cities: []
    },

    "Chile": {
        status: "upcoming",
        cities: []
    },

    "Easter Island": {
        status: "upcoming",
        type: "territory",
        parent: "Chile",
        cities: []
    },

    "Argentina": {
        status: "upcoming",
        cities: []
    },

    "Uruguay": {
        status: "upcoming",
        cities: []
    },

    "Brazil": {
        status: "upcoming",
        cities: []
    },

    "French Guiana": {
        status: "upcoming",
        type: "territory",
        parent: "France",
        cities: []
    },

    "Suriname": {
        status: "upcoming",
        cities: []
    }
};
