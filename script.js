/* =========================================================
   MON TOUR DU MONDE — TES ADVENTURE
   Carte mondiale interactive
   ========================================================= */

const mapElement = document.getElementById("world-map");

const map = L.map("world-map", {
    zoomControl: true,
    attributionControl: true,
    minZoom: 1,
    maxZoom: 7,
    worldCopyJump: false,
    zoomSnap: 0.5,
    zoomDelta: 0.5,
    wheelDebounceTime: 40,
    wheelPxPerZoomLevel: 100
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
    normalBorder: "#737a76",
    ocean: "#dceaf0"
};

if (mapElement) {
    mapElement.style.backgroundColor = COLORS.ocean;
}


/* =========================================================
   CORRESPONDANCE DES NOMS GEOJSON
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
    "Brunei Darussalam": "Brunei",
    "Cabo Verde": "Cape Verde",
    "Timor-Leste": "East Timor",
    "Russian Federation": "Russia",
    "Iran (Islamic Republic of)": "Iran",
    "Syrian Arab Republic": "Syria",
    "Venezuela (Bolivarian Republic of)": "Venezuela"
};


/* =========================================================
   NOM DU PAYS
   ========================================================= */

function getCountryName(feature) {

    const properties = feature.properties || {};

    const possibleNames = [
        properties.ADMIN,
        properties.NAME,
        properties.NAME_EN,
        properties.name,
        properties.sovereignt,
        properties.SOVEREIGNT
    ];

    for (const name of possibleNames) {

        if (name && typeof name === "string") {
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

    const lowerName = name.toLowerCase();

    for (const key of Object.keys(countries)) {

        if (key.toLowerCase() === lowerName) {
            return countries[key];
        }
    }

    return null;
}


/* =========================================================
   STYLE DES PAYS
   ========================================================= */

function countryStyle(feature) {

    const name = getCountryName(feature);
    const data = getCountryData(name);

    let fillColor = COLORS.other;
    let borderColor = COLORS.normalBorder;
    let weight = 0.7;
    let opacity = 0.82;

    if (data && data.status === "visited") {

        fillColor = COLORS.visited;
        borderColor = COLORS.visitedBorder;
        weight = 1.1;
        opacity = 0.88;
    }

    if (data && data.status === "upcoming") {

        fillColor = COLORS.upcoming;
        borderColor = COLORS.upcomingBorder;
        weight = 1.1;
        opacity = 0.88;
    }

    /*
     * Indonesia :
     * déjà visitée + prévue dans le nouveau voyage.
     */
    if (
        data &&
        data.status === "visited" &&
        data.upcoming === true
    ) {

        fillColor = COLORS.visited;
        borderColor = COLORS.upcomingBorder;
        weight = 2;
    }

    return {
        color: borderColor,
        weight: weight,
        fillColor: fillColor,
        fillOpacity: opacity
    };
}


/* =========================================================
   SURBRILLANCE DES PAYS DU PROJET
   ========================================================= */

function highlightCountry(event) {

    const layer = event.target;
    const name = getCountryName(layer.feature);
    const data = getCountryData(name);

    if (!data) {
        return;
    }

    layer.setStyle({
        weight: 2.5,
        color: "#202522",
        fillOpacity: 1
    });

    if (
        !L.Browser.ie &&
        !L.Browser.opera &&
        !L.Browser.edge
    ) {
        layer.bringToFront();
    }
}


/* =========================================================
   RETOUR AU STYLE NORMAL
   ========================================================= */

function resetCountry(event) {

    if (!geojsonLayer) {
        return;
    }

    geojsonLayer.resetStyle(event.target);
}


/* =========================================================
   TAILLE DU NOM
   ========================================================= */

function getLabelSize(layer) {

    if (!layer || !layer.getBounds) {
        return 10;
    }

    const bounds = layer.getBounds();

    if (!bounds || !bounds.isValid()) {
        return 10;
    }

    const latSize =
        Math.abs(
            bounds.getNorth() -
            bounds.getSouth()
        );

    const lngSize =
        Math.abs(
            bounds.getEast() -
            bounds.getWest()
        );

    const size = Math.max(
        latSize,
        lngSize
    );

    if (size < 1) {
        return 6;
    }

    if (size < 1.5) {
        return 7;
    }

    if (size < 3) {
        return 8;
    }

    if (size < 6) {
        return 9;
    }

    if (size < 12) {
        return 10;
    }

    return 11;
}


/* =========================================================
   NOMS DES PAYS
   ========================================================= */

const countryLabels = [];

function addCountryLabel(layer, feature) {

    const name = getCountryName(feature);

    if (!name) {
        return;
    }

    const data = getCountryData(name);

    /*
     * Aucun nom pour les autres pays.
     */
    if (!data) {
        return;
    }

    /*
     * Seuls les pays visités et futurs
     * affichent leur nom.
     */
    if (
        data.status !== "visited" &&
        data.status !== "upcoming"
    ) {
        return;
    }

    if (!layer.getBounds) {
        return;
    }

    const bounds = layer.getBounds();

    if (!bounds || !bounds.isValid()) {
        return;
    }

    const center = bounds.getCenter();

    const fontSize = getLabelSize(layer);

    let textColor = "#17231b";

    if (data.status === "upcoming") {
        textColor = "#3b2a12";
    }

    const html = `
        <span
            class="country-name-label"
            style="
                font-size:${fontSize}px;
                color:${textColor};
                font-weight:700;
                white-space:nowrap;
            "
        >
            ${name}
        </span>
    `;

    const icon = L.divIcon({
        className: "country-label",
        html: html,
        iconSize: null,
        iconAnchor: null
    });

    const marker = L.marker(center, {
        icon: icon,
        interactive: false,
        keyboard: false,
        zIndexOffset: 1000
    });

    marker.addTo(map);

    countryLabels.push({
        marker: marker,
        layer: layer,
        name: name,
        data: data
    });
}


/* =========================================================
   GESTION DES PAYS
   ========================================================= */

function onEachCountry(feature, layer) {

    const name = getCountryName(feature);
    const data = getCountryData(name);

    if (data) {

        layer.on({
            mouseover: highlightCountry,
            mouseout: resetCountry
        });

        layer.bindTooltip(name, {
            sticky: true,
            direction: "top",
            opacity: 0.95,
            className: "country-tooltip"
        });
    }

    addCountryLabel(layer, feature);
}


/* =========================================================
   SOURCE GEOJSON
   ========================================================= */

const WORLD_GEOJSON =
    "https://raw.githubusercontent.com/datasets/geo-countries/master/data/countries.geojson";


/* =========================================================
   CHARGEMENT
   ========================================================= */

let geojsonLayer = null;

fetch(WORLD_GEOJSON)

    .then(response => {

        if (!response.ok) {
            throw new Error(
                "World map could not be loaded."
            );
        }

        return response.json();
    })

    .then(worldData => {

        geojsonLayer = L.geoJSON(
            worldData,
            {
                style: countryStyle,
                onEachFeature: onEachCountry
            }
        );

        geojsonLayer.addTo(map);

        const bounds =
            geojsonLayer.getBounds();

        if (
            bounds &&
            bounds.isValid()
        ) {

            map.fitBounds(
                bounds,
                {
                    padding: [15, 15]
                }
            );
        }

        setTimeout(() => {

            if (map.getZoom() > 3) {
                map.setZoom(3);
            }

            map.invalidateSize();

        }, 300);
    })

    .catch(error => {

        console.error(
            "Map error:",
            error
        );

        if (!mapElement) {
            return;
        }

        const message =
            document.createElement("div");

        message.className =
            "map-error-message";

        message.textContent =
            "The world map could not be loaded. Please check your internet connection.";

        mapElement.appendChild(message);
    });


/* =========================================================
   REDIMENSIONNEMENT
   ========================================================= */

window.addEventListener(
    "resize",
    () => {

        setTimeout(() => {
            map.invalidateSize();
        }, 200);
    }
);


/* =========================================================
   ROTATION GSM / TABLETTE
   ========================================================= */

window.addEventListener(
    "orientationchange",
    () => {

        setTimeout(() => {
            map.invalidateSize();
        }, 400);
    }
);


/* =========================================================
   ZOOM
   ========================================================= */

map.on(
    "zoomend",
    () => {

        setTimeout(() => {
            map.invalidateSize();
        }, 50);
    }
);
