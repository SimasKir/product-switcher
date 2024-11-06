 
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { Label } from "@/components/ui/label";

 
function PasswordInput({setPass, pass}: {setPass: (password: string) => void, pass: string}) {
 
  return (
    <div className="space-y-3 text-white text-left">
      <Label>Password</Label>
      <InputOTP
        maxLength={6}
        value={pass}
        onChange={(value) => setPass(value)}
        className="flex flex-column text-white"
      >
        <InputOTPGroup>
          <InputOTPSlot index={0} />
          <InputOTPSlot index={1} />
          <InputOTPSlot index={2} />
          <InputOTPSlot index={3} />
          <InputOTPSlot index={4} />
          <InputOTPSlot index={5} />
        </InputOTPGroup>
      </InputOTP>
    </div>
  )
}

export default PasswordInput;