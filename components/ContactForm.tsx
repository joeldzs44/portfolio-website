'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Send } from 'lucide-react'

export default function ContactForm({ id }: { id?: string }) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData(prevState => ({ ...prevState, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    
    console.log('Submitting form:', formData)
    console.log('Form STRINGIFY:', JSON.stringify(formData))

    await fetch('/api/contact', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(formData)
    })
      .then(response => response.json())
      .then(data => {
        console.log('Success:', data)
        alert('Thank you for your message!')
        setFormData({ name: '', email: '', message: '' })
      })
      .catch(error => {
        console.error('Error:', error)
        alert('There was an error submitting your message. Please try again later.')
      })
  }

  return (
    <section id={id} className="py-12">
      <div className="container mx-auto px-4 md:px-6 backdrop-blur-sm">
        <div className="max-w-6xl mx-auto">
          <motion.div 
            className="mb-16 text-center"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-3xl font-medium mb-3 text-primary dark:text-accent">// Let's Connect</h2>
            <p className="mt-4 max-w-2xl mx-auto">
              Have a project in mind? Let's discuss how we can work together.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="max-w-xl mx-auto"
          >
            <div className="bg-card/80 transition-all duration-300 rounded-xl p-8 border border-border/50">
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-4">
                  <div>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      placeholder="Name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 bg-background/50 border border-border/50 rounded-lg focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary text-foreground transition-all placeholder:text-muted-foreground"
                    />
                  </div>
                  <div>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      placeholder="Email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 bg-background/50 border border-border/50 rounded-lg focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary text-foreground transition-all placeholder:text-muted-foreground"
                    />
                  </div>
                  <div>
                    <textarea
                      id="message"
                      name="message"
                      placeholder="Message"
                      value={formData.message}
                      onChange={handleChange}
                      required
                      rows={4}
                      className="w-full px-4 py-3 bg-background/50 border border-border/50 rounded-lg focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary text-foreground transition-all placeholder:text-muted-foreground resize-none"
                    />
                  </div>
                </div>
                
                <motion.button
                  type="submit"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full inline-flex items-center justify-center bg-accent hover:bg-accent/90 text-accent-foreground font-medium py-3 px-4 rounded-lg transition-colors group"
                >
                  <span>Send Message</span>
                  <Send className="w-4 h-4 ml-2 transition-transform group-hover:translate-x-1" />
                </motion.button>
              </form>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

