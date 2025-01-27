'use client'

import { useState } from 'react'

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
    <section id={id} className="py-20 bg-card">
      <div className="container px-4 mx-auto">
        <h2 className="text-3xl font-bold mb-12 text-center animate-fade-in">GET IN TOUCH</h2>
        <div className="text-center mb-8 animate-slide-up">
        </div>
        <form onSubmit={handleSubmit} className="max-w-lg mx-auto animate-scale-in">
          <div className="mb-4">
            <input
              type="text"
              id="name"
              name="name"
              placeholder="Name"
              value={formData.name}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 bg-background border border-border rounded-lg focus:outline-none focus:border-primary text-foreground transition-colors"
            />
          </div>
          <div className="mb-4">
            <input
              type="email"
              id="email"
              name="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 bg-background border border-border rounded-lg focus:outline-none focus:border-primary text-foreground transition-colors"
            />
          </div>
          <div className="mb-4">
            <textarea
              id="message"
              name="message"
              placeholder="Message"
              value={formData.message}
              onChange={handleChange}
              required
              rows={4}
              className="w-full px-4 py-3 bg-background border border-border rounded-lg focus:outline-none focus:border-primary text-foreground transition-colors"
            ></textarea>
          </div>
          <button
            type="submit"
            className="w-full bg-primary text-primary-foreground font-bold py-3 px-4 rounded-lg hover:bg-primary/90 transition-colors hover-lift"
          >
            Send Message
          </button>
        </form>
      </div>
    </section>
  )
}

