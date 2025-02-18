"use client"

import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { Menu, X } from 'lucide-react'
import { ThemeToggle } from './theme-toggle'
import logo from '@/app/assets/logo.svg'

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-primary/10 dark:border-accent/10">
      <div className="container mx-auto px-4 py-3">
        <div className="flex items-center justify-between mx-2 md:mx-0">
          <Link 
            href="/" 
            className="relative group"
          >
            <div className="absolute -inset-2 rounded-lg bg-primary/5 dark:bg-accent/5 opacity-0" />
            <Image 
              src={logo} 
              alt="Logo" 
              width={36} 
              height={36} 
              className="relative"
            />
          </Link>
          
          <nav className="hidden md:flex items-center">
            <div className="flex items-center gap-8 px-8 py-1.5 rounded-full bg-card/40 border border-primary/20 dark:border-accent/20 backdrop-blur-sm">
              <Link 
                href="/#hero" 
                className="text-sm text-muted-foreground hover:text-primary dark:hover:text-accent transition-colors relative group"
              >
                <span className="relative z-10">Home</span>
                <span className="absolute inset-x-0 -bottom-0.5 h-0.5 bg-primary dark:bg-accent transform origin-left scale-x-0 group-hover:scale-x-100 transition-transform" />
              </Link>
              <Link 
                href="/projects" 
                className="text-sm text-muted-foreground hover:text-primary dark:hover:text-accent transition-colors relative group"
              >
                <span className="relative z-10">Projects</span>
                <span className="absolute inset-x-0 -bottom-0.5 h-0.5 bg-primary dark:bg-accent transform origin-left scale-x-0 group-hover:scale-x-100 transition-transform" />
              </Link>
              <Link 
                href="/blog" 
                className="text-sm text-muted-foreground hover:text-primary dark:hover:text-accent transition-colors relative group"
              >
                <span className="relative z-10">Blog</span>
                <span className="absolute inset-x-0 -bottom-0.5 h-0.5 bg-primary dark:bg-accent transform origin-left scale-x-0 group-hover:scale-x-100 transition-transform" />
              </Link>
            </div>
          </nav>

          <div className="flex items-center gap-6">
            <ThemeToggle />
            <button
              className="md:hidden relative group"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              <div className="absolute -inset-2 rounded-lg bg-primary/5 dark:bg-accent/5 opacity-0 group-hover:opacity-100 transition-opacity" />
              {isMenuOpen ? (
                <X className="h-5 w-5 relative" />
              ) : (
                <Menu className="h-5 w-5 relative" />
              )}
              <span className="sr-only">Toggle menu</span>
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <nav className="md:hidden py-4 animate-fade-in">
            <div className="flex flex-col space-y-3 items-end">
              <Link
                href="/#hero"
                className="text-sm text-muted-foreground hover:text-primary dark:hover:text-accent transition-colors px-4 py-2 rounded-lg hover:bg-card/40"
                onClick={() => setIsMenuOpen(false)}
              >
                Home
              </Link>
              <Link
                href="/projects"
                className="text-sm text-muted-foreground hover:text-primary dark:hover:text-accent transition-colors px-4 py-2 rounded-lg hover:bg-card/40"
                onClick={() => setIsMenuOpen(false)}
              >
                Projects
              </Link>
              <Link
                href="/blog"
                className="text-sm text-muted-foreground hover:text-primary dark:hover:text-accent transition-colors px-4 py-2 rounded-lg hover:bg-card/40"
                onClick={() => setIsMenuOpen(false)}
              >
                Blog
              </Link>
            </div>
          </nav>
        )}
      </div>
    </header>
  )
}

