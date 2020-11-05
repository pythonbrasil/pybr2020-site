function open_details() {
    document.getElementById("full-detail").style.display = "block";
}

/* Close when someone clicks on the "x" symbol inside the overlay */
function close_details() {
    document.getElementById("full-detail").style.display = "none";
}

function toggle_label(nodeId, value, display, link) {
    var node = document.getElementById(nodeId);
    if (value) {
        node.innerHTML = value;
        node.style.display = display;
    } else {
        node.style.display = "none";
    }
    if (link){
        node.href = link;
        node.target = "_blank";
    }
}

document.addEventListener('DOMContentLoaded', function() {
    var calendarEl = document.getElementById('calendar');

    var calendar = new FullCalendar.Calendar(calendarEl, {
        plugins: [
            'googleCalendar',
            'list',
            'timeGrid'
        ],
        height: 'auto',

        // // Python Brasil first day
        defaultDate: '2020-11-02',
        defaultView: 'segunda',
        timeZone: 'America/Sao_Paulo',
        locale: 'pt-br',

        allDaySlot: false,
        minTime: "08:00:00",
        maxTime: "20:00:00",
        nowIndicator: true,

        header: {
            left: 'title',
            right: 'segunda,terca,quarta,quinta,sexta sabado,domingo'
        },

        views: {
            segunda: {
                type: 'list',
                buttonText: 'Seg',
                visibleRange: {
                    start: '2020-11-02',
                    end: '2020-11-02'
                }
            },
            terca: {
                type: 'list',
                buttonText: 'Ter',
                visibleRange: {
                    start: '2020-11-03',
                    end: '2020-11-03'
                }
            },
            quarta: {
                type: 'list',
                buttonText: 'Qua',
                visibleRange: {
                    start: '2020-11-04',
                    end: '2020-11-04'
                }
            },
            quinta: {
                type: 'list',
                buttonText: 'Qui',
                visibleRange: {
                    start: '2020-11-05',
                    end: '2020-11-05'
                }
            },
            sexta: {
                type: 'list',
                buttonText: 'Sex',
                visibleRange: {
                    start: '2020-11-06',
                    end: '2020-11-06'
                }
            },
            sabado: {
                type: 'list',
                buttonText: 'Sab',
                visibleRange: {
                    start: '2020-11-07',
                    end: '2020-11-07'
                }
            },
            domingo: {
                type: 'list',
                buttonText: 'Dom',
                visibleRange: {
                    start: '2020-11-08',
                    end: '2020-11-08'
                }
            }
        },


        eventClick: function(info) {
            info.jsEvent.preventDefault();

            let title = info.event.title;
            let author = info.event._def.extendedProps.private.author;
            let location = info.event._def.extendedProps.location;
            let description = info.event._def.extendedProps.description || "";
            description = description.replace(/\\n\\n/g, "<br>");
            description = description.replace(/\\n/g, " ");

            document.getElementById("overlay-description").innerHTML = description;
            document.getElementById("overlay-title").innerHTML = title;
            toggle_label("overlay-author", author, "inline");
            toggle_label("overlay-room", location, "inline");

            const youtube_link = info.event._def.extendedProps.private.youtube_channel;
            const discord_link = info.event._def.extendedProps.private.discord_channel;
            const slides_url = info.event._def.extendedProps.private.slides_url;
            const about_url = info.event._def.extendedProps.private.about_url;

            toggle_label("overlay-youtube", (youtube_link) ? "Assista no YouTube" : "", "inline", youtube_link);
            toggle_label("overlay-discord", (discord_link) ? "Participe e envie perguntas pelo Discord" : "", "inline", discord_link);
            toggle_label("overlay-slides", (discord_link) ? "Slides" : "", "inline", slides_url);
            toggle_label("overlay-about-external", (about_url) ? "Referência Externa" : "", "inline", about_url);

            open_details();
        },

        eventRender: function(info) {
            console.log('info', info);
            var meta = document.createElement("div");
            meta.className = "meta";

            var type = info.event._def.extendedProps.private.type;

            // Palestrante
            var author = info.event._def.extendedProps.private.author;
            if (author) {
                var authorNode = document.createElement("div");
                if (type == "keynote") {
                    authorNode.className = "speaker speaker-keynote";
                } else {
                    authorNode.className = "speaker";
                }

                authorNode.appendChild(
                    document.createTextNode(author)
                )
                meta.appendChild(authorNode);
            }
            // Sala
            var location = info.event._def.extendedProps.location
            if (location) {
                var discord_channel = info.event._def.extendedProps.private.discord_channel;
                if (discord_channel) {
                    let href = document.createElement("a");
                    href.className = "discord";
                    href.href = discord_channel;
                    href.target = "_blank";
                    href.appendChild(
                        document.createTextNode(location)
                    );
                } else {
                    var href = document.createTextNode(location)
                }

                var locationNode = document.createElement("div");
                locationNode.className = "room";
                locationNode.classList.add(location.replace(" ", "").toLowerCase());
                locationNode.appendChild(href);
                meta.appendChild(locationNode);
            }

            // Youtube
            var youtube_channel = info.event._def.extendedProps.private.youtube_channel;
            if (youtube_channel) {
                let href = document.createElement("a");
                href.className = "youtube";
                href.href = youtube_channel;
                href.target = "_blank";
                href.appendChild(
                    document.createTextNode("live")
                );
                var youtubeNode = document.createElement("div");
                youtubeNode.appendChild(href);

                meta.appendChild(youtubeNode);
            }


            if (type == "keynote") {
                info.el.classList.add("keynote-entry");
            }

            info.el.lastChild.appendChild(meta);
         },
        // Google Calendar settings
        googleCalendarApiKey: 'AIzaSyAIn8DyZFtthupLozgwIX3NUURFMWEIPb4',
        eventSources: [{
            googleCalendarId: 'cis4uq8vegrfbjjn1qi9hvau1k@group.calendar.google.com'
        }]
    });

    calendar.render();
    var bfuso = document.getElementById('bfuso');
    if(verifica_fuso()){
        bfuso.style.display = "inline";
    }
    else{
        bfuso.style.display = "none";
    }
});
