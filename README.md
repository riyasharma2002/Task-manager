# Notes App - Offline Multi-User Notes Application

A React Native application built with Expo that allows multiple users to create, manage, and organize their notes offline. Each user has their own isolated notes that persist locally on the device.

## Features

### Authentication (Offline Only)
- *Sign Up***: Create a new account with a unique username and password
- **Login**: Authenticate with existing credentials
- All user data is stored locally using AsyncStorage
- Multiple users can use the app on the same device
- Each user only sees their own notes

### ✅ Notes Management
- **List View**: Display all notes with title, preview text, and image thumbnails
- **Create Note**: Add new notes with title, body text, and optional images
- **Edit Note**: Modify existing notes
- **Delete Note**: Remove notes with confirmation dialog
- All notes are stored locally per user

### ✅ Image Support
- **Gallery**: Pick images from device gallery
- **Camera**: Capture images directly from camera
- Images persist after app restart
- Support for viewing and removing images from notes

### ✅ Search and Sort
- **Search**: Filter notes by title or body text in real-time
- **Sort Options**:
  - Last Updated (newest → oldest / oldest → newest)
  - Title (A → Z / Z → A)
- Search and sort work together seamlessly

### ✅ Logout
- Logout functionality to return to login screen
- Users can switch between accounts
- Current session is cleared on logout

## Setup Instructions

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn
- Expo CLI (`npm install -g expo-cli`)
- Expo Go app on your mobile device (for testing) OR Android Studio / Xcode (for building)

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd Notesapp
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm start
   ```

4. **Run on device/emulator**
   - For Android: `npm run android` or scan QR code with Expo Go
   - For iOS: `npm run ios` or scan QR code with Expo Go
   - For Web: `npm run web`

### Building APK (Android)

To build a release APK:

1. **Install EAS CLI** (if not already installed)
   ```bash
   npm install -g eas-cli
   ```

2. **Login to Expo**
   ```bash
   eas login
   ```

3. **Configure the project**
   ```bash
   eas build:configure
   ```

4. **Build the APK**
   ```bash
   eas build --platform android --profile preview
   ```

   Or for a production build:
   ```bash
   eas build --platform android
   ```

5. **Download the APK**
   - The build will be available in your Expo dashboard
   - Download the APK file and add it to the repository

Alternatively, you can build locally using:
```bash
expo build:android -t apk
```

## Libraries Used

- **expo**: ~49.0.0 - React Native framework
- **react**: 18.2.0 - React library
- **react-native**: 0.72.6 - React Native core
- **@react-navigation/native**: ^6.1.9 - Navigation library
- **@react-navigation/native-stack**: ^6.9.17 - Stack navigator
- **react-native-screens**: ~3.22.0 - Native screen components
- **react-native-safe-area-context**: 4.6.3 - Safe area handling
- **@react-native-async-storage/async-storage**: 1.18.2 - Local storage
- **expo-image-picker**: ~14.3.2 - Image picker from gallery and camera

## Project Structure

```
Notesapp/
├── App.js                 # Main app entry point with navigation
├── app.json              # Expo configuration
├── package.json          # Dependencies and scripts
├── babel.config.js       # Babel configuration
├── screens/
│   ├── LoginScreen.js    # Login screen
│   ├── SignUpScreen.js   # Sign up screen
│   ├── NotesListScreen.js # Notes list with search and sort
│   └── NoteEditScreen.js # Create/edit note screen
└── utils/
    └── storage.js        # AsyncStorage utilities for users and notes
```





