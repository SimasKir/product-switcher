import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
 
function NameInput({ setName }: { setName: (name: string) => void }) {

  return (
    <div className="grid w-full max-w-sm items-center gap-1.5">
      <Label htmlFor="name">Username</Label>
      <Input onChange={(e) => setName(e.target.value)} type="text" id="name" placeholder="Username" />
    </div>
  )
}

export default NameInput;