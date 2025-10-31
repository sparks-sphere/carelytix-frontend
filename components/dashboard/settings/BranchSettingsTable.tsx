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
import {
  Search,
  Plus,
  ChevronLeft,
  ChevronRight,
  Edit,
  Trash2,
  CircleX,
  Divide,
} from 'lucide-react';

import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/state/store';
import {
  fetchBranches,
  createBranch,
  updateBranch,
  deleteBranch,
} from '@/state/branch/branch-slice';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';

interface Branch {
  id: string;
  branchCode: string;
  name: string;
  address?: string;
  city?: string;
  pincode?: string;
  contactNo?: string;
  saloonId: string;
}

export default function BranchSettingsTable() {
  const dispatch = useDispatch();
  const { branches, loading, error } = useSelector(
    (state: RootState) => state.branch,
  );
  const {
    salons,
    loading: salonsLoading,
    error: salonsError,
  } = useSelector((state: RootState) => state.salon);

  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(2);
  const [searchTerm, setSearchTerm] = useState('');
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [editingBranch, setEditingBranch] = useState<Branch | null>(null);

  const [newBranch, setNewBranch] = useState({
    branchCode: '',
    name: '',
    address: '',
    city: '',
    pincode: '',
    contactNo: '',
    saloonId: '',
  });

  // Fetch branches on component mount
  useEffect(() => {
    dispatch(fetchBranches());
  }, [dispatch]);

  const handleAdd = () => {
    setIsAddDialogOpen(true);
  };

  const handleEdit = (branch: Branch) => {
    setEditingBranch(branch);
    setIsEditDialogOpen(true);
  };

  const handleDelete = (id: string) => {
    dispatch(deleteBranch({ id }));
  };

  const handleSaveNew = () => {
    dispatch(createBranch({ data: newBranch }));
    setNewBranch({
      branchCode: '',
      name: '',
      address: '',
      city: '',
      pincode: '',
      contactNo: '',
      saloonId: '',
    });
    setIsAddDialogOpen(false);
  };

  const handleSaveEdit = () => {
    if (editingBranch) {
      dispatch(updateBranch({ id: editingBranch.id, data: editingBranch }));
      setEditingBranch(null);
      setIsEditDialogOpen(false);
    }
  };

  const filteredBranches = Array.isArray(branches)
    ? (branches as Branch[]).filter(
        (branch) =>
          branch &&
          branch.name &&
          branch.name.toLowerCase().includes(searchTerm.toLowerCase()),
      )
    : [];

  const totalPages = Math.ceil(filteredBranches.length / rowsPerPage);
  const startIndex = (currentPage - 1) * rowsPerPage;
  const endIndex = startIndex + rowsPerPage;
  const currentBranches = filteredBranches.slice(startIndex, endIndex);

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
    <Card className=" bg-white rounded-lg border border-gray-200 shadow-sm">
      <CardContent className="p-6">
        {/* {error && (
          <div className="mb-4 p-3 bg-red-100 border border-red-300 text-red-700 rounded-md">
            {error}
          </div>
        )} */}
        <div className="flex flex-col mb-6">
          <h3 className="text-xl font-semibold text-gray-900">Branch</h3>
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
              disabled={loading}
              className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 disabled:opacity-50"
            >
              <Plus className="mr-2 h-4 w-4" />
              {loading ? 'Loading...' : 'Add Branch'}
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
                  Branch Code
                </TableHead>
                <TableHead className="text-gray-700 font-semibold px-6 py-4">
                  Branch Name
                </TableHead>
                <TableHead className="text-gray-700 font-semibold px-6 py-4">
                  Address
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
              {currentBranches.map((branch, index) =>
                branch ? (
                  <TableRow
                    key={branch.id || index}
                    className="hover:bg-gray-50 border-b border-gray-100"
                  >
                    <TableCell className="px-6 py-4 text-gray-600">
                      {String(startIndex + index + 1).padStart(2, '0')}
                    </TableCell>
                    <TableCell className="px-6 py-4 text-gray-900">
                      {branch?.branchCode || 'N/A'}
                    </TableCell>
                    <TableCell className="px-6 py-4 text-gray-900">
                      {branch?.name || 'N/A'}
                    </TableCell>
                    <TableCell className="px-6 py-4 text-gray-600">
                      {branch?.address || 'N/A'}
                    </TableCell>
                    <TableCell className="px-6 py-4 text-gray-600">
                      {branch?.contactNo || 'N/A'}
                    </TableCell>

                    <TableCell className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <button
                          className="p-2 hover:bg-blue-100 rounded-full transition-colors disabled:opacity-50"
                          onClick={() => branch && handleEdit(branch as Branch)}
                          disabled={loading || !branch}
                        >
                          <Edit className="w-4 h-4 text-blue-500" />
                        </button>
                        <button
                          className="p-2 hover:bg-red-100 rounded-full transition-colors disabled:opacity-50"
                          onClick={() => handleDelete(branch?.id || '')}
                          disabled={loading}
                        >
                          <Trash2 className="w-4 h-4 text-red-500" />
                        </button>
                      </div>
                    </TableCell>
                  </TableRow>
                ) : null,
              )}
            </TableBody>
          </Table>
        </div>

        {/* ... existing pagination code ... */}
        <div className="flex items-center justify-between mt-6">
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <span>Rows per page</span>
            <Select
              value={rowsPerPage.toString()}
              onValueChange={(value) => {
                setRowsPerPage(Number.parseInt(value));
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
              onClick={() => setCurrentPage(currentPage - 1)}
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
                onClick={() => setCurrentPage(page)}
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
              onClick={() => setCurrentPage(currentPage + 1)}
              disabled={currentPage === totalPages}
              className="text-gray-600 hover:text-gray-900 bg-[#F3E8FF]"
            >
              Next
              <ChevronRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </div>

        {/* dialogs */}

        <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Create Branch</DialogTitle>
              {/* <CircleX
                onClick={() => setIsAddDialogOpen(false)}
                className="absolute right-6 top-6 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
              /> */}
            </DialogHeader>

            <div className="space-y-6 p-6">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label
                    className="text-sm font-medium text-gray-700"
                    htmlFor="salon-id"
                  >
                    Salon ID *
                  </Label>
                  <Select
                    value={newBranch.saloonId}
                    onValueChange={(value) =>
                      setNewBranch({ ...newBranch, saloonId: value })
                    }
                  >
                    <SelectTrigger className="w-[180px]">
                      <SelectValue placeholder="Select a salon" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        <SelectLabel>Salons</SelectLabel>
                        {salons.map((salon) => (
                          <SelectItem key={salon.id} value={salon.id}>
                            {salon.id?.split('-')[0]}... | {salon.name}
                          </SelectItem>
                        ))}
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label
                    className="text-sm font-medium text-gray-700"
                    htmlFor="branch-code"
                  >
                    Branch Code *
                  </Label>
                  <Input
                    id="branch-code"
                    value={newBranch.branchCode}
                    onChange={(e) =>
                      setNewBranch({ ...newBranch, branchCode: e.target.value })
                    }
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label
                  className="text-sm font-medium text-gray-700"
                  htmlFor="branch-name"
                >
                  Branch Name *
                </Label>
                <Input
                  id="branch-name"
                  value={newBranch.name}
                  onChange={(e) =>
                    setNewBranch({ ...newBranch, name: e.target.value })
                  }
                  required
                />
              </div>

              <div className="space-y-2">
                <Label
                  className="text-sm font-medium text-gray-700"
                  htmlFor="address"
                >
                  Address
                </Label>
                <Input
                  id="address"
                  value={newBranch.address}
                  onChange={(e) =>
                    setNewBranch({ ...newBranch, address: e.target.value })
                  }
                />
              </div>

              <div className="grid grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label
                    className="text-sm font-medium text-gray-700"
                    htmlFor="city"
                  >
                    City
                  </Label>
                  <Input
                    id="city"
                    value={newBranch.city}
                    onChange={(e) =>
                      setNewBranch({ ...newBranch, city: e.target.value })
                    }
                  />
                </div>
                <div className="space-y-2">
                  <Label
                    className="text-sm font-medium text-gray-700"
                    htmlFor="pincode"
                  >
                    Pincode
                  </Label>
                  <Input
                    id="pincode"
                    value={newBranch.pincode}
                    onChange={(e) =>
                      setNewBranch({ ...newBranch, pincode: e.target.value })
                    }
                  />
                </div>
                <div className="space-y-2">
                  <Label
                    className="text-sm font-medium text-gray-700"
                    htmlFor="contact"
                  >
                    Contact Number
                  </Label>
                  <Input
                    id="contact"
                    value={newBranch.contactNo}
                    onChange={(e) =>
                      setNewBranch({ ...newBranch, contactNo: e.target.value })
                    }
                  />
                </div>
              </div>

              <div className="flex justify-end space-x-2 border-t-2 pt-4">
                <Button
                  variant="outline"
                  onClick={() => setIsAddDialogOpen(false)}
                >
                  Cancel
                </Button>
                <Button
                  className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 disabled:opacity-50"
                  onClick={handleSaveNew}
                  disabled={loading}
                >
                  {loading ? 'Saving...' : 'Save'}
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>

        <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Edit Branch</DialogTitle>
              <CircleX
                onClick={() => setIsEditDialogOpen(false)}
                className="absolute right-6 top-6 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
              />
            </DialogHeader>

            {editingBranch && (
              <div className="space-y-6 p-6">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label
                      className="text-sm font-medium text-gray-700"
                      htmlFor="edit-salon-id"
                    >
                      Salon ID *
                    </Label>
                    <Select
                      value={newBranch.saloonId}
                      onValueChange={(value) =>
                        setEditingBranch({ ...editingBranch, saloonId: value })
                      }
                    >
                      <SelectTrigger className="w-[180px]">
                        <SelectValue placeholder="Select a salon" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectGroup>
                          <SelectLabel>Salons</SelectLabel>
                          {salons.map((salon) => (
                            <SelectItem key={salon.id} value={salon.id}>
                              {salon.id?.split('-')[0]}... | {salon.name}
                            </SelectItem>
                          ))}
                        </SelectGroup>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label
                      className="text-sm font-medium text-gray-700"
                      htmlFor="edit-branch-code"
                    >
                      Branch Code *
                    </Label>
                    <Input
                      id="edit-branch-code"
                      value={editingBranch.branchCode}
                      onChange={(e) =>
                        setEditingBranch({
                          ...editingBranch,
                          branchCode: e.target.value,
                        })
                      }
                      required
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label
                    className="text-sm font-medium text-gray-700"
                    htmlFor="edit-branch-name"
                  >
                    Branch Name *
                  </Label>
                  <Input
                    id="edit-branch-name"
                    value={editingBranch.name}
                    onChange={(e) =>
                      setEditingBranch({
                        ...editingBranch,
                        name: e.target.value,
                      })
                    }
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label
                    className="text-sm font-medium text-gray-700"
                    htmlFor="edit-address"
                  >
                    Address
                  </Label>
                  <Input
                    id="edit-address"
                    value={editingBranch.address || ''}
                    onChange={(e) =>
                      setEditingBranch({
                        ...editingBranch,
                        address: e.target.value,
                      })
                    }
                  />
                </div>

                <div className="grid grid-cols-3 gap-4">
                  <div className="space-y-2">
                    <Label
                      className="text-sm font-medium text-gray-700"
                      htmlFor="edit-city"
                    >
                      City
                    </Label>
                    <Input
                      id="edit-city"
                      value={editingBranch.city || ''}
                      onChange={(e) =>
                        setEditingBranch({
                          ...editingBranch,
                          city: e.target.value,
                        })
                      }
                    />
                  </div>
                  <div className="space-y-2">
                    <Label
                      className="text-sm font-medium text-gray-700"
                      htmlFor="edit-pincode"
                    >
                      Pincode
                    </Label>
                    <Input
                      id="edit-pincode"
                      value={editingBranch.pincode || ''}
                      onChange={(e) =>
                        setEditingBranch({
                          ...editingBranch,
                          pincode: e.target.value,
                        })
                      }
                    />
                  </div>
                  <div className="space-y-2">
                    <Label
                      className="text-sm font-medium text-gray-700"
                      htmlFor="edit-contact"
                    >
                      Contact Number
                    </Label>
                    <Input
                      id="edit-contact"
                      value={editingBranch.contactNo || ''}
                      onChange={(e) =>
                        setEditingBranch({
                          ...editingBranch,
                          contactNo: e.target.value,
                        })
                      }
                    />
                  </div>
                </div>

                <div className="flex justify-end space-x-2 border-t-2 pt-4">
                  <Button
                    variant="outline"
                    onClick={() => setIsEditDialogOpen(false)}
                  >
                    Cancel
                  </Button>
                  <Button
                    className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 disabled:opacity-50"
                    onClick={handleSaveEdit}
                    disabled={loading}
                  >
                    {loading ? 'Updating...' : 'Update'}
                  </Button>
                </div>
              </div>
            )}
          </DialogContent>
        </Dialog>
      </CardContent>
    </Card>
  );
}
