# RadiPeerReview Documentation

## Table of Contents

- [Introduction](#introduction)
- [Portals](#portals)
  - [Radiologist Portal](#radiologist-portal)
  - [Admin Portal](#admin-portal)
- [Demo and Running with Docker](#demo-and-running-with-docker)
- [Swagger API Documentation](#swagger-api-documentation)
- [User Stories](#user-stories)
  - [Authentication \& Authorization](#1-authentication--authorization)
  - [Report Submission](#2-report-submission)
  - [Peer Review Assignment](#3-peer-review-assignment)
  - [Review Process](#4-review-process)
  - [Report Resubmission](#5-report-resubmission)
  - [Final Approval](#6-final-approval)
  - [Admin Management](#7-admin-management)
  - [Files Viewer](#8-files-viewer)
  - [Change Password](#9-change-password)
  - [Real-time Notifications](#10-real-time-notifications)
- [Request Status](#request-status)
- [Specializations](#specializations)
- [Notification Types](#notification-types)
- [Automatic Assessment Criteria](#automatic-assessment-criteria)
- [Assignment Modes](#assignment-modes)
- [Technologies \& Tools](#technologies--tools)
  - [Frontend](#frontend)
  - [Backend](#backend)
  - [Containerization](#containerization)
  - [Architecture](#architecture)
- [Code Naming Conventions](#code-naming-conventions)
  - [Variables and Functions](#variables-and-functions)
  - [Classes](#classes)
  - [Files](#files)
  - [Interfaces and Types](#interfaces-and-types)
  - [Folder Structure](#folder-structure)
  - [Constants](#constants)
- [Contributors](#contributors)

## Introduction

RadiPeerReview is a web-based platform designed for peer-reviewing radiology reports. It includes two main portals: Radiologist and Admin. The platform supports secure authentication, efficient report submission, structured peer reviews, and comprehensive admin management capabilities.

## Portals

### Radiologist Portal

The Radiologist Portal is designed for radiologists to securely log in, submit reports, review peer comments, resubmit reports if necessary, and ultimately seek final approval. It also provides functionalities to view DICOM and PDF files, manage passwords, and receive real-time notifications related to their reports and reviews.

### Admin Portal

The Admin Portal is built for administrators to manage the overall review process. It includes features for user management, automatic and manual report assignment, configuring assignment modes, overseeing the review process, and generating analytics and reports. Admins also receive notifications to manage and oversee review requests.

## Demo and Running with Docker

### Demo

You can check out the live demo of RadiPeerReview [here](https://drive.google.com/file/d/1ZcwjXnqfPHjFRs0VFxpVKQtbrozcZ4fR/view?usp=sharing).

### Running with Docker

To run the RadiPeerReview project using Docker, follow these steps:

1. **Clone the Repository**:

   ```sh
   git clone https://github.com/your-repo/radipeerreview.git
   cd radipeerreview
   ```

2. **Create Environment File**:
   Create a `.env` file in the project root with the necessary environment variables. For example:

   ```env
    DATABASE_URL=postgresql://postgres:password@postgres:5432/nestdb
    JWT_SECRET=your_jwt_secret
    BASE_URL=http://localhost:4000
   ```

3. **Build and Run Docker Containers**:

   ```sh
   docker-compose up --build
   ```

4. **Access the Application**:

   - The application will be available at `http://localhost:3000` for the frontend.
   - The backend API will be available at `http://localhost:4000`.

5. **Stopping the Containers**:
   To stop the running containers, use:
   ```sh
   docker-compose down
   ```

By following these steps, you can easily set up and run the RadiPeerReview project locally using Docker.

## Swagger API Documentation
The API documentation for RadiPeerReview is available at the following URL:
[Swagger API Documentation](https://radipeerreview-1.onrender.com/api/docs#/).

## User Stories

### 1. Authentication & Authorization

- **Radiologist Login**: As a radiologist, I want to log in to the platform securely to access my reports and assigned review requests.
- **Admin Login**: As an admin, I want to log in to manage users and oversee the review process.

### 2. Report Submission

- **Upload Reports**: As a radiologist, I want to upload and submit my reports within review requests to be stored so that peers can review them.

### 3. Peer Review Assignment

- **Automatic Assignment**: As an admin, I want to automatically assign reports to peer reviewers based on specialization and workload, ensuring an efficient review process.
- **Manual Assignment**: As an admin, I want to manually assign reports to reviewers when necessary.
- **Configure Assignment Mode**: As an admin, I want to configure the assignment mode to be either automatic or manual through settings.

### 4. Review Process

- **Access & Annotate Reports**: As a reviewer, I want to access, annotate, and comment on assigned reports, providing valuable feedback within a well-structured review form.
- **View Annotations & Comments**: As a radiologist, I want to view annotations and comments made by reviewers on my reports.

### 5. Report Resubmission

- **Resubmit Reports**: As a radiologist, I want to resubmit the report to peer reviews after making necessary adjustments based on feedback.

### 6. Final Approval

- **Streamlined Workflow for Approval**: As a radiologist, I want a streamlined workflow for the final approval of reviewed reports.

### 7. Admin Management

- **Manage User Accounts**: As an admin, I want to manage user accounts, including adding, editing, and deactivating users.
- **View Reports and Reviews**: As an admin, I want to view a list of all reports and reviews for oversight and quality control.
- **Generate Analytics and Reports**: As an admin, I want to generate analytics and reports to monitor the review process.

### 8. Files Viewer

- **View DICOM Files**: As a radiologist, I want to view DICOM files in a viewer.
- **View PDF Files**: As a radiologist, I want to view PDF files in a viewer.

### 9. Change Password

- **Change Account Password**: As a user, I want to change my account password.

### 10. Real-time Notifications

- **User Notifications**: As a user, I want to be notified of any actions related to me.
- **Admin Notifications for Manual Assignment**: As an admin, I want to receive notifications to assign new requests in manual mode.
- **Reviewer Notifications**: As a reviewer, I want to receive notifications for new assigned requests and new resubmissions.
- **Radiologist Notifications**: As a radiologist, I want to receive notifications for new reviews and approvals.

## Request Status

- **Created**: The request has been created and is awaiting assignment.
- **Assigned**: The request has been assigned to a reviewer.
- **Reviewed**: The review has been completed and feedback has been provided.
- **Completed**: The report has been approved and the review process is complete.

## Specializations

- Neuroradiology
- Musculoskeletal Radiology
- Abdominal Radiology
- Cardiovascular Radiology
- Breast Imaging
- Pediatric Radiology
- Thoracic Radiology
- Genitourinary Radiology
- Interventional Radiology
- Nuclear Medicine
- Emergency Radiology
- Oncologic Imaging
- Gastrointestinal Radiology
- Head and Neck Radiology
- Orthopedic Radiology
- Vascular and Interventional Radiology
- Endovascular Surgical Neuroradiology
- Body Imaging

## Notification Types

- General
- Unassigned Review Request
- Request Assigned
- Request Rejected
- Request Approved
- Request Reviewed
- Request Report Resubmitted
- Request Rereviewed
- Review Feedback Received

## Automatic Assessment Criteria

1. The most matching specialized radiologist to the creator radiologist.
2. The least busy radiologist with a lower number of assigned reviews.
3. Random assignment among radiologists with similar criteria.

## Assignment Modes

1. **Automatic Assignment**: Reports are automatically assigned to peer reviewers based on their specialization and current workload.
2. **Manual Assignment**: Admins manually assign reports to specific reviewers as needed.

## Technologies & Tools

### Frontend

1. **Next.js**: React framework for server-side rendering and static websites.
2. **TypeScript**: A strongly typed superset of JavaScript for better tooling.
3. **MUI (Material-UI)**: React UI framework following Material Design principles.
4. **Redux Toolkit**: Library for efficient Redux logic and state management.
5. **Axios**: Promise-based HTTP client for backend requests.
6. **Formik**: Library for building forms in React.
7. **Yup**: JavaScript schema builder for validation.
8. **cornerstone.js**: Library for displaying medical images.
9. **socket.io**: Real-time bidirectional communication library.

### Backend

1. **Nest.js**: Node.js framework for efficient server-side applications.
2. **TypeScript**: Strongly typed language for backend development.
3. **Prisma**: ORM tool for type-safe database queries.
4. **PostgreSQL**: Open-source relational database system.
5. **jwt (JSON Web Token)**: Secure authentication mechanism.
6. **bcrypt**: Password hashing for enhanced security.
7. **socket.io**: Real-time communication library.
8. **swagger**: API documentation tool.

### Containerization

- **Docker**: Platform for developing and running applications in containers.

### Architecture

- **MVC Architecture**: Design pattern separating Model, View, and Controller for organized code.

## Code Naming Conventions

### Variables and Functions

Use camelCase.

- **Example**: `const userName: string = "JohnDoe";`
- **Example**: `function calculateTotalPrice(price: number, quantity: number): number { return price * quantity; }`

### Classes

Use PascalCase.

- **Example**: `class UserService { // Class methods and properties }`

### Files

Use kebab-case.

- **Example**: `user-service.ts`
- **Example**: `user-controller.ts`

### Interfaces and Types

Use PascalCase.

- **Example**: `interface UserData { id: number; name: string; }`
- **Example**: `type UserStatus = "active" | "inactive";`

### Folder Structure

Use singular or plural nouns.

- **Example**: `src/components/user/UserList.tsx`
- **Example**: `src/controllers/UserController.ts`
- **Example**: `src/services/UserService.ts`

### Constants

Use uppercase with underscores.

- **Example**: `const MAX_RETRIES: number = 3;`
- **Example**: `const API_BASE_URL: string = "https://api.example.com";`

## Contributors

<table style="width:100%; table-layout: fixed;">
    <tbody>
        <tr>
            <td align="center" valign="top" style="width:20%; height:200px;">
                <a href="https://github.com/Zeyad-Amr">
                    <img alt="Zeyad Amr Fekry" src="https://avatars.githubusercontent.com/Zeyad-Amr" style="width:150px; height:150px; object-fit: cover;">
                    <br/>
                    <sub style="font-size:medium; padding-top:5px;"><b>Zeyad Amr</b></sub>
                </a>
                <br/>
                <span>Full Stack</span><br/>
                <span>@Zeyad-Amr</span>
            </td>
            <td align="center" valign="top" style="width:20%; height:200px;">
                <a href="https://github.com/AhmedRaouf481">
                    <img alt="Ahmed Abd ElRaouf" src="https://avatars.githubusercontent.com/AhmedRaouf481" style="width:150px; height:150px; object-fit: cover;">
                    <br/>
                    <sub style="font-size:medium; padding-top:5px;"><b>Ahmed Abd ElRaouf</b></sub>
                </a>
                <br/>
                <span>Full Stack</span><br/>
                <span>@AhmedRaouf481</span>
            </td>
            <td align="center" valign="top" style="width:20%; height:200px;">
                <a href="https://github.com/Abdelrhman012">
                    <img alt="Abdelrahman Yasser" src="https://avatars.githubusercontent.com/Abdelrhman012" style="width:150px; height:150px; object-fit: cover;">
                    <br/>
                    <sub style="font-size:medium; padding-top:5px;"><b>Abdelrahman Yasser</b></sub>
                </a>
                <br/>
                <span>Frontend</span><br/>
                <span>@Abdelrhman012</span>
            </td>
            <td align="center" valign="top" style="width:20%; height:200px;">
                <a href="https://github.com/momen882001">
                    <img alt="Mo'men Mohamed" src="https://avatars.githubusercontent.com/momen882001" style="width:150px; height:150px; object-fit: cover;">
                    <br/>
                    <sub style="font-size:medium; padding-top:5px;"><b>Mo'men Mohamed</b></sub>
                </a>
                <br/>
                <span>Frontend</span><br/>
                <span>@momen882001</span>
            </td>
            <td align="center" valign="top" style="width:20%; height:200px;">
                <a href="https://github.com/diaabadr">
                    <img alt="Diaa Badr Eldin" src="https://avatars.githubusercontent.com/diaabadr" style="width:150px; height:150px; object-fit: cover;">
                    <br/>
                    <sub style="font-size:medium; padding-top:5px;"><b>Diaa Badr</b></sub>
                </a>
                <br/>
                <span>Backend</span><br/>
                <span>@diaabadr</span>
            </td>
        </tr>
    </tbody>
</table>

All rights reserved © 2024
