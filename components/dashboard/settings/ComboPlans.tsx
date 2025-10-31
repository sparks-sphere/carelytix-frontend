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
import { Description } from '@radix-ui/react-toast';

interface ComboPlan {
  id: string;
  Name: string;
  services: string;
  duration: string;
  stylist: string;
  productsRequired:string;
  basePrice:number;
}

const allComboPlans: ComboPlan[] = [
  {
    id: '1',
    Name: 'Elegance Beauty Salon',
    services: 'ertyuiiuyt',
    duration: '15/01/2015',
    stylist: '1234567890',
    productsRequired:'dytdwuqfu',
    basePrice:650
  },
  {
    id: '2',
     Name: 'Elegance Beauty Salon',
    services: 'ertyuiiuyt',
    duration: '15/01/2015',
    stylist: '1234567890',
    productsRequired:'dytdwuqfu',
    basePrice:650
  },
  {
    id: '3',
    Name: 'Elegance Beauty Salon',
    services: 'ertyuiiuyt',
    duration: '15/01/2015',
    stylist: '1234567890',
    productsRequired:'dytdwuqfu',
    basePrice:650
  },
  {
    id: '4',
     Name: 'Elegance Beauty Salon',
    services: 'ertyuiiuyt',
    duration: '15/01/2015',
    stylist: '1234567890',
    productsRequired:'dytdwuqfu',
    basePrice:650
  },
  {
    id: '5',
     Name: 'Elegance Beauty Salon',
    services: 'ertyuiiuyt',
    duration: '15/01/2015',
    stylist: '1234567890',
    productsRequired:'dytdwuqfu',
    basePrice:650
  },
  {
    id: '6',
     Name: 'Elegance Beauty Salon',
    services: 'ertyuiiuyt',
    duration: '15/01/2015',
    stylist: '1234567890',
    productsRequired:'dytdwuqfu',
    basePrice:650
  },
  {
    id: '7',
     Name: 'Elegance Beauty Salon',
    services: 'ertyuiiuyt',
    duration: '15/01/2015',
    stylist: '1234567890',
    productsRequired:'dytdwuqfu',
    basePrice:650
  },
  {
    id: '8',
     Name: 'Elegance Beauty Salon',
    services: 'ertyuiiuyt',
    duration: '15/01/2015',
    stylist: '1234567890',
    productsRequired:'dytdwuqfu',
    basePrice:650
  },
  {
    id: '9',
     Name: 'Elegance Beauty Salon',
    services: 'ertyuiiuyt',
    duration: '15/01/2015',
    stylist: '1234567890',
    productsRequired:'dytdwuqfu',
    basePrice:650
  },
  {
    id: '10',
    Name: 'Elegance Beauty Salon',
    services: 'ertyuiiuyt',
    duration: '15/01/2015',
    stylist: '1234567890',
    productsRequired:'dytdwuqfu',
    basePrice:650
  },
];

export default function ComboPlanSettingsTable() {
  const [comboPlan,setComboPlan]=useState(allComboPlans)
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(2);
  const [searchTerm, setSearchTerm] = useState('');
 
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
   const [newComboPlan, setNewComboPlan] = useState({
     Name: '',
    services: '',
    duration: '',
    stylist: '',
    productsRequired:'',
    basePrice: 0
  });

   const handleSaveNew = () => {
    const id: string = (Math.max(...comboPlan.map(B => Number(B.id))) + 1).toString();

    setComboPlan([...comboPlan, { ...newComboPlan, id}]);
 
   

    setNewComboPlan({ Name: '',  services:'', duration: '', stylist: '' ,productsRequired:'',basePrice:0});
   
    setIsAddDialogOpen(false);
  };

  const handleAdd = () => {
    setIsAddDialogOpen(true);
  };



  const filteredComboPlans = allComboPlans.filter((comboPlan) =>
    comboPlan.Name.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  const totalPages = Math.ceil(filteredComboPlans.length / rowsPerPage);
  const startIndex = (currentPage - 1) * rowsPerPage;
  const endIndex = startIndex + rowsPerPage;
  const currentComboPlan = filteredComboPlans.slice(startIndex, endIndex);

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
          <h3 className="text-xl font-semibold text-gray-900">Combo Plans</h3>
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
              Add Combo Plan
            </Button>
          </div>
        </div>

        <div className="rounded-lg overflow-hidden border border-gray-200">
          <Table>
            <TableHeader>
              <TableRow className="bg-purple-100 hover:bg-purple-100" >
                <TableHead className="text-gray-700 font-semibold px-6 py-4">
                  Sl.No
                </TableHead>
                <TableHead className="text-gray-700 font-semibold px-6 py-4">
                  Combo Name
                </TableHead>
                <TableHead className="text-gray-700 font-semibold px-6 py-4">
                  Services
                </TableHead>
                <TableHead className="text-gray-700 font-semibold px-6 py-4">
                  Duration
                </TableHead>
                <TableHead className="text-gray-700 font-semibold px-6 py-4">
                  Stylist
                </TableHead>
                <TableHead className="text-gray-700 font-semibold px-6 py-4">
                  Products Required
                </TableHead>
                 <TableHead className="text-gray-700 font-semibold px-6 py-4">
                  Base Price
                </TableHead>
                <TableHead className="text-gray-700 font-semibold px-6 py-4">
                  Action
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {currentComboPlan.map((comboPlan, index) => (
                <TableRow
                  key={comboPlan.id}
                  className="hover:bg-gray-50 border-b border-gray-100"
                >
                  <TableCell className="px-6 py-4 text-gray-600">
                    {String(startIndex + index + 1).padStart(2, '0')}
                  </TableCell>
                  <TableCell className="px-6 py-4 text-gray-900">
                    {comboPlan.Name}
                  </TableCell>
                  <TableCell className="px-6 py-4 text-gray-600">
                    {comboPlan.services}
                  </TableCell>
                  <TableCell className="px-6 py-4 text-gray-600">
                    {comboPlan.duration}
                  </TableCell>
                  <TableCell className="px-6 py-4 text-gray-600">
                    {comboPlan.stylist}
                  </TableCell>
                   <TableCell className="px-6 py-4 text-gray-600">
                    {comboPlan.productsRequired}
                  </TableCell>
                   <TableCell className="px-6 py-4 text-gray-600">
                    {comboPlan.basePrice}
                  </TableCell>
                  <TableCell className="px-6 py-4">
                    <button
                      className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                      onClick={() => console.log('Action', comboPlan.id)}
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
                           
                            >Create Combo Plan</DialogTitle>
                            
                             <CircleX 
                             onClick={() => setIsAddDialogOpen(false)}
                             className="absolute right-6 top-6 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
                             />
                            
                          </DialogHeader>
                
                
                          <div className="space-y-6 p-6">
                            <div className="grid grid-cols-3 gap-4">
                
                            <div className="space-y-2" >
                              <Label
                              className=" text-sm font-medium text-gray-700">Name</Label>
                              <Input 
                                id="new-name"
                                value={newComboPlan.Name}
                                onChange={(e) =>
                                  setNewComboPlan({ ...newComboPlan, Name: e.target.value })
                                } 
                                />
                            </div>
                            <div className="space-y-2" >
                              <Label
                              className="text-sm font-medium text-gray-700"
                              htmlFor="new-name">Services</Label>
                              <select className="w-full border rounded px-2 py-1">
                                    <option>Select Service </option>
                                </select>
                              <Input className="hidden"
                                id="new-name"
                                value={newComboPlan.services}
                                onChange={(e) =>
                                  setNewComboPlan({ ...newComboPlan, services: e.target.value })
                                }
                                />
                            </div>
                            <div className='space-y-2'>
                              <Label 
                              className="text-sm font-medium text-gray-700"
                              htmlFor="Branch-Manager">Duration</Label>
                              <select className="w-full border rounded px-2 py-1">
                                    <option>Select Duration </option>
                                </select>
                              <Input className="hidden"
                                id="Branch-Manager"
                                value={newComboPlan.duration}
                                onChange={(e) =>
                                  setNewComboPlan({ ...newComboPlan, duration: e.target.value })
                                }
                                />
                            </div>
                          </div>

                          <div className="grid grid-cols-2 gap-4">
                              <div className='space-y-2'>
                              <Label htmlFor="contact-number">Stylist</Label>
                              <select className="w-full border rounded px-2 py-1">
                                    <option>Select Stylist</option>
                                </select>
                              <Input className="hidden"
                                id="contact-number"
                                value={newComboPlan.stylist}
                                onChange={(e) =>
                                  
                                 setNewComboPlan({ ...newComboPlan, stylist: e.target.value })
                                }
                              />
                            </div>
                            <div className='space-y-2'>
                              <Label htmlFor="contact-number">Products Required</Label>
                              <select className="w-full border rounded px-2 py-1">
                                    <option>Select Requirement</option>
                                </select>
                              <Input className="hidden"
                                id="contact-number"
                                value={newComboPlan.productsRequired}
                                onChange={(e) =>
                                  
                                 setNewComboPlan({ ...newComboPlan, productsRequired: e.target.value })
                                }
                              />
                            </div>
                          </div>

                          <div className='space-y-2'>
                              <Label htmlFor="price">Base Price</Label>
                              <select className="w-full border rounded px-2 py-1">
                                    <option>Select Price</option>
                                </select>
                              <Input className = "hidden"
                                id="price"
                                value={newComboPlan.basePrice}
                                onChange={(e) =>
                                  
                                 setNewComboPlan({ ...newComboPlan, basePrice: Number(e.target.value) })
                                }
                              />
                            </div>
                            <div className="space-y-2" >
                              <Label
                              className="text-sm font-medium text-gray-700"
                              htmlFor="new-name">Description</Label>
                              <Input
                                id="new-name"
                                value={newComboPlan.description}
                                onChange={(e) =>
                                  setNewComboPlan({ ...newComboPlan, description: e.target.value })
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
                              onClick={handleSaveNew}>Save</Button>
                            </div>
                          </div>
                        </DialogContent>
                      </Dialog>
        
      </CardContent>
    </Card>
  );
}
