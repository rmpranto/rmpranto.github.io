# Portfolio - Organized Structure

## Folder Structure
```
portfolio/
├── index.html                 # Main HTML file (NO inline scripts)
├── css/
│   └── style.css             # All styles
├── js/
│   ├── config.js             # Unified configuration (UPDATE HERE)
│   └── main.js               # All JavaScript code
├── assets/
│   ├── images/               # Portfolio images
│   └── icons/                # Icons and logos
├── docs/
│   └── (place your CV/resume here)
└── project-details/          # Individual project detail pages
```

## How to Update Configuration

### One-Time Update for Everything
Edit **`js/config.js`** to update:
- Personal information (name, email, phone, location)
- Social links (LinkedIn, GitHub, etc.)
- CV/Resume download links
- Theme settings

All changes in `config.js` will automatically reflect across the entire portfolio.

## Key Features
✅ **NO inline scripts** - All JavaScript is in external files
✅ **Unified config file** - Update once, change everywhere
✅ **Clean separation** - HTML, CSS, JS in separate files
✅ **Easy maintenance** - Professional folder structure

## Setup Instructions

1. **Add Your CV/Resume**
   - Place your CV PDF in the `docs/` folder
   - Update the filename in `js/config.js`

2. **Add Images**
   - Place portfolio images in `assets/images/`
   - Place icons/logos in `assets/icons/`

3. **Update Personal Info**
   - Open `js/config.js`
   - Update the `personal` object with your information
   - Update the `social` object with your links

4. **Deploy**
   - Upload all files maintaining the folder structure
   - Works with GitHub Pages, Netlify, Vercel, etc.
