import { Metadata } from 'next';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Check } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Pricing - EliteSalon',
  description: 'Choose the perfect plan for your salon. Start free and scale as you grow.',
};

export default function Pricing() {
  const plans = [
    {
      name: "Starter",
      price: "29",
      description: "Perfect for small salons",
      features: [
        "Up to 3 staff members",
        "100 appointments/month",
        "Basic reporting",
        "Email support",
        "Mobile app access",
        "Basic client management"
      ],
      popular: false
    },
    {
      name: "Professional",
      price: "79",
      description: "Most popular choice",
      features: [
        "Up to 10 staff members",
        "Unlimited appointments",
        "Advanced analytics",
        "Priority support",
        "Inventory management",
        "Marketing tools",
        "Custom reporting",
        "Integration support"
      ],
      popular: true
    },
    {
      name: "Enterprise",
      price: "149",
      description: "For growing salon chains",
      features: [
        "Unlimited staff members",
        "Multi-location support",
        "Custom integrations",
        "Dedicated support",
        "Advanced reporting",
        "White-label options",
        "API access",
        "Custom training"
      ],
      popular: false
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-pink-50">
      <div className="max-w-7xl mx-auto px-4 py-16">
        <div className="text-center mb-16">
          <Badge variant="secondary" className="bg-purple-100 text-purple-800 mb-4">
            Pricing
          </Badge>
          <h1 className="text-4xl lg:text-6xl font-bold mb-6">
            Choose the perfect{' '}
            <span className="bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
              plan
            </span>
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Start free and scale as you grow. No hidden fees, no surprises.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {plans.map((plan, index) => (
            <Card key={index} className={`relative ${plan.popular ? 'ring-2 ring-purple-600 scale-105' : ''} hover:shadow-lg transition-all duration-300`}>
              {plan.popular && (
                <Badge className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-gradient-to-r from-purple-600 to-pink-600">
                  Most Popular
                </Badge>
              )}
              <CardHeader className="text-center pb-8">
                <CardTitle className="text-2xl">{plan.name}</CardTitle>
                <div className="space-y-2">
                  <div className="text-4xl font-bold">
                    ${plan.price}
                    <span className="text-lg text-gray-600 font-normal">/month</span>
                  </div>
                  <CardDescription>{plan.description}</CardDescription>
                </div>
              </CardHeader>
              <CardContent className="space-y-6">
                <ul className="space-y-3">
                  {plan.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-center">
                      <Check className="w-4 h-4 text-green-600 mr-3 flex-shrink-0" />
                      <span className="text-gray-600">{feature}</span>
                    </li>
                  ))}
                </ul>
                <Button 
                  className={`w-full ${plan.popular 
                    ? 'bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700' 
                    : 'bg-gray-900 hover:bg-gray-800'
                  }`}
                >
                  Start Free Trial
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center mt-16">
          <p className="text-gray-600 mb-4">
            All plans include a 14-day free trial. No credit card required.
          </p>
          <p className="text-sm text-gray-500">
            Questions about pricing? <a href="/contact" className="text-purple-600 hover:underline">Contact our sales team</a>
          </p>
        </div>
      </div>
    </div>
  );
}