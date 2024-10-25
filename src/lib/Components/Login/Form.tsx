import { useState } from "react"
import Cookies from 'js-cookie';
import { useNavigate } from 'react-router-dom';

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

import PasswordInput from "./PasswordInput";
import NameInput from "./NameInput";

Cookies.remove('IBAUTH');

const setCookie = (name: string) => {
    Cookies.set('IBAUTH', `${name}`, { expires: 1 });
}

function Form () {
    const [name, setName] = useState("");
    const [pass, setPass] = useState("");
    const [error, setError] = useState(false);

    const navigate = useNavigate();

    const allowAccess = (name: string, pass: string) => {
        Cookies.remove('IBAUTH');
    
        if ( pass === import.meta.env.VITE_PASS ) {
            setError(false);
            setCookie(name);
            navigate('/dashboard');
        } else {
            setError(true);
        }
    }

    return (
        <div className="flex justify-center items-center h-screen w-screen">
            <Card className="flex justify-center items-center flex-col gap-4 w-96 h-96 p-5">
                <NameInput setName={setName}/>
                <PasswordInput setPass={setPass} pass={pass}/>
                {error && <p className="text-red-500">Wrong password</p>}
                <Button variant="outline" onClick={() => allowAccess(name, pass)}>Login</Button>
            </Card>
        </div>
    )   
}

export default Form;