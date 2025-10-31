'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import {
  Home,
  Package2,
  Receipt,
  House,
  Server,
  Settings,
  Users2,
  ChartBar,
  ChevronLeft,
  ChevronRight,
  ChevronDown,
  ChevronUp,
} from 'lucide-react';
import { useEffect } from 'react';

const navigation = [
  { name: 'Dashboard', href: '/dashboard/', icon: Home },
  { name: 'Analytics', href: '/dashboard/analytics/', icon: ChartBar },
  // { name: 'Members', href: '/dashboard/members/', icon: Users2 },
  // { name: 'Masters', href: '/dashboard/masters/', icon: Package2 },
  { name: 'Billing', href: '/dashboard/billing/', icon: Receipt },
  { name: 'Branches', href: '/dashboard/branches/', icon: House },
  { name: 'Bookings', href: '/dashboard/bookings/', icon: Server },
  {
    name: 'Settings',
    href: '/dashboard/settings/',
    icon: Settings,
    hasSubmenu: true,
    submenu: [
      { name: 'Salon/Branch', href: '/dashboard/settings/salon/' },
      { name: 'Services', href: '/dashboard/settings/services/' },
      // { name: 'Plans & Pricing', href: '/dashboard/settings/plans-pricing/' },
      { name: 'Combo Plans', href: '/dashboard/settings/combo-plans/' },
      { name: 'Subscription', href: '/dashboard/settings/subscription/' },
      { name: 'Staff', href: '/dashboard/settings/staff/' },
      // { name: 'Privileged User', href: '/dashboard/settings/privileged-user/' },
      { name: 'Coupons', href: '/dashboard/settings/coupons/' },
    ],
  },
];

export function Sidebar({
  sidebarOpen,
  setSidebarOpen,
  settingsExpanded,
  setSettingsExpanded,
}: {
  sidebarOpen: boolean;
  setSidebarOpen: (open: boolean) => void;
  isMobile: boolean;
  settingsExpanded: boolean;
  setSettingsExpanded: (expanded: boolean) => void;
}) {
  const pathname = usePathname();

  useEffect(() => {
    const shouldExpand = navigation.some(
      (item) =>
        item.hasSubmenu &&
        item.submenu?.some((subItem) => pathname === subItem.href),
    );
    if (shouldExpand) {
      setSettingsExpanded(true);
    }
  }, [pathname, setSettingsExpanded]);

  return (
    <div
      className={cn(
        'fixed inset-y-0 left-0 z-50 bg-[#542c58] text-white shadow-lg transform transition-all duration-300 ease-in-out',
        sidebarOpen ? 'w-64' : 'w-16',
      )}
    >
      <div className="flex items-center justify-between h-16 px-6">
        {/* Logo */}
      </div>

      <Button
        variant="ghost"
        size="sm"
        className={cn(
          'absolute -right-3 top-6 bg-[#542c58] border border-gray-300 rounded-full p-1 shadow-md hover:bg-[#98809b] z-10',
          'w-6 h-6 flex items-center justify-center',
        )}
        onClick={() => setSidebarOpen(!sidebarOpen)}
      >
        {sidebarOpen ? (
          <ChevronLeft className="w-4 h-4 text-white" />
        ) : (
          <ChevronRight className="w-4 h-4 text-white" />
        )}
      </Button>

      <nav className="mt-8 px-2">
        <div className="space-y-1">
          {navigation.map((item) => {
            const isActive = pathname === item.href;
            const isSubmenuActive = item.submenu?.some(
              (subItem) => pathname === subItem.href,
            );
            const shouldShowActive = isActive || isSubmenuActive;

            if (item.hasSubmenu) {
              return (
                <div key={item.name}>
                  <div
                    className={cn(
                      'flex items-center px-3 py-2 text-sm font-medium rounded-lg transition-all duration-300 ease-in-out text-white group relative cursor-pointer',
                      shouldShowActive
                        ? 'bg-[#98809b] border-r-2'
                        : 'text-gray-300 hover:bg-[#98809b] hover:text-white',
                      sidebarOpen
                        ? 'justify-between transition-all duration-300'
                        : 'justify-center transition-all duration-500',
                    )}
                    onClick={() =>
                      sidebarOpen && setSettingsExpanded(!settingsExpanded)
                    }
                    title={!sidebarOpen ? item.name : undefined}
                  >
                    <div className="flex items-center">
                      <item.icon className="w-5 h-5 text-white flex-shrink-0 transition-all duration-300" />
                      <span
                        className={cn(
                          'transition-all duration-300 ease-in-out overflow-hidden whitespace-nowrap text-sm font-medium',
                          sidebarOpen
                            ? 'ml-2 opacity-100 w-auto'
                            : 'ml-0 opacity-0 w-0',
                        )}
                      >
                        {item.name}
                      </span>
                    </div>

                    {sidebarOpen && (
                      <div className="transition-transform duration-200">
                        {settingsExpanded ? (
                          <ChevronUp className="w-4 h-4 text-white" />
                        ) : (
                          <ChevronDown className="w-4 h-4 text-white" />
                        )}
                      </div>
                    )}

                    {!sidebarOpen && (
                      <div className="absolute left-full ml-2 px-2 py-1 bg-gray-900 text-white text-sm rounded-md opacity-0 group-hover:opacity-100 transition-all duration-300 ease-out transform translate-x-1 group-hover:translate-x-0 pointer-events-none whitespace-nowrap z-50 shadow-lg">
                        {item.name}
                      </div>
                    )}
                  </div>

                  {/* Submenu Items */}
                  {sidebarOpen && settingsExpanded && (
                    <div className="ml-8 border-l-2 mt-1 space-y-1">
                      {item.submenu.map((subItem) => {
                        const isSubActive = pathname === subItem.href;
                        return (
                          <Link
                            key={subItem.name}
                            href={subItem.href}
                            className={cn(
                              'flex items-center mx-2 px-2 py-2 text-sm font-medium rounded-lg transition-all duration-200 text-white',
                              isSubActive
                                ? 'bg-[#98809b] text-white'
                                : 'text-gray-300 hover:bg-[#98809b] hover:text-white',
                            )}
                          >
                            <span className="text-sm">{subItem.name}</span>
                          </Link>
                        );
                      })}
                    </div>
                  )}
                </div>
              );
            }

            return (
              <Link
                key={item.name}
                href={item.href}
                className={cn(
                  'flex items-center px-3 py-2 text-sm font-medium rounded-lg transition-all duration-300 ease-in-out text-white group relative',
                  isActive
                    ? 'bg-[#98809b] border-r-2'
                    : 'text-gray-300 hover:bg-[#98809b] hover:text-white',
                  sidebarOpen
                    ? 'justify-start transition-all duration-300'
                    : 'justify-center transition-all duration-500',
                )}
                title={!sidebarOpen ? item.name : undefined}
              >
                <item.icon className="w-5 h-5 text-white flex-shrink-0 transition-all duration-300" />

                <span
                  className={cn(
                    'transition-all duration-300 ease-in-out overflow-hidden whitespace-nowrap text-sm font-medium',
                    sidebarOpen
                      ? 'ml-2 opacity-100 w-auto'
                      : 'ml-0 opacity-0 w-0',
                  )}
                >
                  {item.name}
                </span>

                {!sidebarOpen && (
                  <div className="absolute left-full ml-2 px-2 py-1 bg-gray-900 text-white text-sm rounded-md opacity-0 group-hover:opacity-100 transition-all duration-300 ease-out transform translate-x-1 group-hover:translate-x-0 pointer-events-none whitespace-nowrap z-50 shadow-lg">
                    {item.name}
                  </div>
                )}
              </Link>
            );
          })}
        </div>
      </nav>
    </div>
  );
}
