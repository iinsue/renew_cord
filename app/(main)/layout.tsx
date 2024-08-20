import { NavigationSidebar } from "@/components/navigation/navigation-sidebar";

type Props = {
  children: React.ReactNode;
};

const MainLayout = ({ children }: Props) => {
  return (
    <div className="h-full">
      <main className="h-full md:pl-[72px]">{children}</main>
      <div className="fixed inset-y-0 z-30 h-full w-[72px] flex-col max-md:hidden md:flex">
        <NavigationSidebar />
      </div>
      <div className="max-md:hidden md:flex"></div>
    </div>
  );
};

export default MainLayout;
