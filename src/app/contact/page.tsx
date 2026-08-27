import type { Metadata } from 'next';
import { Mail, MapPin, Phone, MessageCircle, Clock } from 'lucide-react';
import Hero from '@/components/sections/Hero';
import { Button } from '@/components';
import Section from '@/layouts/Section';
import ContactForm from '@/components/sections/ContactForm';
import ContactInfo from '@/components/sections/ContactInfo';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Contact Us | BZB - Born to Win',
  description:
    'Get in touch with BZB. Contact us for inquiries about properties, investment opportunities, or the referral program.',
  keywords: ['contact', 'get in touch', 'support', 'inquiry', 'BZB'],
};

export default function ContactPage() {
  return (
    <>
      {/* Hero */}
      <Hero
        title={
          <span>
            Get in Touch with <span className="gradient-text">BZB</span>
          </span>
        }
        subtitle="We're here to help"
        description="Have questions about our properties, investment opportunities, or the referral program? Contact us today and let us help you get started on your journey with BZB."
      >
        <Link href="#contact-form">
          <Button>Send Message</Button>
        </Link>
      </Hero>

      {/* Contact Methods */}
      <Section variant="alt">
        <div className="text-center mb-16">
          <h2 className="section-title">Multiple Ways to Connect</h2>
          <p className="text-gray-400 text-xl max-w-2xl mx-auto">
            Choose the communication method that works best for you
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            {
              icon: Phone,
              title: 'Phone',
              details: ['+91 77320 05003', '+91 98417 68255'],
              action: 'Call Us',
            },
            {
              icon: Mail,
              title: 'Email',
              details: ['bzb000777@gmail.com'],
              action: 'Email Us',
            },
            {
              icon: MessageCircle,
              title: 'Live Chat',
              details: ['Mon-Fri', '10 AM - 6 PM IST'],
              action: 'Start Chat',
            },
            {
              icon: Clock,
              title: 'Response Time',
              details: ['Within 24 hours', 'Business days'],
              action: 'Quick Reply',
            },
          ].map((method, index) => (
            <div
              key={index}
              className="p-6 rounded-xl bg-dark-800 border border-dark-700 hover:border-primary-500 transition-colors text-center"
            >
              <method.icon className="w-8 h-8 text-primary-500 mx-auto mb-4" />
              <h3 className="text-lg font-bold text-white mb-3">{method.title}</h3>
              {method.details.map((detail, i) => (
                <p key={i} className="text-gray-400 text-sm mb-1">
                  {detail}
                </p>
              ))}
            </div>
          ))}
        </div>
      </Section>

      {/* Contact Information */}
      <Section>
        <div className="text-center mb-16">
          <h2 className="section-title">Contact Information</h2>
          <p className="text-gray-400 text-xl max-w-2xl mx-auto">
            Reach out to us through any of these channels
          </p>
        </div>
        <ContactInfo />
      </Section>

      {/* Contact Form Section */}
      <Section variant="alt" id="contact-form">
        <div className="max-w-2xl mx-auto">
          <h2 className="section-title text-center mb-12">Send us a Message</h2>
          <ContactForm />
          <p className="text-gray-500 text-sm text-center mt-6">
            Your information is secure and will only be used to respond to your inquiry.
          </p>
        </div>
      </Section>

      {/* Office Hours */}
      <Section>
        <div className="max-w-4xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            {/* Office Details */}
            <div>
              <h3 className="text-2xl font-bold text-white mb-6">Office Hours</h3>
              <div className="space-y-4">
                {[
                  { day: 'Monday - Friday', time: '10:00 AM - 6:00 PM' },
                  { day: 'Saturday', time: '10:00 AM - 4:00 PM' },
                  { day: 'Sunday', time: 'Closed' },
                  { day: 'Holidays', time: 'Closed' },
                ].map((hour, index) => (
                  <div
                    key={index}
                    className="flex justify-between items-center pb-3 border-b border-dark-700"
                  >
                    <span className="text-gray-400">{hour.day}</span>
                    <span className="text-white font-semibold">{hour.time}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Head Office */}
            <div>
              <h3 className="text-2xl font-bold text-white mb-6">Head Office</h3>
              <div className="space-y-6">
                <div className="flex gap-4">
                  <MapPin className="w-6 h-6 text-primary-500 flex-shrink-0 mt-1" />
                  <div>
                    <p className="font-semibold text-white mb-1">Address</p>
                    <p className="text-gray-400">
                      4-A East Cross Road, Gandhi Nagar,
                      <br />
                      Vellore - 632007, India
                    </p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <Phone className="w-6 h-6 text-primary-500 flex-shrink-0 mt-1" />
                  <div>
                    <p className="font-semibold text-white mb-1">Phone</p>
                    <div className="space-y-1">
                      <p className="text-gray-400">+91 77320 05003</p>
                      <p className="text-gray-400">+91 98417 68255</p>
                    </div>
                  </div>
                </div>

                <div className="flex gap-4">
                  <Mail className="w-6 h-6 text-primary-500 flex-shrink-0 mt-1" />
                  <div>
                    <p className="font-semibold text-white mb-1">Email</p>
                    <a
                      href="mailto:bzb000777@gmail.com"
                      className="text-primary-400 hover:text-primary-300 transition-colors"
                    >
                      bzb000777@gmail.com
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Section>

      {/* Map Section */}
      <Section variant="alt">
        <div className="text-center mb-12">
          <h2 className="section-title">Find Us on the Map</h2>
          <p className="text-gray-400 text-lg">Visit our office in Vellore</p>
        </div>
        <div className="rounded-2xl overflow-hidden shadow-2xl bg-dark-800 h-96 flex items-center justify-center border border-dark-700">
          <div className="text-center">
            <MapPin className="w-16 h-16 text-primary-500 mx-auto mb-4" />
            <p className="text-gray-400 text-lg">
              Interactive map would be embedded here
              <br />
              <span className="text-sm">
                Location: 4-A East Cross Road, Gandhi Nagar, Vellore - 632007
              </span>
            </p>
          </div>
        </div>
      </Section>

      {/* FAQ Quick Links */}
      <Section>
        <div className="text-center mb-12">
          <h2 className="section-title">Common Questions?</h2>
          <p className="text-gray-400 text-xl max-w-2xl mx-auto">
            Check out our FAQ sections for quick answers
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            {
              title: 'About BZB',
              description: 'Learn more about our company and mission',
              link: '/bzb',
            },
            {
              title: 'Referral Program',
              description: 'Understand how to grow and earn rewards',
              link: '/referral',
            },
            {
              title: 'About Us',
              description: 'Explore our story and values',
              link: '/about',
            },
          ].map((faq, index) => (
            <Link key={index} href={faq.link}>
              <div className="p-6 rounded-xl bg-dark-800 border border-dark-700 hover:border-primary-500 transition-colors cursor-pointer">
                <h4 className="text-lg font-bold text-white mb-2">{faq.title}</h4>
                <p className="text-gray-400 text-sm mb-4">{faq.description}</p>
                <span className="text-primary-500 font-semibold text-sm">Learn More →</span>
              </div>
            </Link>
          ))}
        </div>
      </Section>

      {/* CTA */}
      <Section variant="alt">
        <div className="text-center">
          <h2 className="section-title mb-4">Ready to Connect?</h2>
          <p className="text-gray-400 text-xl max-w-2xl mx-auto mb-8">
            Reach out to us today. We look forward to hearing from you.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="#contact-form">
              <Button>Send Message</Button>
            </Link>
            <Link href="/bzb">
              <Button variant="secondary">Become a Member</Button>
            </Link>
          </div>
        </div>
      </Section>
    </>
  );
}
