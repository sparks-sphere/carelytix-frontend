import { Metadata } from 'next';
import { Calendar, Users, CreditCard, BarChart3, Zap, Shield } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

export const metadata: Metadata = {
  title: 'Features - EliteSalon',
  description: 'Discover all the powerful features that make EliteSalon the complete salon management solution.',
};

export default function Features() {
  const features = [
    {
      icon: Calendar,
      title: "Smart Scheduling",
      description: "AI-powered booking system that prevents double bookings and optimizes your calendar automatically.",
      details: [
        "Automated appointment scheduling",
        "Real-time availability updates",
        "Conflict prevention system",
        "Mobile calendar sync"
      ]
    },
    {
      icon: Users,
      title: "Client Management",
      description: "Comprehensive client profiles with service history, preferences, and automated follow-ups.",
      details: [
        "Detailed client profiles",
        "Service history tracking",
        "Automated reminders",
        "Preference management"
      ]
    },
    {
      icon: CreditCard,
      title: "Payment Processing",
      description: "Secure payment processing with multiple payment options and automatic invoicing.",
      details: [
        "Multiple payment methods",
        "Automatic invoicing",
        "Payment tracking",
        "Secure transactions"
      ]
    },
    {
      icon: BarChart3,
      title: "Analytics & Reports",
      description: "Real-time insights into your business performance with detailed analytics and reporting.",
      details: [
        "Revenue analytics",
        "Performance metrics",
        "Custom reports",
        "Data visualization"
      ]
    },
    {
      icon: Zap,
      title: "Inventory Tracking",
      description: "Keep track of products and supplies with automated low-stock alerts and reorder points.",
      details: [
        "Product inventory",
        "Low-stock alerts",
        "Automatic reordering",
        "Supplier management"
      ]
    },
    {
      icon: Shield,
      title: "Staff Management",
      description: "Manage your team's schedules, commissions, and performance all in one place.",
      details: [
        "Staff scheduling",
        "Commission tracking",
        "Performance metrics",
        "Role management"
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-pink-50">
      <div className="max-w-7xl mx-auto px-4 py-16">
        <div className="text-center mb-16">
          <h1 className="text-4xl lg:text-6xl font-bold mb-6">
            Powerful{' '}
            <span className="bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
              Features
            </span>
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Everything you need to run your salon efficiently and grow your business.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <Card key={index} className="group hover:shadow-lg transition-all duration-300 border-purple-100 hover:border-purple-200">
              <CardHeader>
                <div className="w-12 h-12 bg-gradient-to-r from-purple-600 to-pink-600 rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <feature.icon className="w-6 h-6 text-white" />
                </div>
                <CardTitle className="text-xl">{feature.title}</CardTitle>
                <CardDescription className="text-gray-600">
                  {feature.description}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  {feature.details.map((detail, detailIndex) => (
                    <li key={detailIndex} className="text-sm text-gray-600 flex items-center">
                      <div className="w-1.5 h-1.5 bg-purple-600 rounded-full mr-3"></div>
                      {detail}
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}