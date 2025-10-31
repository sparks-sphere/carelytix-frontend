'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

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
}

const plans : Plan[]= [
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

const AngledPricingCard = ({ plan, price, period, bgColor, colorClass, color, textColor = "text-white" }: AngledPricingCardProps) => {
  return (
    <div className={`border-[1.84px] ${colorClass} bg-white max-w-[290.88px] h-[708.44px] top-[202px] left-[444.99px] rounded-[11.97px]`}>
      {/* Main card container */}
      <div className={`${bgColor} ${textColor} max-w-[290.29px] h-[215.88px] top-[202.92px] left-[445.35px] rounded-[10px] shadow-[0_4px_4px_rgba(0,0,0,0.25)]`}
           style={{
             clipPath: 'polygon(0 0, 100% 0, 100% 85%, 0 100%)',
             minHeight: '120px'
           }}>
        
        <div className='flex flex-col justify-center items-center'>
           <div className="font-[inter] font-semibold text-[27.56px] leading-[77.8px] tracking-normal text-center">{plan}</div>
           <div className="font-[inter] font-bold text-[42.26px] leading-[113.42px] tracking-normal text-center mt-[-25px]">₹{price}</div>
           <div className="font-[inter] font-medium text-[14.36px] leading-none tracking-normal text-center mt-[-20px]">{period}</div>
        </div>

        {/* <div className="absolute top-0 right-0 w-0 h-0 border-t-[50px] border-r-[50px] border-t-white/10 border-r-transparent"></div> */}
      </div>

      
      {/* Shadow/depth effect */}
      {/* <div className="absolute top-1 left-1 w-full h-full bg-black/10 -z-10"
           style={{
             clipPath: 'polygon(0 0, 100% 0, 100% 85%, 0 100%)'
           }}>
      </div> */}

      
      <div className="p-9 h-[480px] flex items-end">
        <button className={`w-[182.53px] h-[50px] rounded-[59.83px] border-2 font-bold transition-colors ${color}`}>
          Get Started
        </button>
      </div>
    </div>
  );
};

export default function PlansandPricingSettingsTable() {
    return(
        <Card className="bg-white max-w-[1269px] h-[829px] top-[107px] left-[426px] border-b rounded-[14px]">
            <CardHeader className='border-b border-gray-300'>
                <CardTitle>Plans and Pricing</CardTitle>
            </CardHeader>
           <CardContent className="p-4">
        {/* Header */}
                {/* Method 1: Using inline clipPath */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                 {plans.map((plan, index) => (
                    <AngledPricingCard
                       plan={plan.name}
                       price={plan.price}
                       period={plan.period}
                       bgColor={plan.bgColor}
                       colorClass={plan.colorClass}
                       color={plan.buttonStyle}
                   />
                  ))}
              </div>
            </CardContent>
          </Card>    
    )
}