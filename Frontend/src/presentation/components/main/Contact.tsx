import { Github, Linkedin, Mail, Twitter } from 'lucide-react';
import React from 'react';

interface ContactProps {
  email?: string;
  github?: string;
  linkedin?: string;
  twitter?: string;
}

export function Contact({
  email = 'petrushandikasinaga@gmail.com',
  github = 'https://github.com/petrushandika',
  linkedin = 'https://linkedin.com/in/petrushandika',
  twitter = 'https://twitter.com/petrushandika',
}: ContactProps) {
  const socialLinks = [
    {
      icon: Github,
      href: github,
      label: 'GitHub',
      color:
        'hover:border-brand-500 hover:text-brand-400 hover:bg-brand-500/10 hover:-translate-y-1',
    },
    {
      icon: Linkedin,
      href: linkedin,
      label: 'LinkedIn',
      color:
        'hover:border-[#0077b5] hover:text-[#0077b5] hover:bg-[#0077b5]/10 hover:-translate-y-1',
    },
    {
      icon: Twitter,
      href: twitter,
      label: 'Twitter',
      color:
        'hover:border-[#1DA1F2] hover:text-[#1DA1F2] hover:bg-[#1DA1F2]/10 hover:-translate-y-1',
    },
  ];

  return (
    <section id="contact" className="relative overflow-hidden">
      {/* Background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 right-1/4 w-[500px] h-[500px] bg-brand-500/10 rounded-full blur-[100px] animate-blob" />
        <div className="absolute bottom-0 left-1/4 w-[500px] h-[500px] bg-accent-500/10 rounded-full blur-[100px] animate-blob animation-delay-2000" />
      </div>

      <div className="container mx-auto px-4 md:px-8 relative z-10">
        {/* Consistent Section Header */}
        <div className="text-left items-start md:items-end mb-16 flex flex-col md:flex-row gap-6 border-b border-white/10 pb-6 w-full">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-100 tracking-tight flex items-center gap-4">
            <span className="text-brand-400 font-mono text-xl md:text-2xl font-normal">06.</span>
            What's Next?
          </h2>
          <div className="hidden md:block w-px h-8 bg-white/10 ml-4" />
          <span className="text-brand-400 font-mono text-sm tracking-wide">Get In Touch</span>
        </div>

        {/* Content Box */}
        <div className="w-full text-center glass-panel p-10 md:p-16 relative border border-brand-500/20 shadow-[0_0_30px_rgba(99,102,241,0.05)]">
          {/* Subtle grid in background of glass panel */}
          <div className="absolute inset-0 bg-grid-white/[0.02] bg-[length:32px_32px]" />

          <div className="relative z-10 flex flex-col lg:flex-row gap-12 text-left">
            {/* Left Column: Info */}
            <div className="flex-1 flex flex-col justify-center">
              <p className="text-xl md:text-2xl text-white font-bold mb-4 tracking-tight">
                Let's create something amazing together.
              </p>
              <p className="text-gray-400 mb-8 font-light leading-relaxed">
                Have a project in mind, a question, or want to collaborate? I'd love to hear from
                you. Whether you prefer email, or directly sending a message on this form, I usually
                reply within 24 hours.
              </p>

              {/* Social Links */}
              <div className="flex justify-start gap-4 mb-8">
                {socialLinks.map((social) => {
                  const Icon = social.icon;
                  return (
                    <a
                      key={social.label}
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`p-3 bg-white/5 text-gray-400 rounded-xl border border-white/10 backdrop-blur-sm transition-all duration-300 ${social.color}`}
                      aria-label={social.label}
                    >
                      <Icon className="w-5 h-5" />
                    </a>
                  );
                })}
              </div>

              {/* Info Details */}
              <div className="space-y-4 border-t border-white/10 pt-6">
                <div className="flex items-center gap-3 text-gray-300">
                  <Mail className="w-5 h-5 text-brand-400" />
                  <a
                    href={`mailto:${email}`}
                    className="text-sm hover:text-white transition-colors"
                  >
                    {email}
                  </a>
                </div>
                <p className="text-gray-500 text-xs mt-4">
                  Also available for freelance work and consulting opportunities.
                </p>
              </div>
            </div>

            {/* Right Column: Contact Form */}
            <div className="flex-1 bg-white/5 border border-white/10 rounded-2xl p-6 md:p-8 backdrop-blur-md">
              <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
                <div>
                  <label
                    htmlFor="name"
                    className="block text-xs uppercase tracking-wider text-gray-400 mb-2"
                  >
                    Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    required
                    className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-white focus:border-white focus:outline-none focus:ring-1 focus:ring-white text-sm"
                    placeholder="Your Name"
                  />
                </div>
                <div>
                  <label
                    htmlFor="form_email"
                    className="block text-xs uppercase tracking-wider text-gray-400 mb-2"
                  >
                    Email
                  </label>
                  <input
                    type="email"
                    id="form_email"
                    required
                    className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-white focus:border-white focus:outline-none focus:ring-1 focus:ring-white text-sm"
                    placeholder="your@email.com"
                  />
                </div>
                <div>
                  <label
                    htmlFor="message"
                    className="block text-xs uppercase tracking-wider text-gray-400 mb-2"
                  >
                    Message
                  </label>
                  <textarea
                    id="message"
                    required
                    rows={4}
                    className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-white focus:border-white focus:outline-none focus:ring-1 focus:ring-white text-sm"
                    placeholder="Tell me about your project..."
                  />
                </div>
                <button
                  type="submit"
                  className="w-full btn-primary py-3 rounded-xl flex justify-center text-sm font-semibold mt-6"
                >
                  <span>Send Message</span>
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
