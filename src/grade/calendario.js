function open_details() {
    document.getElementById("full-detail").style.display = "block";
}

/* Close when someone clicks on the "x" symbol inside the overlay */
function close_details() {
    document.getElementById("full-detail").style.display = "none";
}

function toggle_label(nodeId, value, display) {
    var node = document.getElementById(nodeId);
    if (value) {
        node.innerHTML = value;
        node.style.display = display;
    } else {
        node.style.display = "none";
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

            var title = info.event.title;
            var author = info.event._def.extendedProps.private.author;
            var location = info.event._def.extendedProps.location;
            var description = info.event._def.extendedProps.description || "";
            description = description.replace(/\\n\\n/g, "<br>");
            description = description.replace(/\\n/g, " ");

            document.getElementById("overlay-description").innerHTML = description;
            document.getElementById("overlay-title").innerHTML = title;
            toggle_label("overlay-author", author, "inline");
            toggle_label("overlay-room", location, "inline");

            open_details();
        },

         eventRender: function(info) {
             var meta = document.createElement("div");
             meta.className = "meta";

             // Palestrante
             var author = info.event._def.extendedProps.private.author;
             if (author) {
                 console.log("author", author);
                 var authorNode = document.createElement("div");
                 authorNode.className = "speaker";
                 authorNode.appendChild(
                     document.createTextNode(author)
                 )
                 meta.appendChild(authorNode);
             }
             // Sala
             var location = info.event._def.extendedProps.location
             if (location) {
                 var locationNode = document.createElement("div");
                 locationNode.className = "room";
                 locationNode.appendChild(
                     document.createTextNode(location)
                 )
                 meta.appendChild(locationNode);
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
});
