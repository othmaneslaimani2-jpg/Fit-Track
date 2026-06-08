# 🏃 FitTrack - Personal Activity Coach

A React Native mobile application built with Expo that transforms a smartphone into a personal fitness coach using the device's native sensors and features. The app tracks daily activity, GPS workouts, and personal progress without relying on any external APIs.

---

## 📖 Project Overview

After learning how to consume web APIs, this project focuses on leveraging native mobile capabilities directly from the device.

The application uses:

* Pedometer for step counting
* GPS for workout tracking
* Camera for profile management
* Haptic feedback for user interaction
* Local storage for persistence

All data is generated and stored locally on the device.

**No Axios. No external APIs. No internet connection required.**

---

## 🎯 Learning Objectives

* Learn Expo Device APIs
* Manage real-time application state using Zustand
* Create smooth animations with React Native Reanimated
* Persist data using AsyncStorage
* Handle permissions and sensor subscriptions correctly
* Build a complete mobile application using Expo Router

---

## ✨ Features

### Dashboard Screen

* Real-time step counting using the device pedometer
* Daily goal tracking
* Animated progress ring
* Animated step counter
* Estimated distance calculation
* Estimated calories burned
* Quick access to start a workout session

### Current Session Screen

* Live GPS tracking
* Distance traveled
* Session duration
* Current speed
* Animated stopwatch
* Start / Pause / Stop controls
* Haptic feedback interactions

### History & Profile Screen

* Workout session history
* FlatList rendering
* Profile picture management
* Cumulative activity statistics
* Delete session functionality
* Persistent profile settings

---

## 📱 Device APIs Used

### expo-sensors

Used for:

* Real-time step counting
* Pedometer integration

### expo-location

Used for:

* GPS tracking
* Distance calculation
* Speed monitoring

### expo-camera / expo-image-picker

Used for:

* Profile picture capture
* Gallery image selection

### expo-haptics

Used for:

* Button feedback
* Enhanced user experience

---

## 🛠 Tech Stack

### Core

* React Native
* Expo
* Expo Router
* TypeScript

### State Management

* Zustand

### Animations

* React Native Reanimated
* React Native SVG

### Storage

* AsyncStorage

### Device Features

* Expo Sensors
* Expo Location
* Expo Camera
* Expo Image Picker
* Expo Haptics

---

## 📂 Application Structure

```text
app/
├── (tabs)/
│   ├── dashboard.tsx
│   ├── session.tsx
│   └── history.tsx
│
├── _layout.tsx
│
components/
├── ProgressRing.tsx
├── AnimatedCounter.tsx
├── SessionCard.tsx
├── Stopwatch.tsx
│
store/
├── activityStore.ts
│
services/
├── pedometerService.ts
├── gpsService.ts
├── storageService.ts
│
utils/
├── distance.ts
├── calories.ts
│
assets/
└── images/
```

---

## 🧠 Zustand Store

### Global State

```ts
{
  steps: number;
  dailyGoal: number;

  currentSession: Session | null;

  sessions: Session[];

  profile: {
    avatar: string;
    name: string;
  };

  setSteps();
  startSession();
  pauseSession();
  stopSession();
  saveSession();
  deleteSession();
  setAvatar();
}
```

---

## 🎨 Required Animations

### 1. Animated Progress Ring

* Reanimated + SVG
* Progress based on:

```text
steps / dailyGoal
```

### 2. Animated Step Counter

* Progressive increment animation

### 3. Animated Action Buttons

* Scale animation
* Color transition

### 4. History Card Animation

* Fade-in animation
* Slide-up transition

---

## 🔒 Permissions

The application must properly request and handle:

### Pedometer

* Activity recognition permission

### GPS

* Foreground location permission

### Camera

* Camera permission

### Media Library

* Gallery access permission

---

## ⚠️ State Handling

The application must support:

* Permission denied
* Sensor unavailable
* GPS unavailable
* Loading state
* Empty history state
* Camera unavailable

---

## 💾 Data Persistence

### AsyncStorage

Persist:

* Workout history
* User profile
* Daily goals
* Application settings

Restore automatically on startup.

---

## 📅 Development Plan

### Day 1 — Setup & Pedometer

* Project initialization
* Package installation
* Permissions
* Pedometer integration
* Zustand setup

### Day 2 — Dashboard & Animations

* Global state connection
* Progress ring
* Animated counters
* Daily statistics

### Day 3 — GPS Tracking

* Location tracking
* Distance calculation
* Stopwatch
* Session controls
* Haptic feedback

### Day 4 — Persistence & Profile

* Session history
* AsyncStorage integration
* Camera integration
* Profile management

### Day 5 — Polish & Finalization

* Error handling
* Performance optimization
* UI improvements
* Testing
* Bug fixes

---

## ✅ Project Requirements Checklist

### Core Features

* [ ] Real-time step counting
* [ ] Daily goal tracking
* [ ] Animated progress ring
* [ ] GPS workout tracking
* [ ] Distance calculation
* [ ] Speed calculation
* [ ] Animated stopwatch
* [ ] Haptic feedback
* [ ] Session persistence
* [ ] Profile picture capture
* [ ] Workout history
* [ ] Delete session functionality

### Technical Requirements

* [ ] Expo Router
* [ ] Zustand
* [ ] Reanimated
* [ ] AsyncStorage
* [ ] Expo Sensors
* [ ] Expo Location
* [ ] Expo Camera / Image Picker
* [ ] Expo Haptics
* [ ] useEffect subscription cleanup

---

## 🚀 Getting Started

Install dependencies:

```bash
npm install
```

Start the project:

```bash
npx expo start
```

Run on Android:

```bash
npx expo run:android
```

Run on iOS:

```bash
npx expo run:ios
```

---

## 📄 License

Educational project focused on learning native mobile device capabilities with Expo and React Native.
