# UGC Invoice Generator

A modern Progressive Web App (PWA) for generating professional UGC (User Generated Content) invoices. Create, preview, and export invoices as PDF files. Install it on your device for offline access!

## Features

- 📝 Clean, user-friendly form interface
- 👁️ Live invoice preview (updates in real-time)
- 📄 PDF export functionality
- 🎨 Professional minimalist invoice design
- 📱 Responsive design
- ✅ Form validation
- 💾 Auto-formatting for uppercase fields
- 📲 **PWA - Installable on any device**
- 🔌 **Works offline** after installation
- ⚡ **Fast and lightweight**

## Installation (PWA)

### Desktop (Chrome/Edge/Brave)
1. Visit the website
2. Look for the install icon in the address bar (or click "Install App" button)
3. Click "Install" when prompted
4. The app will open in its own window and work offline!

### Mobile (Android)
1. Visit the website in Chrome
2. Tap the menu (3 dots) → "Add to Home screen" or "Install app"
3. The app will appear on your home screen

### Mobile (iOS)
1. Visit the website in Safari
2. Tap the Share button → "Add to Home Screen"
3. The app will appear on your home screen

## How to Use

1. Open the app (web or installed)
2. Fill in all the required invoice details:
   - Issue date and invoice number
   - Client information (name, account details, PAN, IFSC)
   - Service description and amount
   - Company information (name, address, GSTIN, contact)
   - Client contact information
3. Watch the live preview update as you type
4. Click "Generate PDF" to download the invoice as a PDF file
5. Send the PDF to businesses for payment processing

## Invoice Fields

### Header Section
- Issue Date
- Invoice Number
- Client Name

### Account Details
- Account Name
- Account Number
- IFSC Code
- PAN Number

### Service Details
- Service Description
- Amount

### Company Information
- Company Name
- Company Address
- GSTIN
- Email Addresses
- Phone Number

### Client Contact
- Contact Name
- Phone Number
- Address

## Technologies Used

- HTML5
- CSS3 (minimalist design)
- Vanilla JavaScript
- jsPDF (for PDF generation)
- html2canvas (for converting HTML to image)
- **PWA (Progressive Web App)** - Service Worker for offline support
- **Web App Manifest** - For installability

## Browser Compatibility

Works on all modern browsers:
- Chrome
- Firefox
- Safari
- Edge

## PWA Setup (For Developers)

### Generate Icons
1. Open `icon-generator.html` in your browser
2. Click "Generate Icons" to create `icon-192.png` and `icon-512.png`
3. Save the generated icons in the project root

### Deploy
The app can be hosted on any static hosting service:
- **GitHub Pages** (free)
- **Netlify** (free)
- **Vercel** (free)
- **Your own server**

Just upload all files and ensure they're served over HTTPS (required for PWA).

## Notes

- All required fields are marked with an asterisk (*)
- Some fields (like IFSC, PAN, GSTIN, names) are automatically converted to uppercase
- The invoice number and client name are included in the PDF filename
- The app works entirely in the browser - no server required!
- **After installation, the app works completely offline!**

## License

Free to use for personal and commercial purposes.

