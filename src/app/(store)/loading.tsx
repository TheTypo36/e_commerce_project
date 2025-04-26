import { Loader } from "lucide-react";

function Loading() {
  return (
    <div className="flex items-center justify-center h-screen">
      <Loader className="w-10 h-10 animate-spin" />
    </div>
  );
}

export default Loading;
