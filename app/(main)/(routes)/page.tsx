import { ModeToggle } from "@/components/mode-toggle";
import { UserButton } from "@clerk/nextjs";

const HomPage = () => {
  return (
    <div className="flex h-full items-center justify-center">
      <UserButton afterSwitchSessionUrl="/" />
      <ModeToggle />
    </div>
  );
};

export default HomPage;
