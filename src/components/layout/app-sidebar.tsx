import { LogIn, Calendar, TentTree, BookOpenText, Compass } from "lucide-react";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { Button } from "../ui/button";
import { ModeToggle } from "../ui/mode-toggle";
import Link from "next/link";
import { Separator } from "../ui/separator";

export function AppSidebar() {
  const menuItems = [
    { href: "/", icon: Compass, label: "Explore" },
    { href: "/", icon: Calendar, label: "Booking" },
    { href: "/", icon: BookOpenText, label: "My Booking" },
  ];

  return (
    <Sidebar>
      {/* Sidebar Header */}
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <Link href="/" className="flex px-2 py-4">
              <TentTree className="mr-2 h-5 w-5" />
              <span className="font-bold">JoJo Campground</span>
            </Link>
            <Separator />
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>

      {/* Sidebar Content */}
      <SidebarContent>
        <SidebarMenu>
          {menuItems.map(({ href, icon: Icon, label }, index) => (
            <SidebarMenuItem className="mx-2" key={index}>
              <SidebarMenuButton asChild>
                <Link href={href} className="flex p-6">
                  <Icon className="mr-1 h-4 w-4" />
                  <span>{label}</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarContent>

      {/* Sidebar Footer */}
      <SidebarFooter className="space-y-2">
        <ModeToggle />
        <Button variant="outline" size="sm" className="w-full justify-start">
          <LogIn className="mr-2 h-4 w-4" />
          <span>Sign In</span>
        </Button>
      </SidebarFooter>
    </Sidebar>
  );
}
