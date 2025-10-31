'use client';

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Dialog,DialogContent,DialogHeader, DialogTitle } from "../../Dialog";
import {
  MoreHorizontal,
  Search,
  Plus,
  ChevronLeft,
  ChevronRight,
  CircleX
} from 'lucide-react';
import { useState } from 'react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

interface User {
  id: string;
  name: string;
  email: string;
 
  contactNumber: string;
}

const allUser: User[] = [
  {
    id: '1',
    name: 'Elegance Beauty Salon',
    email: 'elegance@example.com',
    contactNumber: '1234567890',
  },
  {
    id: '2',
    name: 'Glamour Studio',
    email: 'glamour@example.com',
  
    contactNumber: '2345678901',
  },
  {
    id: '3',
    name: 'Chic Cuts',
    email: 'chiccuts@example.com',
    
    contactNumber: '3456789012',
  },
  {
    id: '4',
    name: 'Posh Spa',
    email: 'poshspa@example.com',
    
    contactNumber: '4567890123',
  },
  {
    id: '5',
    name: 'Luxury Lounge',
    email: 'luxury@example.com',
    
    contactNumber: '5678901234',
  },
  {
    id: '6',
    name: 'Urban Style',
    email: 'urban@example.com',
    
    contactNumber: '6789012345',
  },
  {
    id: '7',
    name: 'Royal Touch',
    email: 'royal@example.com',
    
    contactNumber: '7890123456',
  },
  {
    id: '8',
    name: 'Modern Cuts',
    email: 'modern@example.com',
    
    contactNumber: '8901234567',
  },
  {
    id: '9',
    name: 'Beauty Haven',
    email: 'haven@example.com',
    
    contactNumber: '9012345678',
  },
  {
    id: '10',
    name: 'Style Central',
    email: 'central@example.com',
    
    contactNumber: '0123456789',
  },
];

export default function PrivilegedUsersTable() {
  const[user,setUser]=useState(allUser)
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(2);
  const [searchTerm, setSearchTerm] = useState(''); 

  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
   const [newUser, setNewUser] = useState({
    name: '',
    email: '',
  
    contactNumber: '',
  });

  const handleAdd = () => {
    setIsAddDialogOpen(true);
  };

 const handleSaveNew = () => {
    const id: string = (Math.max(...user.map(B => Number(B.id))) + 1).toString();

    setUser([...user, { ...newUser, id}]);

   

    setNewUser({ name: '', email: '',contactNumber: '' });
   
    setIsAddDialogOpen(false);
  };

  const filteredUser = allUser.filter((user) =>
    user.name.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  const totalPages = Math.ceil(filteredUser.length / rowsPerPage);
  const startIndex = (currentPage - 1) * rowsPerPage;
  const endIndex = startIndex + rowsPerPage;
  const currentUser = filteredUser.slice(startIndex, endIndex);

  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages) setCurrentPage(page);
  };

  const generatePageNumbers = (): number[] => {
    const pages: number[] = [];
    const maxVisiblePages = 3;

    if (totalPages <= maxVisiblePages) {
      for (let i = 1; i <= totalPages; i++) pages.push(i);
    } else {
      if (currentPage <= 2) {
        for (let i = 1; i <= Math.min(3, totalPages); i++) pages.push(i);
      } else if (currentPage >= totalPages - 1) {
        for (let i = Math.max(totalPages - 2, 1); i <= totalPages; i++)
          pages.push(i);
      } else {
        for (let i = currentPage - 1; i <= currentPage + 1; i++) pages.push(i);
      }
    }
    return pages;
  };

  return (
    <Card className="bg-white rounded-lg border border-gray-200 shadow-sm">
      <CardContent className="p-6">
        <div className="flex flex-col mb-6">
          <h3 className="text-xl font-semibold text-gray-900">
            Privileged Users
          </h3>
          <div className="flex items-center justify-between gap-4 mt-2">
            <div className="relative w-80">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-purple-500 w-4 h-4" />
              <Input
                className="bg-purple-50 border-purple-200 pl-10 focus-visible:ring-purple-500"
                placeholder="Search"
                value={searchTerm}
                onChange={(e) => {
                  setSearchTerm(e.target.value);
                  setCurrentPage(1);
                }}
              />
            </div>
           <Button 
           onClick={handleAdd}
           className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2">
              <Plus className="mr-2 h-4 w-4" />
              Add User
            </Button>
          </div>
        </div>

        <div className="rounded-lg overflow-hidden border border-gray-200">
          <Table>
            <TableHeader>
              <TableRow className="bg-purple-100 hover:bg-purple-100">
                <TableHead className="text-gray-700 font-semibold px-6 py-4">
                  Sl.No
                </TableHead>
                <TableHead className="text-gray-700 font-semibold px-6 py-4">
                  Name
                </TableHead>
                <TableHead className="text-gray-700 font-semibold px-6 py-4">
                  Email Address
                </TableHead>
                
                <TableHead className="text-gray-700 font-semibold px-6 py-4">
                  Contact Number
                </TableHead>
                <TableHead className="text-gray-700 font-semibold px-6 py-4">
                  Action
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {currentUser.map((user, index) => (
                <TableRow
                  key={user.id}
                  className="hover:bg-gray-50 border-b border-gray-100"
                >
                  <TableCell className="px-6 py-4 text-gray-600">
                    {String(startIndex + index + 1).padStart(2, '0')}
                  </TableCell>
                  <TableCell className="px-6 py-4 text-gray-900">
                    {user.name}
                  </TableCell>
                  <TableCell className="px-6 py-4 text-gray-600">
                    {user.email}
                  </TableCell>
                  
                  <TableCell className="px-6 py-4 text-gray-600">
                    {user.contactNumber}
                  </TableCell>
                  <TableCell className="px-6 py-4">
                    <button
                      className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                      onClick={() => console.log('Action', user.id)}
                    >
                      <MoreHorizontal className="w-4 h-4 text-gray-500" />
                    </button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>

        <div className="flex items-center justify-between mt-6">
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <span>Rows per page</span>
            <Select
              value={rowsPerPage.toString()}
              onValueChange={(value) => {
                setRowsPerPage(parseInt(value));
                setCurrentPage(1);
              }}
            >
              <SelectTrigger className="w-16 h-8 border-gray-300">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="2">02</SelectItem>
                <SelectItem value="5">05</SelectItem>
                <SelectItem value="10">10</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="flex items-center space-x-2">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
              className="text-gray-600 hover:text-gray-900 bg-[#F3E8FF]"
            >
              <ChevronLeft className="mr-2 h-4 w-4" />
              Previous
            </Button>

            {generatePageNumbers().map((page) => (
              <Button
                key={page}
                variant={page === currentPage ? 'default' : 'ghost'}
                size="sm"
                onClick={() => handlePageChange(page)}
                className={
                  page === currentPage
                    ? 'bg-[#F3E8FF] text-black hover:bg-[#F3E8FF]'
                    : 'text-gray-600 hover:text-gray-900'
                }
              >
                {page}
              </Button>
            ))}

            {totalPages > 3 && currentPage < totalPages - 1 && (
              <span className="text-gray-400">...</span>
            )}

            <Button
              variant="ghost"
              size="sm"
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
              className="text-gray-600 hover:text-gray-900 bg-[#F3E8FF]"
            >
              Next
              <ChevronRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </div>
        < Dialog  open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
                <DialogContent >
                  <DialogHeader>
                    <DialogTitle
                   
                    >Create User</DialogTitle>
                    
                     <CircleX 
                     onClick={() => setIsAddDialogOpen(false)}
                     className="absolute right-6 top-6 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
                     />
                    
                  </DialogHeader>
        
        
                  <div className="space-y-6 p-6">
                    <div className="grid grid-cols-2 gap-4">
        
                    <div className="space-y-2" >
                      <Label
                      className="text-sm font-medium text-gray-700"
                      htmlFor="new-name"> Name</Label>
                      <Input
                        id="new-name"
                        value={newUser.name}
                        onChange={(e) =>
                          setNewUser({ ...newUser, name: e.target.value })
                        }
                        />
                    </div>
                    <div className='space-y-2'>
                      <Label 
                      className="text-sm font-medium text-gray-700"
                      htmlFor="Branch-code">Email</Label>
                      <Input
                        id="Branch-code"
                        value={newUser.email}
                        onChange={(e) =>
                          setNewUser({ ...newUser, email: e.target.value })
                        }
                        />
                    </div>
                    
                  </div>
                    <div>
                      <Label htmlFor="contact-number">Contact number</Label>
                      <Input
                        id="contact-number"
                        value={newUser.contactNumber}
                        onChange={(e) =>
                          
                         setNewUser({ ...newUser, contactNumber: e.target.value })
                        }
                      />
                    </div>
        
                    <div className='h-14'>
        
                    </div>
                    <div className="flex justify-end space-x-2 border-t-2 pt-4">
                      <Button
                        variant="outline"
                        onClick={() => setIsAddDialogOpen(false)}
                      >
                        Cancel
                      </Button>
                      <Button 
                      className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2"
                      onClick={handleSaveNew}>save</Button>
                    </div>
                  </div>
                </DialogContent>
              </Dialog>

      </CardContent>

    </Card>
  );
}
