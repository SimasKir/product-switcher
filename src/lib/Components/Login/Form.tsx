import PasswordInput from "./PasswordInput";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

function Form () {
    return (
        <div className="flex justify-center items-center h-screen w-screen">
            <Card className="flex justify-center items-center flex-col gap-4 w-96 h-96 p-5">
                <PasswordInput/>
                <Button variant="outline">Login</Button>
            </Card>
        </div>
    )   
}

export default Form;