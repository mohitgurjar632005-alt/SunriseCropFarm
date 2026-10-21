import React, { useState } from 'react';
import { Mail, Phone, MapPin, Clock, Send, CheckCircle2, MessageSquare, Sprout } from 'lucide-react';
import { useCart } from '../context/CartContext';

export const ContactPage: React.FC = () => {
  const { showToast } = useCart();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [subject, setSubject] = useState('Product Inquiry');
  const [message, setMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    showToast('Your message has been sent to our farm team!', 'success');
    setTimeout(() => {
      setName('');
      setEmail('');
      setPhone('');
      setMessage('');
      setSubmitted(false);
    }, 4000);
  };

  return (
    <div className="container mx-auto px-4 md:px-6 py-12 max-w-6xl space-y-16">
      {/* Title */}
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <span className="text-xs font-extrabold uppercase tracking-widest text-emerald-700 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200">
          Connect With Us
        </span>
        <h1 className="text-4xl md:text-5xl font-extrabold text-slate-900 tracking-tight">
          Contact SunriseCrop Farm
        </h1>
        <p className="text-base md:text-lg text-slate-600 leading-relaxed">
          We would love to hear from you. Whether you have questions about our products, farming practices, bulk grain deliveries, or partnerships, feel free to contact us.
        </p>
      </div>

      {/* Banner */}
      <div className="w-full rounded-3xl overflow-hidden bg-white shadow-sm border border-emerald-100 p-2 md:p-3">
        <img
          src="/assets/contact_us_banner_1782034915730-DVnYZW4v.jpg"
          alt="Contact SunriseCrop Farm"
          className="w-full max-h-[500px] object-cover rounded-2xl mx-auto bg-slate-50"
        />
      </div>

      {/* Grid: Info + Form */}
      <div className="grid lg:grid-cols-2 gap-12 items-start">
        {/* Left: Contact Info */}
        <div className="space-y-8">
          <div>
            <h2 className="text-2xl md:text-3xl font-extrabold text-slate-900 mb-3">
              Get in Touch Directly
            </h2>
            <p className="text-sm text-slate-600 leading-relaxed">
              Our farm office is open Monday through Saturday. We welcome inquiries from individual families, restaurants, and bulk grain distributors looking for clean organic harvests.
            </p>
          </div>

          <div className="space-y-4">
            <div className="flex items-start gap-4 p-5 bg-white rounded-2xl border border-emerald-100 shadow-2xs">
              <div className="p-3 bg-emerald-50 text-emerald-700 rounded-xl shrink-0">
                <MapPin className="w-6 h-6" />
              </div>
              <div>
                <h4 className="font-bold text-slate-900 text-sm">Farm Location</h4>
                <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                  125 Green Valley Road,
                  <br />
                  Harvest County, FR 98765
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4 p-5 bg-white rounded-2xl border border-emerald-100 shadow-2xs">
              <div className="p-3 bg-emerald-50 text-emerald-700 rounded-xl shrink-0">
                <Phone className="w-6 h-6" />
              </div>
              <div>
                <h4 className="font-bold text-slate-900 text-sm">Phone Support</h4>
                <p className="text-xs text-slate-600 mt-1">
                  <a href="tel:+15551234567" className="hover:text-emerald-700 font-semibold">
                    +1 (555) 123-4567
                  </a>
                </p>
                <p className="text-[11px] text-slate-400 mt-0.5">Toll-free customer assistance</p>
              </div>
            </div>

            <div className="flex items-start gap-4 p-5 bg-white rounded-2xl border border-emerald-100 shadow-2xs">
              <div className="p-3 bg-emerald-50 text-emerald-700 rounded-xl shrink-0">
                <Mail className="w-6 h-6" />
              </div>
              <div>
                <h4 className="font-bold text-slate-900 text-sm">Official Email</h4>
                <p className="text-xs text-slate-600 mt-1">
                  <a href="mailto:info@sunrisecropfarm.com" className="hover:text-emerald-700 font-semibold">
                    info@sunrisecropfarm.com
                  </a>
                </p>
                <p className="text-[11px] text-slate-400 mt-0.5">We reply within 24 business hours</p>
              </div>
            </div>

            <div className="flex items-start gap-4 p-5 bg-white rounded-2xl border border-emerald-100 shadow-2xs">
              <div className="p-3 bg-emerald-50 text-emerald-700 rounded-xl shrink-0">
                <Clock className="w-6 h-6" />
              </div>
              <div>
                <h4 className="font-bold text-slate-900 text-sm">Visiting & Operating Hours</h4>
                <p className="text-xs text-slate-600 mt-1">
                  Mon – Fri: 8:00 AM – 6:00 PM
                  <br />
                  Saturday: 9:00 AM – 4:00 PM
                  <br />
                  Sunday: Closed (Farm tours by prior appointment)
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Right: Message Form */}
        <div className="bg-white rounded-3xl p-8 md:p-10 border border-emerald-100 shadow-xl space-y-6">
          <div>
            <h3 className="text-xl font-bold text-slate-900">Send Us a Message</h3>
            <p className="text-xs text-slate-500 mt-1">
              Have a custom harvest requirement or questions regarding our organic certification?
            </p>
          </div>

          {submitted ? (
            <div className="p-6 bg-emerald-50 rounded-2xl border border-emerald-200 text-center space-y-3">
              <CheckCircle2 className="w-12 h-12 text-emerald-600 mx-auto" />
              <h4 className="text-lg font-bold text-emerald-950">Message Received!</h4>
              <p className="text-xs text-emerald-800">
                Thank you for reaching out. One of our farm agronomists will review your message and contact you promptly.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Your Full Name *
                </label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g. Ramesh Patel"
                  className="w-full text-xs font-medium px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:border-emerald-600"
                />
              </div>

              <div className="grid sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="you@example.com"
                    className="w-full text-xs font-medium px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:border-emerald-600"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Phone (Optional)
                  </label>
                  <input
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="+91 98234 56789"
                    className="w-full text-xs font-medium px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:border-emerald-600"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Subject
                </label>
                <select
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                  className="w-full text-xs font-medium px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:border-emerald-600 bg-white"
                >
                  <option value="Product Inquiry">Product Inquiry (Wheat, Corn, Rice)</option>
                  <option value="Home Delivery Question">Home Delivery Question</option>
                  <option value="Bulk / Wholesale Purchase">Bulk / Wholesale Purchase</option>
                  <option value="Farm Tour / Educational Visit">Farm Tour / Educational Visit</option>
                  <option value="Other">Other</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Your Message *
                </label>
                <textarea
                  required
                  rows={4}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="How can we assist you with our organic products?"
                  className="w-full text-xs font-medium px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:border-emerald-600"
                />
              </div>

              <button
                type="submit"
                className="w-full flex items-center justify-center gap-2 py-3.5 px-6 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-sm shadow-md transition-all cursor-pointer"
              >
                <span>Send Message</span>
                <Send className="w-4 h-4" />
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
