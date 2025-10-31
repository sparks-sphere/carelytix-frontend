"use client"

import React from "react";

const InvoicePreview = () => {
  return (
    <div className="p-6">
      <div className="bg-white border rounded p-6 max-w-xl mx-auto">
        <div className="text-center mb-4">
          <h2 className="text-xl font-semibold">Carelytics</h2>
          <p>Company Name</p>
          <p>Contact No: 7897897890</p>
          <p>Mail: testcare@gmail.com</p>
        </div>

        <table className="w-full mb-4 text-sm">
          <thead>
            <tr className="border-b">
              <th className="text-left">Product/Service</th>
              <th>Qty</th>
              <th>Price</th>
              <th>Amount</th>
            </tr>
          </thead>
          <tbody>
            <tr className="border-b">
              <td>Haircut</td>
              <td>1</td>
              <td>$25</td>
              <td>$25</td>
            </tr>
            <tr className="border-b">
              <td>Hair Spa</td>
              <td>2</td>
              <td>$50</td>
              <td>$100</td>
            </tr>
            <tr>
              <td>Hair Stripe</td>
              <td>3</td>
              <td>$100</td>
              <td>$300</td>
            </tr>
          </tbody>
        </table>

        <div className="text-right font-semibold mb-4">Total Amount: $325</div>
        <div className="text-center">Thank You!</div>
      </div>

      <div className="mt-4 flex justify-center gap-4">
        <button className="px-4 py-2 bg-purple-600 text-white rounded">Download Invoice</button>
        <button className="px-4 py-2 bg-gray-400 text-white rounded">Print</button>
        <button className="px-4 py-2 bg-white border border-gray-400 rounded">Edit Invoice</button>
      </div>
    </div>
  );
};

export default InvoicePreview;
