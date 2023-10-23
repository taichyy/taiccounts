import LoginForm from "@/components/login-form";
import MainTable from "@/components/main-table";
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { useEffect } from "react";


  
const LoginPage = () => {
    return (
    <main className="flex justify-center items-center h-screen w-11/12 md:w-1/3 ml-auto mr-auto">
    <LoginForm />
    </main>
    );
}
 
export default LoginPage;