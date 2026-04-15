// components/Footer/Footer.tsx
import Link from 'next/link';
import { 
  Phone, 
  Mail, 
  MapPin, 
  Globe,
  Send,
  Camera,
  PlayCircle,
  CreditCard,
  Shield,
  Truck,
  RefreshCw,
  Heart,
  ShoppingBag,
  Sparkles
} from 'lucide-react';

export default function Footer() {
  const currentYear = new Date().getFullYear();
  const linkClassName = "text-slate-400 hover:text-indigo-400 transition-colors text-sm";

  const shopLinks = [
    { href: "/products", label: "All Products" },
    { href: "/categories", label: "Categories" },
    { href: "/brands", label: "Brands" },
    { href: "/products?category=electronics", label: "Electronics" },
    { href: "/products?category=mens-fashion", label: "Men's Fashion" },
    { href: "/products?category=womens-fashion", label: "Women's Fashion" },
  ];

  const accountLinks = [
    { href: "/profile", label: "My Account" },
    { href: "/profile/orders", label: "Order History" },
    { href: "/wishlist", label: "Wishlist" },
    { href: "/cart", label: "Shopping Cart" },
    { href: "/login", label: "Sign In" },
    { href: "/signup", label: "Create Account" },
  ];

  const supportLinks = [
    { href: "/contact", label: "Contact Us" },
    { href: "/help", label: "Help Center" },
    { href: "/shipping", label: "Shipping Info" },
    { href: "/returns", label: "Returns & Refunds" },
    { href: "/track-order", label: "Track Order" },
  ];

  const legalLinks = [
    { href: "/privacy", label: "Privacy Policy" },
    { href: "/terms", label: "Terms of Service" },
    { href: "/cookies", label: "Cookie Policy" },
  ];

  const socialLinks = [
    { href: "https://facebook.com", icon: Globe, label: "Facebook" },
    { href: "https://twitter.com", icon: Send, label: "Twitter" },
    { href: "https://instagram.com", icon: Camera, label: "Instagram" },
    { href: "https://youtube.com", icon: PlayCircle, label: "YouTube" },
  ];

  return (
    <footer className="bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white">
      {/* Main Footer */}
      <div className="container mx-auto px-4 py-12 lg:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8 lg:gap-12">
          
          {/* Brand Column */}
          <div className="lg:col-span-4">
            {/* Logo */}
            <Link href="/" className="inline-block mb-6 group">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-gradient-to-br from-indigo-500 to-purple-500 rounded-xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                  <Sparkles className="w-5 h-5 text-white" />
                </div>
                <div>
                  <span className="font-bold text-2xl tracking-tight bg-gradient-to-r from-white to-indigo-200 bg-clip-text text-transparent">
                    Lumina
                  </span>
                  <p className="text-[10px] text-slate-400 -mt-1 tracking-wide">PREMIUM STORE</p>
                </div>
              </div>
            </Link>

            {/* Description */}
            <p className="text-slate-400 mb-6 text-sm leading-relaxed">
              Lumina is your one-stop destination for quality products. From fashion to electronics, 
              we bring you the best brands at competitive prices with a seamless shopping experience.
            </p>

            {/* Contact Info */}
            <div className="space-y-3 mb-6">
              <Link href="tel:+18001234567" className="flex items-center gap-3 text-slate-400 hover:text-indigo-400 transition-colors text-sm group">
                <div className="w-8 h-8 rounded-lg bg-slate-800 flex items-center justify-center group-hover:bg-indigo-600 transition-colors">
                  <Phone className="w-4 h-4" />
                </div>
                <span>+1 (800) 123-4567</span>
              </Link>
              
              <Link href="mailto:support@lumina.com" className="flex items-center gap-3 text-slate-400 hover:text-indigo-400 transition-colors text-sm group">
                <div className="w-8 h-8 rounded-lg bg-slate-800 flex items-center justify-center group-hover:bg-indigo-600 transition-colors">
                  <Mail className="w-4 h-4" />
                </div>
                <span>support@lumina.com</span>
              </Link>
              
              <div className="flex items-start gap-3 text-slate-400 text-sm group">
                <div className="w-8 h-8 rounded-lg bg-slate-800 flex items-center justify-center flex-shrink-0 group-hover:bg-indigo-600 transition-colors">
                  <MapPin className="w-4 h-4" />
                </div>
                <span>123 Commerce Street, New York, NY 10001</span>
              </div>
            </div>

            {/* Social Links */}
            <div className="flex items-center gap-3">
              {socialLinks.map((social) => (
                <Link
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={social.label}
                  className="w-10 h-10 rounded-xl bg-slate-800 flex items-center justify-center text-slate-400 hover:bg-indigo-600 hover:text-white transition-all hover:scale-110"
                >
                  <social.icon className="w-4 h-4" />
                </Link>
              ))}
            </div>
          </div>

          {/* Shop Links */}
          <div className="lg:col-span-2">
            <h3 className="font-semibold text-lg mb-5 flex items-center gap-2">
              <ShoppingBag className="w-4 h-4 text-indigo-400" />
              Shop
            </h3>
            <ul className="space-y-3">
              {shopLinks.map((item) => (
                <li key={item.href}>
                  <Link href={item.href} className={linkClassName}>
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Account Links */}
          <div className="lg:col-span-2">
            <h3 className="font-semibold text-lg mb-5 flex items-center gap-2">
              <Heart className="w-4 h-4 text-rose-400" />
              Account
            </h3>
            <ul className="space-y-3">
              {accountLinks.map((item) => (
                <li key={item.href}>
                  <Link href={item.href} className={linkClassName}>
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Support Links */}
          <div className="lg:col-span-2">
            <h3 className="font-semibold text-lg mb-5 flex items-center gap-2">
              <Truck className="w-4 h-4 text-emerald-400" />
              Support
            </h3>
            <ul className="space-y-3">
              {supportLinks.map((item) => (
                <li key={item.href}>
                  <Link href={item.href} className={linkClassName}>
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal Links */}
          <div className="lg:col-span-2">
            <h3 className="font-semibold text-lg mb-5 flex items-center gap-2">
              <Shield className="w-4 h-4 text-purple-400" />
              Legal
            </h3>
            <ul className="space-y-3">
              {legalLinks.map((item) => (
                <li key={item.href}>
                  <Link href={item.href} className={linkClassName}>
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Trust Badges Section */}
      <div className="border-t border-slate-800 bg-slate-900/50">
        <div className="container mx-auto px-4 py-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-indigo-600/20 flex items-center justify-center">
                <Truck className="w-5 h-5 text-indigo-400" />
              </div>
              <div>
                <p className="font-semibold text-sm">Free Shipping</p>
                <p className="text-xs text-slate-400">On orders over $50</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-emerald-600/20 flex items-center justify-center">
                <RefreshCw className="w-5 h-5 text-emerald-400" />
              </div>
              <div>
                <p className="font-semibold text-sm">30 Days Return</p>
                <p className="text-xs text-slate-400">Easy returns policy</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-purple-600/20 flex items-center justify-center">
                <Shield className="w-5 h-5 text-purple-400" />
              </div>
              <div>
                <p className="font-semibold text-sm">Secure Payment</p>
                <p className="text-xs text-slate-400">100% secure checkout</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-rose-600/20 flex items-center justify-center">
                <Heart className="w-5 h-5 text-rose-400" />
              </div>
              <div>
                <p className="font-semibold text-sm">24/7 Support</p>
                <p className="text-xs text-slate-400">Dedicated assistance</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-slate-800">
        <div className="container mx-auto px-4 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            {/* Copyright */}
            <p className="text-slate-500 text-sm text-center md:text-left">
              © {currentYear} Lumina. All rights reserved.
            </p>

            {/* Payment Methods */}
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2 text-slate-500 text-sm">
                <CreditCard className="w-4 h-4" />
                <span>Visa</span>
              </div>
              <div className="flex items-center gap-2 text-slate-500 text-sm">
                <CreditCard className="w-4 h-4" />
                <span>Mastercard</span>
              </div>
              <div className="flex items-center gap-2 text-slate-500 text-sm">
                <CreditCard className="w-4 h-4" />
                <span>PayPal</span>
              </div>
            </div>

          </div>
        </div>
      </div>
    </footer>
  );
}