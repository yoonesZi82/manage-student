"use client";
import {
  IconChevronRight,
  IconCirclePlusFilled,
  IconHomeHand,
  IconPlus,
  IconSchool,
  type Icon,
} from "@tabler/icons-react";
import { Button } from "@/components/ui/button";
import {
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
} from "@/components/ui/sidebar";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";

export function NavMain({
  items,
}: {
  items?: {
    title: string;
    url?: string;
    icon?: Icon;
    isActive?: boolean;
    items?: {
      title: string;
      url: string;
      icon?: Icon;
    }[];
  }[];
}) {
  const pathname = usePathname();
  const isActive = (url: string) => pathname === url;
  const [isHovered, setIsHovered] = useState(false);
  return (
    <SidebarGroup>
      <SidebarGroupContent className="flex flex-col gap-2">
        <SidebarMenu>
          <SidebarMenuItem className="flex items-center gap-2">
            <SidebarMenuButton
              tooltip="Quick Create"
              className="bg-primary hover:bg-primary/90 active:bg-primary/90 min-w-8 text-primary-foreground hover:text-primary-foreground active:text-primary-foreground duration-200 ease-linear !cursor-default"
            >
              <IconCirclePlusFilled />
              <span>ایجاد کلاس</span>
            </SidebarMenuButton>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  size="icon"
                  className="group-data-[collapsible=icon]:opacity-0 size-8"
                >
                  <IconPlus />
                </Button>
              </PopoverTrigger>
              <PopoverContent className="ml-29 lg:ml-42 !p-2 !max-w-[200px]">
                <Button
                  variant="ghost"
                  className="justify-start w-full"
                  asChild
                >
                  <Link href="/class/create">
                    <IconPlus />
                    <span>ایجاد کلاس</span>
                  </Link>
                </Button>
                <Button
                  variant="ghost"
                  className="justify-start w-full"
                  asChild
                >
                  <Link href="/class">
                    <IconSchool />
                    <span>کلاس ها</span>
                  </Link>
                </Button>
              </PopoverContent>
            </Popover>
          </SidebarMenuItem>
        </SidebarMenu>
        <SidebarMenu className="h-full min-h-[250px]">
          <SidebarMenuItem>
            <SidebarMenuButton
              tooltip="داشبورد"
              className={cn(isActive("/") && "bg-primary/10 text-primary")}
            >
              <Link
                href="/"
                className="flex flex-row items-center gap-2 w-full"
              >
                <IconHomeHand size={16} />
                <span>داشبورد</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
          <div className="max-h-[500px] overflow-y-auto">
            {items?.map((item) => {
              if (item.items) {
                return (
                  <Collapsible
                    key={item.title}
                    asChild
                    className="group/collapsible"
                  >
                    <SidebarMenuItem>
                      <CollapsibleTrigger asChild>
                        <SidebarMenuButton
                          tooltip={item.title}
                          className="flex flex-row justify-between items-center gap-10"
                        >
                          <div className="flex flex-row items-center gap-2 min-w-[180px]">
                            {item.icon && <item.icon size={16} />}
                            <div className="relative w-[180px] overflow-hidden">
                              <AnimatePresence mode="wait">
                                <motion.div
                                  onMouseEnter={() => {
                                    setIsHovered(true);
                                  }}
                                  onMouseLeave={() => {
                                    setIsHovered(false);
                                  }}
                                  className="text-start whitespace-nowrap"
                                  initial={{ x: 0 }}
                                  whileHover={{ x: "50%" }}
                                  transition={{
                                    duration: !isHovered ? 3 : 0.5,
                                    ease: "linear",
                                  }}
                                >
                                  {item.title}
                                </motion.div>
                              </AnimatePresence>
                            </div>
                          </div>
                          <div>
                            <IconChevronRight
                              size={16}
                              className="ml-auto group-data-[state=open]/collapsible:rotate-90 transition-transform duration-200"
                            />
                          </div>
                        </SidebarMenuButton>
                      </CollapsibleTrigger>
                      <CollapsibleContent>
                        <SidebarMenuSub className="border-r border-l-0">
                          {item.items.length > 0 ? (
                            item.items.map((subItem) => (
                              <SidebarMenuSubItem key={subItem.title}>
                                <SidebarMenuSubButton asChild>
                                  <Link href={subItem.url}>
                                    {subItem.icon && <subItem.icon />}
                                    <span>{subItem.title}</span>
                                  </Link>
                                </SidebarMenuSubButton>
                              </SidebarMenuSubItem>
                            ))
                          ) : (
                            <SidebarMenuSubItem>
                              <SidebarMenuSubButton asChild>
                                <span className="!text-muted-foreground">
                                  هیچ زیر مجموعه ای وجود ندارد
                                </span>
                              </SidebarMenuSubButton>
                            </SidebarMenuSubItem>
                          )}
                        </SidebarMenuSub>
                      </CollapsibleContent>
                    </SidebarMenuItem>
                  </Collapsible>
                );
              }
              return (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton
                    tooltip={item.title}
                    className={cn(
                      isActive(item.url || "") && "bg-primary/10 text-primary"
                    )}
                  >
                    {item.icon && <item.icon />}
                    <span>{item.title}</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              );
            })}
          </div>
        </SidebarMenu>
      </SidebarGroupContent>
    </SidebarGroup>
  );
}
