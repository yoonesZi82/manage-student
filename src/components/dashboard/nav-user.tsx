"use client";
import {
  IconDotsVertical,
  IconLogout,
  IconMoon,
  IconSun,
  IconUser,
  IconUserCircle,
} from "@tabler/icons-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar";
import { Button } from "../ui/button";
import { useTheme } from "next-themes";
import { useSession } from "next-auth/react";
import { Skeleton } from "../ui/skeleton";
import { truncateEmail } from "@/lib/utils";
import { signOut } from "next-auth/react";
export function NavUser({
  user,
}: {
  user: {
    name: string;
    email: string;
  } | null;
}) {
  const { isMobile } = useSidebar();
  const { theme, setTheme } = useTheme();
  const { data: session } = useSession();

  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <SidebarMenuButton
              size="lg"
              className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
            >
              {!session ? (
                <Skeleton className="w-10 h-10" />
              ) : (
                <>
                  <Avatar className="grayscale rounded-lg w-8 h-8">
                    <AvatarImage
                      src="https://api.dicebear.com/9.x/lorelei/svg?seed=Easton"
                      alt={user?.name}
                    />
                    <AvatarFallback className="rounded-lg">
                      <IconUser size={16} />
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1 grid text-sm text-left leading-tight">
                    <span className="font-medium truncate">
                      {session.user?.name}
                    </span>
                    <span className="text-muted-foreground text-xs truncate">
                      {session.user?.email
                        ? truncateEmail(session.user.email)
                        : ""}
                    </span>
                  </div>
                </>
              )}
              <IconDotsVertical className="ml-auto size-4" />
            </SidebarMenuButton>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            className="rounded-lg w-(--radix-dropdown-menu-trigger-width) min-w-56"
            side={isMobile ? "bottom" : "right"}
            align="end"
            sideOffset={4}
          >
            <DropdownMenuLabel className="flex flex-row-reverse justify-between items-center p-0 px-1 font-normal">
              {!session ? (
                <Skeleton className="w-10 h-10" />
              ) : (
                <div className="flex flex-row-reverse items-center gap-2 py-1.5 w-full text-sm text-left">
                  <Avatar className="rounded-lg w-8 h-8">
                    <AvatarImage
                      src="https://api.dicebear.com/9.x/lorelei/svg?seed=Easton"
                      alt={session.user?.name}
                    />
                    <AvatarFallback className="rounded-lg">
                      <IconUser size={16} />
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex flex-col text-sm text-right leading-tight">
                    <span className="font-medium truncate">
                      {session.user?.name}
                    </span>
                    <span className="max-w-[150px] text-muted-foreground text-xs truncate">
                      {session.user?.email
                        ? truncateEmail(session.user.email)
                        : ""}
                    </span>
                  </div>
                </div>
              )}
              <Button
                variant="outline"
                size="icon"
                onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                className="group rounded-lg"
              >
                {theme === "dark" ? (
                  <IconSun className="group-hover:rotate-180 transition-transform duration-600" />
                ) : (
                  <IconMoon />
                )}
              </Button>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuGroup dir="rtl">
              <DropdownMenuItem className="group" disabled>
                <IconUserCircle className="group-hover:text-primary-foreground" />
                پروفایل
              </DropdownMenuItem>
              <DropdownMenuItem
                className="group text-destructive"
                onClick={() => signOut({ callbackUrl: "/login" })}
              >
                <IconLogout className="text-destructive group-hover:text-primary-foreground" />
                خروج
              </DropdownMenuItem>
            </DropdownMenuGroup>
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarMenuItem>
    </SidebarMenu>
  );
}
