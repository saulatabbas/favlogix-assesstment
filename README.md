🚀 Front-End Assessment – FavLogix

This repository contains the submission for the FavLogix Front-End Screening Assignment.
The project is implemented using Next.js (App Router), TypeScript, and Tailwind CSS, strictly following the Figma design, comments, and behavioral requirements provided as part of the assessment.

The goal of this project is to demonstrate:

Pixel-perfect UI implementation

Clean component architecture

Responsive design

API integration with proper loading states

Maintainable and scalable front-end code

🔗 Live Preview

🌐 Deployed Application:
https://favlogix-assesstment.vercel.app/

📌 Key Features

✅ Pixel-perfect UI implementation based on Figma

✅ Fully responsive layout (Desktop & Mobile)

✅ Animated honeycomb dashboard interactions

✅ Gradient highlights & subtle hover animations

✅ Skeleton loaders and progressive data loading

✅ Live API integration using public dummy APIs

✅ Clean, modular, and reusable component structure

✅ Strongly typed TypeScript props and interfaces

✅ Graceful loading and error handling for all API calls

🎨 UI & Interaction Highlights

Animated Honeycomb Dashboard

Subtle gradient outline animation on hover

Active selection state with glow highlight

Smooth transition from icon selection to content area

Loading Experience

Skeleton UI displayed during data fetching

Clear user feedback while extracting information

Gradual content population after data is ready

Visual Effects

Animated blue gradient background

Glow effects aligned with Figma comments

Clean and modern UI styling

🛠 Tech Stack

Next.js (App Router)

TypeScript

Tailwind CSS

React Hooks

Async/Await Fetch Pattern

CSS & Motion-based Animations

📁 Project Structure
src/
 ├── api/              # API request handlers
 ├── app/              # App Router pages & layout
 │    ├── globals.css
 │    ├── layout.tsx
 │    └── page.tsx
 ├── assets/           # Static assets
 ├── components/       # Reusable UI components
 │    ├── banner/
 │    ├── common/
 │    ├── icons/
 │    ├── sidebar/
 │    └── SingleChatPage/
 ├── data/             # Mock & static data
 ├── global/           # Global state/helpers
 ├── icons/            # SVG/Icon components
 └── lib/              # Utility functions
public/


The structure is designed to be scalable, readable, and easy to maintain.

🔧 Getting Started
1️⃣ Install Dependencies
npm install
# or
yarn install

2️⃣ Run the Development Server
npm run dev


Open your browser at:
👉 http://localhost:3000

🔗 APIs Used

As required by the assessment, this project integrates live public dummy APIs:

https://dummyjson.com

API Usage Includes:

User data

Lists & details

Dynamic UI states

Button & interaction handling

All API calls include:

Loading states

Error handling

Clean data mapping

📝 Assumptions

All required behaviors and interactions are defined through Figma comments

Placeholder assets are used where no assets were provided

API endpoints were selected based on data relevance (users, posts, etc.)

Animation intensity and timing were kept subtle and professional, as implied by the design

✅ Requirements Completed

✔ UI matches Figma layout, spacing, and styling

✔ Fully responsive across screen sizes

✔ All Figma-comment tasks implemented

✔ Live API integration with loading states

✔ Skeleton UI for data fetching

✔ Clean, modular component architecture

✔ Strong TypeScript typing throughout the project

📸 Screenshots
Main Dashboard View

Content & Interaction View

👨‍💻 Author

Saulat Abbas
Full Stack Developer
Specialized in Next.js, TypeScript, Tailwind CSS

📌 Final Notes

This submission focuses on clarity, polish, and alignment with real-world product UI standards.
All interactions and behaviors were implemented to closely reflect the intent and comments provided in the Figma design.