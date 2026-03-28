// learnings.js
const learningsData = [
  {
    category: "Sandhya Vandana",
    vedas: [
      {
        name: "Rig Veda",
        resources: [
          { lang: "Telugu", audio: "#", video: "#", pdf: "downloads/Rigveda-Telugu-Sandyavandana.pdf" },
          { lang: "Kannada", audio: "#", video: "#", pdf: "downloads/Rigveda-Kannada-Sandyavandana.pdf" },
          // Updated path below
          { lang: "Sanskrit", audio: "#", video: "#", pdf: "downloads/Rigveda-Sanskrit-Sandyavandana.pdf" },
		  { lang: "English", audio: "#", video: "#", pdf: "downloads/Rigveda-English-Sandyavandana.pdf" }
        ]
      },
      {
        name: "Yajur Veda",
        resources: [
          { lang: "Telugu", audio: "#", video: "#", pdf: "downloads/Yajurveda-Telugu-Sandyavandana.pdf" },
          { lang: "Kannada", audio: "#", video: "#", pdf: "downloads/Yajurveda-Kannada-Sandyavandana.pdf" },
          // Updated path below
          { lang: "Sanskrit", audio: "#", video: "#", pdf: "downloads/Yajurveda-Sanskrit-Sandyavandana.pdf" },
		  { lang: "English", audio: "#", video: "#", pdf: "downloads/Rigveda-English-Sandyavandana.pdf" }
        ]
      }
    ]
  },
  {
    category: "Sankshipta Deva Pooja",
    vedas: [
      {
        name: "General Procedure",
        resources: [
          { lang: "Telugu", audio: "#", video: "#", pdf: "#" }
        ]
      }
    ]
  },
  {
    category: "Mantrabhyasa",
    vedas: [
      {
        name: "Selected Mantras",
        resources: [
          { lang: "Sanskrit", audio: "#", video: "#", pdf: "#" }
        ]
      }
    ]
  }
];

// Force global access for the HTML file
window.learningsData = learningsData;