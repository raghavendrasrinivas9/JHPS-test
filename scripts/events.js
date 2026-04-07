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
        const isLive = ["On-Going", "Active"].includes(ev.status);
        
        const borderClass = isPast 
            ? 'border-l-gray-400' 
            : (isLive ? 'border-l-green-600' : 'border-l-red-600');

        const statusColor = isLive
            ? "bg-green-100 text-green-700" 
            : "bg-orange-100 text-orange-700";

        // Removed h-[160px] and used h-auto to prevent cropping.
        // Added flex-col on mobile and flex-row on larger screens for the main layout.
        return `
            <div class="h-auto w-full max-w-xl ${isPast ? 'bg-gray-50 opacity-70 border-gray-200' : 'bg-white border-red-100 shadow-sm'} p-5 rounded-xl border border-l-4 ${borderClass} flex flex-col sm:flex-row items-start gap-4 sm:gap-6 transition-all">

                <div class="flex-shrink-0">
                    <img src="${ev.img || 'default.png'}" 
                         alt="${ev.name}" 
                         class="w-20 h-20 sm:w-24 sm:h-24 object-cover rounded-lg shadow-sm border border-gray-100" />
                </div>

                <div class="flex-grow flex flex-col min-w-0 w-full">
                    <div class="flex flex-wrap justify-between items-start mb-2 gap-2">
                        <h4 class="font-bold text-sm sm:text-base leading-tight ${isPast ? 'text-gray-600' : 'text-orange-900'}">
                            ${ev.name}
                        </h4>
                        <span class="whitespace-nowrap text-[8px] sm:text-[9px] px-2 py-0.5 rounded-full font-bold uppercase shrink-0 ${isPast ? 'bg-gray-200 text-gray-500' : statusColor}">
                            ${ev.status}
                        </span>
                    </div>

                    <p class="text-xs sm:text-sm text-gray-700 mb-4 leading-relaxed">
                        ${ev.desc}
                    </p>

                    <div class="space-y-2 mt-auto">
                        <div class="text-[10px] sm:text-xs text-gray-500 flex items-start gap-2">
                            <i class="fa-solid fa-clock text-orange-400 w-4 mt-0.5 text-center"></i> 
                            <span class="break-words">${ev.time}</span>
                        </div>
                        <div class="text-[10px] sm:text-xs text-gray-500 flex items-start gap-2">
                            <i class="fa-solid fa-location-dot text-orange-400 w-4 mt-0.5 text-center"></i> 
                            <span class="break-words">${ev.loc}</span>
                        </div>
                    </div>
                </div>
            </div>`;
    };

    const renderSection = (title, icon, events, type, colorClass) => {
        if (!events || events.length === 0) return '';

        return `
            <div class="mb-12">
                <h3 class="text-xs font-black ${colorClass} uppercase tracking-widest mb-5 flex items-center gap-2">
                    <i class="fa-solid ${icon}"></i> ${title}
                </h3>
                <div class="grid grid-cols-1 xl:grid-cols-2 gap-6 justify-items-start">
                    ${events.map(e => createCard(e, type)).join('')}
                </div>
            </div>
        `;
    };

    let html = `
        <div class="animate-fade-in px-4 sm:pl-8 sm:pr-6 max-w-full">
            <h2 class='text-lg sm:text-xl font-bold mb-8 sm:mb-10 text-orange-800 uppercase tracking-tight flex items-center gap-2'>
                <i class="fa-solid fa-calendar-check"></i> Events & Activities
            </h2>
    `;

    html += renderSection("Weekly Events", "fa-rotate", data.weekly, "weekly", "text-orange-600");
    html += renderSection("Regular Classes", "fa-calendar-days", data.regular, "weekly", "text-orange-600");
    html += renderSection("Past Events", "fa-history", data.past, "past", "text-gray-400");

    area.innerHTML = html + `<div class="pb-20"></div></div>`;
}

/* --- AUTO LOAD --- */
document.addEventListener("DOMContentLoaded", renderEventsUI);