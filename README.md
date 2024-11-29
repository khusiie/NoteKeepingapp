
# 📝 Notes App

A modern, responsive web application for creating and managing personal notes built with React.js, Firebase, and Tailwind CSS.

## 🚀 Features

- **User Authentication**
  - Sign up with email and password
  - Login with existing credentials
  - Secure logout functionality

- **Note Management**
  - Create new notes with title and content
  - View all personal notes in a responsive grid layout
  - Edit existing notes
  - Delete notes with confirmation
  - Real-time updates

- **Search & Organization**
  - Search through notes by title or content
  - Notes sorted by last modified date
  - Responsive grid layout for better organization

- **UI/UX**
  - Clean and modern interface
  - Responsive design for all devices
  - Smooth animations and transitions
  - Intuitive icons and buttons
  - Real-time feedback for user actions

## 🛠️ Technologies Used

- **Frontend**
  - React.js
  - Tailwind CSS for styling
  - Lucide React for icons
  - React Router for navigation

- **Backend**
  - Firebase Authentication
  - Firebase Firestore
  - Firebase Security Rules

## 📋 Prerequisites

Before you begin, ensure you have the following installed:
- Node.js (v14 or higher)
- npm or yarn
- Git

## ⚙️ Installation

1. Clone the repository:
```bash
git clone [your-repository-url]
```

2. Navigate to the project directory:
```bash
cd notes-app
```

3. Install dependencies:
```bash
npm install
```

4. Create a `.env` file in the root directory and add your Firebase configuration:
```env
REACT_APP_FIREBASE_API_KEY=your_api_key
REACT_APP_FIREBASE_AUTH_DOMAIN=your_auth_domain
REACT_APP_FIREBASE_PROJECT_ID=your_project_id
REACT_APP_FIREBASE_STORAGE_BUCKET=your_storage_bucket
REACT_APP_FIREBASE_MESSAGING_SENDER_ID=your_messaging_sender_id
REACT_APP_FIREBASE_APP_ID=your_app_id
REACT_APP_FIREBASE_MEASUREMENT_ID=your_measurement_id
```

5. Start the development server:
```bash
npm start
```

## 🔒 Firebase Setup

1. Create a new Firebase project at [Firebase Console](https://console.firebase.google.com)
2. Enable Authentication with Email/Password provider
3. Create a Firestore database
4. Add the following security rules to your Firestore:

```javascript
rules_version = '2';

service cloud.firestore {
  match /databases/{database}/documents {
    match /notes/{noteId} {
      allow read, write: if request.auth != null && request.auth.uid == resource.data.userId;
      allow create: if request.auth != null && request.resource.data.userId == request.auth.uid;
    }
  }
}
```


## 🔧 Firebase Configuration

The app uses the following Firebase services configuration:

```javascript
const firebaseConfig = {
    apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
    authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
    projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
    storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
    appId: process.env.REACT_APP_FIREBASE_APP_ID,
    measurementId: process.env.REACT_APP_FIREBASE_MEASUREMENT_ID
};
```

## 🚦 Available Scripts

- `npm start` - Runs the app in development mode
- `npm test` - Launches the test runner
- `npm run build` - Builds the app for production
- `npm run eject` - Ejects from Create React App

## 🔑 Authentication Functions

```javascript
// Sign up new user
signUp(email, password)

// Sign in existing user
signIn(email, password)

// Sign out user
logOut()
```

## 📝 Note Management Functions

```javascript
// Add new note
addNote(title, content)

// Get all notes for current user
getNotes()

// Update existing note
updateNote(id, updatedData)

// Delete note
deleteNote(id)
```

## 🔐 Security

- All database operations require authentication
- Users can only access their own notes
- Firebase security rules ensure data protection
- Sensitive operations include error handling
- Input validation on both client and server side
- 
## 📄 License
This project is licensed under the MIT License - see the LICENSE file for details
