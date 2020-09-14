/* Formueskatt */
const regnUtFormueSkatt = () => {
    const formueSats = 0.7; /* Formuesats */

    const grenseForSkatt = 1500000; /* Formue som er mindre enn grensen, skal ikke skattes. */ 

    let formue = document.getElementById('formue').value; /* Henter brukerinput */

    let formueskatt = ((formue - grenseForSkatt) / 100) * formueSats; /* Regner ut formueskatten */

    if (formue < grenseForSkatt) { /* Dersom formuen ligger under grensen, skatter vi ikke*/
        formueskatt = 0;
        document.getElementById("formueskatt").innerHTML = `Formueskatten blir kr. ${formueskatt}`; /* Skriver ut 0 kr skatt. */
    } else { 
        /* Over grensen? Skriver ut skatt */
        document.getElementById("formueskatt").innerHTML = `<strong>Formueskatten blir kr. ${formueskatt.toFixed(2)}</strong>`;
    }
}


/* Inntektskatt */
let bruttoinntekt = 800000; /* Må skrives inn manuelt */
console.log(bruttoinntekt);

/* Satser i de ulike trinn */
const satser = {
    "trinn0" : {navn : "trinn0", sats : 0,    start_grense : 0,      slutt_grense : 180800, inntekt : bruttoinntekt},
    "trinn1" : {navn : "trinn1", sats : 1.9,  start_grense : 180800, slutt_grense : 254500, inntekt : bruttoinntekt},
    "trinn2" : {navn : "trinn2", sats : 4.2,  start_grense : 254500, slutt_grense : 639750, inntekt : bruttoinntekt},
    "trinn3" : {navn : "trinn3", sats : 13.2, start_grense : 639750, slutt_grense : 999550, inntekt : bruttoinntekt},
    "trinn4" : {navn : "trinn4", sats : 16.2, start_grense : 999550, slutt_grense : bruttoinntekt, inntekt : bruttoinntekt},
}

/* Setter trinnskatten lik 0 på starten, og legger til etterhvert. */
let trinnskatt = 0;

/* Funksjonen som gjør beregningene */
const regnUtInntektSkatt = (trinn) => {
    let sats = trinn.sats; 
    let start_grense = trinn.start_grense;
    let slutt_grense = trinn.slutt_grense;
    let inntekt = trinn.inntekt;
    let inntektskatt = 0; 

    if (inntekt > start_grense && inntekt < slutt_grense) { /* Sjekker om vi har kommet til siste mulige trinn. */
        inntektskatt = ((inntekt - start_grense) * (sats / 100)); /* Regner ut inntektskatten ved siste post. */
        trinnskatt += inntektskatt; /* Legger til på trinnskatten */
        return (`  ${inntektskatt.toFixed(2)} kr `); /* Returnerer skatten i trinnet. */
    } else {
        inntektskatt = ((slutt_grense - start_grense) * (sats / 100)); /* Dersom vi ikke har kommet til siste mulige trinn, blir skatten standard */
    }

    if (inntekt < start_grense) { /* Dersom inntekt er for lav, så skatter ikke personen. */
        return `Ingen skatt`;
    } else {
        trinnskatt += inntektskatt; /* Dersom inntekten er "skattbar", legg til på trinnskatten. */
        return (`${inntektskatt.toFixed(2)} kr`); /* Returner trinn vi har vært innom, og skriv ut standard-skatt. */
    }
}

/* Definerer alle trinn, og setter inn i funksjonen for å beregne skatt i hvert trinn */
let trinn0 = regnUtInntektSkatt(satser.trinn0); 
let trinn1 = regnUtInntektSkatt(satser.trinn1);
let trinn2 = regnUtInntektSkatt(satser.trinn2);
let trinn3 = regnUtInntektSkatt(satser.trinn3);
let trinn4 = regnUtInntektSkatt(satser.trinn4);

/* Lager en funksjon som skriver ut resultatet i hver trinn, og trinnskatten helt til slutt. */
const skrivUtInntektSkatt = () => {
    document.getElementById("trinn0").innerHTML = trinn0;
    document.getElementById("trinn1").innerHTML = trinn1;
    document.getElementById("trinn2").innerHTML = trinn2;
    document.getElementById("trinn3").innerHTML = trinn3;
    document.getElementById("trinn4").innerHTML = trinn4;
    document.getElementById("trinnskatt").innerHTML = `<strong> ${Math.floor(trinnskatt)} kr</strong>`;
}