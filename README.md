### Getting Started

To start this project, ensure that **Node.js** is installed on your system. If it is not already installed, it is recommended to install the **LTS (Long-Term Support)** version of Node.js.

### Tech Stack

This project is built using the following technologies:

- **Next.js** (v15)  
- **Chakra UI** (v3.16.0)  
- **React Hook Form**  
- **Yup** (for form validation)  
- **React Icons**  
- **Redux Toolkit (RTK)**  
- **TypeScript**

### Installation & Running the Project

1. Clone the repository and open the project in **Visual Studio Code** (or your preferred code editor).
2. Install the project dependencies using either of the following commands:
   - `npm install`  
     or  
   - `yarn` (if you are using Yarn)
3. To start the development server, run:
   - `npm run dev`  
     or  
   - `yarn run dev`

### Credentials

- **Admin Credentials**:  
  - **Email**: `test@mailinator.com`  
  - **Password**: `Admin@123`

- **Normal User**:  
  You can register a new account by navigating to the **Sign Up** page.

### Admin Features

When logged in as an **admin**, the following features are available:

- **User Management Page**: Assign roles to users and delete users.
- **Document Management Page**: Manage uploaded documents.
- **Question-Answer Page**: View and manage Q&A content.
- **Ingestion Page**: Handle data ingestion and management workflows.

All these sections are equipped with **pagination support** for better performance and easier navigation through large datasets.

### Normal User Features

When logged in as a **normal user**, all features are accessible **except** the **User Management Page**. Available modules include:

- **Document Management Page**
- **Question-Answer Page**
- **Ingestion Page**

These sections also include **pagination support** for a smooth experience while navigating large datasets.

### Security & Access Control

This application includes full route protection:

- **Public Pages**:  
  - **Login Page**  
  - **Sign Up Page**

- **Authenticated users** cannot access public pages like **Login** or **Sign Up**.
- **Unauthenticated users** are restricted from accessing **private pages** such as Document Management, Ingestion, and Q&A pages.

### Additional Features

- **Toast Notifications**:  
  The application includes consistent and user-friendly toast messages for various scenarios:
  - **Success**
  - **Information**
  - **Error**  
  Toast messages are triggered both from backend responses and frontend actions to improve user experience.

- **Form Validations**:  
  The **Login** and **Sign Up** pages include validations as per security standards using **Yup**, ensuring proper input handling and preventing weak credentials or malformed data entries.
