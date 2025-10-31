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
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '../../Dialog';
import {
  MoreHorizontal,
  MoreVertical,
  Search,
  Plus,
  ChevronLeft,
  ChevronRight,
  CircleX,
} from 'lucide-react';
import { useState } from 'react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

interface Booking {
  SlNo: string;
  bookingId: string;
  customerName: string;
  dateOfBooking: string;
  bookingSlot: string;
  bookingStatus: string;
  services: string;
}

const allBookings: Booking[] = [
  {
    SlNo: '1',
    bookingId: '1233455',
    customerName: 'xxxxxxx xxxxxxx',
    dateOfBooking: 'DD/MM/YY',
    bookingSlot: '03:00 PM',
    bookingStatus: 'Completed',
    services: 'Haircut,Spa,...',
  },
  {
    SlNo: '1',
    bookingId: '1233455',
    customerName: 'xxxxxxx xxxxxxx',
    dateOfBooking: 'DD/MM/YY',
    bookingSlot: '03:00 PM',
    bookingStatus: 'Completed',
    services: 'Haircut,Spa,...',
  },
  {
    SlNo: '1',
    bookingId: '1233455',
    customerName: 'xxxxxxx xxxxxxx',
    dateOfBooking: 'DD/MM/YY',
    bookingSlot: '03:00 PM',
    bookingStatus: 'Completed',
    services: 'Haircut,Spa,...',
  },
  {
    SlNo: '1',
    bookingId: '1233455',
    customerName: 'xxxxxxx xxxxxxx',
    dateOfBooking: 'DD/MM/YY',
    bookingSlot: '03:00 PM',
    bookingStatus: 'Completed',
    services: 'Haircut,Spa,...',
  },
  {
    SlNo: '1',
    bookingId: '1233455',
    customerName: 'xxxxxxx xxxxxxx',
    dateOfBooking: 'DD/MM/YY',
    bookingSlot: '03:00 PM',
    bookingStatus: 'Completed',
    services: 'Haircut,Spa,...',
  },
  {
    SlNo: '1',
    bookingId: '1233455',
    customerName: 'xxxxxxx xxxxxxx',
    dateOfBooking: 'DD/MM/YY',
    bookingSlot: '03:00 PM',
    bookingStatus: 'Completed',
    services: 'Haircut,Spa,...',
  },
  {
    SlNo: '1',
    bookingId: '1233455',
    customerName: 'xxxxxxx xxxxxxx',
    dateOfBooking: 'DD/MM/YY',
    bookingSlot: '03:00 PM',
    bookingStatus: 'Completed',
    services: 'Haircut,Spa,...',
  },
  {
    SlNo: '1',
    bookingId: '1233455',
    customerName: 'xxxxxxx xxxxxxx',
    dateOfBooking: 'DD/MM/YY',
    bookingSlot: '03:00 PM',
    bookingStatus: 'Completed',
    services: 'Haircut,Spa,...',
  },
  {
    SlNo: '1',
    bookingId: '1233455',
    customerName: 'xxxxxxx xxxxxxx',
    dateOfBooking: 'DD/MM/YY',
    bookingSlot: '03:00 PM',
    bookingStatus: 'Completed',
    services: 'Haircut,Spa,...',
  },
  {
    SlNo: '1',
    bookingId: '1233455',
    customerName: 'xxxxxxx xxxxxxx',
    dateOfBooking: 'DD/MM/YY',
    bookingSlot: '03:00 PM',
    bookingStatus: 'Completed',
    services: 'Haircut,Spa,...',
  },
];

export default function BookingsTable() {
  const [booking, setBooking] = useState(allBookings);
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(2);
  const [searchTerm, setSearchTerm] = useState('');

  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [newBooking, setNewBooking] = useState({
    bookingId: '',
    customerName: '',
    dateOfBooking: '',
    bookingSlot: '',
    bookingStatus: '',
    services: '',
  });

  const handleSaveNew = () => {
    const nextSlNo = (
      booking.length > 0
        ? Math.max(...booking.map((B) => Number(B.SlNo))) + 1
        : 1
    ).toString();

    setBooking([...booking, { ...newBooking, SlNo: nextSlNo }]);

    setNewBooking({
      bookingId: '',
      customerName: '',
      dateOfBooking: '',
      bookingSlot: '',
      bookingStatus: '',
      services: '',
    });

    setIsAddDialogOpen(false);
  };

  const handleAdd = () => {
    setIsAddDialogOpen(true);
  };

  const filteredServices = allBookings.filter((booking) =>
    booking.bookingId.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  const totalPages = Math.ceil(filteredServices.length / rowsPerPage);
  const startIndex = (currentPage - 1) * rowsPerPage;
  const endIndex = startIndex + rowsPerPage;
  const currentBooking = filteredServices.slice(startIndex, endIndex);

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
          <h3 className="text-xl font-semibold text-gray-900">Booking</h3>
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
              className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2"
            >
              <Plus className="mr-2 h-4 w-4" />
              Add Booking
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
                  Booking ID
                </TableHead>
                <TableHead className="text-gray-700 font-semibold px-6 py-4">
                  Customer Name
                </TableHead>
                <TableHead className="text-gray-700 font-semibold px-6 py-4">
                  Date of booking
                </TableHead>
                <TableHead className="text-gray-700 font-semibold px-6 py-4">
                  Booking Slot
                </TableHead>
                <TableHead className="text-gray-700 font-semibold px-6 py-4">
                  Booking Status
                </TableHead>
                <TableHead className="text-gray-700 font-semibold px-6 py-4">
                  Service
                </TableHead>
                <TableHead className="text-gray-700 font-semibold px-6 py-4">
                  Action
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {currentBooking.map((booking, index) => (
                <TableRow
                  key={booking.SlNo}
                  className="hover:bg-gray-50 border-b border-gray-100"
                >
                  <TableCell className="px-6 py-4 text-gray-600">
                    {String(startIndex + index + 1).padStart(2, '0')}
                  </TableCell>
                  <TableCell className="px-6 py-4 text-gray-900">
                    {booking.bookingId}
                  </TableCell>
                  <TableCell className="px-6 py-4 text-gray-600">
                    {booking.customerName}
                  </TableCell>
                  <TableCell className="px-6 py-4 text-gray-600">
                    {booking.dateOfBooking}
                  </TableCell>
                  <TableCell className="px-6 py-4 text-gray-600">
                    {booking.bookingSlot}
                  </TableCell>
                  <TableCell className="px-6 py-4 text-gray-600">
                    {booking.bookingStatus}
                  </TableCell>
                  <TableCell className="px-6 py-4 text-gray-600">
                    {booking.services}
                  </TableCell>
                  <TableCell className="px-6 py-4">
                    <button
                      className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                      onClick={() => console.log('Action', booking)}
                    >
                      <MoreVertical className="h-4 w-4 text-gray-500" />
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

        <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Create Booking</DialogTitle>

              <CircleX
                onClick={() => setIsAddDialogOpen(false)}
                className="absolute right-6 top-6 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
              />
            </DialogHeader>

            <div className="space-y-6 p-6">
              <div className="grid grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label
                    className="text-sm font-medium text-gray-700"
                    htmlFor="Branch-code"
                  >
                    Customer Name
                  </Label>
                  <select className="w-full border rounded px-2 py-1">
                    <option>Type and select Customer name</option>
                  </select>
                  <Input
                    className="hidden"
                    id="Branch-code"
                    value={newBooking.customerName}
                    onChange={(e) =>
                      setNewBooking({
                        ...newBooking,
                        customerName: e.target.value,
                      })
                    }
                  />
                </div>
                <div className="space-y-2">
                  <Label
                    className="text-sm font-medium text-gray-700"
                    htmlFor="Branch-Manager"
                  >
                    Date Of Booking
                  </Label>
                  <input
                    type="date"
                    className="w-full border rounded px-3 py-2 focus:outline-none focus:ring focus:ring-indigo-200"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="contact-number">Booking Slot</Label>
                  <select className="w-full border rounded px-2 py-1">
                    <option>Select slot</option>
                  </select>
                  <Input
                    className="hidden"
                    id="contact-number"
                    value={newBooking.bookingSlot}
                    onChange={(e) =>
                      setNewBooking({
                        ...newBooking,
                        bookingSlot: e.target.value,
                      })
                    }
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="contact-number">Booking Status</Label>
                  <select className="w-full border rounded px-2 py-1">
                    <option>Select status</option>
                  </select>
                  <Input
                    className="hidden"
                    id="contact-number"
                    value={newBooking.bookingStatus}
                    onChange={(e) =>
                      setNewBooking({
                        ...newBooking,
                        bookingStatus: e.target.value,
                      })
                    }
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="price"> Services</Label>
                <select className="w-full border rounded px-2 py-1">
                  <option>Select state</option>
                </select>
                <Input
                  className="hidden"
                  id="price"
                  value={newBooking.services}
                  onChange={(e) =>
                    setNewBooking({ ...newBooking, services: e.target.value })
                  }
                />
              </div>

              <div className="h-14"></div>
              <div className="flex justify-end space-x-2 border-t-2 pt-4">
                <Button
                  variant="outline"
                  onClick={() => setIsAddDialogOpen(false)}
                >
                  Cancel
                </Button>
                <Button
                  className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2"
                  onClick={handleSaveNew}
                >
                  Save
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </CardContent>
    </Card>
  );
}
