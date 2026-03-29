/* --- EVENTS DATA --- */
window.eventsData = {
    weekly: [
        { 
            name: "Group Parayana", 
            desc: "Rayara Asthottara Parayana", 
            time: "Every Thursday, 8:00 AM", 
            loc: "Sri Krishna Matha, Bhaghyanagar Kondapur", 
            status: "On-Going" 
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
            status: "Completed" 
        },
        { 
            name: "Workshops", 
            desc: "Sandhyavandana and Deva pooja vidhana Workshop", 
            time: "21st and 22nd March 2025, 9:00 AM", 
            loc: "Sri Krishna Matha, Bhaghyanagar Kondapur", 
            status: "Completed" 
        },
        { 
            name: "Ugadi", 
            desc: "Vishesha Parayana", 
            time: "19th March 2025, 8:00 AM", 
            loc: "Sri Krishna Matha, Bhaghyanagar Kondapur", 
            status: "Completed" 
        }
    ]
};

/* --- EVENTS RENDERER --- */
function renderEventsUI() {
    // FIX: Define area inside the function so it can find the container
    const area = document.getElementById('contentArea'); 
    if (!area) return; 

    const data = window.eventsData;

    const createCard = (ev, type) => {
        const isPast = type === 'past';
        const statusColor = ev.status === "On-Going" ? "bg-green-100 text-green-700" : "bg-orange-100 text-orange-700";
        
        return `
            <div class="${isPast ? 'bg-gray-50 opacity-70 border-gray-200' : 'bg-white border-orange-100 shadow-sm border-l-4 border-l-orange-500'} p-4 rounded-xl border mb-3">
                <div class="flex justify-between items-start mb-2">
                    <h4 class="font-bold ${isPast ? 'text-gray-600' : 'text-orange-900'}">${ev.name}</h4>
                    <span class="text-[9px] px-2 py-0.5 rounded-full font-bold uppercase ${isPast ? 'bg-gray-200 text-gray-500' : statusColor}">
                        ${ev.status}
                    </span>
                </div>
                <p class="text-sm text-gray-700 mb-2">${ev.desc}</p>
                <div class="grid grid-cols-1 gap-1">
                    <div class="text-[11px] text-gray-500 flex items-center gap-2">
                        <i class="fa-solid fa-clock text-orange-400"></i> ${ev.time}
                    </div>
                    <div class="text-[11px] text-gray-500 flex items-center gap-2">
                        <i class="fa-solid fa-location-dot text-orange-400"></i> ${ev.loc}
                    </div>
                </div>
            </div>`;
    };

    let html = `
        <h2 class='text-xl font-bold mb-6 text-orange-800 uppercase tracking-tight flex items-center gap-2'>
            <i class="fa-solid fa-calendar-check"></i> Events & Activities
        </h2>`;

    if (data.weekly && data.weekly.length > 0) {
        html += `
            <h3 class="text-xs font-black text-orange-600 uppercase tracking-widest mb-3 flex items-center gap-2">
                <i class="fa-solid fa-rotate"></i> Weekly Events
            </h3>
            <div class="mb-8">${data.weekly.map(e => createCard(e, 'weekly')).join('')}</div>`;
    }

    if (data.past && data.past.length > 0) {
        html += `
            <h3 class="text-xs font-black text-gray-400 uppercase tracking-widest mb-3 flex items-center gap-2">
                <i class="fa-solid fa-history"></i> Past Events
            </h3>
            <div class="mb-10">${data.past.map(e => createCard(e, 'past')).join('')}</div>`;
    }

    area.innerHTML = html + `<div class="pb-20"></div>`;
}