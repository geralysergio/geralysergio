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
   VIDEO PERMANENTE
========================================================= */

video.muted = true;

video.loop = true;

video.playsInline = true;


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


        /*
        Iniciamos el video en el momento
        en que el usuario toca el sello.
        */

        video.currentTime = 0;


        video.play().catch(
            function () {

                console.log(
                    "El video no pudo iniciar automáticamente."
                );

            }
        );


        /*
        Animación del sobre.
        */

        sobre.classList.add(
            "abierto"
        );


        /*
        Mostramos la invitación.
        */

        setTimeout(
            function () {

                entrada.classList.add(
                    "finalizada"
                );


                document.body.classList.remove(
                    "bloqueado"
                );


                salmo.classList.add(
                    "visible"
                );

            },
            1250
        );


        /*
        Quitamos definitivamente
        el sobre del documento.
        */

        setTimeout(
            function () {

                entrada.style.display =
                    "none";

            },
            2400
        );

    }
);


/* =========================================================
   MANTENER VIDEO REPRODUCIÉNDOSE
========================================================= */

document.addEventListener(
    "visibilitychange",
    function () {

        if (
            document.visibilityState === "visible"
            &&
            invitacionAbierta
            &&
            video.paused
        ) {

            video.play().catch(
                function () {}
            );

        }

    }
);


/*
Por seguridad, si el navegador llegara
a ignorar loop, volvemos a comenzar.
*/

video.addEventListener(
    "ended",
    function () {

        if (invitacionAbierta) {

            video.currentTime = 0;


            video.play().catch(
                function () {}
            );

        }

    }
);


/* =========================================================
   MÚSICA
========================================================= */

let musicaSonando = false;


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
   BOTÓN DE MÚSICA FLOTANTE
========================================================= */

const observadorVideo =
    new IntersectionObserver(

        function (entradas) {

            entradas.forEach(
                function (entradaVideo) {

                    if (!entradaVideo.isIntersecting) {

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
        .padStart(3, "0");


    document.getElementById(
        "horas"
    ).textContent =
        String(horas)
        .padStart(2, "0");


    document.getElementById(
        "minutos"
    ).textContent =
        String(minutos)
        .padStart(2, "0");


    document.getElementById(
        "segundos"
    ).textContent =
        String(segundos)
        .padStart(2, "0");

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

                    if (elemento.isIntersecting) {

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
            threshold: 0.12
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


/* =========================================================
   FORMULARIO - POR AHORA DEMOSTRACIÓN
========================================================= */

formRsvp.addEventListener(
    "submit",
    function (evento) {

        evento.preventDefault();


        alert(
            "Esta es una demostración. Más adelante conectaremos este formulario con la lista real de invitados."
        );

    }
);