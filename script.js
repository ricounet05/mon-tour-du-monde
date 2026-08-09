/* =========================================================
   MON TOUR DU MONDE — TES ADVENTURE
   Carte mondiale propre avec drapeaux
   ========================================================= */


/* =========================================================
   CARTE
   ========================================================= */

const map = L.map("world-map", {

    zoomControl: true,

    attributionControl: true,

    minZoom: 1,

    maxZoom: 7,

    worldCopyJump: false,

    zoomSnap: 0.5,

    zoomDelta: 0.5

});


map.setView([20, 0], 2);


/* =========================================================
   COULEURS
   ========================================================= */

const COLORS = {

    visited: "#3f8f5a",

    upcoming: "#d59a3a",

    other: "#d9ddd9",

    visitedBorder: "#28643d",

    upcomingBorder: "#9a681f",

    otherBorder: "#777d79",

    ocean: "#dceaf0"

};


/* =========================================================
   CORRESPONDANCE GEOJSON
   ========================================================= */

const aliases = {

    "United States of America": "United States",

    "United Kingdom": "United Kingdom",

    "Czech Republic": "Czechia",

    "Korea": "South Korea",

    "Republic of Korea": "South Korea",

    "Viet Nam": "Vietnam",

    "Lao People's Democratic Republic": "Laos",

    "Türkiye": "Turkey",

    "Turkiye": "Turkey",

    "United Republic of Tanzania": "Tanzania",

    "Bolivia (Plurinational State of)": "Bolivia",

    "Russian Federation": "Russia"

};


/* =========================================================
   POSITIONS DES DRAPEAUX
   IMPORTANT :
   les positions sont manuelles
   ========================================================= */

const flagPositions = {

    "Germany": [51.1, 10.4],

    "Austria": [47.6, 14.1],

    "Belgium": [50.8, 4.5],

    "Spain": [40.3, -3.5],

    "France": [46.4, 2.2],

    "Italy": [42.8, 12.5],

    "Luxembourg": [49.8, 6.1],

    "Malta": [35.9, 14.4],

    "Netherlands": [52.2, 5.3],

    "Albania": [41.2, 20.0],

    "Switzerland": [46.8, 8.2],

    "Turkey": [39.0, 35.2],

    "Indonesia": [-2.0, 117.0],

    "Saudi Arabia": [24.0, 45.0],

    "Jordan": [31.2, 36.2],

    "United Arab Emirates": [24.3, 54.4],

    "Qatar": [25.3, 51.2],

    "Oman": [20.5, 57.0],

    "Greece": [39.0, 22.0],

    "Croatia": [45.2, 15.5],

    "Finland": [64.8, 26.0],

    "United Kingdom": [54.5, -2.5],

    "Romania": [45.9, 24.9],

    "Bahrain": [26.1, 50.5],

    "Andorra": [42.5, 1.6],

    "Czechia": [49.8, 15.5],

    "San Marino": [43.9, 12.45],

    "Hungary": [47.2, 19.2],

    "Serbia": [44.0, 20.8],

    "Bosnia and Herzegovina": [44.2, 17.8],

    "Egypt": [27.0, 30.8],


    /* =========================
       UPCOMING
       ========================= */

    "Thailand": [15.0, 101.0],

    "Vietnam": [16.2, 107.8],

    "Cambodia": [12.7, 104.9],

    "Laos": [18.2, 103.9],

    "Malaysia": [4.5, 102.0],

    "Singapore": [1.35, 103.82],

    "Philippines": [12.0, 122.0],

    "Nepal": [28.4, 84.1],

    "India": [22.5, 79.0],

    "China": [35.5, 103.0],

    "Hong Kong": [22.3, 114.2],

    "South Korea": [36.4, 127.8],

    "Japan": [36.2, 138.2],

    "Mongolia": [46.8, 103.8],

    "Maldives": [3.2, 73.2],

    "South Africa": [-29.0, 24.0],

    "Namibia": [-22.0, 17.0],

    "Botswana": [-22.3, 24.0],

    "Zambia": [-13.5, 27.8],

    "Tanzania": [-6.2, 35.0],

    "Rwanda": [-2.0, 30.1],

    "Kenya": [0.2, 37.9],

    "Mexico": [23.5, -102.0],

    "Guatemala": [15.5, -90.3],

    "Honduras": [14.8, -86.5],

    "Nicaragua": [12.8, -85.0],

    "Costa Rica": [9.8, -84.2],

    "Panama": [8.5, -80.0],

    "Saint Lucia": [13.9, -60.97],

    "Dominica": [15.4, -61.35],

    "Jamaica": [18.1, -77.3],

    "Cuba": [21.5, -79.5],

    "Colombia": [4.5, -74.0],

    "Ecuador": [-1.4, -78.4],

    "Peru": [-9.2, -75.0],

    "Bolivia": [-16.3, -64.7],

    "Chile": [-30.0, -71.0],

    "Argentina": [-38.4, -63.6],

    "Uruguay": [-32.5, -56.0],

    "Brazil": [-10.0, -52.0],

    "French Guiana": [4.0, -53.0],

    "Suriname": [4.0, -56.0],

    "Australia": [-25.0, 134.0],

    "New Zealand": [-41.0, 172.0]

};


/* =========================================================
   NOM DU PAYS GEOJSON
   ========================================================= */

function getCountryName(feature) {

    const p = feature.properties || {};

    const names = [

        p.ADMIN,

        p.NAME,

        p.NAME_EN,

        p.name,

        p.SOVEREIGNT

    ];

    for (const name of names) {

        if (
            name &&
            typeof name === "string"
        ) {

            return aliases[name] || name;

        }

    }

    return null;

}


/* =========================================================
   DONNÉES
   ========================================================= */

function getCountryData(name) {

    if (!name) {
        return null;
    }

    if (countries[name]) {
        return countries[name];
    }

    const wanted =
        name.toLowerCase();

    for (
        const key of Object.keys(countries)
    ) {

        if (
            key.toLowerCase() === wanted
        ) {

            return countries[key];

        }

    }

    return null;

}


/* =========================================================
   STYLE PAYS
   ========================================================= */

function countryStyle(feature) {

    const name =
        getCountryName(feature);

    const data =
        getCountryData(name);


    if (
        data &&
        data.status === "visited"
    ) {

        return {

            color:
                COLORS.visitedBorder,

            weight: 1.1,

            fillColor:
                COLORS.visited,

            fillOpacity: 0.88

        };

    }


    if (
        data &&
        data.status === "upcoming"
    ) {

        return {

            color:
                COLORS.upcomingBorder,

            weight: 1.1,

            fillColor:
                COLORS.upcoming,

            fillOpacity: 0.88

        };

    }


    return {

        color:
            COLORS.otherBorder,

        weight: 0.7,

        fillColor:
            COLORS.other,

        fillOpacity: 0.72

    };

}


/* =========================================================
   POPUP
   ========================================================= */

function createPopup(
    name,
    data
) {

    if (!data) {
        return "";
    }


    const status =
        data.status === "visited"
            ? "Visited"
            : "Upcoming";


    const statusClass =
        data.status === "visited"
            ? "popup-visited"
            : "popup-upcoming";


    let citiesHTML = "";


    if (
        data.cities &&
        data.cities.length > 0
    ) {

        citiesHTML = `

            <div class="popup-cities">

                <strong>Cities</strong>

                <ul>

                    ${data.cities
                        .map(
                            city =>
                                `<li>${city.name}</li>`
                        )
                        .join("")}

                </ul>

            </div>

        `;

    }


    return `

        <div class="country-popup">

            <div class="popup-title">

                ${name}

            </div>

            <div class="popup-status ${statusClass}">

                ${status}

            </div>

            ${citiesHTML}

        </div>

    `;

}


/* =========================================================
   CLIC SUR UN PAYS
   ========================================================= */

function countryClick(event) {

    const layer =
        event.target;

    const name =
        getCountryName(
            layer.feature
        );

    const data =
        getCountryData(name);


    if (!data) {
        return;
    }


    layer.bindPopup(
        createPopup(
            name,
            data
        ),
        {

            maxWidth: 260,

            minWidth: 190,

            closeButton: true,

            autoPan: true,

            className:
                "tes-country-popup"

        }
    );


    layer.openPopup();

}


/* =========================================================
   SURVOL
   ========================================================= */

function countryMouseOver(event) {

    const layer =
        event.target;

    const name =
        getCountryName(
            layer.feature
        );

    const data =
        getCountryData(name);


    if (!data) {
        return;
    }


    layer.setStyle({

        weight: 2.5,

        color: "#202522",

        fillOpacity: 1

    });


    layer.bringToFront();

}


function countryMouseOut(event) {

    geojsonLayer.resetStyle(
        event.target
    );

}


/* =========================================================
   DRAPEAU
   ========================================================= */

function addFlag(
    name,
    data
) {

    const position =
        flagPositions[name];


    if (!position) {
        return;
    }


    const flag =
        getFlagEmoji(name);


    if (!flag) {
        return;
    }


    const icon =
        L.divIcon({

            className:
                "country-flag-marker",

            html: `

                <div
                    class="flag-circle"
                    title="${name}"
                >

                    <span>${flag}</span>

                </div>

            `,

            iconSize: [34, 34],

            iconAnchor: [17, 17]

        });


    const marker =
        L.marker(
            position,
            {

                icon: icon,

                keyboard: false,

                zIndexOffset: 1000

            }
        );


    marker.addTo(map);


    marker.bindPopup(

        createPopup(
            name,
            data
        ),

        {

            maxWidth: 260,

            minWidth: 190,

            closeButton: true,

            className:
                "tes-country-popup"

        }

    );

}


/* =========================================================
   DRAPEAUX
   ========================================================= */

const flagMap = {

    "Germany": "🇩🇪",

    "Austria": "🇦🇹",

    "Belgium": "🇧🇪",

    "Spain": "🇪🇸",

    "France": "🇫🇷",

    "Italy": "🇮🇹",

    "Luxembourg": "🇱🇺",

    "Malta": "🇲🇹",

    "Netherlands": "🇳🇱",

    "Albania": "🇦🇱",

    "Switzerland": "🇨🇭",

    "Turkey": "🇹🇷",

    "Indonesia": "🇮🇩",

    "Saudi Arabia": "🇸🇦",

    "Jordan": "🇯🇴",

    "United Arab Emirates": "🇦🇪",

    "Qatar": "🇶🇦",

    "Oman": "🇴🇲",

    "Greece": "🇬🇷",

    "Croatia": "🇭🇷",

    "Finland": "🇫🇮",

    "United Kingdom": "🇬🇧",

    "Romania": "🇷🇴",

    "Bahrain": "🇧🇭",

    "Andorra": "🇦🇩",

    "Czechia": "🇨🇿",

    "San Marino": "🇸🇲",

    "Hungary": "🇭🇺",

    "Serbia": "🇷🇸",

    "Bosnia and Herzegovina": "🇧🇦",

    "Egypt": "🇪🇬",

    "Thailand": "🇹🇭",

    "Vietnam": "🇻🇳",

    "Cambodia": "🇰🇭",

    "Laos": "🇱🇦",

    "Malaysia": "🇲🇾",

    "Singapore": "🇸🇬",

    "Philippines": "🇵🇭",

    "Nepal": "🇳🇵",

    "India": "🇮🇳",

    "China": "🇨🇳",

    "Hong Kong": "🇭🇰",

    "South Korea": "🇰🇷",

    "Japan": "🇯🇵",

    "Mongolia": "🇲🇳",

    "Maldives": "🇲🇻",

    "South Africa": "🇿🇦",

    "Namibia": "🇳🇦",

    "Botswana": "🇧🇼",

    "Zambia": "🇿🇲",

    "Tanzania": "🇹🇿",

    "Rwanda": "🇷🇼",

    "Kenya": "🇰🇪",

    "Mexico": "🇲🇽",

    "Guatemala": "🇬🇹",

    "Honduras": "🇭🇳",

    "Nicaragua": "🇳🇮",

    "Costa Rica": "🇨🇷",

    "Panama": "🇵🇦",

    "Saint Lucia": "🇱🇨",

    "Dominica": "🇩🇲",

    "Jamaica": "🇯🇲",

    "Cuba": "🇨🇺",

    "Colombia": "🇨🇴",

    "Ecuador": "🇪🇨",

    "Peru": "🇵🇪",

    "Bolivia": "🇧🇴",

    "Chile": "🇨🇱",

    "Argentina": "🇦🇷",

    "Uruguay": "🇺🇾",

    "Brazil": "🇧🇷",

    "French Guiana": "🇬🇫",

    "Suriname": "🇸🇷",

    "Australia": "🇦🇺",

    "New Zealand": "🇳🇿"

};


function getFlagEmoji(name) {

    return flagMap[name] || "";

}


/* =========================================================
   LISTES SOUS LA CARTE
   ========================================================= */

function createCountryLists() {

    const visited =
        document.getElementById(
            "visited-countries"
        );

    const upcoming =
        document.getElementById(
            "upcoming-countries"
        );


    if (!visited || !upcoming) {
        return;
    }


    visited.innerHTML = "";

    upcoming.innerHTML = "";


    Object.keys(countries)

        .forEach(name => {

            const data =
                countries[name];


            if (
                data.status !== "visited" &&
                data.status !== "upcoming"
            ) {

                return;

            }


            const item =
                document.createElement(
                    "button"
                );


            item.className =
                data.status === "visited"
                    ? "country-list-item visited-item"
                    : "country-list-item upcoming-item";


            item.type =
                "button";


            item.innerHTML = `

                <span class="list-flag">

                    ${getFlagEmoji(name)}

                </span>

                <span class="list-name">

                    ${name}

                </span>

            `;


            item.addEventListener(
                "click",
                () => {

                    const position =
                        flagPositions[name];


                    if (!position) {
                        return;
                    }


                    map.flyTo(
                        position,
                        4,
                        {

                            duration: 1.2

                        }
                    );

                }
            );


            if (
                data.status === "visited"
            ) {

                visited.appendChild(
                    item
                );

            } else {

                upcoming.appendChild(
                    item
                );

            }

        });

}


/* =========================================================
   GEOJSON
   ========================================================= */

const WORLD_GEOJSON =
    "https://raw.githubusercontent.com/datasets/geo-countries/master/data/countries.geojson";


let geojsonLayer = null;


fetch(WORLD_GEOJSON)

    .then(
        response => {

            if (!response.ok) {

                throw new Error(
                    "World map unavailable"
                );

            }

            return response.json();

        }
    )

    .then(
        worldData => {

            geojsonLayer =
                L.geoJSON(

                    worldData,

                    {

                        style:
                            countryStyle,

                        onEachFeature:
                            function (
                                feature,
                                layer
                            ) {

                                layer.on({

                                    mouseover:
                                        countryMouseOver,

                                    mouseout:
                                        countryMouseOut,

                                    click:
                                        countryClick

                                });

                            }

                    }

                );


            geojsonLayer.addTo(map);


            createCountryLists();


            /*
             * Ajout des drapeaux
             */

            Object.keys(countries)

                .forEach(name => {

                    const data =
                        countries[name];


                    if (
                        data.status !== "visited" &&
                        data.status !== "upcoming"
                    ) {

                        return;

                    }


                    addFlag(
                        name,
                        data
                    );

                });


            const bounds =
                geojsonLayer.getBounds();


            if (
                bounds &&
                bounds.isValid()
            ) {

                map.fitBounds(

                    bounds,

                    {

                        padding:
                            [20, 20]

                    }

                );

            }


            setTimeout(
                () => {

                    map.invalidateSize();

                },
                400
            );

        }
    )

    .catch(
        error => {

            console.error(
                error
            );


            const mapBox =
                document.getElementById(
                    "world-map"
                );


            mapBox.innerHTML = `

                <div class="map-error">

                    The world map could not be loaded.

                </div>

            `;

        }
    );


/* =========================================================
   REDIMENSIONNEMENT
   ========================================================= */

window.addEventListener(
    "resize",
    () => {

        setTimeout(
            () => {

                map.invalidateSize();

            },
            200
        );

    }
);


window.addEventListener(
    "orientationchange",
    () => {

        setTimeout(
            () => {

                map.invalidateSize();

            },
            500
        );

    }
);
