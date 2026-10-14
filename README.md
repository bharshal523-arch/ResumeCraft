# ResumeCraft — Resume Maker Website

A beginner-friendly resume builder made with HTML, CSS and vanilla JavaScript.

## Features

- Responsive, modern landing page
- Resume form with instant live preview
- Three visual templates: Classic, Modern, Minimal
- PDF export using the html2pdf.js browser library
- Reset-to-example button
- Free + future-premium pricing section
- No account or database required for this demo

## Run it in VS Code

1. Download and extract `ResumeCraft-Website.zip`.
2. Open VS Code.
3. Choose **File → Open Folder...** and select the extracted `resume_maker_website` folder.
4. Open `index.html`.
5. Recommended: install the **Live Server** extension by Ritwick Dey from the VS Code Extensions panel.
6. Right-click `index.html` and choose **Open with Live Server**.
7. If you do not want an extension, double-click `index.html` to open it in your browser. PDF export requires internet access because this starter loads html2pdf.js from a CDN.

## Test checklist

1. Change the name and confirm the preview changes immediately.
2. Change the template selector between Classic, Modern and Minimal.
3. Add or remove skills separated by commas.
4. Click **Download PDF** and open the downloaded file.
5. Test a narrow browser window or your phone to check responsive layout.
6. Refresh the page: this starter does not save user details.

## Project files

- `index.html` — page structure and form fields
- `style.css` — responsive layout and resume templates
- `script.js` — live preview, template switch, reset and PDF export

## How the PDF export works

The page loads `html2pdf.js` from a CDN. The Download PDF button captures the resume preview and generates an A4 PDF in the browser. Internet access is required for the CDN library. Do not upload the whole webpage; the PDF is generated from the resume preview element only.

## Important limitations before making money

This is a frontend demo, not a production payment system.

- **Premium is not actually locked or sold.** The premium button only shows an informational message. Hiding a button or price in JavaScript is not secure payment enforcement.
- To charge customers, add a backend (for example Node.js/Express or another server framework), a payment provider (for example Razorpay), server-side payment signature verification, order records, and server-enforced entitlements. Never put payment secret keys in HTML or JavaScript sent to visitors.
- If premium templates are delivered entirely in frontend files, a visitor can inspect the code. Keep paid assets or access checks behind a server if they must be restricted.
- Add privacy notice, terms, contact details, refund/cancellation policy, and reasonable security protections before accepting customer data or payments.
- This demo processes the resume in the visitor's browser and does not transmit it to your server. Avoid asking for unnecessary sensitive information.
- The PDF library and Google Fonts are third-party CDN resources. For a more reliable production site, self-host vetted dependencies where appropriate and test PDF output on common browsers.
- A custom domain, hosting, payment gateway, taxes, and business registrations may involve costs or obligations depending on your setup and location.

## Suggested roadmap

1. Get feedback from students and job seekers.
2. Improve template quality, PDF page breaks, accessibility and mobile form usability.
3. Add local draft saving only with a clear privacy notice and an option to clear saved data.
4. Build and test a backend before accounts, cloud saving, or paid plans.
5. Add verified checkout and unlock premium features only after server-side payment verification.
6. Publish a privacy policy, terms, support contact and refund policy.
