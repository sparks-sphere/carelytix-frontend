'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { CalendarDays, Clock } from "lucide-react";
import { Wallet } from "lucide-react";
import { ShoppingCart, ArrowDown } from "lucide-react";
import { FileText, Pencil } from "lucide-react";

interface Plan {
  name: string;
  price: string;
  period: string;
  bgColor: string;
  colorClass: string;
  buttonStyle: string;
}

interface AngledPricingCardProps {
  plan: string;
  price: string;
  period: string;
  bgColor: string;
  colorClass: string;
  color: string;
  textColor?: string;
  isCurrentPlan?: boolean;
}

const plans: Plan[] = [
  {
    name: 'Freemium',
    price: '0',
    period: 'for 15 days',
    bgColor: 'bg-[#07677B]',
    colorClass: 'border-[#07677B]',
    buttonStyle: 'border-[#07677B] text-[#07677B] hover:bg-[#07677B] hover:text-white'
  },
  {
    name: 'Starter',
    price: '299',
    period: 'per month',
    bgColor: 'bg-[#810505]',
    colorClass: 'border-[#810505]',
    buttonStyle: 'border-[#810505] text-[#810505] hover:bg-[#810505] hover:text-white'
  },
  {
    name: 'Pro',
    price: '599',
    period: 'per month',
    bgColor: 'bg-[#077907]',
    colorClass: 'border-[#077907]',
    buttonStyle: 'border-[#077907] text-[#077907] hover:bg-[#077907] hover:text-white'
  },
  {
    name: 'Premium',
    price: '1199',
    period: 'per month',
    bgColor: 'bg-[#65296B]',
    colorClass: 'border-[#65296B]',
    buttonStyle: 'border-[#65296B] text-[#65296B] hover:bg-[#65296B] hover:text-white'
  }
];

const AngledPricingCard = ({ plan, price, period, bgColor, colorClass, color, textColor = "text-white", isCurrentPlan = false }: AngledPricingCardProps) => {
  return (
    <div className={`border-2 ${colorClass} bg-white w-full max-w-sm mx-auto h-[450px] sm:h-[550px] lg:h-[650px] rounded-xl shadow-lg transition-all duration-300 hover:shadow-xl hover:scale-105 flex flex-col`}>
      {/* Main card container - Angled header */}
      <div className={`${bgColor} ${textColor} w-full h-32 sm:h-40 lg:h-48 rounded-t-xl shadow-lg relative overflow-hidden`}
           style={{
             clipPath: 'polygon(0 0, 100% 0, 100% 75%, 0 100%)',
           }}>
        
        <div className='flex flex-col justify-center items-center h-full pt-2 mt-[-20px]'>
           <div className="font-semibold text-xl sm:text-2xl lg:text-3xl text-center">{plan}</div>
           <div className="font-bold text-2xl sm:text-3xl lg:text-4xl text-center mt-1">₹{price}</div>
           <div className="font-medium text-xs sm:text-sm lg:text-base text-center mt-1 opacity-90">{period}</div>
        </div>
      </div>

      {/* Content area with button */}
      <div className="flex-1 p-4 sm:p-6 lg:p-8 flex flex-col justify-end">
        {/* Button positioned at the bottom */}
        {isCurrentPlan ? (
          <button className="w-full max-w-[200px] mx-auto h-12 sm:h-14 rounded-full bg-red-700 text-white font-semibold transition-all duration-300 transform hover:scale-105 mb-4">
            Current Plan
          </button>
        ) : (
          <button className={`w-full max-w-[200px] mx-auto h-12 sm:h-14 rounded-full border-2 font-semibold transition-all duration-300 transform hover:scale-105 ${color} mb-4`}>
            {plan === 'Freemium' ? 'Get Started' : 'Upgrade to →'}
          </button>
        )}
      </div>
    </div>
  );
};

export default function PlansandPricingSettingsTable() {
  return (
    <div className="w-full max-w-7xl mx-auto p-4 sm:p-6 lg:p-8">
      <Card className="bg-white w-full border rounded-xl shadow-lg">
        <CardHeader className='border-b border-gray-200 p-4 sm:p-6 flex flex-row items-center justify-between'>
          <CardTitle className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-800">
            Subscription Plan
          </CardTitle>
          <button className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-full font-medium transition-colors flex items-center gap-2">
            <div className="bg-[#8E24AA] p-1.5 rounded">
               <div className="relative w-4 h-4">
                {/* Document */}
                  <FileText className="w-4 h-4 text-white" strokeWidth={2} />
                {/* Pencil overlay */}
                   <Pencil className="w-3 h-3 text-white absolute bottom-0 right-0" strokeWidth={2} />
               </div>
            </div>
            Change Plan
          </button>
        </CardHeader>
        
        {/* Subscription Details */}
        <div className="p-4 sm:p-6 border-b border-gray-200">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-8">
            {/* Subscription Plan */}
            <div className="flex items-center gap-3 bg-purple-50 p-4 rounded-full">
              <div className="p-4 rounded-full flex items-center justify-center bg-gradient-to-br from-purple-100 to-purple-200 bg-purple-50 relative">
               {/* Cart */}
              <ShoppingCart className="w-7 h-7 text-[#6A1B9A]" strokeWidth={2} />
              {/* Arrow inside the circle, above cart */}
              <ArrowDown className="w-4 h-4 text-[#6A1B9A] absolute top-2" strokeWidth={2} />
              </div>
              <div>
                <p className="text-sm text-gray-500 font-medium">Subscription Plan</p>
                <p className="text-lg font-semibold text-gray-800">Starter</p>
              </div>
            </div>
            
            {/* Subscription Cost */}
            <div className="flex items-center gap-3 bg-purple-50 p-4 rounded-full">
              <div className="p-3 rounded-full bg-gradient-to-br from-purple-100 to-purple-200 bg-purple-50 flex items-center justify-center">
                  <Wallet className="w-10 h-10 text-purple-600" strokeWidth={2} />
              </div>
              <div>
                <p className="text-sm text-gray-500 font-medium">Subscription Cost</p>
                <p className="text-lg font-semibold text-gray-800">₹ 299</p>
              </div>
            </div>
            
            {/* Renewal Date */}
            <div className="flex items-center gap-3 bg-purple-50 p-4 rounded-full">
              <div className="bg-purple-100 p-3 rounded-full">
                <div className="relative w-10 h-10">
                  {/* Calendar */}
                    <CalendarDays className="w-9 h-9 absolute text-purple-600" />
                {/* Clock overlay */}
                  <Clock className="w-6 h-6 text-purple-600 absolute -bottom-0.5 -right-1 bg-purple-50 rounded-full p-[1px]" />
                </div>
              </div>
              <div>
                <p className="text-sm text-gray-500 font-medium">Renewal Date</p>
                <p className="text-lg font-semibold text-gray-800">Aug 29, 2025</p>
              </div>
            </div>
          </div>
        </div>

        <CardContent className="p-4 sm:p-6 lg:p-8">
          {/* Responsive grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 lg:gap-8">
            {plans.map((plan, index) => (
              <AngledPricingCard
                key={index}
                plan={plan.name}
                price={plan.price}
                period={plan.period}
                bgColor={plan.bgColor}
                colorClass={plan.colorClass}
                color={plan.buttonStyle}
                isCurrentPlan={plan.name === 'Starter'}
              />
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}