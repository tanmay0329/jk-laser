import Link from "next/link";
import { Phone, Mail, MapPin, Globe, Camera, Video, MessagesSquare } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-black border-t border-white/10 pt-16 pb-8">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          {/* Brand Info */}
          <div className="flex flex-col gap-6">
            <Link href="/" className="flex items-center group">
              <img src="/new_logo.png" alt="JK Laser Beed Logo" className="h-16 w-auto object-contain" />
            </Link>
            <p className="text-muted-foreground text-sm leading-relaxed">
              We are committed to delivering precision laser cutting solutions
              with unmatched quality and customer satisfaction.
            </p>
            <div className="flex items-center gap-4 mt-2">
              <a href="#" className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center text-white/70 hover:border-primary hover-gold transition-colors">
                <Globe size={18} />
              </a>
              <a href="#" className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center text-white/70 hover:border-primary hover-gold transition-colors">
                <Camera size={18} />
              </a>
              <a href="#" className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center text-white/70 hover:border-primary hover-gold transition-colors">
                <Video size={18} />
              </a>
              <a href="https://wa.me/919022313957" className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center text-white/70 hover:border-primary hover-gold transition-colors">
                <MessagesSquare size={18} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="flex flex-col gap-6">
            <h3 className="font-heading font-semibold text-lg text-white uppercase tracking-wider">Quick Links</h3>
            <ul className="flex flex-col gap-3">
              {[
                { name: "About Us", href: "/about" },
                { name: "Design Gallery", href: "/gallery" },
                { name: "Materials", href: "/materials" },
                { name: "Our Process", href: "/process" },
                { name: "Projects", href: "/projects" },
                { name: "Contact Us", href: "/contact" },
              ].map((link) => (
                <li key={link.name}>
                  <Link href={link.href} className="text-sm text-muted-foreground hover-gold transition-colors flex items-center gap-2">
                    <span className="w-1.5 h-1.5 bg-primary rounded-full"></span>
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div className="flex flex-col gap-6">
            <h3 className="font-heading font-semibold text-lg text-white uppercase tracking-wider">Contact Us</h3>
            <ul className="flex flex-col gap-4">
              <li className="flex items-start gap-3">
                <Phone className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                <span className="text-sm text-muted-foreground">+91 90223 13957</span>
              </li>
              <li className="flex items-start gap-3">
                <Mail className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                <span className="text-sm text-muted-foreground">info@jklaserbeed.com</span>
              </li>
              <li className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                <span className="text-sm text-muted-foreground leading-relaxed">
                  Jijamata Chowk, Beed, Maharashtra - 431122
                </span>
              </li>
            </ul>
            <a href="https://wa.me/919022313957" className="inline-flex items-center gap-2 border border-primary text-primary px-4 py-2 rounded-sm text-sm font-medium hover:bg-primary hover:text-black transition-colors self-start mt-2">
              <MessagesSquare size={16} />
              CHAT ON WHATSAPP
            </a>
          </div>

          {/* Design of the Month */}
          <div className="flex flex-col gap-6">
            <h3 className="font-heading font-semibold text-lg text-white uppercase tracking-wider">Design of the Month</h3>
            <div className="group relative overflow-hidden rounded-sm border border-white/10">
              <div className="aspect-[4/3] bg-[#121212] flex items-center justify-center p-4">
                <div className="w-full h-full border border-primary/30 flex items-center justify-center bg-black/50">
                  <span className="text-primary/50 font-heading text-sm text-center px-2">Premium Wall Panel<br/>P-125</span>
                </div>
              </div>
              <div className="absolute inset-x-0 bottom-0 bg-primary py-2 px-3 translate-y-full group-hover:translate-y-0 transition-transform">
                <p className="text-black text-xs font-bold text-center uppercase">View Details</p>
              </div>
            </div>
            <p className="text-center text-primary text-xs font-bold uppercase tracking-widest mt-2">
              "Precision Cut. Perfect Finish."
            </p>
          </div>
        </div>

        <div className="border-t border-white/10 pt-8 mt-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-xs text-muted-foreground">
            © {new Date().getFullYear()} JK Laser Beed. All rights reserved.
          </p>
          <div className="flex gap-4">
            <Link href="#" className="text-xs text-muted-foreground hover-gold transition-colors">Privacy Policy</Link>
            <Link href="#" className="text-xs text-muted-foreground hover-gold transition-colors">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
