import { UserComponent } from "./UserComponent";

export const NavBar = () => {
  return (
    <div className="w-full h-[80px] bg-slate-600">
      <div className="w-full h-full flex items-center px-10 justify-between">
        <div>Logo</div>
        <UserComponent />
      </div>
    </div>
  );
};
