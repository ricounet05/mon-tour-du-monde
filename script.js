/* =========================================================
   MON TOUR DU MONDE — TES ADVENTURE
   Nouvelle carte mondiale
   ========================================================= */

const map = L.map("world-map", {
    zoomControl: true,
    attributionControl: true,
    minZoom: 1,
    maxZoom: 7,
    worldCopyJump: false
});

/* ---------------------------------------------------------
   Fond de carte
   --------------------------------------------------------- */

map.setView([20, 0], 2);

/* ---------------------------------------------------------
   Couleurs
   --------------------------------------------------------- */

const COLORS = {
    visited: "#3f8f5a",
    upcoming: "#d59a3a",
    other: "#d9ddd9",
    border: "#68706b",
    ocean: "#dce9ef"
};

document.getElementById("world-map").style.backgroundColor =
    COLORS.ocean;

/* ---------------------------------------------------------
   Correspondance des noms
   --------------------------------------------------------- */

const aliases = {
    "United States of America": "United States",
    "United Kingdom": "United Kingdom",
    "Czech Republic": "Czechia",
    "Korea": "South Korea",
    "Republic of Korea": "South Korea",
    "South Korea": "South Korea",
    "Russian Federation": "Russia",
    "Viet Nam": "Vietnam",
    "Lao People's Democratic Republic": "Laos",
    "Côte d'Ivoire": "Ivory Coast",
    "Türkiye": "Turkey",
    "Turkiye": "Turkey",
    "United Republic of Tanzania": "Tanzania",
    "Bolivia (Plurinational State of)": "Bolivia",
    "Brunei Darussalam": "Brunei",
    "Cabo Verde": "Cape Verde",
    "Timor-Leste": "East Timor"
};

/* ---------------------------------------------------------
   Récupération du nom du pays dans le GeoJSON
   --------------------------------------------------------- */

function getCountryName(feature) {

    const properties = feature.properties || {};

    const possibleNames = [
        properties.ADMIN,
        properties.NAME,
        properties.NAME_EN,
        properties.name,
        properties.sovereignt
    ];

    for (const name of possibleNames) {
        if (name && typeof name === "string") {
            return aliases[name] || name;
        }
    }

    return null;
}

/* ---------------------------------------------------------
   Recherche des données TES ADVENTURE
   --------------------------------------------------------- */

function getCountryData(name) {

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

/* ---------------------------------------------------------
   Style des pays
   --------------------------------------------------------- */

function countryStyle(feature) {

    const name = getCountryName(feature);
    const data = name ? getCountryData(name) : null;

    let fillColor = COLORS.other;
    let borderColor = COLORS.border;
    let fillOpacity = 0.82;
    let weight = 0.7;

    if (data) {

        if (data.status === "visited") {
            fillColor = COLORS.visited;
            borderColor = "#2f6841";
        }

        if (data.status === "upcoming") {
            fillColor = COLORS.upcoming;
            borderColor = "#9b6d22";
        }

        /*
         * Indonésie :
         * déjà visitée + prévue dans le nouveau voyage.
         * Elle reste verte avec une bordure orange.
         */
        if (data.status === "visited" && data.upcoming === true) {
            fillColor = COLORS.visited;
            borderColor = COLORS.upcoming;
            weight = 2;
        }
    }

    return {
        color: borderColor,
        weight: weight,
        fillColor: fillColor,
        fillOpacity: fillOpacity
    };
}

/* ---------------------------------------------------------
   Mise en évidence au toucher / à la souris
   --------------------------------------------------------- */

function highlightCountry(event) {

    const layer = event.target;

    layer.setStyle({
        weight: 2,
        color: "#202522",
        fillOpacity: 0.95
    });

    if (!L.Browser.ie && !L.Browser.opera && !L.Browser.edge) {
        layer.bringToFront();
    }
}

function resetCountry(event) {

    geojsonLayer.resetStyle(event.target);
}

/* ---------------------------------------------------------
   Nom anglais permanent
   --------------------------------------------------------- */

function addCountryLabel(layer, feature) {

    const name = getCountryName(feature);

    if (!name) {
        return;
    }

    /*
     * Les très petits territoires ne doivent pas afficher
     * un énorme texte qui déborde.
     */
    let fontSize = 11;

    if (layer.getBounds) {

        const bounds = layer.getBounds();

        if (bounds.isValid()) {

            const latSize =
                Math.abs(bounds.getNorth() - bounds.getSouth());

            const lngSize =
                Math.abs(bounds.getEast() - bounds.getWest());

            const size = Math.max(latSize, lngSize);

            if (size < 1.5) {
                fontSize = 7;
            } else if (size < 3) {
                fontSize = 8;
            } else if (size < 6) {
                fontSize = 9;
            }
        }
    }

    const center = layer.getBounds().getCenter();

    const icon = L.divIcon({
        className: "country-label",
        html: `<span style="font-size:${fontSize}px">${name}</span>`,
        iconSize: null
    });

    const marker = L.marker(center, {
        icon: icon,
        interactive: false,
        keyboard: false
    });

    marker.addTo(map);
}

/* ---------------------------------------------------------
   Gestion des pays
   --------------------------------------------------------- */

let geojsonLayer = null;

function onEachCountry(feature, layer) {

    const name = getCountryName(feature);

    if (name) {

        layer.bindTooltip(name, {
            sticky: true,
            direction: "top",
            opacity: 0.95
        });

        layer.on({
            mouseover: highlightCountry,
            mouseout: resetCountry
        });
    }

    /*
     * Ajouter le nom directement sur la carte.
     */
    try {
        addCountryLabel(layer, feature);
    } catch (error) {
        console.warn("Label impossible pour :", name);
    }
}

/* ---------------------------------------------------------
   Chargement de la carte mondiale
   --------------------------------------------------------- */

const WORLD_GEOJSON =
    "https://raw.githubusercontent.com/datasets/geo-countries/master/data/countries.geojson";

fetch(WORLD_GEOJSON)
    .then(response => {

        if (!response.ok) {
            throw new Error(
                "Impossible de charger la carte mondiale."
            );
        }

        return response.json();
    })
    .then(worldData => {

        geojsonLayer = L.geoJSON(worldData, {
            style: countryStyle,
            onEachFeature: onEachCountry
        }).addTo(map);

        /*
         * Ajuster automatiquement la carte au monde.
         */
        const bounds = geojsonLayer.getBounds();

        if (bounds.isValid()) {

            map.fitBounds(bounds, {
                padding: [10, 10]
            });
        }

        /*
         * Empêcher un zoom excessif après fitBounds.
         */
        if (map.getZoom() > 3) {
            map.setZoom(3);
        }

    })
    .catch(error => {

        console.error(error);

        const message = document.createElement("div");

        message.style.position = "absolute";
        message.style.top = "20px";
        message.style.left = "20px";
        message.style.right = "20px";
        message.style.padding = "15px";
        message.style.background = "#ffffff";
        message.style.border = "1px solid #c9cfcb";
        message.style.zIndex = "1000";
        message.style.fontFamily = "Arial, sans-serif";
        message.style.fontSize = "14px";

        message.textContent =
            "The world map could not be loaded. Please check your internet connection.";

        document.getElementById("world-map").appendChild(message);
    });

/* ---------------------------------------------------------
   Gestion du redimensionnement
   --------------------------------------------------------- */

window.addEventListener("resize", () => {

    setTimeout(() => {
        map.invalidateSize();
    }, 150);
});
