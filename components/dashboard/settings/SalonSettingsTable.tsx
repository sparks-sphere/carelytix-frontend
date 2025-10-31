'use client';

import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Plus, Loader2 } from 'lucide-react';
import { FiEdit2, FiTrash2 } from 'react-icons/fi';
import { RootState } from '@/state/store';
import {
  fetchSalons,
  createSalon,
  deleteSalon,
} from '@/state/salon/salon-slice';

interface Salon {
  id: string;
  name: string;
  email?: string;
  contactNumber?: string;
  dateOfEstablishment?: string;
}

export default function SalonSettingsTable() {
  const dispatch = useDispatch();
  const { salons, loading, error } = useSelector(
    (state: RootState) => state.salon,
  );
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [salonName, setSalonName] = useState('');
  const [salonEmail, setSalonEmail] = useState('');
  const [salonContact, setSalonContact] = useState('');
  const [salonDate, setSalonDate] = useState('');

  useEffect(() => {
    dispatch(fetchSalons());
  }, [dispatch]);
  console.log('salons', salons);
  const handleAddSalon = () => {
    if (salonName.trim()) {
      const salonData = {
        name: salonName.trim(),
        email: salonEmail.trim(),
        contactNumber: salonContact.trim(),
        dateOfEstablishment: salonDate,
      };

      dispatch(createSalon({ data: salonData }));

      // Reset form
      setSalonName('');
      setSalonEmail('');
      setSalonContact('');
      setSalonDate('');
      setIsDialogOpen(false);
    }
  };

  const handleDeleteSalon = (id: string) => {
    if (window.confirm('Are you sure you want to delete this salon?')) {
      dispatch(deleteSalon({ id }));
    }
  };

  return (
    <div className="max-w-5xl mx-auto mt-10 p-6 bg-white rounded-lg shadow">
      <div className="flex justify-between">
        <h2 className="text-xl font-semibold mb-6 border-b pb-2">Salon</h2>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button
              className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2"
              disabled={loading}
            >
              <Plus className="mr-2 h-4 w-4" />
              Add Salon
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle>Add New Salon</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div>
                <Label htmlFor="salon-name">Salon Name</Label>
                <Input
                  id="salon-name"
                  value={salonName}
                  onChange={(e) => setSalonName(e.target.value)}
                  placeholder="Enter salon name"
                  className="mt-1"
                />
              </div>
              <div>
                <Label htmlFor="salon-email">Email Address</Label>
                <Input
                  id="salon-email"
                  type="email"
                  value={salonEmail}
                  onChange={(e) => setSalonEmail(e.target.value)}
                  placeholder="Enter email address"
                  className="mt-1"
                />
              </div>
              <div>
                <Label htmlFor="salon-contact">Contact Number</Label>
                <Input
                  id="salon-contact"
                  value={salonContact}
                  onChange={(e) => setSalonContact(e.target.value)}
                  placeholder="Enter contact number"
                  className="mt-1"
                />
              </div>
              <div>
                <Label htmlFor="salon-date">Date of Establishment</Label>
                <Input
                  id="salon-date"
                  type="date"
                  value={salonDate}
                  onChange={(e) => setSalonDate(e.target.value)}
                  className="mt-1"
                />
              </div>
              <div className="flex justify-end space-x-2">
                <Button
                  variant="outline"
                  onClick={() => {
                    setIsDialogOpen(false);
                    setSalonName('');
                    setSalonEmail('');
                    setSalonContact('');
                    setSalonDate('');
                  }}
                >
                  Cancel
                </Button>
                <Button
                  onClick={handleAddSalon}
                  className="bg-purple-600 hover:bg-purple-700"
                  disabled={!salonName.trim() || loading}
                >
                  {loading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin  text-purple-600" />
                      Creating...
                    </>
                  ) : (
                    'Create Salon'
                  )}
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>
      {/* 
      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded mb-4">
          {error}
        </div>
      )} */}

      {loading && (salons?.length ?? 0) === 0 ? (
        <div className="text-center py-12">
          <Loader2 className="h-8 w-8 animate-spin mx-auto mb-4" />
          <p className="text-gray-500">Loading salons...</p>
        </div>
      ) : (salons?.length ?? 0) === 0 ? (
        <div className="text-center py-12">
          <p className="text-gray-500 text-lg">No salon created</p>
          <p className="text-gray-400 text-sm mt-2">
            Click "Add Salon" to create your first salon
          </p>
        </div>
      ) : (
        <div className="space-y-6">
          {(salons ?? []).map((salon: any) => (
            <div
              key={salon.id}
              className="grid grid-cols-1 md:grid-cols-3 gap-6 items-start border-b pb-6"
            >
              <div className="flex justify-center md:justify-start relative">
                <img
                  src="https://marketplace.canva.com/EAGGN4jLiEU/1/0/1600w/canva-black-and-cream-illustrative-hair-salon-logo-vkZoxxgOYCk.jpg"
                  alt={`${salon.name} Logo`}
                  className="w-[170px] h-[170px] rounded-[9.31px] border-[0.56px] border-black"
                />

                <div className="absolute -top-2 -right-2 flex space-x-1">
                  <button className="w-8 h-8 rounded-full bg-white border border-gray-300 shadow-md flex items-center justify-center hover:shadow-lg hover:bg-gray-50 transition-all">
                    <FiEdit2 className="text-purple-600 text-xs" />
                  </button>
                  <button
                    onClick={() => handleDeleteSalon(salon.id)}
                    disabled={loading}
                    className="w-8 h-8 rounded-full bg-white border border-gray-300 shadow-md flex items-center justify-center hover:shadow-lg hover:bg-red-50 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {loading ? (
                      <Loader2 className="text-red-500 text-xs animate-spin" />
                    ) : (
                      <FiTrash2 className="text-red-500 text-xs" />
                    )}
                  </button>
                </div>
              </div>

              <div className="md:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-7">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Salon Id
                  </label>
                  <input
                    type="text"
                    value={salon.id}
                    readOnly
                    className="w-full border rounded px-3 py-2 bg-gray-50 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Salon Name
                  </label>
                  <input
                    type="text"
                    value={salon.name}
                    readOnly
                    className="w-full border rounded px-3 py-2 bg-gray-50 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Email Address
                  </label>
                  <input
                    type="text"
                    value={salon.email || ''}
                    readOnly
                    className="w-full border rounded px-3 py-2 bg-gray-50 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Date of Establishment
                  </label>
                  <input
                    type="date"
                    value={salon.dateOfEstablishment || ''}
                    readOnly
                    className="w-full border rounded px-3 py-2 bg-gray-50 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Contact Number
                  </label>
                  <input
                    type="text"
                    value={salon.contactNumber || ''}
                    readOnly
                    className="w-full border rounded px-3 py-2 bg-gray-50 focus:outline-none"
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
