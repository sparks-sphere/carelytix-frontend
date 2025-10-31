'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import {
  Calendar,
  Users,
  CreditCard,
  BarChart3,
  Scissors,
  Clock,
  Star,
  Check,
  Menu,
  X,
  ChevronRight,
  Sparkles,
  Zap,
  Shield,
  ArrowRight,
} from 'lucide-react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/state/store';
import { getUserRequest } from '@/state/auth/auth-slice';
import Image from 'next/image';
import Logo from '../pictures/logo.png';

export default function Home() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const dispatch = useDispatch();
  const { user, loading } = useSelector((state: RootState) => state.auth);
  const [email, setEmail] = useState('');
  const [mobile, setMobile] = useState('');
  const [visibleSections, setVisibleSections] = useState<Set<string>>(
    new Set(),
  );

  const heroRef = useRef(null);
  const featuresRef = useRef(null);
  const pricingRef = useRef(null);
  const testimonialsRef = useRef(null);
  const contactRef = useRef(null);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  useEffect(() => {
    const observerOptions = {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px',
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setVisibleSections((prev) => {
            const newSet = new Set(prev);
            newSet.add(entry.target.id);
            return newSet;
          });
        }
      });
    }, observerOptions);

    const sections = [
      heroRef,
      featuresRef,
      pricingRef,
      testimonialsRef,
      contactRef,
    ];
    sections.forEach((ref) => {
      if (ref.current) {
        observer.observe(ref.current);
      }
    });

    return () => {
      sections.forEach((ref) => {
        if (ref.current) {
          observer.unobserve(ref.current);
        }
      });
    };
  }, []);
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission here
    console.log('Early bird access request:', { email, mobile });
    // Reset form and close modal
    setEmail('');
    setMobile('');
    setIsModalOpen(false);
    // You can add success notification here
  };

  // Removed duplicate getUserRequest call - handled by root layout

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
      });
    }
  };
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-pink-50 scroll-smooth">
      {/* Navigation */}
      <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-lg border-b border-purple-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-2">
              {/* <div className="w-8 h-8 bg-gradient-to-r rounded-lg flex items-center justify-center"> */}
              {/* <img src="../pictures/logo.png" alt="Logo" className="w-6 h-6" /> */}
              {/* <Image src={Logo} width={500} height={500} alt='Logo'/> */}
              {/* </div> */}
              <Image src={Logo} width={100} height={100} alt="Logo" />
              <span className="text-xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                Carelytics
              </span>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-8">
              <button
                onClick={() => scrollToSection('features')}
                className="text-gray-600 hover:text-purple-600 transition-colors"
              >
                Features
              </button>
              <button
                onClick={() => scrollToSection('pricing')}
                className="text-gray-600 hover:text-purple-600 transition-colors"
              >
                Pricing
              </button>
              <button
                onClick={() => scrollToSection('testimonials')}
                className="text-gray-600 hover:text-purple-600 transition-colors"
              >
                Reviews
              </button>
              <button
                onClick={() => scrollToSection('contact')}
                className="text-gray-600 hover:text-purple-600 transition-colors"
              >
                Contact
              </button>
              {user ? (
                <Button className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700">
                  <Link href="/dashboard">Dashboard</Link>
                </Button>
              ) : (
                <>
                  <Button
                    variant="outline"
                    className="border-purple-200 text-purple-600 hover:bg-purple-50"
                  >
                    <Link href="/signin">Sign In</Link>
                  </Button>
                  <Button className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700">
                    <Link href="/signup">Start Free Trial</Link>
                  </Button>
                </>
              )}
            </div>

            {/* Mobile menu button */}
            <div className="md:hidden">
              <Button variant="ghost" size="sm" onClick={toggleMenu}>
                {isMenuOpen ? (
                  <X className="w-6 h-6" />
                ) : (
                  <Menu className="w-6 h-6" />
                )}
              </Button>
            </div>
          </div>

          {/* Mobile Navigation */}
          {isMenuOpen && (
            <div className="md:hidden py-4 border-t border-purple-100">
              <div className="flex flex-col space-y-4">
                <button
                  onClick={() => scrollToSection('features')}
                  className="text-gray-600 hover:text-purple-600 transition-colors text-left"
                >
                  Features
                </button>
                <button
                  onClick={() => scrollToSection('pricing')}
                  className="text-gray-600 hover:text-purple-600 transition-colors text-left"
                >
                  Pricing
                </button>
                <button
                  onClick={() => scrollToSection('testimonials')}
                  className="text-gray-600 hover:text-purple-600 transition-colors text-left"
                >
                  Reviews
                </button>
                <button
                  onClick={() => scrollToSection('contact')}
                  className="text-gray-600 hover:text-purple-600 transition-colors text-left"
                >
                  Contact
                </button>
                <div className="flex flex-col space-y-2 pt-4">
                  <Button
                    variant="outline"
                    className="border-purple-200 text-purple-600 hover:bg-purple-50"
                  >
                    <Link href="/signin">Sign In</Link>
                  </Button>
                  <Button className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700">
                    <Link href="/signup">Start Free Trial</Link>
                  </Button>
                </div>
              </div>
            </div>
          )}
        </div>
      </nav>

      {/* Hero Section */}
      <section
        ref={heroRef}
        id="hero"
        className={`relative overflow-hidden py-20 lg:py-32 transition-all duration-1000 ${
          visibleSections.has('hero')
            ? 'opacity-100 translate-y-0'
            : 'opacity-0 translate-y-10'
        }`}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-purple-600/10 to-pink-600/10"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <div className="space-y-4">
                <Badge
                  variant="secondary"
                  className="bg-purple-100 text-purple-800 hover:bg-purple-200"
                >
                  <Sparkles className="w-4 h-4 mr-1" />
                  Trusted by 10,000+ salons worldwide
                </Badge>
                <h1 className="text-4xl lg:text-6xl font-bold leading-tight">
                  A complete{' '}
                  <span className="bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                    Salon Software
                  </span>{' '}
                  to empower your business.
                </h1>
                <p className="text-xl text-gray-600 leading-relaxed">
                  Streamline appointments, manage clients, track inventory, and
                  grow your revenue with our all-in-one Salon Management
                  Software.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
                  <DialogTrigger asChild>
                    <Button
                      size="lg"
                      className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-lg px-8"
                    >
                      Get Early Bird Access
                      <ArrowRight className="w-5 h-5 ml-2" />
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="sm:max-w-md">
                    <DialogHeader>
                      <DialogTitle className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                        Get Early Bird Access
                      </DialogTitle>
                      <DialogDescription className="text-gray-600">
                        Be the first to experience Carelytics when we launch.
                        Get exclusive early access and special pricing.
                      </DialogDescription>
                    </DialogHeader>
                    <form onSubmit={handleSubmit} className="space-y-4 mt-4">
                      <div className="space-y-2">
                        <Label htmlFor="email" className="text-sm font-medium">
                          Email Address *
                        </Label>
                        <Input
                          id="email"
                          type="email"
                          placeholder="your@email.com"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          required
                          className="border-purple-200 focus:border-purple-600"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="mobile" className="text-sm font-medium">
                          Mobile Number{' '}
                          <span className="text-gray-400">(Optional)</span>
                        </Label>
                        <Input
                          id="mobile"
                          type="tel"
                          placeholder="+91 "
                          value={mobile}
                          onChange={(e) => setMobile(e.target.value)}
                          className="border-purple-200 focus:border-purple-600"
                        />
                      </div>
                      <Button
                        type="submit"
                        className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 mt-6"
                      >
                        Get Early Access
                        <Sparkles className="w-4 h-4 ml-2" />
                      </Button>
                    </form>
                  </DialogContent>
                </Dialog>
                <Button
                  size="lg"
                  variant="outline"
                  className="border-purple-200 text-purple-600 hover:bg-purple-50 text-lg px-8"
                >
                  Watch Demo
                </Button>
              </div>

              <div className="flex items-center space-x-8 pt-8">
                <div className="text-center">
                  <div className="text-2xl font-bold text-gray-900">
                    10,000+
                  </div>
                  <div className="text-sm text-gray-600">Active Salons</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-gray-900">500K+</div>
                  <div className="text-sm text-gray-600">Appointments</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-gray-900">99.9%</div>
                  <div className="text-sm text-gray-600">Uptime</div>
                </div>
              </div>
            </div>

            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-purple-400 to-pink-400 rounded-3xl blur-3xl opacity-20"></div>
              <img
                src="https://images.pexels.com/photos/3993449/pexels-photo-3993449.jpeg?auto=compress&cs=tinysrgb&w=800"
                alt="Modern salon interior"
                className="relative rounded-3xl shadow-2xl w-full h-[500px] object-cover transition-transform duration-700 hover:scale-105"
                loading="lazy"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section
        ref={featuresRef}
        id="features"
        className={`py-20 bg-white transition-all duration-1000 delay-200 ${
          visibleSections.has('features')
            ? 'opacity-100 translate-y-0'
            : 'opacity-0 translate-y-10'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center space-y-4 mb-16">
            <Badge
              variant="secondary"
              className="bg-purple-100 text-purple-800"
            >
              Features
            </Badge>
            <h2 className="text-3xl lg:text-5xl font-bold">
              Unlock growth with our{' '}
              <span className="bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                Salon Software's
              </span>{' '}
              powerful features
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Carelitics provides a complete platform to effortlessly manage and
              organize your salon business, empowering you with total control.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                icon: Calendar,
                title: 'Smart Scheduling',
                description:
                  'Our Automated,real-time scheduling minimizes no-shows,manages staff,and maximizes booking efficiency. ',
              },
              {
                icon: Users,
                title: 'Client Management',
                description:
                  'We seamlessly manage client data,history,and preferences to deliver personalized,consistent service experiences. ',
              },
              {
                icon: CreditCard,
                title: 'Payment Processing',
                description:
                  'We Ensure fast,encryted transactions with multiple payment options and automatic billing integration.',
              },
              {
                icon: BarChart3,
                title: 'Analytics & Reports',
                description:
                  'Our Advanced analytics and reports empower data-driven decisions and business optimization.',
              },
              {
                icon: Zap,
                title: 'Inventory Tracking',
                description:
                  'We Automate and track salon inventory in real time to optimize stock and prevent shortages.',
              },
              {
                icon: Shield,
                title: 'Staff Management',
                description:
                  'We simplify staff scheduling,roles,and performance tracking to boost productivity and efficiency.',
              },
            ].map((feature, index) => (
              <Card
                key={index}
                className={`group hover:shadow-lg transition-all duration-500 border-purple-100 hover:border-purple-200 ${
                  visibleSections.has('features')
                    ? 'opacity-100 translate-y-0'
                    : 'opacity-0 translate-y-10'
                }`}
                style={{ transitionDelay: `${index * 100 + 400}ms` }}
              >
                <CardHeader>
                  <div className="w-12 h-12 bg-gradient-to-r from-purple-600 to-pink-600 rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                    <feature.icon className="w-6 h-6 text-white" />
                  </div>
                  <CardTitle className="text-xl">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-gray-600">
                    {feature.description}
                  </CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section
        ref={pricingRef}
        id="pricing"
        className={`py-20 bg-gradient-to-br from-purple-50 to-pink-50 transition-all duration-1000 delay-300 ${
          visibleSections.has('pricing')
            ? 'opacity-100 translate-y-0'
            : 'opacity-0 translate-y-10'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center space-y-4 mb-16">
            <Badge
              variant="secondary"
              className="bg-purple-100 text-purple-800"
            >
              Pricing
            </Badge>
            <h2 className="text-3xl lg:text-5xl font-bold">
              Choose the perfect{' '}
              <span className="bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                plan
              </span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Start free and scale as you grow. No hidden fees, no surprises.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {[
              {
                name: 'Starter',
                price: '29',
                description: 'Perfect for small salons',
                features: [
                  'Up to 3 staff members',
                  '100 appointments/month',
                  'Basic reporting',
                  'Email support',
                  'Mobile app access',
                ],
                popular: false,
              },
              {
                name: 'Professional',
                price: '79',
                description: 'Most popular choice',
                features: [
                  'Up to 10 staff members',
                  'Unlimited appointments',
                  'Advanced analytics',
                  'Priority support',
                  'Inventory management',
                  'Marketing tools',
                ],
                popular: true,
              },
              {
                name: 'Enterprise',
                price: '149',
                description: 'For growing salon chains',
                features: [
                  'Unlimited staff members',
                  'Multi-location support',
                  'Custom integrations',
                  'Dedicated support',
                  'Advanced reporting',
                  'White-label options',
                ],
                popular: false,
              },
            ].map((plan, index) => (
              <Card
                key={index}
                className={`relative ${plan.popular ? 'ring-2 ring-purple-600 scale-105' : ''} hover:shadow-lg transition-all duration-500 ${
                  visibleSections.has('pricing')
                    ? 'opacity-100 translate-y-0'
                    : 'opacity-0 translate-y-10'
                }`}
                style={{ transitionDelay: `${index * 150 + 500}ms` }}
              >
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
                      <span className="text-lg text-gray-600 font-normal">
                        /month
                      </span>
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
                    className={`w-full ${
                      plan.popular
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
        </div>
      </section>

      {/* Testimonials Section */}
      <section
        ref={testimonialsRef}
        id="testimonials"
        className={`py-20 bg-white transition-all duration-1000 delay-400 ${
          visibleSections.has('testimonials')
            ? 'opacity-100 translate-y-0'
            : 'opacity-0 translate-y-10'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center space-y-4 mb-16">
            <Badge
              variant="secondary"
              className="bg-purple-100 text-purple-800"
            >
              Testimonials
            </Badge>
            <h2 className="text-3xl lg:text-5xl font-bold">
              Loved by{' '}
              <span className="bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                salon owners
              </span>
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                name: 'Sarah Johnson',
                role: 'Owner, Luxe Hair Studio',
                content:
                  "Carelytics transformed our business completely. We've increased our bookings by 40% and our clients love the seamless experience.",
                avatar:
                  'https://images.pexels.com/photos/733872/pexels-photo-733872.jpeg?auto=compress&cs=tinysrgb&w=150',
              },
              {
                name: 'Michael Chen',
                role: 'Manager, Urban Cuts',
                content:
                  'The analytics feature helps us make data-driven decisions. We can see exactly which services are popular and optimize our offerings.',
                avatar:
                  'https://images.pexels.com/photos/1043471/pexels-photo-1043471.jpeg?auto=compress&cs=tinysrgb&w=150',
              },
              {
                name: 'Emma Rodriguez',
                role: 'Owner, Bella Beauty Bar',
                content:
                  'Customer support is exceptional. They helped us migrate from our old system without any downtime. Highly recommended!',
                avatar:
                  'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=150',
              },
            ].map((testimonial, index) => (
              <Card
                key={index}
                className={`hover:shadow-lg transition-all duration-500 border-purple-100 ${
                  visibleSections.has('testimonials')
                    ? 'opacity-100 translate-y-0'
                    : 'opacity-0 translate-y-10'
                }`}
                style={{ transitionDelay: `${index * 150 + 600}ms` }}
              >
                <CardContent className="pt-6">
                  <div className="flex items-center mb-4">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className="w-4 h-4 text-yellow-400 fill-current"
                      />
                    ))}
                  </div>
                  <p className="text-gray-600 mb-6 italic">
                    "{testimonial.content}"
                  </p>
                  <div className="flex items-center">
                    <img
                      src={testimonial.avatar}
                      alt={testimonial.name}
                      className="w-12 h-12 rounded-full mr-4 object-cover"
                      loading="lazy"
                    />
                    <div>
                      <div className="font-semibold">{testimonial.name}</div>
                      <div className="text-sm text-gray-600">
                        {testimonial.role}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section
        ref={contactRef}
        id="contact"
        className={`py-20 bg-gradient-to-br from-purple-50 to-pink-50 transition-all duration-1000 delay-500 ${
          visibleSections.has('contact')
            ? 'opacity-100 translate-y-0'
            : 'opacity-0 translate-y-10'
        }`}
      >
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center space-y-4 mb-16">
            <Badge
              variant="secondary"
              className="bg-purple-100 text-purple-800"
            >
              Contact Us
            </Badge>
            <h2 className="text-3xl lg:text-5xl font-bold">
              Ready to get{' '}
              <span className="bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                started?
              </span>
            </h2>
            <p className="text-xl text-gray-600">
              Let's discuss how Carelytics can transform your business
            </p>
          </div>

          <Card className="border-purple-100">
            <CardContent
              className={`p-8 transition-all duration-700 delay-700 ${
                visibleSections.has('contact')
                  ? 'opacity-100 translate-y-0'
                  : 'opacity-0 translate-y-5'
              }`}
            >
              <form className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Name</label>
                    <Input
                      placeholder="Your name"
                      className="border-purple-200 focus:border-purple-600"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Email</label>
                    <Input
                      placeholder="your@email.com"
                      className="border-purple-200 focus:border-purple-600"
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Salon Name</label>
                  <Input
                    placeholder="Your salon name"
                    className="border-purple-200 focus:border-purple-600"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Message</label>
                  <Textarea
                    placeholder="Tell us about your salon and how we can help..."
                    className="border-purple-200 focus:border-purple-600 min-h-[120px]"
                  />
                </div>
                <Button
                  size="lg"
                  className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700"
                >
                  Send Message
                  <ChevronRight className="w-4 h-4 ml-2" />
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8">
            <div className="space-y-4">
              <div className="flex items-center space-x-2">
                {/* <div className="w-8 h-8 bg-gradient-to-r from-purple-600 to-pink-600 rounded-lg flex items-center justify-center">
                  <Scissors className="w-5 h-5 text-white" />
                </div> */}
                <Image src={Logo} width={100} height={100} alt="Logo" />
                <span className="text-xl font-bold">Carelytics</span>
              </div>
              <p className="text-gray-400">
                The complete salon management solution trusted by thousands of
                businesses worldwide.
              </p>
            </div>

            <div>
              <h3 className="font-semibold mb-4">Product</h3>
              <ul className="space-y-2 text-gray-400">
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Features
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Pricing
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    API
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Integrations
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="font-semibold mb-4">Company</h3>
              <ul className="space-y-2 text-gray-400">
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    About
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Blog
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Careers
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Contact
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="font-semibold mb-4">Support</h3>
              <ul className="space-y-2 text-gray-400">
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Help Center
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Documentation
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Community
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Status
                  </a>
                </li>
              </ul>
            </div>
          </div>

          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>
              &copy; {new Date().getFullYear()} Carelytics. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
