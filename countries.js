const countries = {

    /* =====================================================
       🟢 VISITED
       ===================================================== */

    "Germany": {
        status: "visited",
        cities: [
            { name: "Munich", lat: 48.1351, lng: 11.5820 },
            { name: "Frankfurt", lat: 50.1109, lng: 8.6821 },
            { name: "Düsseldorf", lat: 51.2277, lng: 6.7735 },
            { name: "Cologne", lat: 50.9375, lng: 6.9603 },
            { name: "Aachen", lat: 50.7753, lng: 6.0839 },
            { name: "Monschau", lat: 50.5546, lng: 6.2420 },
            { name: "Trier", lat: 49.7499, lng: 6.6371 },
            { name: "Hamburg", lat: 53.5511, lng: 9.9937 },
            { name: "Bremen", lat: 53.0793, lng: 8.8017 },
            { name: "Hannover", lat: 52.3759, lng: 9.7320 },
            { name: "Saarbrücken", lat: 49.2402, lng: 7.0000 }
        ]
    },

    "Austria": {
        status: "visited",
        cities: [
            { name: "Klagenfurt", lat: 46.6247, lng: 14.3053 },
            { name: "Villach", lat: 46.6111, lng: 13.8558 },
            { name: "Vienna", lat: 48.2082, lng: 16.3738 }
        ]
    },

    "Belgium": {
        status: "visited",
        cities: [
            { name: "La Panne", lat: 51.0972, lng: 2.5939 },
            { name: "Middelkerke", lat: 51.1853, lng: 2.8207 },
            { name: "Ostend", lat: 51.2154, lng: 2.9287 },
            { name: "Zeebrugge", lat: 51.3294, lng: 3.2076 },
            { name: "Knokke", lat: 51.3500, lng: 3.2667 },
            { name: "Antwerp", lat: 51.2194, lng: 4.4025 },
            { name: "Bruges", lat: 51.2093, lng: 3.2247 },
            { name: "Ghent", lat: 51.0543, lng: 3.7174 },
            { name: "Ypres", lat: 50.8514, lng: 2.8857 },
            { name: "Mouscron", lat: 50.7449, lng: 3.2064 },
            { name: "Tournai", lat: 50.6056, lng: 3.3884 },
            { name: "Ath", lat: 50.6303, lng: 3.7783 },
            { name: "Brussels", lat: 50.8503, lng: 4.3517 },
            { name: "Charleroi", lat: 50.4108, lng: 4.4446 },
            { name: "Binche", lat: 50.4110, lng: 4.1645 },
            { name: "Mons", lat: 50.4542, lng: 3.9523 },
            { name: "Aalst", lat: 50.9370, lng: 4.0400 },
            { name: "Mechelen", lat: 51.0259, lng: 4.4776 },
            { name: "Leuven", lat: 50.8798, lng: 4.7005 },
            { name: "Liège", lat: 50.6326, lng: 5.5797 },
            { name: "Namur", lat: 50.4674, lng: 4.8718 },
            { name: "Andenne", lat: 50.4894, lng: 5.0958 },
            { name: "Durbuy", lat: 50.3520, lng: 5.4560 },
            { name: "Ciney", lat: 50.2945, lng: 5.1001 },
            { name: "Chimay", lat: 50.0481, lng: 4.3171 },
            { name: "Virton", lat: 49.5682, lng: 5.5336 },
            { name: "Arlon", lat: 49.6833, lng: 5.8167 },
            { name: "Bouillon", lat: 49.7939, lng: 5.0670 },
            { name: "Bastogne", lat: 50.0035, lng: 5.7170 },
            { name: "La Roche-en-Ardenne", lat: 50.1833, lng: 5.5750 },
            { name: "Marche-en-Famenne", lat: 50.2269, lng: 5.3442 },
            { name: "Rochefort", lat: 50.1631, lng: 5.2214 },
            { name: "Vielsalm", lat: 50.2840, lng: 5.9160 },
            { name: "Malmedy", lat: 50.4269, lng: 6.0270 },
            { name: "Saint-Vith", lat: 50.2810, lng: 6.1260 },
            { name: "Eupen", lat: 50.6309, lng: 6.0323 },
            { name: "Verviers", lat: 50.5891, lng: 5.8624 },
            { name: "Waremme", lat: 50.6970, lng: 5.2550 },
            { name: "Wavre", lat: 50.7172, lng: 4.6014 },
            { name: "Jodoigne", lat: 50.7236, lng: 4.8690 },
            { name: "Louvain-la-Neuve", lat: 50.6683, lng: 4.5683 },
            { name: "Waterloo", lat: 50.7147, lng: 4.3990 },
            { name: "Rixensart", lat: 50.7123, lng: 4.5250 },
            { name: "Braine-l'Alleud", lat: 50.6836, lng: 4.3678 },
            { name: "Ittre", lat: 50.6490, lng: 4.2640 },
            { name: "Nivelles", lat: 50.5983, lng: 4.3285 },
            { name: "Soignies", lat: 50.5792, lng: 4.0713 },
            { name: "Villers-la-Ville", lat: 50.5900, lng: 4.5160 },
            { name: "Genappe", lat: 50.6110, lng: 4.4510 },
            { name: "Floreffe", lat: 50.4340, lng: 4.7590 },
            { name: "Annevoie", lat: 50.3520, lng: 4.8400 },
            { name: "Florennes", lat: 50.2510, lng: 4.6060 },
            { name: "Philippeville", lat: 50.1960, lng: 4.5430 },
            { name: "Couvin", lat: 50.0530, lng: 4.4930 }
        ]
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
            { name: "Saronno", lat: 45.6258, lng: 9.0352 },
            { name: "Como", lat: 45.8081, lng: 9.0852 }
        ]
    },

    "Luxembourg": {
        status: "visited",
        cities: [
            { name: "Esch-sur-Alzette", lat: 49.4958, lng: 5.9806 },
            { name: "Dudelange", lat: 49.4806, lng: 6.0878 },
            { name: "Schengen", lat: 49.4700, lng: 6.3669 },
            { name: "Mondorf-les-Bains", lat: 49.5050, lng: 6.2817 },
            { name: "Differdange", lat: 49.5222, lng: 5.8917 },
            { name: "Mamer", lat: 49.6275, lng: 6.0233 },
            { name: "Luxembourg", lat: 49.6116, lng: 6.1319 },
            { name: "Grevenmacher", lat: 49.6803, lng: 6.4403 },
            { name: "Echternach", lat: 49.8119, lng: 6.4215 },
            { name: "Diekirch", lat: 49.8678, lng: 6.1590 },
            { name: "Esch-sur-Sûre", lat: 49.9103, lng: 5.9356 },
            { name: "Ettelbruck", lat: 49.8475, lng: 6.1042 }
        ]
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
        cities: [
            { name: "Geneva", lat: 46.2044, lng: 6.1432 },
            { name: "Montreux", lat: 46.4312, lng: 6.9107 },
            { name: "Martigny", lat: 46.1028, lng: 7.0727 },
            { name: "Lugano", lat: 46.0037, lng: 8.9511 },
            { name: "Locarno", lat: 46.1699, lng: 8.7995 },
            { name: "Bellinzona", lat: 46.1946, lng: 9.0232 },
            { name: "Basel", lat: 47.5596, lng: 7.5886 }
        ]
    },

    "Turkey": {
        status: "visited",
        cities: [
            { name: "Istanbul", lat: 41.0082, lng: 28.9784 },
            { name: "Çanakkale", lat: 40.1553, lng: 26.4142 },
            { name: "Antalya", lat: 36.8969, lng: 30.7133 },
            { name: "Fethiye", lat: 36.6217, lng: 29.1164 },
            { name: "Muğla", lat: 37.2153, lng: 28.3636 },
            { name: "Pamukkale", lat: 37.9204, lng: 29.1200 },
            { name: "Kaş", lat: 36.2018, lng: 29.6415 },
            { name: "Kalkan", lat: 36.2654, lng: 29.4134 }
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
            { name: "Heraklion", lat: 35.3387, lng: 25.1442 },
            { name: "Rhodes", lat: 36.4340, lng: 28.2176 }
        ]
    },

    "Croatia": {
        status: "visited",
        cities: [
            { name: "Split", lat: 43.5081, lng: 16.4402 },
            { name: "Dubrovnik", lat: 42.6507, lng: 18.0944 },
            { name: "Plitvice", lat: 44.8654, lng: 15.5820 }
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
        cities: [
            { name: "Uherské Hradiště", lat: 49.0698, lng: 17.4597 }
        ]
    },

    "Slovakia": {
        status: "visited",
        cities: [
            { name: "Bratislava", lat: 48.1486, lng: 17.1077 }
        ]
    },

    "Slovenia": {
        status: "visited",
        cities: [
            { name: "Ljubljana", lat: 46.0569, lng: 14.5058 },
            { name: "Maribor", lat: 46.5547, lng: 15.6459 }
        ]
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

    "Egypt": {
        status: "visited",
        cities: [
            { name: "Cairo", lat: 30.0444, lng: 31.2357 },
            { name: "Luxor", lat: 25.6872, lng: 32.6396 }
        ]
    },


    /* =====================================================
       🟠 UPCOMING — TES ADVENTURE
       ===================================================== */

    "Thailand": { status: "upcoming", cities: [] },
    "Vietnam": { status: "upcoming", cities: [] },
    "Cambodia": { status: "upcoming", cities: [] },
    "Laos": { status: "upcoming", cities: [] },
    "Malaysia": { status: "upcoming", cities: [] },
    "Singapore": { status: "upcoming", cities: [] },
    "Philippines": { status: "upcoming", cities: [] },
    "Nepal": { status: "upcoming", cities: [] },
    "India": { status: "upcoming", cities: [] },
    "China": { status: "upcoming", cities: [] },
    "Hong Kong": {
        status: "upcoming",
        type: "territory",
        cities: []
    },
    "South Korea": { status: "upcoming", cities: [] },
    "Japan": { status: "upcoming", cities: [] },
    "Mongolia": { status: "upcoming", cities: [] },
    "Maldives": { status: "upcoming", cities: [] },

    "South Africa": { status: "upcoming", cities: [] },
    "Namibia": { status: "upcoming", cities: [] },
    "Botswana": { status: "upcoming", cities: [] },
    "Zambia": { status: "upcoming", cities: [] },
    "Tanzania": { status: "upcoming", cities: [] },
    "Rwanda": { status: "upcoming", cities: [] },
    "Kenya": { status: "upcoming", cities: [] },

    "Mexico": { status: "upcoming", cities: [] },
    "Guatemala": { status: "upcoming", cities: [] },
    "Honduras": { status: "upcoming", cities: [] },
    "Nicaragua": { status: "upcoming", cities: [] },
    "Costa Rica": { status: "upcoming", cities: [] },
    "Panama": { status: "upcoming", cities: [] },

    "Saint Lucia": { status: "upcoming", cities: [] },
    "Dominica": { status: "upcoming", cities: [] },
    "Jamaica": { status: "upcoming", cities: [] },
    "Cuba": { status: "upcoming", cities: [] },

    "Colombia": { status: "upcoming", cities: [] },
    "Ecuador": { status: "upcoming", cities: [] },

    "Galapagos": {
        status: "upcoming",
        type: "territory",
        parent: "Ecuador",
        cities: []
    },

    "Peru": { status: "upcoming", cities: [] },
    "Bolivia": { status: "upcoming", cities: [] },
    "Chile": { status: "upcoming", cities: [] },

    "Easter Island": {
        status: "upcoming",
        type: "territory",
        parent: "Chile",
        cities: []
    },

    "Argentina": { status: "upcoming", cities: [] },
    "Uruguay": { status: "upcoming", cities: [] },
    "Brazil": { status: "upcoming", cities: [] },

    "French Guiana": {
        status: "upcoming",
        type: "territory",
        parent: "France",
        cities: []
    },

    "Suriname": { status: "upcoming", cities: [] },

    "Australia": { status: "upcoming", cities: [] },
    "New Zealand": { status: "upcoming", cities: [] }

};
