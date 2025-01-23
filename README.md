# Learning Management System (LMS) Project

![LMS Icon](https://img.icons8.com/color/48/000000/graduation-cap.png)

A comprehensive Learning Management System (LMS) designed for managing course content, students, and instructors. The system offers a rich user experience powered by **Next.js**, **Express.js**, **AWS DynamoDB**, **TailwindCSS**, and **Shadcn**.

---


## ✨ Features

- **User Authentication:** Secure and scalable authentication with Clerk.
- **Dynamic Drag-and-Drop Interface:** Organize course modules with a smooth drag-and-drop UI.
- **Rich Media Support:** Upload and manage files, videos, and images using FilePond and AWS S3.
- **Elegant UI Components:** Pre-styled components using Shadcn and Radix UI for consistent design.
- **Lucide Icons:** Beautiful and customizable icons for enhancing the user experience.
- **Data Visualization:** Interactive charts and visual aids for reporting and insights.
- **Scalable Backend:** Serverless architecture using AWS Lambda, DynamoDB, and API Gateway.
- **Payment Integration:** Stripe integration for seamless payment processing.
- **Form Validation:** Robust and type-safe form validation using React Hook Form and Zod.
- **Deployment:** Scalable and secure deployment using AWS services and Docker.


---

## 📸 Screenshots

### Frontend User Interface

![Frontend Screenshot](https://github.com/HerbertNtim/learnify-LMS/blob/main/client/public/learnify.png)

[**Live Demo**](https://learnify-a1onyhgkl-herbertntims-projects.vercel.app/)


## 🌐 Deployed Infrastructure

The LMS project is deployed using AWS services for scalability, reliability, and performance:

- **[AWS Lambda](https://aws.amazon.com/lambda/):** Serverless compute for executing backend functions.
- **[AWS DynamoDB](https://aws.amazon.com/dynamodb/):** NoSQL database for fast and reliable data storage.
- **[AWS S3](https://aws.amazon.com/s3/):** File storage for images, videos, and other media.
- **[AWS CloudFront](https://aws.amazon.com/cloudfront/):** CDN for low-latency content delivery.
- **[AWS API Gateway](https://aws.amazon.com/api-gateway/):** API management for backend endpoints.
- **[Docker](https://www.docker.com/):** Containerization for easy and consistent deployment.


## 📦 Frontend Dependencies

### Key Packages
- **[Next.js](https://nextjs.org/):** Framework for server-side rendering and static site generation.
- **[@clerk/nextjs](https://clerk.dev/):** Authentication made simple with Clerk integration.
- **[React Redux](https://react-redux.js.org/):** State management using Redux Toolkit.
- **[TailwindCSS](https://tailwindcss.com/):** Utility-first CSS framework for styling.
- **[Shadcn](https://shadcn.dev/):** Beautiful, accessible, and composable UI components powered by Radix.
- **[Lucide Icons](https://lucide.dev/):** Modern, customizable icon library for intuitive interfaces.
- **[Framer Motion](https://www.framer.com/motion/):** Animation library for smooth transitions.
- **[FilePond](https://pqina.nl/filepond/):** Advanced file upload with image preview and EXIF orientation.

### DevDependencies
- **[TypeScript](https://www.typescriptlang.org/):** Static type checking.
- **[ESLint](https://eslint.org/):** Linting for clean and consistent code.
- **[Prettier](https://prettier.io/):** Code formatting for a readable codebase.

---

## 📦 Backend Dependencies

### Key Packages
- **[Express.js](https://expressjs.com/):** Fast and lightweight web server framework.
- **[@aws-sdk/client-dynamodb](https://docs.aws.amazon.com/sdk-for-javascript/):** AWS SDK for interacting with DynamoDB.
- **[Dynamoose](https://dynamoosejs.com/):** Simplified modeling and data management for DynamoDB.
- **[Stripe](https://stripe.com/):** Payment gateway integration.
- **[Helmet](https://helmetjs.github.io/):** Security middleware for HTTP headers.

### DevDependencies
- **[TypeScript](https://www.typescriptlang.org/):** Provides static type definitions.
- **[Nodemon](https://nodemon.io/):** Automatic server restarts during development.
- **[Rimraf](https://github.com/isaacs/rimraf):** Cross-platform file deletion.
- **[Concurrently](https://github.com/open-cli-tools/concurrently):** Run multiple processes simultaneously.

---

## 🚀 Tech Stack

| Frontend                        | Backend               | Database      | Styling     |
|---------------------------------|-----------------------|---------------|-------------|
| Next.js, Shadcn, React, TailwindCSS | Express.js, Node.js | AWS DynamoDB  | TailwindCSS |

---

## 📂 Installation and Setup

### Frontend
```bash
cd client
npm install
npm run dev
cd server
npm install
npm run dev
