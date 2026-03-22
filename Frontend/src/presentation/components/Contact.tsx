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
    <section id="contact" className="py-24 relative overflow-hidden">
      {/* Background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 right-1/4 w-[500px] h-[500px] bg-brand-500/10 rounded-full blur-[100px] animate-blob" />
        <div className="absolute bottom-0 left-1/4 w-[500px] h-[500px] bg-accent-500/10 rounded-full blur-[100px] animate-blob animation-delay-2000" />
      </div>

      <div className="container mx-auto px-4 md:px-8 relative z-10">
        {/* Consistent Section Header */}
        <div className="text-center md:text-left mb-16 flex flex-col md:flex-row md:items-end gap-6 border-b border-white/10 pb-6 w-full">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-100 tracking-tight flex items-center gap-4">
            <span className="text-brand-400 font-mono text-xl md:text-2xl font-normal">04.</span>
            What's Next?
          </h2>
          <div className="hidden md:block w-px h-8 bg-white/10 ml-4" />
          <span className="text-brand-400 font-mono text-sm tracking-wide">Get In Touch</span>
        </div>

        {/* Content Box */}
        <div className="w-full text-center glass-panel p-10 md:p-16 relative border border-brand-500/20 shadow-[0_0_30px_rgba(99,102,241,0.05)]">
          {/* Subtle grid in background of glass panel */}
          <div className="absolute inset-0 bg-grid-white/[0.02] bg-[length:32px_32px]" />

          <div className="relative z-10">
            <p className="text-xl text-gray-400 mb-12 max-w-3xl mx-auto font-light leading-relaxed">
              Have a project in mind or want to collaborate? I'd love to hear from you. Let's create
              something amazing together.
            </p>

            {/* Email Button */}
            <div className="mb-12">
              <a href={`mailto:${email}`} className="btn-primary">
                <Mail className="w-5 h-5" />
                <span>{email}</span>
              </a>
            </div>

            {/* Social Links */}
            <div className="flex justify-center gap-6">
              {socialLinks.map((social) => {
                const Icon = social.icon;
                return (
                  <a
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`p-4 bg-white/5 text-gray-400 rounded-full border border-white/10 backdrop-blur-sm transition-all duration-300 ${social.color}`}
                    aria-label={social.label}
                  >
                    <Icon className="w-6 h-6" />
                  </a>
                );
              })}
            </div>

            {/* CTA Text */}
            <p className="mt-12 text-gray-500 text-sm font-medium">
              Also available for freelance work and consulting opportunities.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
