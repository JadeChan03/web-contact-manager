# Web Contact Manager

## Description


Web Contact Manager is a front-end solution to a web-based application that allows users to efficiently manage their contacts. Users can add, edit, delete, and import/export contacts in vCard format. The application features a clean and user-friendly interface built with React and Material-UI, leveraging Redux for state management.


## Features

- Add, edit, and delete contacts
- Import contacts from vCard files
- Export contacts to vCard format
- Search and filter contacts
- Responsive design with Joy-UI by Material-UI

## Technologies Used
- React + React Routers + React Hook Form
- Redux (for state management) + RTK
- TypeScript
- Vite (for build and development)
- Material-UI (for UI components)
- vCard library (for handling vCard files)

## Installation

Follow these steps to get the application running locally:

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/contact-manager.git
   cd contact-manager
   ```
2. **Install dependencies**
   Make sure you have Node.s installed. Then, run:
   ```bash
   npm install or npm i
   ```

3. **Run the application**
   Start the development server by running:
   ```bash
   npm run dev
   ```

Your app should be running on [http://localhost:5173/].

## Routes
'/' -- Home.tsx
'/contact' -- AddContact.tsx
'/contact/:id' -- EditContact.tsx

## Type Definitions

Types are defined in src/types/ and src/redux/types.ts to ensure type safety throughout the application. This includes types for the Redux store and actions, enhancing the development experience by providing autocompletion and error checking.

### TypeScript Support

The project uses TypeScript to provide type safety and better development experience. The file `vite-env.d.ts` includes type definitions for Vite, allowing you to utilize Vite's features, such as environment variables, with type checking.

- /// <reference types="vite/client" />

## Configuration

### Environment Variables

If the future edits require environment variables, create a .env file in the root directory and add any necessary configurations. Currently, this is not in use.

## Redux Configuration

The Redux store is configured in src/redux/store.ts. It combines the contacts slice to manage the state of contacts throughout the application.

### Available actions:

- contactAdded: Adds a single contact
- contactUpdated: Updates an existing contact
- contactDeleted: Deletes a contact
- contactsImported: (not yet integrated) Imports multiple contacts

## Redux Types

In src/redux/types.ts, types are defined for the Redux store, dispatch, and the state structure to ensure type safety throughout the app.

## Usage

- Adding Contacts: Navigate to the contacts list page and click "Add Contact" to enter the details.
- Editing Contacts: Click on a contact to edit its information.
- Deleting Contacts: Select a contact and click the "Delete" button.
- Importing Contacts: Use the import button to upload vCard files.
- Exporting Contacts: Select contacts and click the export button to download them as vCard files.
- Searching Contacts: Use the search bar to filter contacts by any of the form fields, such as name, email, phone number, etc.

## Known Issues
### Implement Contact Modal
- in the interest of time ContactModal has **not** been implemented, as such this criteria is not fully met:
"The UI must display Contacts as cards, and once opened The UI should display a Form to Visualize, Edit or Delete the Contact." However, ContactCards are directly visualed on ContactList and have the ability to be deleted, edited, or selected. 
### VCard/Import/Export Functionality 
- vCard Import Duplicate Bug: The logic to check for duplicates is implemented, but the UI still renders duplicate cards in importContactsFromVCard in vcard.ts.
- Manual Addition Duplicates: The app renders duplicate contact cards when new contacts are manually added.
### UI
- Handling and visualisation of undefined tags not implemented
- Phone Number Input: The AddContact form requires users to input a country code before allowing them to enter a phone number. This should be improved in future updates to enhance user flow.
- Overall UI Refactoring: The styling is still being refactored to improve UI intuitiveness and overall UX.
- Loading styles have not been implemented
### TypeScript Error
- Unresolved type error in 'tags' section in exportContactsToVCard utility function on vcard.ts
