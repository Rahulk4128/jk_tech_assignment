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