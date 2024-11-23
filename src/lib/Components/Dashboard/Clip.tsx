import { useToast } from "@/hooks/use-toast"
import { ClipProps } from "@/lib/utils/Types";

const Clip = ({text} : ClipProps) => {

  const { toast } = useToast()
  const copyToClipboard = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
    } catch (error) {
      console.error("Failed to copy: ", error);
    }
  };

  return (
    <button className="mr-4" onClick={() => {
      copyToClipboard(text);
      toast({
        title: `Copied ${text} clipboard!`,
      })
    }}>
      Repo
    </button>
  );
};

export default Clip;
