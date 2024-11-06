import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
 
function NameInput({ setName }: { setName: (name: string) => void }) {

  return (
    <div className="grid w-full max-w-sm items-center text-white text-left">
      <Label className="mb-3" htmlFor="name">Name</Label>
      <Input onChange={(e) => setName(e.target.value)} type="text" id="name" />
    </div>
  )
}

export default NameInput;