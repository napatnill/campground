import { LogIn, Calendar, TentTree, BookOpenText, Compass } from "lucide-react";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem
} from "@/components/ui/sidebar";
import { Button } from "../ui/button";
import { ModeToggle } from "../ui/mode-toggle";
import Link from "next/link";
import { Separator } from "../ui/separator";

export function AppSidebar() {
  return (
    <Sidebar>
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
      <SidebarContent>
            <SidebarMenu>
              <SidebarMenuItem className="mx-2">
                <SidebarMenuButton asChild >
                  <Link href="/" className="flex p-6">
                    <Compass className="mr-1 h-4 w-4" />
                    <span>Explore</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem className="mx-2">
                <SidebarMenuButton asChild>
                  <Link href="/" className="flex p-6">
                    <Calendar className="mr-1 h-4 w-4" />
                    <span>Booking</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem className="mx-2">
                <SidebarMenuButton asChild>
                  <Link href="/" className="flex p-6">
                    <BookOpenText className="mr-1 h-4 w-4" />
                    <span>My Booking</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarContent>
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
