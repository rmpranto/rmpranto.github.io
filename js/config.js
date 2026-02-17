// Unified Configuration File
// Update your personal information here - changes will reflect across the entire portfolio

const portfolioConfig = {
    // Personal Information
    personal: {
        name: "Rahat Maksud Pranto",
        title: "Data Analyst",
        tagline: "Detail-oriented Data Analyst with experience in SQL, Looker Studio, BigQuery, Power BI, Excel, and Python. Skilled at building interactive dashboards that reveal trends and drive performance improvements.",
        email: "mail.rmpranto@gmail.com",
        phone: "+880 175 064 2658",
        location: "Dhaka, Bangladesh"
    },

    // Social Links
    social: {
        linkedin: "https://www.linkedin.com/in/rmpranto",
        github: "https://github.com/rmpranto",
        website: "https://rmpranto.github.io/",
        twitter: "https://twitter.com/yourhandle", 
        email: "mail.rmpranto@gmail.com",
        phone: "+880 175 064 2658"
        medium: ""
    },

    // CV/Resume
    cv: {
        downloadUrl: "https://drive.google.com/uc?export=download&id=1C9SqT60thuGHxQw2zpfnPIzWs1oOo9yA",
        previewUrl: "https://drive.google.com/file/d/1C9SqT60thuGHxQw2zpfnPIzWs1oOo9yA/preview"
    },

    // Theme Settings
    theme: {
        defaultTheme: "light", // "light" or "dark"
        enableThemeToggle: true
    }
};

// Export for use in main.js
if (typeof module !== 'undefined' && module.exports) {
    module.exports = portfolioConfig;
}
