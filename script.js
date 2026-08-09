/* =========================================================
   MON TOUR DU MONDE — TES ADVENTURE
   Carte mondiale interactive
   ========================================================= */


/* =========================================================
   1 — CRÉATION DE LA CARTE
   ========================================================= */

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


/* Position initiale */

map.setView([20, 0], 2);


/* =========================================================
   2 — COULEURS
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


/* Fond de la carte */

const mapElement = document.getElementById("world-map");

if (mapElement) {

    mapElement.style.backgroundColor = COLORS.ocean;
}


/* =========================================================
   3 — CORRESPONDANCE DES NOMS
   ========================================================= */

const aliases = {

    "United States of America":
        "United States",

    "United Kingdom":
        "United Kingdom",

    "Czech Republic":
        "Czechia",

    "Korea":
        "South Korea",

    "Republic of Korea":
        "South Korea",

    "Viet Nam":
        "Vietnam",

    "Lao People's Democratic Republic":
        "Laos",

    "Türkiye":
        "Turkey",

    "Turkiye":
        "Turkey",

    "United Republic of Tanzania":
        "Tanzania",

    "Bolivia (Plurinational State of)":
        "Bolivia",

    "Brunei Darussalam":
        "Brunei",

    "Cabo Verde":
        "Cape Verde",

    "Timor-Leste":
        "East Timor",

    "Russian Federation":
        "Russia",

    "Iran (Islamic Republic of)":
        "Iran",

    "Syrian Arab Republic":
        "Syria",

    "Venezuela (Bolivarian Republic of)":
        "Venezuela",

    "Tanzania":
        "Tanzania",

    "Côte d'Ivoire":
        "Ivory Coast"
};


/* =========================================================
   4 — RÉCUPÉRER LE NOM DU PAYS
   ========================================================= */

function getCountryName(feature) {

    const properties =
        feature.properties || {};

    const possibleNames = [

        properties.ADMIN,

        properties.name,

        properties.NAME,

        properties.NAME_EN,

        properties.sovereignt,

        properties.SOVEREIGNT
    ];


    for (const name of possibleNames) {

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
   5 — TROUVER LE PAYS DANS countries.js
   ========================================================= */

function getCountryData(name) {

    if (!name) {

        return null;
    }


    if (countries[name]) {

        return countries[name];
    }


    const lowerName =
        name.toLowerCase();


    for (
        const key of Object.keys(countries)
    ) {

        if (
            key.toLowerCase() ===
            lowerName
        ) {

            return countries[key];
        }
    }


    return null;
}


/* =========================================================
   6 — COULEUR DES PAYS
   ========================================================= */

function countryStyle(feature) {

    const name =
        getCountryName(feature);

    const data =
        getCountryData(name);


    /* Pays normal */

    let fillColor =
        COLORS.other;

    let borderColor =
        COLORS.normalBorder;

    let weight = 0.7;

    let opacity = 0.82;


    /* Pays déjà visité */

    if (
        data &&
        data.status === "visited"
    ) {

        fillColor =
            COLORS.visited;

        borderColor =
            COLORS.visitedBorder;

        weight = 1.1;

        opacity = 0.88;
    }


    /* Pays à venir */

    if (
        data &&
        data.status === "upcoming"
    ) {

        fillColor =
            COLORS.upcoming;

        borderColor =
            COLORS.upcomingBorder;

        weight = 1.1;

        opacity = 0.88;
    }


    /*
     * Cas particulier :
     * Indonésie déjà visitée
     * et prévue à nouveau.
     */

    if (
        data &&
        data.status === "visited" &&
        data.upcoming === true
    ) {

        fillColor =
            COLORS.visited;

        borderColor =
            COLORS.upcomingBorder;

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
   7 — SURBRILLANCE
   ========================================================= */

function highlightCountry(event) {

    const layer =
        event.target;


    const name =
        getCountryName(
            layer.feature
        );


    const data =
        getCountryData(name);


    /*
     * On ne fait ressortir que
     * les pays de ton projet.
     */

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
   8 — RETOUR AU STYLE NORMAL
   ========================================================= */

function resetCountry(event) {

    if (!geojsonLayer) {

        return;
    }


    geojsonLayer.resetStyle(
        event.target
    );
}


/* =========================================================
   9 — CALCUL DE LA TAILLE DU NOM
   ========================================================= */

function getLabelSize(layer) {

    let fontSize = 10;


    if (
        !layer ||
        !layer.getBounds
    ) {

        return fontSize;
    }


    const bounds =
        layer.getBounds();


    if (
        !bounds ||
        !bounds.isValid()
    ) {

        return fontSize;
    }


    const latitudeSize =
        Math.abs(
            bounds.getNorth() -
            bounds.getSouth()
        );


    const longitudeSize =
        Math.abs(
            bounds.getEast() -
            bounds.getWest()
        );


    const size =
        Math.max(
            latitudeSize,
            longitudeSize
        );


    /*
     * Très petits pays
     */

    if (size < 1) {

        fontSize = 6;

    } else if (size < 1.5) {

        fontSize = 7;

    } else if (size < 3) {

        fontSize = 8;

    } else if (size < 6) {

        fontSize = 9;

    } else if (size < 12) {

        fontSize = 10;

    } else {

        fontSize = 11;
    }


    return fontSize;
}


/* =========================================================
   10 — CRÉATION DU NOM DU PAYS
   ========================================================= */

const countryLabels = [];


function addCountryLabel(
    layer,
    feature
) {

    const name =
        getCountryName(feature);


    if (!name) {

        return;
    }


    /*
     * IMPORTANT :
     *
     * Si le pays n'est pas dans
     * countries.js, aucun nom
     * n'est affiché.
     */

    const data =
        getCountryData(name);


    if (!data) {

        return;
    }


    /*
     * Seulement :
     *
     * VISITED
     * UPCOMING
     */

    if (
        data.status !== "visited" &&
        data.status !== "upcoming"
    ) {

        return;
    }


    if (
        !layer.getBounds
    ) {

        return;
    }


    const bounds =
        layer.getBounds();


    if (
        !bounds ||
        !bounds.isValid()
    ) {

        return;
    }


    /*
     * Centre géographique
     */

    const center =
        bounds.getCenter();


    /*
     * Taille du texte
     */

    const fontSize =
        getLabelSize(layer);


    /*
     * Couleur du texte
     */

    let textColor =
        "#17231b";


    if (
        data.status === "upcoming"
    ) {

        textColor =
            "#3b2a12";
    }


    /*
     * Petit fond blanc transparent
     * pour que le texte reste lisible
     * sur la carte.
     */

    const html = `

        <span
            class="country-name-label"
            style="
                font-size:${fontSize}px;
                color:${textColor};
            "
        >
            ${name}
        </span>

    `;


    const icon =
        L.divIcon({

            className:
                "country-label",

            html:
                html,

            iconSize: null,

            iconAnchor: null
        });


    const marker =
        L.marker(
            center,
            {

                icon: icon,

                interactive: false,

                keyboard: false,

                zIndexOffset: 1000
            }
        );


    marker.addTo(map);


    countryLabels.push({

        marker: marker,

        layer: layer,

        name: name,

        data: data
    });
}


/* =========================================================
   11 — GESTION DES PAYS
   ========================================================= */

function onEachCountry(
    feature,
    layer
) {

    const name =
        getCountryName(feature);


    const data =
        getCountryData(name);


    /*
     * Les pays de ton projet
     * sont interactifs.
     */

    if (data) {

        layer.on({

            mouseover:
                highlightCountry,

            mouseout:
                resetCountry
        });


        /*
         * Petit tooltip uniquement
         * au passage de la souris.
         *
         * Il ne remplace pas le nom
         * permanent.
         */

        layer.bindTooltip(
            name,
            {

                sticky: true,

                direction: "top",

                opacity: 0.95,

                className:
                    "country-tooltip"
            }
        );
    }


    /*
     * Ajouter le nom uniquement
     * pour les pays concernés.
     */

    addCountryLabel(
        layer,
        feature
    );
}


/* =========================================================
   12 — SOURCE DE LA CARTE MONDIALE
   ========================================================= */

const WORLD_GEOJSON =

    "https://raw.githubusercontent.com/datasets/geo-countries/master/data/countries.geojson";


/* =========================================================
   13 — CHARGEMENT DE LA CARTE
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

        /*
         * Création des frontières
         */

        geojsonLayer =
            L.geoJSON(
                worldData,
                {

                    style:
                        countryStyle,

                    onEachFeature:
                        onEachCountry
                }
            );


        geojsonLayer.addTo(map);


        /*
         * Adapter la carte au monde
         */

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
                        [15, 15]
                }
            );
        }


        /*
         * Éviter que la carte soit
         * trop rapprochée au démarrage.
         */

        setTimeout(() => {

            if (
                map.getZoom() > 3
            ) {

                map.setZoom(3);
            }

        }, 100);


        /*
         * Rafraîchir l'affichage
         */

        setTimeout(() => {

            map.invalidateSize();

        }, 300);
    })


    .catch(error => {

        console.error(
            "Map error:",
            error
        );


        /*
         * Message d'erreur propre
         */

        const message =
            document.createElement(
                "div"
            );


        message.className =
            "map-error-message";


        message.textContent =
            "The world map could not be loaded. Please check your internet connection.";


        mapElement.appendChild(
            message
        );
    });


/* =========================================================
   14 — REDIMENSIONNEMENT
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
   15 — APRÈS ROTATION TABLETTE / GSM
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
   16 — RAFRAÎCHISSEMENT APRÈS CHANGEMENT DE ZOOM
   ========================================================= */

map.on(
    "zoomend",
    () => {

        setTimeout(() => {

            map.invalidateSize();

        }, 50);
    }
);
