'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Users, IndianRupee, Star, Users2 } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Separator } from '@/components/ui/separator';
import { ScrollArea } from '@/components/ui/scroll-area';
import DashboardCalender from '@/components/dashboard/DashboardCalender';
import DashboardTable from '@/components/dashboard/DashboardTable';

const analyticsCards = [
  {
    title: 'Total Bookings',
    value: '178',
    change: '+12.5%',
    icon: Users,
    color: 'text-[#bd69d5]',
    bgColor: 'bg-[#fcf1ff]',
  },
  {
    title: 'Revenue',
    value: '₹4280',
    change: '+8.2%',
    icon: IndianRupee,
    color: 'text-[#bd69d5]',
    bgColor: 'bg-[#fcf1ff]',
  },
  {
    title: 'Average Ratings',
    value: '4.3',
    change: '+2.1%',
    icon: Star,
    color: 'text-[#bd69d5]',
    bgColor: 'bg-[#fcf1ff]',
  },
  {
    title: 'New Customers',
    value: '24',
    change: '+5.4%',
    icon: Users2,
    color: 'text-[#bd69d5]',
    bgColor: 'bg-[#fcf1ff]',
  },
];

const reviews = [1, 2, 3];

export default function Dashboard() {
  return (
    <div>
      {/* Analytics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {analyticsCards.map((card, index) => (
          <Card
            key={card.title}
            className={`hover:shadow-md transition-shadow ${index === 0 ? 'bg-gradient-to-br from-[#783d88] via-[#9964a7] to-[#bb8bc8]' : 'bg-[#f4ccff]'} rounded-2xl `}
          >
            <CardContent>
              <div className="flex items-center justify-between">
                <div>
                  <p
                    className={`text-2xl font-medium ${index === 0 ? 'text-white' : ''}`}
                  >
                    {card.title}
                  </p>
                  <p
                    className={`text-3xl text-gray-900 mt-1 ${index === 0 ? 'text-white' : ''}`}
                  >
                    {card.value}
                  </p>
                  <p
                    className={`text-sm ${index === 0 ? 'text-white' : 'text-gray-800'} mt-4`}
                  >
                    {card.change} from last month
                  </p>
                </div>
                <div
                  className={`p-2 rounded-full ${index === 0 ? 'hidden' : ''} ${card.bgColor}`}
                >
                  <card.icon className={`w-6 h-6 ${card.color}`} />
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Calender and reviews */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-6">
        <div className="col-span-1 lg:col-span-2">
          <DashboardCalender />
        </div>

        {/* Reviews */}
        <div className="col-span-1">
          <Card className="hover:shadow-md transition-shadow bg-gray-100">
            <CardHeader>
              <CardTitle>Recent Reviews</CardTitle>
            </CardHeader>
            <CardContent className="max-h-[300px] overflow-y-auto custom-scrollbar">
              <ScrollArea>
                <div>
                  {reviews.map((_, index) => (
                    <div key={index} className="mb-6">
                      <div className="flex flex-col mb-4">
                        <div className="flex items-center gap-2">
                          <Avatar className="w-12 h-12">
                            <AvatarImage src="https://github.com/shadcn.png" />
                            <AvatarFallback>CN</AvatarFallback>
                          </Avatar>
                          <div>
                            <p className="text-lg font-medium text-gray-900">
                              Sofia Shekhar
                            </p>
                            <div className="flex items-center gap-1 mt-1">
                              {[1, 2, 3, 4, 5].map((index) => (
                                <Star
                                  key={index}
                                  className={`w-4 h-4`}
                                  fill={index < 4 ? '#A855F7' : 'none'}
                                  stroke={index < 4 ? '#A855F7' : '#d1d5db'}
                                />
                              ))}
                            </div>
                          </div>
                        </div>
                        <p className="mt-2 text-[#A855F7]">
                          "Excellent service! The stylist was very professional"
                        </p>
                      </div>
                      <Separator
                        className={`my-4 h-0.5 rounded-full bg-gray-200 ${index === reviews.length - 1 ? 'hidden' : ''}`}
                      />
                    </div>
                  ))}
                </div>
              </ScrollArea>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Recent Bookings */}
      <div className="mt-6 mb-3">
        <DashboardTable />
      </div>
    </div>
  );
}
