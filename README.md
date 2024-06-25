# RadiPeerReview Documentation

## Table of Contents
- [Introduction](#introduction)
- [Portals](#portals)
  - [Radiologist Portal](#radiologist-portal)
  - [Admin Portal](#admin-portal)
- [User Stories](#user-stories)
  - [Authentication \& Authorization](#authentication--authorization)
  - [Report Submission](#report-submission)
  - [Peer Review Assignment](#peer-review-assignment)
  - [Review Process](#review-process)
  - [Report Resubmission](#report-resubmission)
  - [Final Approval](#final-approval)
  - [Admin Management](#admin-management)
  - [Files Viewer](#files-viewer)
  - [Change Password](#change-password)
  - [Real-time Notifications](#real-time-notifications)
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

## User Stories

### Authentication & Authorization

1. **Radiologist Login**: As a radiologist, I want to log in to the platform securely to access my reports and assigned review requests.
2. **Admin Login**: As an admin, I want to log in to manage users and oversee the review process.

### Report Submission

1. **Upload Reports**: As a radiologist, I want to upload and submit my reports within review requests to be stored so that peers can review them.

### Peer Review Assignment

1. **Automatic Assignment**: As an admin, I want to automatically assign reports to peer reviewers based on specialization and workload, ensuring an efficient review process.
2. **Manual Assignment**: As an admin, I want to manually assign reports to reviewers when necessary.
3. **Configure Assignment Mode**: As an admin, I want to configure the assignment mode to be either automatic or manual through settings.

### Review Process

1. **Access & Annotate Reports**: As a reviewer, I want to access, annotate, and comment on assigned reports, providing valuable feedback within a well-structured review form.
2. **View Annotations & Comments**: As a radiologist, I want to view annotations and comments made by reviewers on my reports.

### Report Resubmission

1. **Resubmit Reports**: As a radiologist, I want to resubmit the report to peer reviews after making necessary adjustments based on feedback.

### Final Approval

1. **Streamlined Workflow for Approval**: As a radiologist, I want a streamlined workflow for the final approval of reviewed reports.

### Admin Management

1. **Manage User Accounts**: As an admin, I want to manage user accounts, including adding, editing, and deactivating users.
2. **View Reports and Reviews**: As an admin, I want to view a list of all reports and reviews for oversight and quality control.
3. **Generate Analytics and Reports**: As an admin, I want to generate analytics and reports to monitor the review process.

### Files Viewer

1. **View DICOM Files**: As a radiologist, I want to view DICOM files in a viewer.
2. **View PDF Files**: As a radiologist, I want to view PDF files in a viewer.

### Change Password

1. **Change Account Password**: As a user, I want to change my account password.

### Real-time Notifications

1. **User Notifications**: As a user, I want to be notified of any actions related to me.
2. **Admin Notifications for Manual Assignment**: As an admin, I want to receive notifications to assign new requests in manual mode.
3. **Reviewer Notifications**: As a reviewer, I want to receive notifications for new assigned requests and new resubmissions.
4. **Radiologist Notifications**: As a radiologist, I want to receive notifications for new reviews and approvals.

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
