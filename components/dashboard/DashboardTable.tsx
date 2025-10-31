import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { MoreHorizontal, Star, ChevronLeft, ChevronRight } from 'lucide-react';
import { JSX, useState } from 'react';

interface Booking {
  id: string;
  customer: string;
  service: string;
  dateTime: string;
  status: 'Completed' | 'Confirmed' | 'Pending' | 'Cancelled' | 'No Show';
  rating: number;
}

interface StatusBadgeProps {
  status: Booking['status'];
}

interface StarRatingProps {
  rating: number;
}

const allBookings: Booking[] = [
  {
    id: '1',
    customer: 'Emma Watson',
    service: 'Haircut & Style',
    dateTime: 'Jan 15, 2025 2:00 PM',
    status: 'Completed',
    rating: 4,
  },
  {
    id: '2',
    customer: 'John Smith',
    service: 'Beard Trim',
    dateTime: 'Jan 15, 2025 3:30 PM',
    status: 'Confirmed',
    rating: 0,
  },
  {
    id: '3',
    customer: 'Sofia Shekhar',
    service: 'Hair Treatment',
    dateTime: 'Jan 14, 2025 3:30 PM',
    status: 'Completed',
    rating: 5,
  },
  {
    id: '4',
    customer: 'Maria Garcia',
    service: 'Manicure & Pedicure',
    dateTime: 'Jan 14, 2025 1:15 PM',
    status: 'Completed',
    rating: 4,
  },
  {
    id: '5',
    customer: 'Sarah Johnson',
    service: 'Facial Treatment',
    dateTime: 'Jan 13, 2025 4:00 PM',
    status: 'No Show',
    rating: 0,
  },
  {
    id: '6',
    customer: 'Michael Brown',
    service: 'Hair Color',
    dateTime: 'Jan 13, 2025 2:00 PM',
    status: 'Pending',
    rating: 0,
  },
  {
    id: '7',
    customer: 'Lisa Davis',
    service: 'Eyebrow Threading',
    dateTime: 'Jan 12, 2025 5:00 PM',
    status: 'Cancelled',
    rating: 0,
  },
  {
    id: '8',
    customer: 'James Wilson',
    service: 'Massage Therapy',
    dateTime: 'Jan 12, 2025 4:30 PM',
    status: 'Completed',
    rating: 5,
  },
];

const StatusBadge: React.FC<StatusBadgeProps> = ({ status }) => {
  const getStatusColor = (status: Booking['status']): string => {
    switch (status) {
      case 'Completed':
        return 'bg-green-100 text-green-700 border-green-200';
      case 'Confirmed':
        return 'bg-blue-100 text-blue-700 border-blue-200';
      case 'Pending':
        return 'bg-yellow-100 text-yellow-700 border-yellow-200';
      case 'Cancelled':
        return 'bg-red-100 text-red-700 border-red-200';
      case 'No Show':
        return 'bg-gray-100 text-gray-700 border-gray-200';
      default:
        return 'bg-gray-100 text-gray-700 border-gray-200';
    }
  };

  return (
    <span
      className={`px-2 py-1 rounded-full text-xs font-medium border ${getStatusColor(status)}`}
    >
      {status}
    </span>
  );
};

const StarRating: React.FC<StarRatingProps> = ({ rating }) => {
  return (
    <div className="flex items-center gap-1">
      {[1, 2, 3, 4, 5].map((star) => (
        <Star
          key={star}
          className={`w-4 h-4 ${
            star <= rating ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'
          }`}
        />
      ))}
    </div>
  );
};

export default function DashboardTable(): JSX.Element {
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [rowsPerPage, setRowsPerPage] = useState<number>(5);

  // Calculate pagination
  const totalPages = Math.ceil(allBookings.length / rowsPerPage);
  const startIndex = (currentPage - 1) * rowsPerPage;
  const endIndex = startIndex + rowsPerPage;
  const currentBookings = allBookings.slice(startIndex, endIndex);

  // Generate page numbers for pagination
  const generatePageNumbers = (): number[] => {
    const pages: number[] = [];
    const maxVisiblePages = 5;

    if (totalPages <= maxVisiblePages) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      if (currentPage <= 3) {
        for (let i = 1; i <= 4; i++) {
          pages.push(i);
        }
      } else if (currentPage >= totalPages - 2) {
        for (let i = totalPages - 3; i <= totalPages; i++) {
          pages.push(i);
        }
      } else {
        for (let i = currentPage - 1; i <= currentPage + 1; i++) {
          pages.push(i);
        }
      }
    }

    return pages;
  };

  const handlePageChange = (page: number): void => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  const handleRowsPerPageChange = (
    event: React.ChangeEvent<HTMLSelectElement>,
  ): void => {
    const newRowsPerPage = parseInt(event.target.value, 10);
    setRowsPerPage(newRowsPerPage);
    setCurrentPage(1); // Reset to first page when changing rows per page
  };

  const handleActionClick = (bookingId: string): void => {
    console.log('Action clicked for booking:', bookingId);
    // Implement your action logic here
  };

  return (
    <div className="bg-white rounded-lg border border-gray-200 shadow-sm">
      <div className="p-6 border-b border-gray-200">
        <h3 className="text-lg font-semibold text-gray-900">Recent Bookings</h3>
      </div>

      <Table>
        <TableHeader>
          <TableRow className="border-b bg-[#F4CCFF] hover:bg-[#F4CCFF]">
            <TableHead className="text-gray-600 font-medium">
              Customers
            </TableHead>
            <TableHead className="text-gray-600 font-medium">
              Services
            </TableHead>
            <TableHead className="text-gray-600 font-medium">
              Date & Time
            </TableHead>
            <TableHead className="text-gray-600 font-medium">Status</TableHead>
            <TableHead className="text-gray-600 font-medium">Rating</TableHead>
            <TableHead className="text-gray-600 font-medium text-center">
              Action
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {currentBookings.map((booking, index) => (
            <TableRow
              key={booking.id}
              className={`hover:bg-gray-50 border-b border-gray-100 ${
                index % 2 === 0 ? 'bg-white' : 'bg-gray-50/30'
              }`}
            >
              <TableCell className="font-medium text-gray-900">
                {booking.customer}
              </TableCell>
              <TableCell className="text-gray-700">{booking.service}</TableCell>
              <TableCell className="text-gray-700">
                {booking.dateTime}
              </TableCell>
              <TableCell>
                <StatusBadge status={booking.status} />
              </TableCell>
              <TableCell>
                {booking.rating > 0 ? (
                  <StarRating rating={booking.rating} />
                ) : (
                  <span className="text-gray-400 text-sm">-</span>
                )}
              </TableCell>
              <TableCell className="text-center">
                <button
                  className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                  onClick={() => handleActionClick(booking.id)}
                  aria-label={`Actions for ${booking.customer}`}
                >
                  <MoreHorizontal className="w-4 h-4 text-gray-500" />
                </button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      <div className="flex items-center justify-between p-4 border-t border-gray-200 bg-gray-50/30">
        <div className="flex items-center gap-2 text-sm text-gray-600">
          <span>Rows per page</span>
          <select
            className="px-2 py-1 border border-gray-300 rounded text-sm bg-white"
            value={rowsPerPage}
            onChange={handleRowsPerPageChange}
          >
            <option value={2}>02</option>
            <option value={5}>05</option>
            <option value={10}>10</option>
            <option value={20}>20</option>
          </select>
        </div>

        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1">
            <button
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
              className="p-1 rounded hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
              aria-label="Previous page"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>

            {generatePageNumbers().map((page) => (
              <button
                key={page}
                onClick={() => handlePageChange(page)}
                className={`w-8 h-8 rounded-full text-sm font-medium transition-colors ${
                  page === currentPage
                    ? 'bg-purple-600 text-white'
                    : 'text-gray-600 hover:bg-gray-100'
                }`}
              >
                {page}
              </button>
            ))}

            {totalPages > 5 && currentPage < totalPages - 2 && (
              <span className="px-2 py-1 text-gray-600">...</span>
            )}

            {totalPages > 5 && currentPage < totalPages - 2 && (
              <button
                onClick={() => handlePageChange(totalPages)}
                className="w-8 h-8 rounded-full text-sm font-medium text-gray-600 hover:bg-gray-100"
              >
                {totalPages}
              </button>
            )}

            <button
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
              className="p-1 rounded hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
              aria-label="Next page"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        <div className="text-sm text-gray-600">
          Showing {startIndex + 1} to {Math.min(endIndex, allBookings.length)}{' '}
          of {allBookings.length} entries
        </div>
      </div>
    </div>
  );
}
