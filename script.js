/* =========================================================
   ELEMENTOS PRINCIPALES
========================================================= */

const entrada =
    document.getElementById("entrada");

const sobre =
    document.getElementById("sobreFull");

const abrirSobre =
    document.getElementById("abrirSobre");

const video =
    document.getElementById("videoBoda");

const salmo =
    document.getElementById("salmoContenido");

const musica =
    document.getElementById("musicaBoda");

const controlMusica =
    document.getElementById("controlMusica");

const iconoMusica =
    document.getElementById("iconoMusica");

const estadoMusica =
    document.getElementById("estadoMusica");

const heroVideo =
    document.getElementById("heroVideo");


/* =========================================================
   ABRIR SOBRE
========================================================= */

let invitacionAbierta = false;


abrirSobre.addEventListener(
    "click",
    function () {


        if (invitacionAbierta) {

            return;

        }


        invitacionAbierta = true;


        sobre.classList.add(
            "abierto"
        );


        setTimeout(
            function () {


                entrada.classList.add(
                    "finalizada"
                );


                document.body.classList.remove(
                    "bloqueado"
                );


                video.currentTime = 0;


                video.play().catch(
                    function () {

                        console.log(
                            "El video no pudo iniciar automáticamente."
                        );

                    }
                );


                salmo.classList.add(
                    "visible"
                );


            },
            1500
        );


        setTimeout(
            function () {

                entrada.style.display =
                    "none";

            },
            2800
        );


    }
);


/* =========================================================
   MÚSICA
========================================================= */

let musicaSonando = false;


/*
    Generamos los iconos con HTML + CSS.

    No utilizamos símbolos Unicode
    como ▶ para evitar que iOS/Android
    los conviertan en emoji.
*/

function mostrarPlay() {

    iconoMusica.innerHTML =
        '<span class="play-icon"></span>';

}


function mostrarPausa() {

    iconoMusica.innerHTML =
        '<span class="pause-icon"><i></i><i></i></span>';

}


controlMusica.addEventListener(
    "click",
    function () {


        if (!musicaSonando) {


            musica.play()
                .then(
                    function () {


                        musicaSonando = true;


                        mostrarPausa();


                        estadoMusica.textContent =
                            "PAUSAR";


                        controlMusica.setAttribute(
                            "aria-label",
                            "Pausar música"
                        );


                    }
                )
                .catch(
                    function () {


                        console.log(
                            "No se pudo reproducir el audio."
                        );


                    }
                );


        } else {


            musica.pause();


            musicaSonando = false;


            mostrarPlay();


            estadoMusica.textContent =
                "REPRODUCIR";


            controlMusica.setAttribute(
                "aria-label",
                "Reproducir música"
            );


        }


    }
);


/* =========================================================
   CONTROL DE MÚSICA FLOTANTE
========================================================= */

const observadorVideo =
    new IntersectionObserver(

        function (entradas) {


            entradas.forEach(
                function (entradaVideo) {


                    if (
                        !entradaVideo.isIntersecting
                    ) {


                        controlMusica.classList.add(
                            "flotante"
                        );


                    } else {


                        controlMusica.classList.remove(
                            "flotante"
                        );


                    }


                }
            );


        },

        {
            threshold: 0.15
        }

    );


observadorVideo.observe(
    heroVideo
);


/* =========================================================
   COUNTDOWN
========================================================= */

const fechaBoda =
    new Date(
        2027,
        0,
        23,
        17,
        0,
        0
    );


function actualizarCountdown() {


    const ahora =
        new Date();


    const diferencia =
        fechaBoda.getTime()
        -
        ahora.getTime();


    if (diferencia <= 0) {


        document.getElementById(
            "dias"
        ).textContent = "000";


        document.getElementById(
            "horas"
        ).textContent = "00";


        document.getElementById(
            "minutos"
        ).textContent = "00";


        document.getElementById(
            "segundos"
        ).textContent = "00";


        return;


    }


    const dias =
        Math.floor(
            diferencia /
            (1000 * 60 * 60 * 24)
        );


    const horas =
        Math.floor(
            (
                diferencia /
                (1000 * 60 * 60)
            ) % 24
        );


    const minutos =
        Math.floor(
            (
                diferencia /
                (1000 * 60)
            ) % 60
        );


    const segundos =
        Math.floor(
            (
                diferencia /
                1000
            ) % 60
        );


    document.getElementById(
        "dias"
    ).textContent =
        String(dias)
        .padStart(
            3,
            "0"
        );


    document.getElementById(
        "horas"
    ).textContent =
        String(horas)
        .padStart(
            2,
            "0"
        );


    document.getElementById(
        "minutos"
    ).textContent =
        String(minutos)
        .padStart(
            2,
            "0"
        );


    document.getElementById(
        "segundos"
    ).textContent =
        String(segundos)
        .padStart(
            2,
            "0"
        );


}


actualizarCountdown();


setInterval(
    actualizarCountdown,
    1000
);


/* =========================================================
   ANIMACIONES AL HACER SCROLL
========================================================= */

const elementosReveal =
    document.querySelectorAll(
        ".reveal"
    );


const observadorReveal =
    new IntersectionObserver(

        function (entradas) {


            entradas.forEach(
                function (elemento) {


                    if (
                        elemento.isIntersecting
                    ) {


                        elemento.target.classList.add(
                            "visible"
                        );


                        observadorReveal.unobserve(
                            elemento.target
                        );


                    }


                }
            );


        },

        {
            threshold: 0.15
        }

    );


elementosReveal.forEach(
    function (elemento) {


        observadorReveal.observe(
            elemento
        );


    }
);


/* =========================================================
   RSVP
========================================================= */

const abrirRsvp =
    document.getElementById(
        "abrirRsvp"
    );


const modalRsvp =
    document.getElementById(
        "modalRsvp"
    );


const cerrarRsvp =
    document.getElementById(
        "cerrarRsvp"
    );


const cerrarFondo =
    document.getElementById(
        "cerrarFondo"
    );


const formRsvp =
    document.getElementById(
        "formRsvp"
    );


function mostrarRsvp() {


    modalRsvp.classList.add(
        "activo"
    );


    modalRsvp.setAttribute(
        "aria-hidden",
        "false"
    );


    document.body.style.overflow =
        "hidden";


}


function ocultarRsvp() {


    modalRsvp.classList.remove(
        "activo"
    );


    modalRsvp.setAttribute(
        "aria-hidden",
        "true"
    );


    document.body.style.overflow =
        "";


}


abrirRsvp.addEventListener(
    "click",
    mostrarRsvp
);


cerrarRsvp.addEventListener(
    "click",
    ocultarRsvp
);


cerrarFondo.addEventListener(
    "click",
    ocultarRsvp
);


formRsvp.addEventListener(
    "submit",
    function (evento) {


        evento.preventDefault();


        alert(
            "Esta es una demostración. Más adelante conectaremos este formulario con la lista real de invitados."
        );


    }
);