import { Github, Linkedin, Mail } from 'lucide-react'
import Tooltip from './Tooltip'

export default function Footer() {
  return (
    <footer className="py-12 border-t border-border">
      <div className="container px-4 mx-auto">
        <div className="flex flex-col items-center justify-center space-y-4">
          <div className="flex space-x-6">
            <a
              href="https://www.linkedin.com/in/joeldzs44"
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-foreground transition-colors"
            >
              <Tooltip message='linkedin.com/in/joeldzs44'>
                <Linkedin className="w-6 h-6" />
                <span className="sr-only">LinkedIn</span>
              </Tooltip>
            </a>
            
            <a
              href="https://github.com/joeldzs44/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-foreground transition-colors"
            >
              <Tooltip message='github.com/joeldzs44'>
                <Github className="w-6 h-6" />
                <span className="sr-only">GitHub</span>
              </Tooltip>
            </a>

            <a
              href="mailto:joeldzs44@gmail.com"
              className="text-muted-foreground hover:text-foreground transition-colors"
            >
              {/* add tooltip which shows id */}
              <Tooltip message='joeldzs44@gmail.com'>
                <Mail className="w-6 h-6" />
                <span className="sr-only">Email</span>
              </Tooltip>
            </a>
          </div>
          <p className="text-sm text-muted-foreground">
            &copy; {new Date().getFullYear()} Joel Dsouza. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}

