import { Github, Linkedin, Mail, Send, Twitter } from 'lucide-react';
import React from 'react';

interface ContactProps {
  email?: string;
  github?: string;
  linkedin?: string;
  twitter?: string;
}

export function Contact({
  email = 'petrushandikasinaga@gmail.com',
  github = 'https://github.com',
  linkedin = 'https://linkedin.com/in/petrushandika',
  twitter = 'https://twitter.com',
}: ContactProps) {
  const socialLinks = [
    { icon: Github, href: github, label: 'GitHub', color: 'hover:bg-gray-900 hover:text-white' },
    {
      icon: Linkedin,
      href: linkedin,
      label: 'LinkedIn',
      color: 'hover:bg-blue-600 hover:text-white',
    },
    { icon: Twitter, href: twitter, label: 'Twitter', color: 'hover:bg-black hover:text-white' },
  ];

  return (
    <section
      id="contact"
      className="py-24 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 relative overflow-hidden"
    >
      {/* Background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-primary-500/20 rounded-full blur-3xl" />
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-purple-500/20 rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto px-4 md:px-8 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          {/* Section Header */}
          <span className="inline-block px-4 py-1.5 bg-primary-500/20 text-primary-300 text-sm font-medium rounded-full mb-4">
            Get In Touch
          </span>

          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">Let's Work Together</h2>

          <p className="text-xl text-gray-300 mb-12 max-w-2xl mx-auto">
            Have a project in mind or want to collaborate? I'd love to hear from you. Let's create
            something amazing together.
          </p>

          {/* Email Button */}
          <div className="mb-12">
            <a
              href={`mailto:${email}`}
              className="inline-flex items-center gap-3 px-8 py-5 bg-gradient-to-r from-primary-600 to-purple-600 text-white text-lg font-semibold rounded-full hover:shadow-2xl hover:shadow-primary-500/25 hover:scale-105 transition-all duration-300"
            >
              <Mail className="w-6 h-6" />
              {email}
            </a>
          </div>

          {/* Social Links */}
          <div className="flex justify-center gap-4">
            {socialLinks.map((social) => {
              const Icon = social.icon;
              return (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`p-4 bg-white/10 text-white rounded-full border border-white/20 backdrop-blur-sm transition-all duration-300 hover:scale-110 ${social.color}`}
                  aria-label={social.label}
                >
                  <Icon className="w-6 h-6" />
                </a>
              );
            })}
          </div>

          {/* CTA Text */}
          <p className="mt-12 text-gray-400 text-sm">
            Also available for freelance work and consulting opportunities.
          </p>
        </div>
      </div>
    </section>
  );
}
