/* --- EVENTS DATA --- */
window.eventsData = {
    weekly: [
        { 
            name: "Group Parayana", 
            desc: "Rayara Asthottara Parayana", 
            time: "Every Thursday, 8:00 AM", 
            loc: "Sri Krishna Matha, Bhaghyanagar Kondapur", 
            status: "On-Going",
            img: "images/rayaru.jpg"
        }
    ],

    regular: [
        { 
            name: "Mani Manjari", 
            desc: "Mani Manjari - Pata (online)", 
            time: "Every Mon-Thu-Fri at 9:30pm-10pm", 
            loc: "Online (Zoom). Contact WhatsApp 9573313511", 
            status: "Active",
            img: "images/mm.jpg"
        }
    ],

    upcoming: [], 
    festivals: [], 

    past: [
        { 
            name: "Shree Rama Navami", 
            desc: "Vishesha Sundarakanda Parayana", 
            time: "27th March 2025, 8:30 AM", 
            loc: "Sri Krishna Matha, Bhaghyanagar Kondapur", 
            status: "Completed",
            img: "images/ramanavami.jpg"
        },
        { 
            name: "Workshops", 
            desc: "Sandhyavandana and Deva pooja vidhana Workshop", 
            time: "21st and 22nd March 2025, 9:00 AM", 
            loc: "Sri Krishna Matha, Bhaghyanagar Kondapur", 
            status: "Completed",
            img: "images/sv.jpg"
        },
        { 
            name: "Ugadi", 
            desc: "Vishesha Parayana", 
            time: "19th March 2025, 8:00 AM", 
            loc: "Sri Krishna Matha, Bhaghyanagar Kondapur", 
            status: "Completed",
            img: "images/yugadi.jpg"
        }
    ]
};


/* --- EVENTS RENDERER --- */
function renderEventsUI() {
    const area = document.getElementById('contentArea'); 
    if (!area) return; 

    const data = window.eventsData;

    const createCard = (ev, type) => {
        const isPast = type === 'past';
        const greenStatuses = ["On-Going", "Active"];
		const statusColor = greenStatuses.includes(ev.status)
			? "bg-green-100 text-green-700" 
			: "bg-orange-100 text-orange-700";

        // Layout updated to Flexbox for side-by-side view
        return `
            <div class="${isPast ? 'bg-gray-50 opacity-70 border-gray-200' : 'bg-white border-orange-100 shadow-sm border-l-4 border-l-orange-500'} p-4 rounded-xl border mb-3 flex items-start gap-4">

                <div class="flex-shrink-0">
                    <img src="${ev.img || 'default.png'}" 
                         alt="${ev.name}" 
                         class="w-16 h-16 object-cover rounded-lg shadow-sm border border-gray-100" />
                </div>

                <div class="flex-grow">
                    <div class="flex justify-between items-start mb-1">
                        <h4 class="font-bold text-sm ${isPast ? 'text-gray-600' : 'text-orange-900'}">${ev.name}</h4>
                        <span class="text-[8px] px-1.5 py-0.5 rounded-full font-bold uppercase ${isPast ? 'bg-gray-200 text-gray-500' : statusColor}">
                            ${ev.status}
                        </span>
                    </div>

                    <p class="text-xs text-gray-700 mb-2 leading-snug">${ev.desc}</p>

                    <div class="grid grid-cols-1 gap-1">
                        <div class="text-[10px] text-gray-500 flex items-center gap-2">
                            <i class="fa-solid fa-clock text-orange-400 w-3 text-center"></i> ${ev.time}
                        </div>
                        <div class="text-[10px] text-gray-500 flex items-center gap-2">
                            <i class="fa-solid fa-location-dot text-orange-400 w-3 text-center"></i> ${ev.loc}
                        </div>
                    </div>
                </div>
            </div>`;
    };

    const renderSection = (title, icon, events, type, colorClass) => {
        if (!events || events.length === 0) return '';

        return `
            <h3 class="text-xs font-black ${colorClass} uppercase tracking-widest mb-3 flex items-center gap-2">
                <i class="fa-solid ${icon}"></i> ${title}
            </h3>
            <div class="mb-8">
                ${events.map(e => createCard(e, type)).join('')}
            </div>
        `;
    };

    let html = `
        <h2 class='text-xl font-bold mb-6 text-orange-800 uppercase tracking-tight flex items-center gap-2'>
            <i class="fa-solid fa-calendar-check"></i> Events & Activities
        </h2>
    `;

    // Weekly
    html += renderSection(
        "Weekly Events",
        "fa-rotate",
        data.weekly,
        "weekly",
        "text-orange-600"
    );

    // Regular
    html += renderSection(
        "Regular Classes",
        "fa-calendar-days",
        data.regular,
        "weekly",
        "text-orange-600"
    );

    // Past
    html += renderSection(
        "Past Events",
        "fa-history",
        data.past,
        "past",
        "text-gray-400"
    );

    area.innerHTML = html + `<div class="pb-20"></div>`;
}


/* --- AUTO LOAD --- */
document.addEventListener("DOMContentLoaded", renderEventsUI);