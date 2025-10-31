import React from "react";

const CreateBillModal = ({ isOpen, onClose }: {isOpen:boolean; onClose:()=>void}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white w-[700px] rounded-lg shadow-lg p-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold">Create Bill</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-red-500">✕</button>
        </div>

        {/* Booking Info */}
        <div className="grid grid-cols-3 gap-4 mb-4">
          <div>
            <label className="text-sm">Booking ID</label>
            <select className="w-full border rounded px-2 py-1 text-sm">
              <option>Select booking id</option>
            </select>
          </div>
          <div>
            <label className="text-sm">Customer</label>
            <input className="w-full border rounded px-2 py-1 text-sm" placeholder="Type and select customer name" />
          </div>
          <div>
            <label className="text-sm">Date of Booking</label>
            <input type="date" className="w-full border rounded px-2 py-1 text-sm" />
          </div>
        </div>

        {/* Booking Slot */}
        <div className="mb-4">
          <label className="text-sm">Booking Slot</label>
          <select className="w-full border rounded px-2 py-1 text-sm">
            <option>Select slot</option>
          </select>
        </div>

        {/* Product/Service List */}
        <div className="mb-4">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="grid grid-cols-4 gap-4 mb-2">
              <select className="border rounded px-2 py-1 text-sm">
                <option>Select</option>
              </select>
              <input type="number" placeholder="Qty" className="border rounded px-2 py-1 text-sm" />
              <input type="number" placeholder="Price" className="border rounded px-2 py-1 text-sm" />
              <input disabled placeholder="Amount" className="border rounded px-2 py-1 text-sm bg-gray-100" />
            </div>
          ))}
        </div>

        {/* Action Buttons */}
        <div className="flex justify-end space-x-2">
          <button onClick={onClose} className="px-4 py-2 bg-gray-200 text-sm rounded">Cancel</button>
          <button className="px-4 py-2 bg-purple-600 text-white text-sm rounded">Save</button>
        </div>
      </div>
    </div>
  );
};

export default CreateBillModal;
