"use client";
import { Separator } from "@/components/ui/separator";
import { SidebarTrigger } from "@/components/ui/sidebar";
import BreadcrumbUi from "../breadcrumb-ui/BreadcrumbUi";
import { usePathname } from "next/navigation";
import { format } from "date-fns-jalali";

export function SiteHeader() {
  const pathname = usePathname();
  const isHomePage = pathname === "/";
  const today = new Date();
  const iranianFormat = format(today, "yyyy/MMMM/dd");

  return (
    <header className="flex items-center border-b h-(--header-height) group-has-data-[collapsible=icon]/sidebar-wrapper:h-(--header-height) transition-[width,height] ease-linear shrink-0">
      <div className="flex justify-between items-center gap-2 px-4 lg:px-6 w-full container">
        <div className="flex items-center gap-1 lg:gap-2 w-full">
          <SidebarTrigger className="-ml-1" />
          {isHomePage ? null : (
            <Separator
              orientation="vertical"
              className="mx-2 data-[orientation=vertical]:h-4"
            />
          )}
          {isHomePage ? null : <BreadcrumbUi />}
        </div>
        <p className="w-full text-muted-foreground text-sm text-left">
          {iranianFormat}
        </p>
      </div>
    </header>
  );
}
