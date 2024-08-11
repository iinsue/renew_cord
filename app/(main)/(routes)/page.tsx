import { UserButton } from "@clerk/nextjs";

const HomPage = () => {
  return (
    <div>
      <UserButton afterSwitchSessionUrl="/" />
    </div>
  );
};

export default HomPage;
