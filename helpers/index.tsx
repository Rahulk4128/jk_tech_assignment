export const navOption = [
    {
        label: "Sign Up",
        path: "/signup",
        isAuth: false
    },
    {
        label: "Login",
        path: "/login",
        isAuth: false
    },
    {
        label: "User  Management",
        path: "/user-management",
        isAuth: true,
    },
    {
        label: "Document Management",
        path: "/document-management",
        isAuth: true

    },
    {
        label: "Ingestion Management",
        path: "/ingestion-management",
        isAuth: true

    },
    {
        label: "Q&A Interface",
        path: "/qa-interface",
        isAuth: true

    },
    {
        label: "Logout",
        path: "",
        isAuth: true
    }
]

export const Admin = "Admin";
export const User = "User";

export const userManagementTableHeaders = [
    {
        label: "Name"
    },
    {
        label: "Email"
    },
    {
        label: "Role"
    },
    {
        label: "Action"
    },
]


export const roleOptions =
    [
        { label: "User", value: "User" },
        { label: "Admin", value: "Admin" },
    ]

    export const handleDownload = (base64String: string, fileName: string) => {
        // Convert base64 string to a Blob
        const byteString = atob(base64String.split(',')[1]); // Decode base64 string
        const mimeString = base64String.split(',')[0].split(':')[1].split(';')[0]; // Get MIME type
        const ab = new ArrayBuffer(byteString.length);
        const ia = new Uint8Array(ab);
        
        for (let i = 0; i < byteString.length; i++) {
            ia[i] = byteString.charCodeAt(i);
        }
    
        const blob = new Blob([ab], { type: mimeString }); // Create a Blob from the ArrayBuffer
        const url = URL.createObjectURL(blob); // Create a URL for the Blob
    
        const a = document.createElement('a');
        a.href = url;
        a.download = fileName; // Set the file name for download
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        
        // Clean up the URL object
        URL.revokeObjectURL(url);
    };
