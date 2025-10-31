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
  MoreVertical,
  Search,
  Plus,
  ChevronLeft,
  ChevronRight,
  CircleX
} from 'lucide-react';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Description } from '@radix-ui/react-toast';
import Datepicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { type RootState, type AppDispatch } from '@/state/store';
import { fetchStaffs, createStaff, createStaffSuccess, updateStaff, updateStaffSuccess, deleteStaff, deleteStaffSuccess } from '@/state/staff/staff-slice';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';

interface Service {
  id: string;
  Employee_Name: string;
  First_Name: string;
  Last_Name: string;
  Job_Title: string;
  Job_Role: string;
  branch: string;
  Date: string;
  contact: number;
}

const allServices: Service[] = [
  {
    id: '01',
    Employee_Name: 'xxxxxxxx xxxxx',
    First_Name:'',
    Last_Name: '',
    Job_Title: 'xxxxxxxxxx',
    Job_Role: 'xxxxxxxxxxx',
    branch: 'xxxxxxxxxx',
    Date: 'DD/MM/YYYY',
    contact: 1234567890
  },
  {
    id: '01',
    Employee_Name: 'xxxxxxxx xxxxx',
    First_Name:'',
    Last_Name: '',
    Job_Title: 'xxxxxxxxxx',
    Job_Role: 'xxxxxxxxxxx',
    branch: 'xxxxxxxxxx',
    Date: 'DD/MM/YYYY',
    contact: 1234567890
  },
  {
    id: '01',
    Employee_Name: 'xxxxxxxx xxxxx',
    First_Name:'',
    Last_Name: '',
    Job_Title: 'xxxxxxxxxx',
    Job_Role: 'xxxxxxxxxxx',
    branch: 'xxxxxxxxxx',
    Date: 'DD/MM/YYYY',
    contact: 1234567890
  },
  {
    id: '01',
    Employee_Name: 'xxxxxxxx xxxxx',
    First_Name:'',
    Last_Name: '',
    Job_Title: 'xxxxxxxxxx',
    Job_Role: 'xxxxxxxxxxx',
    branch: 'xxxxxxxxxx',
    Date: 'DD/MM/YYYY',
    contact: 1234567890
  },
  {
    id: '01',
    Employee_Name: 'xxxxxxxx xxxxx',
    First_Name:'',
    Last_Name: '',
    Job_Title: 'xxxxxxxxxx',
    Job_Role: 'xxxxxxxxxxx',
    branch: 'xxxxxxxxxx',
    Date: 'DD/MM/YYYY',
    contact: 1234567890
  },
  {
    id: '01',
    Employee_Name: 'xxxxxxxx xxxxx',
    First_Name:'',
    Last_Name: '',
    Job_Title: 'xxxxxxxxxx',
    Job_Role: 'xxxxxxxxxxx',
    branch: 'xxxxxxxxxx',
    Date: 'DD/MM/YYYY',
    contact: 1234567890
  },
  {
    id: '01',
    Employee_Name: 'xxxxxxxx xxxxx',
    First_Name:'',
    Last_Name: '',
    Job_Title: 'xxxxxxxxxx',
    Job_Role: 'xxxxxxxxxxx',
    branch: 'xxxxxxxxxx',
    Date: 'DD/MM/YYYY',
    contact: 1234567890
  },
  {
    id: '01',
    Employee_Name: 'xxxxxxxx xxxxx',
    First_Name:'',
    Last_Name: '',
    Job_Title: 'xxxxxxxxxx',
    Job_Role: 'xxxxxxxxxxx',
    branch: 'xxxxxxxxxx',
    Date: 'DD/MM/YYYY',
    contact: 1234567890
  },
  {
    id: '01',
    Employee_Name: 'xxxxxxxx xxxxx',
    First_Name:'',
    Last_Name: '',
    Job_Title: 'xxxxxxxxxx',
    Job_Role: 'xxxxxxxxxxx',
    branch: 'xxxxxxxxxx',
    Date: 'DD/MM/YYYY',
    contact: 1234567890
  },
  {
    id: '01',
    Employee_Name: 'xxxxxxxx xxxxx',
    First_Name:'',
    Last_Name: '',
    Job_Title: 'xxxxxxxxxx',
    Job_Role: 'xxxxxxxxxxx',
    branch: 'xxxxxxxxxx',
    Date: 'DD/MM/YYYY',
    contact: 1234567890
  },
];

export default function StaffSettingsTable() {
  const dispatch = useDispatch<AppDispatch>();
  const { staffs } = useSelector((state: RootState) => state.staff);
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(2);
  const [searchTerm, setSearchTerm] = useState('');
 
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  // Edit dialog open state and currently editing staff
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [editingStaff, setEditingStaff] = useState<any | null>(null);
   const [newService, setNewService] = useState({
    Employee_Name: '',
    First_Name: '',
    Last_Name: '',
    Job_Title: '',
    Job_Role: '',
    branch: '',
    Date: '',
    contact: '',
    address: '',
    state: '',
    city: '',
    pin: ''
  });

  useEffect(() => {
    dispatch(fetchStaffs());
  }, [dispatch]);

   const handleSaveNew = () => {
    const maxId = Math.max(0, ...staffs.map((s: any) => Number(s?.id) || 0));
    const newId = String(maxId + 1);
    const payload = {
      ...newService,
      id: newId,
      Employee_Name: newService.Employee_Name || `${newService.First_Name} ${newService.Last_Name}`.trim(),
    };
    // Optimistic UI add so it reflects immediately
    dispatch(createStaffSuccess(payload as any));
    // Trigger saga/API with expected payload shape { data }
    dispatch(createStaff({ data: payload } as any));
    setNewService({ Employee_Name: '', First_Name: '', Last_Name: '' ,Job_Title: '', Job_Role:'', branch: '', Date: '' ,contact: '', address: '', state: '', city: '', pin: ''});
    setIsAddDialogOpen(false);
  };

  const handleAdd = () => {
    setIsAddDialogOpen(true);
  };

  // Open Edit dialog with selected staff values
  const handleEdit = (staff: any) => {
    setEditingStaff({ ...staff });
    setIsEditDialogOpen(true);
  };

  // Save changes for an existing staff (optimistic update)
  const handleUpdateSave = () => {
    if (!editingStaff) return;
    const payload = {
      ...editingStaff,
      Employee_Name: editingStaff.Employee_Name || `${editingStaff.First_Name ?? ''} ${editingStaff.Last_Name ?? ''}`.trim(),
    };
    // Optimistic UI update so changes reflect immediately
    dispatch(updateStaffSuccess(payload as any));
    // Trigger saga/API with expected payload shape { id, data }
    dispatch(updateStaff({ id: payload.id, data: payload } as any));
    setIsEditDialogOpen(false);
    setEditingStaff(null);
  };

  // Delete a staff member with confirmation (optimistic)
  const handleDelete = (id: string) => {
    if (!id) return;
    if (typeof window !== 'undefined') {
      const ok = window.confirm('Are you sure you want to delete this staff?');
      if (!ok) return;
    }
    // Trigger saga/API with expected payload shape { id }
    dispatch(deleteStaff({ id } as any));
  };



  const filteredServices = (staffs || []).filter((service: any) => {
    const name = (
      service?.Employee_Name ||
      [service?.First_Name, service?.Last_Name].filter(Boolean).join(' ')
    ).toString();
    return name.toLowerCase().includes(searchTerm.toLowerCase());
  });

  const totalPages = Math.ceil(filteredServices.length / rowsPerPage);
  const startIndex = (currentPage - 1) * rowsPerPage;
  const endIndex = startIndex + rowsPerPage;
  const currentServic = filteredServices.slice(startIndex, endIndex);

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
          <h3 className="text-xl font-semibold text-gray-900">Staff</h3>
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
              Add Staff
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
                  Employee Name
                </TableHead>
                <TableHead className="text-gray-700 font-semibold px-6 py-4">
                  Job Title
                </TableHead>
                <TableHead className="text-gray-700 font-semibold px-6 py-4">
                  Job Role
                </TableHead>
                <TableHead className="text-gray-700 font-semibold px-6 py-4">
                  Branch
                </TableHead>
                <TableHead className="text-gray-700 font-semibold px-6 py-4">
                  Date of Joining
                </TableHead>
                 <TableHead className="text-gray-700 font-semibold px-6 py-4">
                  Contact Number
                </TableHead>
                 {/* <TableHead className="text-gray-700 font-semibold px-6 py-4">
                  Base Price
                </TableHead> */}
                <TableHead className="text-gray-700 font-semibold px-6 py-4">
                  Action
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {currentServic.map((service, index) => (
                <TableRow
                  key={service.id}
                  className="hover:bg-gray-50 border-b border-gray-100"
                >
                  <TableCell className="px-6 py-4 text-gray-600">
                    {String(startIndex + index + 1).padStart(2, '0')}
                  </TableCell>
                  <TableCell className="px-6 py-4 text-gray-900">
                    {service.Employee_Name}
                  </TableCell>
                  <TableCell className="px-6 py-4 text-gray-600">
                    {service.Job_Title}
                  </TableCell>
                  <TableCell className="px-6 py-4 text-gray-600">
                    {service.Job_Role}
                  </TableCell>
                  <TableCell className="px-6 py-4 text-gray-600">
                    {service.branch}
                  </TableCell>
                  <TableCell className="px-6 py-4 text-gray-600">
                    {service.Date}
                  </TableCell>
                   <TableCell className="px-6 py-4 text-gray-600">
                    {service.contact}
                  </TableCell>
                   {/* <TableCell className="px-6 py-4 text-gray-600">
                    {service.basePrice}
                  </TableCell> */}
                  <TableCell className="px-6 py-4">
                    {/* Action menu under ":" icon (MoreVertical) */}
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <button
                          className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                          aria-label="Actions"
                        >
                          <MoreVertical />
                        </button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end" className="w-40">
                        <DropdownMenuItem onClick={() => handleEdit(service)}>
                          Edit
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => handleDelete(service.id)} className="text-red-600">
                          Delete
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
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

        {/* Add Staff dialog */}
        < Dialog  open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
                        <DialogContent className="sm:max-w-[700px] max-h-[80vh] overflow-y-auto rounded-lg p-0">
                          <DialogHeader className="bg-purple-100 rounded-t-lg px-6 py-4 flex items-center justify-between">
                            <DialogTitle className="text-lg font-semibold">Create Staff</DialogTitle>
                             <CircleX onClick={() => setIsAddDialogOpen(false)} className="cursor-pointer" />
                          </DialogHeader>
                
                
                          <div className="space-y-6 p-6">
                            <div className="grid grid-cols-3 gap-3">
                
                            <div className="space-y-2" >
                              <Label
                              className="text-sm font-medium text-gray-700"
                              htmlFor="first-name">First Name</Label>
                              <Input
                                id="first-name"
                                value={newService.First_Name}
                                placeholder='Enter your first name'
                                onChange={(e) =>
                                  setNewService({ ...newService, First_Name: e.target.value })
                                }
                                />
                            </div>
                            <div className="space-y-2" >
                              <Label
                              className="text-sm font-medium text-gray-700"
                              htmlFor="last-name">Last Name</Label>
                              <Input
                                id="last-name"
                                value={newService.Last_Name}
                                placeholder='Enter your last name'
                                onChange={(e) =>
                                  setNewService({ ...newService, Last_Name: e.target.value })
                                }
                                />
                            </div>
                            <div className="space-y-2" >
                              <Label className="text-sm font-medium text-gray-700" htmlFor="branch-name">Branch</Label>
                              <Select
                                value={newService.branch}
                                onValueChange={(value) => setNewService({ ...newService, branch: value })}
                              >
                                <SelectTrigger id="branch-name" className="w-full">
                                  <SelectValue placeholder="Select branch name" />
                                </SelectTrigger>
                                <SelectContent>
                                  <SelectItem value="Downtown">Downtown</SelectItem>
                                  <SelectItem value="Uptown">Uptown</SelectItem>
                                  <SelectItem value="Airport">Airport</SelectItem>
                                </SelectContent>
                              </Select>
                            </div>
                            <div className="flex flex-col space-y-2 w-full">
                              <Label
                                 htmlFor="date-code"
                                 className="text-sm font-medium text-gray-700"
                               >
                                 Date of Joining
                              </Label>

                              <Datepicker
                                id="date-code"
                                selected={newService.Date ? new Date(newService.Date) : null}
                                onChange={(date) =>
                                setNewService({
                                 ...newService,
                                Date: date ? date.toISOString().split("T")[0] : "",
                               })
                              }
                               placeholderText="DD-MM-YYYY"
                               dateFormat="dd-MM-yyyy"
                               className="w-full h-10 rounded-md border border-gray-300 px-3 text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                              />
                            </div>

                             <div className="flex flex-col space-y-2 w-full">
                               <Label className="text-sm font-medium text-gray-700" htmlFor="Title-name">Job Title</Label>
                               <Input
                                  id="Title-name"
                                  placeholder='Enter job title'
                                  value={newService.Job_Title}
                                  onChange={(e) => setNewService({ ...newService, Job_Title: e.target.value })}
                                  className="w-full"
                                />
                              </div>

                              <div className="flex flex-col space-y-2 w-full">
                               <Label className="text-sm font-medium text-gray-700" htmlFor="role-name">Role</Label>
                               <Select
                                  value={newService.Job_Role}
                                  onValueChange={(value) => setNewService({ ...newService, Job_Role: value })}
                               >
                                  <SelectTrigger id="role-name" className="w-full">
                                    <SelectValue placeholder="Select role" />
                                  </SelectTrigger>
                                  <SelectContent>
                                    <SelectItem value="Stylist">Stylist</SelectItem>
                                    <SelectItem value="Manager">Manager</SelectItem>
                                    <SelectItem value="Receptionist">Receptionist</SelectItem>
                                  </SelectContent>
                               </Select>
                              </div>
                              
                          </div>

                          <div className="grid grid-cols-3 gap-2">
                            <div className="flex flex-col space-y-2 w-full">
                               <Label 
                                 className="text-sm font-medium text-gray-700"
                                 htmlFor="Branch-Manager"
                                >
                                 Email Address
                                </Label>
                               <Input
                                  id="email-address"
                                  placeholder='Enter Email Address'
                                //   value={newService.Email_Address}
                                //   onChange={(e) =>
                                //   setNewService({ ...newService, Email_Address: e.target.value })
                                // }
                                className="w-full"
                                />
                              </div>
                            <div className="flex flex-col space-y-2 w-full">
                               <Label 
                                 className="text-sm font-medium text-gray-700"
                                 htmlFor="Branch-Manager"
                                >
                                 Password
                                </Label>
                               <Input
                                  id="password"
                                  placeholder='Enter new password'
                                //   value={newService.Password}
                                //   onChange={(e) =>
                                //   setNewService({ ...newService, Password: e.target.value })
                                // }
                                className="w-full"
                                />
                            </div>
                            <div className="flex flex-col space-y-2 w-full">
                               <Label className="text-sm font-medium text-gray-700" htmlFor="contact-number">Contact Number</Label>
                               <Input
                                  id="contact-number"
                                  placeholder='Enter contact number'
                                  value={newService.contact}
                                  onChange={(e) => setNewService({ ...newService, contact: e.target.value })}
                                  className="w-full"
                                />
                            </div>
                          </div>

                          <div className="grid grid-cols-2 gap-2">
                            <div className="flex flex-col space-y-2 w-full">
                               <Label className="text-sm font-medium text-gray-700" htmlFor="address">Address</Label>
                               <Input
                                  id="address"
                                  placeholder='Enter Address'
                                  value={newService.address}
                                  onChange={(e) => setNewService({ ...newService, address: e.target.value })}
                                  className="w-full"
                                />
                              </div>
                            <div className="flex flex-col space-y-2 w-full">
                               <Label className="text-sm font-medium text-gray-700" htmlFor="pin-code">Pin Code</Label>
                               <Input
                                  id="pin-code"
                                  placeholder='Enter pin code'
                                  value={newService.pin}
                                  onChange={(e) => setNewService({ ...newService, pin: e.target.value })}
                                  className="w-full"
                                />
                            </div>
                          </div>
                          <div className="grid grid-cols-2 gap-2">
                            <div className="flex flex-col space-y-2 w-full">
                               <Label className="text-sm font-medium text-gray-700" htmlFor="state">State</Label>
                               <Input
                                  id="state"
                                  placeholder='Enter state'
                                  value={newService.state}
                                  onChange={(e) => setNewService({ ...newService, state: e.target.value })}
                                  className="w-full"
                               />
                            </div>
                            <div className="flex flex-col space-y-2 w-full">
                               <Label className="text-sm font-medium text-gray-700" htmlFor="city">City</Label>
                               <Input
                                  id="city"
                                  placeholder='Enter city'
                                  value={newService.city}
                                  onChange={(e) => setNewService({ ...newService, city: e.target.value })}
                                  className="w-full"
                               />
                            </div>
                          </div>
                            
                           <div className="main-container">
                            <div className="w-full flex justify-end space-x-2 border-t-2 pt-4">
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
                        </div>
                        </DialogContent>
                      </Dialog>

        {/* Edit Staff dialog */}
        <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
          <DialogContent className="sm:max-w-[700px] max-h-[80vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>Edit Staff</DialogTitle>
              <CircleX onClick={() => setIsEditDialogOpen(false)} />
            </DialogHeader>

            <div className="space-y-6 p-6">
              <div className="grid grid-cols-3 gap-3">
                <div className="space-y-2">
                  <Label className="text-sm font-medium text-gray-700" htmlFor="edit-first-name">First Name</Label>
                  <Input
                    id="edit-first-name"
                    value={editingStaff?.First_Name ?? ''}
                    onChange={(e) => setEditingStaff((prev: any) => ({ ...prev, First_Name: e.target.value }))}
                  />
                </div>
                <div className="space-y-2">
                  <Label className="text-sm font-medium text-gray-700" htmlFor="edit-last-name">Last Name</Label>
                  <Input
                    id="edit-last-name"
                    value={editingStaff?.Last_Name ?? ''}
                    onChange={(e) => setEditingStaff((prev: any) => ({ ...prev, Last_Name: e.target.value }))}
                  />
                </div>
                <div className="space-y-2">
                  <Label className="text-sm font-medium text-gray-700" htmlFor="edit-branch">Branch</Label>
                  <Input
                    id="edit-branch"
                    value={editingStaff?.branch ?? ''}
                    onChange={(e) => setEditingStaff((prev: any) => ({ ...prev, branch: e.target.value }))}
                  />
                </div>

                <div className="flex flex-col space-y-2 w-full">
                  <Label htmlFor="edit-date" className="text-sm font-medium text-gray-700">Date of Joining</Label>
                  <Datepicker
                    id="edit-date"
                    selected={editingStaff?.Date ? new Date(editingStaff.Date) : null}
                    onChange={(date) => setEditingStaff((prev: any) => ({ ...prev, Date: date ? date.toISOString().split('T')[0] : '' }))}
                    placeholderText="DD-MM-YYYY"
                    dateFormat="dd-MM-yyyy"
                    className="w-full h-10 rounded-md border border-gray-300 px-3 text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>

                <div className="flex flex-col space-y-2 w-full">
                  <Label className="text-sm font-medium text-gray-700" htmlFor="edit-title">Job Title</Label>
                  <Input
                    id="edit-title"
                    value={editingStaff?.Job_Title ?? ''}
                    onChange={(e) => setEditingStaff((prev: any) => ({ ...prev, Job_Title: e.target.value }))}
                    className="w-full"
                  />
                </div>

                <div className="flex flex-col space-y-2 w-full">
                  <Label className="text-sm font-medium text-gray-700" htmlFor="edit-role">Role</Label>
                  <Input
                    id="edit-role"
                    value={editingStaff?.Job_Role ?? ''}
                    onChange={(e) => setEditingStaff((prev: any) => ({ ...prev, Job_Role: e.target.value }))}
                    className="w-full"
                  />
                </div>
              </div>

              <div className="grid grid-cols-3 gap-2">
                <div className="flex flex-col space-y-2 w-full">
                  <Label className="text-sm font-medium text-gray-700" htmlFor="edit-contact">Contact Number</Label>
                  <Input
                    id="edit-contact"
                    value={editingStaff?.contact ?? ''}
                    onChange={(e) => setEditingStaff((prev: any) => ({ ...prev, contact: e.target.value }))}
                    className="w-full"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div className="flex flex-col space-y-2 w-full">
                  <Label className="text-sm font-medium text-gray-700" htmlFor="edit-address">Address</Label>
                  <Input
                    id="edit-address"
                    value={editingStaff?.address ?? ''}
                    onChange={(e) => setEditingStaff((prev: any) => ({ ...prev, address: e.target.value }))}
                    className="w-full"
                    placeholder="Enter Address"
                  />
                </div>
                <div className="flex flex-col space-y-2 w-full">
                  <Label className="text-sm font-medium text-gray-700" htmlFor="edit-pin">Pin Code</Label>
                  <Input
                    id="edit-pin"
                    value={editingStaff?.pin ?? ''}
                    onChange={(e) => setEditingStaff((prev: any) => ({ ...prev, pin: e.target.value }))}
                    className="w-full"
                    placeholder="Enter pin code"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div className="flex flex-col space-y-2 w-full">
                  <Label className="text-sm font-medium text-gray-700" htmlFor="edit-state">State</Label>
                  <Input
                    id="edit-state"
                    value={editingStaff?.state ?? ''}
                    onChange={(e) => setEditingStaff((prev: any) => ({ ...prev, state: e.target.value }))}
                    className="w-full"
                    placeholder="Enter state"
                  />
                </div>
                <div className="flex flex-col space-y-2 w-full">
                  <Label className="text-sm font-medium text-gray-700" htmlFor="edit-city">City</Label>
                  <Input
                    id="edit-city"
                    value={editingStaff?.city ?? ''}
                    onChange={(e) => setEditingStaff((prev: any) => ({ ...prev, city: e.target.value }))}
                    className="w-full"
                    placeholder="Enter city"
                  />
                </div>
              </div>

              {/* Footer with Cancel / Save buttons for update */}
              <div className="main-container">
                <div className="w-full flex justify-end space-x-2 border-t-2 pt-4">
                  <Button variant="outline" onClick={() => setIsEditDialogOpen(false)}>Cancel</Button>
                  <Button className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2" onClick={handleUpdateSave}>Save Changes</Button>
                </div>
              </div>
            </div>
          </DialogContent>
        </Dialog>

      </CardContent>
    </Card>
  );
}