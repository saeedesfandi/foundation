import { ChevronLeft, Home, Menu } from "lucide-react";
import Link from "next/link";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function AppLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-dvh flex-col bg-background">
      {/* === App Bar (نوار بالا) === */}
      <header className="sticky top-0 z-50 flex h-16 items-center justify-between border-b bg-background/95 px-4 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="flex items-center gap-3">
          <Button variant="ghost" size="icon" asChild>
            <Link href="/app">
              <Home className="h-5 w-5" />
              <span className="sr-only">خانه</span>
            </Link>
          </Button>
          <h1 className="text-lg font-semibold font-vazirmatn">foundation</h1>
        </div>

        <Sheet>
          <SheetTrigger asChild>
            <Button variant="ghost" size="icon">
              <Menu className="h-5 w-5" />
              <span className="sr-only">منو</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="right" className="w-80 p-6">
            <div className="space-y-6">
              <h2 className="text-lg font-semibold">منو</h2>
              <nav className="space-y-2">
                <Button variant="ghost" className="w-full justify-start" asChild>
                  <Link href="/app/profile">پروفایل</Link>
                </Button>
                <Button variant="ghost" className="w-full justify-start" asChild>
                  <Link href="/app/settings">تنظیمات</Link>
                </Button>
                <Button variant="ghost" className="w-full justify-start" asChild>
                  <Link href="/app/help">راهنما</Link>
                </Button>
              </nav>
            </div>
          </SheetContent>
        </Sheet>
      </header>

      {/* === Bottom Navigation Tabs === */}
      <Tabs defaultValue="home" className="flex-1 flex flex-col">
        <div className="flex-1 overflow-y-auto pb-20">{children}</div>

        <div className="sticky bottom-0 z-50 border-t bg-background">
          <TabsList className="grid w-full grid-cols-4 h-16 rounded-none p-0">
            <TabsTrigger value="home" asChild>
              <Link href="/app" className="flex flex-col items-center gap-1 py-2">
                <Home className="h-5 w-5" />
                <span className="text-xs font-vazirmatn">خانه</span>
              </Link>
            </TabsTrigger>
            <TabsTrigger value="search" asChild>
              <Link href="/app/search" className="flex flex-col items-center gap-1 py-2">
                <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
                <span className="text-xs font-vazirmatn">جستجو</span>
              </Link>
            </TabsTrigger>
            <TabsTrigger value="notifications" asChild>
              <Link href="/app/notifications" className="flex flex-col items-center gap-1 py-2">
                <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                </svg>
                <span className="text-xs font-vazirmatn">اعلان‌ها</span>
              </Link>
            </TabsTrigger>
            <TabsTrigger value="profile" asChild>
              <Link href="/app/profile" className="flex flex-col items-center gap-1 py-2">
                <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
                <span className="text-xs font-vazirmatn">پروفایل</span>
              </Link>
            </TabsTrigger>
          </TabsList>
        </div>
      </Tabs>
    </div>
  );
}
