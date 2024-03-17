import { UserComponent } from "./UserComponent";

export const NavBar = () => {
  return (
    <>
      <div className="fixed z-50 top-16 left-16 right-16 bottom-16 pointer-events-none"></div>
      <div className="z-50 fixed bg-transparent inset-x-0 h-20 top-0 max-md:pl-0">
        <section className="backdrop-blur-md h-full flex items-center w-full px-5 md:px-20">
          <div className=" font-bold text-lg flex items-center gap-x-3 w-1/4">
            <LogoIcon />
            <div className="tracking-wide hidden md:block dark:text-white">
              MovieTrakt<span className="text-red-600">.</span>
            </div>
          </div>
          <div className="w-3/4 flex flex-row items-center">
            <div className="border-[0.4px] w-[150px] max-md:flex border-opacity-20 px-3 py-4 border-_light_white flex items-center font-light gap-3 text-_light_white rounded-2xl h-7 transition-all duration-300 ease-in-out hover:w-[300px]">
              <SearchIcon />
              <p className="text-xs text-white">
                <input
                  type="text"
                  placeholder="Search Everything"
                  className="bg-transparent focus:outline-none text-white placeholder-white"
                />
              </p>
            </div>

            <section className="w-full flex justify-end ">
              <UserComponent />
            </section>
          </div>
        </section>
      </div>
    </>
  );
};

const LogoIcon = () => (
  <svg
    className="h-8 w-8 fill-red-600"
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
  >
    <path d="M10 15.5v-7c0-.41.47-.65.8-.4l4.67 3.5c.27.2.27.6 0 .8l-4.67 3.5c-.33.25-.8.01-.8-.4Zm11.96-4.45c.58 6.26-4.64 11.48-10.9 10.9 -4.43-.41-8.12-3.85-8.9-8.23 -.26-1.42-.19-2.78.12-4.04 .14-.58.76-.9 1.31-.7v0c.47.17.75.67.63 1.16 -.2.82-.27 1.7-.19 2.61 .37 4.04 3.89 7.25 7.95 7.26 4.79.01 8.61-4.21 7.94-9.12 -.51-3.7-3.66-6.62-7.39-6.86 -.83-.06-1.63.02-2.38.2 -.49.11-.99-.16-1.16-.64v0c-.2-.56.12-1.17.69-1.31 1.79-.43 3.75-.41 5.78.37 3.56 1.35 6.15 4.62 6.5 8.4ZM5.5 4C4.67 4 4 4.67 4 5.5 4 6.33 4.67 7 5.5 7 6.33 7 7 6.33 7 5.5 7 4.67 6.33 4 5.5 4Z"></path>
  </svg>
);

const SearchIcon = () => (
  <svg
    stroke="currentColor"
    fill="currentColor"
    strokeWidth="0"
    version="1.1"
    id="search"
    x="0px"
    y="0px"
    viewBox="0 0 24 24"
    className="text-_light_white text-xl"
    height="1em"
    width="1em"
    xmlns="http://www.w3.org/2000/svg"
  >
    <g>
      <path
        d="M20.031,20.79c0.46,0.46,1.17-0.25,0.71-0.7l-3.75-3.76c1.27-1.41,2.04-3.27,2.04-5.31
c0-4.39-3.57-7.96-7.96-7.96s-7.96,3.57-7.96,7.96c0,4.39,3.57,7.96,7.96,7.96c1.98,0,3.81-0.73,5.21-1.94L20.031,20.79z
M4.11,11.02c0-3.84,3.13-6.96,6.96-6.96c3.84,0,6.96,3.12,6.96,6.96c0,3.84-3.12,6.96-6.96,6.96C7.24,17.98,4.11,14.86,4.11,11.02z"
      ></path>
    </g>
  </svg>
);
