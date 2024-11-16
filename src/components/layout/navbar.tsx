import { SidebarTrigger } from "../ui/sidebar";

export default function Navbar({title}: {title: string}) {
    return (
        <header className="flex items-center justify-between px-6 py-4 border-b">
        <div className="flex items-center gap-4">
          <SidebarTrigger />
          <h1 className="text-xl font-medium">{title}</h1>
        </div>
      </header>
    );
}