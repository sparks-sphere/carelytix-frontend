'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import {
  Menu,
  Settings,
  ChevronDown,
  ChevronUp,
  Home,
  Package2,
  Receipt,
  House,
  Server,
  Users2,
  ChartBar,
} from 'lucide-react';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';

const navigation = [
  { name: 'Dashboard', href: '/admin', icon: Home },
  { name: 'Analytics', href: '/admin/members', icon: ChartBar },
  // { name: 'Members', href: '/admin/features', icon: Users2 },
  // { name: 'Masters', href: '/admin/modules', icon: Package2 },
  { name: 'Billing', href: '/admin/plans', icon: Receipt },
  { name: 'Branches', href: '/admin/users', icon: House },
  { name: 'Bookings', href: '/admin/subscriptions', icon: Server },
  {
    name: 'Settings',
    href: '/admin/settings',
    icon: Settings,
    hasSubmenu: true,
    submenu: [
      { name: 'Salon', href: '/admin/settings/salon' },
      { name: 'Branch', href: '/admin/settings/branch' },
      { name: 'Services', href: '/admin/settings/services' },
      { name: 'Staff', href: '/admin/settings/staff' },
      // { name: 'Plans & Pricing', href: '/admin/settings/plans-pricing' },
      { name: 'Combo Plans', href: '/admin/settings/combo-plans' },
      { name: 'Subscription', href: '/admin/settings/subscription' },
      // { name: 'Privileged User', href: '/admin/settings/privileged-user' },
      { name: 'Coupons', href: '/admin/settings/coupons' },
    ],
  },
];

export function MobileSidebar({
  sheetOpen,
  setSheetOpen,
  settingsExpanded,
  setSettingsExpanded,
}: {
  sheetOpen: boolean;
  setSheetOpen: (open: boolean) => void;
  settingsExpanded: boolean;
  setSettingsExpanded: (expanded: boolean) => void;
}) {
  const pathname = usePathname();

  return (
    <Sheet open={sheetOpen} onOpenChange={setSheetOpen}>
      <SheetTrigger asChild>
        <Button variant="ghost" size="sm">
          <Menu className="w-5 h-5" />
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="w-64 p-0 bg-[#542c58] border-r-0">
        <div className="flex items-center justify-between h-16 px-6">
          {/* Empty header space to match desktop */}
        </div>

        <nav className="mt-6 px-3">
          <div className="space-y-1">
            {navigation.map((item) => {
              const isActive = pathname === item.href;
              const isSubmenuActive = item.submenu?.some(
                (subItem) => pathname === subItem.href,
              );

              if (item.hasSubmenu) {
                return (
                  <div key={item.name}>
                    <div
                      className={cn(
                        'flex items-center justify-between px-3 py-2 text-sm font-medium rounded-lg transition-all duration-200 text-white group relative cursor-pointer',
                        isActive || isSubmenuActive
                          ? 'bg-[#98809b] border-r-2'
                          : 'text-gray-300 hover:bg-[#98809b] hover:text-white',
                      )}
                      onClick={() => setSettingsExpanded(!settingsExpanded)}
                    >
                      <div className="flex items-center">
                        <item.icon className="w-5 h-5 text-white flex-shrink-0" />
                        <span className="ml-3 text-sm">{item.name}</span>
                      </div>
                      <div className="transition-transform duration-200">
                        {settingsExpanded ? (
                          <ChevronUp className="w-4 h-4 text-white" />
                        ) : (
                          <ChevronDown className="w-4 h-4 text-white" />
                        )}
                      </div>
                    </div>

                    {settingsExpanded && (
                      <div className="ml-4 mt-1">
                        {item.submenu.map((subItem) => {
                          const isSubActive = pathname === subItem.href;
                          return (
                            <Link
                              key={subItem.name}
                              href={subItem.href}
                              className={cn(
                                'flex items-center px-3 py-2 text-sm font-medium rounded-lg transition-all duration-200 text-white',
                                isSubActive
                                  ? 'bg-[#6d4c6f] text-white'
                                  : 'text-gray-300 hover:bg-[#6d4c6f] hover:text-white',
                              )}
                              onClick={() => setSheetOpen(false)}
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
                    'flex items-center px-3 py-2 text-sm font-medium rounded-lg transition-all duration-200 text-white group relative',
                    isActive
                      ? 'bg-[#98809b] border-r-2'
                      : 'text-gray-300 hover:bg-[#98809b] hover:text-white',
                  )}
                  onClick={() => setSheetOpen(false)}
                >
                  <item.icon className="w-5 h-5 text-white flex-shrink-0" />
                  <span className="ml-3 text-sm">{item.name}</span>
                </Link>
              );
            })}
          </div>
        </nav>
      </SheetContent>
    </Sheet>
  );
}
