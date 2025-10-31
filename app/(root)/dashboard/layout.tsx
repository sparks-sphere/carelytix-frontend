'use client';

import { useState, useEffect } from 'react';
import { cn } from '@/lib/utils';
import { Header } from '@/components/dashboard/Header';
import { Sidebar } from '@/components/dashboard/Sidebar';

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [isMobile, setIsMobile] = useState(false);
  const [sheetOpen, setSheetOpen] = useState(false);
  const [settingsExpanded, setSettingsExpanded] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      const mobile = window.innerWidth < 1024;
      setIsMobile(mobile);
      if (!mobile) {
        setSidebarOpen(true);
      }
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 relative">
      {!isMobile && (
        <Sidebar
          sidebarOpen={sidebarOpen}
          setSidebarOpen={setSidebarOpen}
          isMobile={isMobile}
          settingsExpanded={settingsExpanded}
          setSettingsExpanded={setSettingsExpanded}
        />
      )}

      <div
        className={cn(
          'min-h-screen transition-all duration-300 ease-in-out',
          !isMobile && sidebarOpen ? 'ml-64' : !isMobile ? 'ml-16' : 'ml-0',
        )}
      >
        <Header
          sheetOpen={sheetOpen}
          setSheetOpen={setSheetOpen}
          settingsExpanded={settingsExpanded}
          setSettingsExpanded={setSettingsExpanded}
        />

        <main className="px-6">{children}</main>
      </div>
    </div>
  );
}
