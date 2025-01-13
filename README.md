
# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

#################################################################
Key Features
1. Authentication System
Login and Registration:
Allows users to register and log in to the system.
Implements authentication using Firebase.
Role-Based Access Control:
Ensures users cannot access certain pages unless their profiles are completed.
2. Profile Management
Profile Form:
Users must provide their company name, email, phone number, address, and upload a company logo.
Cloudinary Integration:
Enables users to upload and store their company logo securely.
Persistent Data:
Profile data is saved to Firebase Firestore, and users are not required to resubmit their profile after logging out and logging back in.
Real-Time Fetching:
Profile details are fetched and displayed dynamically in various components, such as the dashboard navigation bar.
3. Dashboard
Responsive Design:
Sidebar navigation and top navigation bar with toggle functionality.
Dynamic Sidebar:
Icons and labels are displayed based on the screen size.
Navigation Links:
Links to the Home, Invoices, New Invoice, Settings, and Profile pages.
User Info Display:
Displays the user's name and company logo in the navigation bar dynamically.
4. Invoice Management
Create New Invoice:
Allows users to add customer details (e.g., name, email, phone, address) and products.
Calculates total price dynamically, including VAT.
Generates a unique invoice number using the date and order index.
Edit Existing Invoices:
Users can edit customer details, products, and VAT for existing invoices.
Auto-Save Feature:
Invoices are automatically saved to Firebase Firestore when the "Save" button is clicked.
Print Invoice:
Users can print invoices after saving them.
Print functionality ensures invoices are properly formatted and ready for PDF export or physical printing.
Prevent Unsaved Print:
The print button is disabled unless the invoice is saved.
5. Invoice Details and Export
Invoice Preview:
Displays the saved invoice details, including customer and product information.
PDF Export:
Users can export invoices as PDFs using html2canvas and jsPDF.
Print Functionality:
Users can print invoices with a professionally formatted design.
Logo Integration:
The company's logo, fetched from the profile, is included in the printed or exported invoice.
6. Email Integration
Email details are collected during invoice creation.
The collected email data can potentially be used for sending invoices directly to customers (future scope).
7. Home Page (Main Landing Page)
Before logging in, users are greeted with a professional home page providing an overview of the app's features.
Includes:
Features section
Contact information
Responsive navigation bar without the "Login" option after authentication.
8. Error Handling
Provides user-friendly error messages for:
Missing user ID.
Invalid or incomplete form submissions.
Cloudinary upload failures.
Ensures no duplicate invoices are created.
9. Data Persistence
All data, including profile information, invoices, and customer details, is stored in Firebase Firestore, ensuring persistence across sessions.
10. Settings
Placeholder page for future user preferences and configurations.


















################################################################################


### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can't go back!**

If you aren't satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you're on your own.

You don't have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn't feel obligated to use this feature. However we understand that this tool wouldn't be useful if you couldn't customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: [https://facebook.github.io/create-react-app/docs/code-splitting](https://facebook.github.io/create-react-app/docs/code-splitting)

### Analyzing the Bundle Size

This section has moved here: [https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size](https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size)

### Making a Progressive Web App

This section has moved here: [https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app](https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app)

### Advanced Configuration

This section has moved here: [https://facebook.github.io/create-react-app/docs/advanced-configuration](https://facebook.github.io/create-react-app/docs/advanced-configuration)

### Deployment

This section has moved here: [https://facebook.github.io/create-react-app/docs/deployment](https://facebook.github.io/create-react-app/docs/deployment)

### `npm run build` fails to minify

This section has moved here: [https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify](https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify)
