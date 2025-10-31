'use client';

import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Bell, Settings, User } from 'lucide-react';
import Link from 'next/link';
import { MobileSidebar } from './MobileSidebar';
import { RootState } from '@/state/store';
import { useSelector } from 'react-redux';

export function Header({
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
  const { user } = useSelector((state: RootState) => state.auth);
  console.log('user', user);
  return (
    <header className="bg-white h-16 flex items-center justify-between px-6">
      <div className="flex md:hidden items-center space-x-4">
        <MobileSidebar
          sheetOpen={sheetOpen}
          setSheetOpen={setSheetOpen}
          settingsExpanded={settingsExpanded}
          setSettingsExpanded={setSettingsExpanded}
        />
      </div>
      <div className="flex items-center space-x-4 ml-auto">
        <div className="relative mr-6">
          <Bell className="h-6 w-6 text-gray-600" />
          <div className="bg-red-500 absolute -top-2 -right-1 rounded-full flex items-center justify-center">
            <span className="text-white px-1.5 py-0.5 text-xs">2</span>
          </div>
        </div>
        <div className="flex flex-col">
          <p className="text-sm font-bold">{user?.name}</p>
          <p className="text-xs text-end text-gray-600">{user?.email}</p>
        </div>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="relative h-8 w-8 rounded-full">
              <Avatar className="h-9 w-9 border-2 border-gray-400">
                <AvatarImage
                  src="https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=400"
                  alt="Admin"
                />
                <AvatarFallback>AD</AvatarFallback>
              </Avatar>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-56" align="end" forceMount>
            <DropdownMenuItem asChild>
              <Link href="/admin/profile" className="flex items-center">
                <User className="mr-2 h-4 w-4" />
                <span>Profile</span>
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem asChild>
              <Link href="/admin/settings" className="flex items-center">
                <Settings className="mr-2 h-4 w-4" />
                <span>Settings</span>
              </Link>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>
              <span>Sign out</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
}
