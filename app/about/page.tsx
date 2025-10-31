import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'About Us - EliteSalon',
  description: 'Learn about EliteSalon and our mission to transform the salon industry with innovative management solutions.',
};

export default function About() {
  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-4xl mx-auto px-4 py-16">
        <h1 className="text-4xl font-bold mb-8">About EliteSalon</h1>
        <div className="prose max-w-none">
          <p className="text-lg text-gray-600 mb-6">
            EliteSalon was founded with a simple mission: to help salon owners focus on what they do best - 
            creating beautiful experiences for their clients - while we handle the business management complexities.
          </p>
          <p className="text-lg text-gray-600 mb-6">
            Our platform combines cutting-edge technology with deep industry knowledge to deliver a comprehensive 
            solution that scales with your business, from single-chair operations to multi-location salon chains.
          </p>
          <p className="text-lg text-gray-600">
            Join thousands of salon owners who have transformed their businesses with EliteSalon and discover 
            how our platform can help you increase efficiency, boost revenue, and create exceptional client experiences.
          </p>
        </div>
      </div>
    </div>
  );
}