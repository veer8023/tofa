"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { MapPin, Phone, Mail, MessageCircle, Clock } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  })
  const [loading, setLoading] = useState(false)
  const { toast } = useToast()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    // Simulate form submission
    await new Promise((resolve) => setTimeout(resolve, 1000))

    toast({
      title: "Message sent!",
      description: "We'll get back to you within 24 hours.",
    })

    setFormData({ name: "", email: "", subject: "", message: "" })
    setLoading(false)
  }

  const faqs = [
    {
      question: "What areas do you deliver to?",
      answer:
        "We currently deliver to Himachal Pradesh, Chandigarh, Punjab, Haryana, and Delhi. We're expanding to more states soon!",
    },
    {
      question: "Are your products really 100% organic?",
      answer:
        "Yes! All our products are certified organic. We use no synthetic pesticides, herbicides, or fertilizers in our farming process.",
    },
    {
      question: "What's the difference between retail and wholesale pricing?",
      answer:
        "Wholesale pricing is available for bulk orders (minimum 10kg for fruits, 100ml for oils). Retailers and businesses can register for wholesale accounts.",
    },
    {
      question: "How fresh are the fruits when delivered?",
      answer:
        "We harvest fruits just before shipping and deliver within 2-3 days to ensure maximum freshness and nutritional value.",
    },
    {
      question: "Can I visit your farm?",
      answer:
        "We offer orchard stay experiences where you can visit our farm, participate in farming activities, and enjoy farm-to-table meals.",
    },
    {
      question: "What payment methods do you accept?",
      answer: "We accept all major credit/debit cards, UPI, net banking, and cash on delivery for orders above ₹500.",
    },
  ]

  return (
    <div className="min-h-screen bg-green-50">
      {/* Hero Section */}
      <section className="bg-green-600 text-white py-16">
        <div className="container text-center">
          <h1 className="text-4xl font-bold mb-4">Get in Touch</h1>
          <p className="text-xl max-w-2xl mx-auto">
            Have questions about our organic products or need support? We're here to help!
          </p>
        </div>
      </section>

      <div className="container py-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Form */}
          <Card>
            <CardHeader>
              <CardTitle>Send us a Message</CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Name</Label>
                    <Input
                      id="name"
                      placeholder="Your full name"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="your@email.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      required
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="subject">Subject</Label>
                  <Input
                    id="subject"
                    placeholder="What's this about?"
                    value={formData.subject}
                    onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="message">Message</Label>
                  <Textarea
                    id="message"
                    placeholder="Tell us how we can help..."
                    rows={5}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    required
                  />
                </div>
                <Button type="submit" className="w-full bg-green-600 hover:bg-green-700" disabled={loading}>
                  {loading ? "Sending..." : "Send Message"}
                </Button>
              </form>
            </CardContent>
          </Card>

          {/* Contact Information */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Contact Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-start space-x-3">
                  <MapPin className="h-5 w-5 text-green-600 mt-1" />
                  <div>
                    <div className="font-medium">Address</div>
                    <div className="text-gray-600">
                      TOFA Organic Farms
                      <br />
                      Village Kotgarh, Shimla District
                      <br />
                      Himachal Pradesh 171201, India
                    </div>
                  </div>
                </div>

                <div className="flex items-start space-x-3">
                  <Phone className="h-5 w-5 text-green-600 mt-1" />
                  <div>
                    <div className="font-medium">Phone</div>
                    <div className="text-gray-600">+91 98765 43210</div>
                  </div>
                </div>

                <div className="flex items-start space-x-3">
                  <Mail className="h-5 w-5 text-green-600 mt-1" />
                  <div>
                    <div className="font-medium">Email</div>
                    <div className="text-gray-600">info@tofa.com</div>
                  </div>
                </div>

                <div className="flex items-start space-x-3">
                  <Clock className="h-5 w-5 text-green-600 mt-1" />
                  <div>
                    <div className="font-medium">Business Hours</div>
                    <div className="text-gray-600">
                      Monday - Saturday: 9:00 AM - 6:00 PM
                      <br />
                      Sunday: 10:00 AM - 4:00 PM
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <MessageCircle className="h-5 w-5 text-green-600" />
                  <span>WhatsApp Support</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 mb-4">
                  Get instant support on WhatsApp for quick queries and order updates.
                </p>
                <Button className="w-full bg-green-500 hover:bg-green-600">
                  <MessageCircle className="h-4 w-4 mr-2" />
                  Chat on WhatsApp
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* FAQ Section */}
        <div className="mt-16">
          <Card>
            <CardHeader>
              <CardTitle className="text-center">Frequently Asked Questions</CardTitle>
            </CardHeader>
            <CardContent>
              <Accordion type="single" collapsible className="w-full">
                {faqs.map((faq, index) => (
                  <AccordionItem key={index} value={`item-${index}`}>
                    <AccordionTrigger>{faq.question}</AccordionTrigger>
                    <AccordionContent>{faq.answer}</AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
