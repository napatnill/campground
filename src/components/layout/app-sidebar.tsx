import { LogIn, LogOut, Calendar, TentTree, BookOpenText, Compass, UserPlus } from "lucide-react";

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
import Link from "next/link";
import { Separator } from "../ui/separator";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

export async function AppSidebar() {
  const session = await getServerSession(authOptions);

  const menuItems = [
    { href: "/", icon: Compass, label: "Explore" },
    { href: "/", icon: Calendar, label: "Booking" },
    { href: "/", icon: BookOpenText, label: "My Booking" }
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
        {session ? (
          <div>
            {/* Username */}
            <div className="text-xl font-semibold text-center">Welcome, {session.user?.name}</div>

            {/* Sign Out Button */}
            <Link href="/api/auth/signout">
              <Button variant="outline" size="sm" className="w-full mt-2 mb-2">
                <LogOut className="h-4 w-4" />
                <span>Sign Out</span>
              </Button>
            </Link>
          </div>
        ) : (
          // if no session
          <div className="space-y-2">
            {/* Register Button */}
            <Link href="/auth/register">
              <Button variant="outline" size="sm" className="w-full">
                <UserPlus className="h-4 w-4" />
                <span>Register</span>
              </Button>
            </Link>

            {/* Separator with "or" text */}
            <div className="flex items-center justify-center space-x-2">
              <Separator className="w-1/4" />
              <span className="text-sm text-muted-foreground">or</span>
              <Separator className="w-1/4" />
            </div>

            {/* Sign In Button */}
            <Link href="/auth/login">
              <Button variant="outline" size="sm" className="w-full mt-2 mb-2">
                <LogIn className="h-4 w-4" />
                <span>Sign In</span>
              </Button>
            </Link>
          </div>
        )}
      </SidebarFooter>
    </Sidebar>
  );
}
