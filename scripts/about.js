/* --- ABOUT DATA & RENDERER --- */
function renderAboutUI() {
    const area = document.getElementById('contentArea');
    if (!area) return;

    area.innerHTML = `
        <div class="animate-fade-in px-4 max-w-4xl mx-auto">
            <h2 class='text-xl font-bold mb-6 text-orange-800 uppercase tracking-tight flex items-center gap-2'>
                <i class="fa-solid fa-circle-info"></i> About Us
            </h2>

            <div class="bg-white border border-orange-100 rounded-3xl p-6 shadow-sm mb-8 leading-relaxed text-gray-800">
                <div class="space-y-4">
                    <p class="font-semibold text-orange-900 text-lg border-b border-orange-50 pb-2">
                        Jaya Hari Parayana Sangha
                    </p>
                    
                    <p class="text-sm">
                        Jaya Hari Parayana Sangha is a humble spiritual initiative dedicated to nurturing devotion, discipline, and dharmic living through collective chanting, study, and practice of sacred texts.
                    </p>

                    <p class="text-sm">
                        Our primary focus is to bring together like-minded devotees to engage in regular <strong>parayana</strong> (recitation), including revered compositions such as <strong>Hari Vayu Stuti</strong> and <strong>Rayara Ashtottara</strong>. These gatherings are conducted in person, fostering a sense of community and shared devotion.
                    </p>

                    <p class="text-sm">
                        In addition to parayana activities, the Sangha conducts structured learning programs. <strong>Mani Manjari</strong> classes are conducted online to help participants learn and understand the text in a systematic manner. We also organize <strong>Mantrabyasa</strong> sessions for children in person, encouraging them to learn and grow in a disciplined spiritual environment.
                    </p>

                    <p class="text-sm">
                        The Sangha also conducted workshops on essential daily practices such as <strong>Sandhyavandana</strong> and <strong>Deva Pooja Vidhana</strong>, helping individuals understand the deeper meaning behind these procedures. Our aim is to preserve these traditions in a simple and practical manner.
                    </p>

                    <p class="text-sm">
                        By fostering a supportive environment, we encourage participants of all ages to experience the joy of collective devotion. With regular events and a growing network of volunteers, we work towards spreading spiritual awareness and strengthening our cultural roots.
                    </p>

                    <div class="pt-4 text-center">
                        <p class="font-black text-orange-800 tracking-widest uppercase text-sm">
                            “Hari Sarvottama, Vayu Jeevottama”
                        </p>
                    </div>
                </div>
            </div>

            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div class="bg-orange-900 text-black p-6 rounded-2xl shadow-lg border-b-4 border-orange-950">
                    <h4 class="font-bold text-xs uppercase tracking-widest mb-3 text-orange-300 flex items-center gap-2">
                        <i class="fa-solid fa-eye"></i> Our Vision
                    </h4>
                    <p class="text-xs leading-relaxed opacity-90">Spreading the sacred teachings of Hari Sarvothama and Vayu Jeevothama through community parayana.</p>
                </div>
                
                <div class="bg-orange-600 text-black p-6 rounded-2xl shadow-lg border-b-4 border-orange-800">
                    <h4 class="font-bold text-xs uppercase tracking-widest mb-3 text-orange-200 flex items-center gap-2">
                        <i class="fa-solid fa-bullseye"></i> Our Goal
                    </h4>
                    <p class="text-xs leading-relaxed opacity-90">To enlighten every soul through the sacred nectar of stotras and seek the eternal grace and blessings of Mukhya Prana Vayu Devaru upon all devotees.</p>
                </div>
            </div>
            
            <div class="h-24"></div>
        </div>
    `;
}