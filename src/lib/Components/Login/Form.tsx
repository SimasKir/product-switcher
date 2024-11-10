import { useState } from "react"
import Cookies from 'js-cookie';
import { useNavigate } from 'react-router-dom';

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

import PasswordInput from "./PasswordInput";
import NameInput from "./NameInput";

Cookies.remove('IBAUTH');

export const setCookie = (name: string) => {
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
            setPass("");
        }
    }

    return (
        <div className="bg-gradient-to-br from-ib-dark from-60% to-ib-secondary">
            <div className='container mx-auto h-screen flex justify-center flex-col items-center'>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 px-4 w-full">
                    <div className="flex flex-col justify-center items-center md:items-start">
                        <img className="mb-4" src="/assets/logo-large.png" width="89px" height="45px" alt="The Impact Brands"></img>
                        <h1 className="text-white text-left text-4xl lg:text-5xl font-black uppercase hidden md:block">
                            <span>Let's</span><br></br>
                            <span>#IMPACTBILLIONS</span><br></br>  
                            <span>together</span>
                        </h1>
                    </div>
                    <Card className="flex justify-center items-center flex-col gap-4 p-5 md:p-9 bg-transparent max-w-96 mx-auto border-none shadow-[white_-2px_-2px_0px_0px]">
                        <NameInput setName={setName}/>
                        <PasswordInput setPass={setPass} pass={pass}/>
                        {error && <p className="text-red-500">Wrong password</p>}
                        <Button variant="outline" className="mt-2" onClick={() => allowAccess(name, pass)}>Login</Button>
                    </Card>
                </div>
            </div>
        </div>
    )   
}

export default Form;