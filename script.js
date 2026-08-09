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

document.getElementById("world-map").style.backgroundColor =
    COLORS.ocean;


/* =========================================================
   NOMS GEOJSON
   ========================================================= */

const aliases = {

    "United States of America": "United States",

    "United Kingdom": "United Kingdom",

    "Czech Republic": "Czechia",

    "Republic of Serbia": "Serbia",

    "Republic of Croatia": "Croatia",

    "Republic of Slovenia": "Slovenia",

    "Republic of Austria": "Austria",

    "Republic of Albania": "Albania",

    "Republic of Moldova": "Moldova",

    "Bosnia and Herzegovina": "Bosnia and Herzegovina",

    "Korea": "South Korea",

    "Republic of Korea": "South Korea",

    "Viet Nam": "Vietnam",

    "Lao People's Democratic Republic": "Laos",

    "Türkiye": "Turkey",

    "Turkiye": "Turkey",

    "United Republic of Tanzania": "Tanzania",

    "Russian Federation": "Russia",

    "Iran (Islamic Republic of)": "Iran",

    "Syrian Arab Republic": "Syria",

    "Bolivia (Plurinational State of)": "Bolivia"

};


/* =========================================================
   NOM DU PAYS
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
   DONNÉES DU PAYS
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
   STYLE
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
            color: COLORS.visitedBorder,
            weight: 1.2,
            fillColor: COLORS.visited,
            fillOpacity: 0.9
        };
    }


    if (
        data &&
        data.status === "upcoming"
    ) {

        return {
            color: COLORS.upcomingBorder,
            weight: 1.2,
            fillColor: COLORS.upcoming,
            fillOpacity: 0.9
        };
    }


    return {
        color: COLORS.otherBorder,
        weight: 0.7,
        fillColor: COLORS.other,
        fillOpacity: 0.75
    };
}


/* =========================================================
   SURVOL
   ========================================================= */

function highlightCountry(event) {

    const layer = event.target;

    const name =
        getCountryName(layer.feature);

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


function resetCountry(event) {

    if (geojsonLayer) {
        geojsonLayer.resetStyle(
            event.target
        );
    }
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
        data.cities.length
    ) {

        citiesHTML = `

            <div class="popup-cities">

                <strong>Visited cities</strong>

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
   CLIC SUR PAYS
   ========================================================= */

function countryClick(event) {

    const layer = event.target;

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
            maxWidth: 280,
            minWidth: 200,
            closeButton: true,
            autoPan: true,
            className: "tes-country-popup"
        }
    );

    layer.openPopup();
}


/* =========================================================
   LISTES
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


            item.type = "button";

            item.className =
                data.status === "visited"
                    ? "country-list-item visited-item"
                    : "country-list-item upcoming-item";


            item.textContent = name;


            item.addEventListener(
                "click",
                () => {

                    const layer =
                        findCountryLayer(name);

                    if (!layer) {
                        return;
                    }


                    map.fitBounds(
                        layer.getBounds(),
                        {
                            padding: [50, 50],
                            maxZoom: 5
                        }
                    );


                    setTimeout(
                        () => {
                            countryClick({
                                target: layer
                            });
                        },
                        350
                    );

                }
            );


            if (
                data.status === "visited"
            ) {

                visited.appendChild(item);

            } else {

                upcoming.appendChild(item);
            }

        });
}


/* =========================================================
   RECHERCHE D'UN PAYS SUR LA CARTE
   ========================================================= */

function findCountryLayer(name) {

    if (!geojsonLayer) {
        return null;
    }


    let result = null;


    geojsonLayer.eachLayer(
        layer => {

            if (result) {
                return;
            }


            const layerName =
                getCountryName(
                    layer.feature
                );


            if (
                layerName &&
                layerName.toLowerCase() ===
                name.toLowerCase()
            ) {

                result = layer;
            }

        }
    );


    return result;
}


/* =========================================================
   GEOJSON
   ========================================================= */

const WORLD_GEOJSON =
    "https://raw.githubusercontent.com/datasets/geo-countries/master/data/countries.geojson";


let geojsonLayer = null;


fetch(WORLD_GEOJSON)

    .then(response => {

        if (!response.ok) {

            throw new Error(
                "World map unavailable"
            );
        }

        return response.json();
    })

    .then(worldData => {

        geojsonLayer =
            L.geoJSON(
                worldData,
                {
                    style: countryStyle,

                    onEachFeature:
                        (feature, layer) => {

                            const name =
                                getCountryName(
                                    feature
                                );

                            const data =
                                getCountryData(
                                    name
                                );


                            if (data) {

                                layer.on({
                                    mouseover:
                                        highlightCountry,

                                    mouseout:
                                        resetCountry,

                                    click:
                                        countryClick
                                });
                            }
                        }
                }
            );


        geojsonLayer.addTo(map);


        createCountryLists();


        const bounds =
            geojsonLayer.getBounds();


        if (
            bounds &&
            bounds.isValid()
        ) {

            map.fitBounds(
                bounds,
                {
                    padding: [20, 20]
                }
            );
        }


        setTimeout(
            () => {

                map.invalidateSize();

            },
            400
        );

    })

    .catch(error => {

        console.error(error);

        document.getElementById(
            "world-map"
        ).innerHTML = `

            <div class="map-error">

                World map could not be loaded.

            </div>

        `;
    });


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
