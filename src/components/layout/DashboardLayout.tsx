"use client";
import React from "react";
import { SidebarInset, SidebarProvider } from "../ui/sidebar";
import { SiteHeader } from "../dashboard/site-header";
import { AppSidebar } from "../dashboard/app-sidebar";
import { usePathname } from "next/navigation";

function DashboardLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isLogin = pathname === "/login";

  if (isLogin) {
    return <>{children}</>;
  } else {
    return (
      <SidebarProvider
        style={
          {
            "--sidebar-width": "calc(var(--spacing) * 72)",
            "--header-height": "calc(var(--spacing) * 12)",
          } as React.CSSProperties
        }
      >
        <AppSidebar variant="inset" side="right" />
        <SidebarInset className="w-full">
          <SiteHeader />
          <div className="flex flex-col gap-4 md:gap-6 py-4 md:py-6">
            {children}
          </div>
        </SidebarInset>
      </SidebarProvider>
    );
  }
}

export default DashboardLayout;
