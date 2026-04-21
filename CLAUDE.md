# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is an Android application project, developed using Android Studio (IntelliJ-based IDE). The repository is in early initialization — no source code or build files have been committed yet.

## Build System

This project uses Gradle (standard for Android). Once initialized, common commands will be:

```bash
./gradlew assembleDebug       # Build debug APK
./gradlew assembleRelease     # Build release APK
./gradlew test                # Run unit tests
./gradlew connectedAndroidTest # Run instrumented tests on device/emulator
./gradlew lint                # Run lint checks
```

## Project Structure (expected once initialized)

Android projects follow a standard structure:
- `app/src/main/java/` — Kotlin/Java source code
- `app/src/main/res/` — Resources (layouts, drawables, strings)
- `app/src/test/` — Unit tests
- `app/src/androidTest/` — Instrumented tests
- `app/build.gradle` — App-level build config
- `build.gradle` / `settings.gradle` — Project-level build config
