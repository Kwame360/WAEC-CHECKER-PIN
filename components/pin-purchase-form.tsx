"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Loader2, CreditCard, Mail, Phone } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

interface FormData {
  email: string
  phone: string
  confirmEmail: string
}

export function PinPurchaseForm() {
  const [formData, setFormData] = useState<FormData>({
    email: "",
    phone: "",
    confirmEmail: "",
  })
  const [isLoading, setIsLoading] = useState(false)
  const [errors, setErrors] = useState<Partial<FormData>>({})
  const { toast } = useToast()

  const validateForm = (): boolean => {
    const newErrors: Partial<FormData> = {}

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!formData.email) {
      newErrors.email = "Email is required"
    } else if (!emailRegex.test(formData.email)) {
      newErrors.email = "Please enter a valid email address"
    }

    // Confirm email validation
    if (!formData.confirmEmail) {
      newErrors.confirmEmail = "Please confirm your email"
    } else if (formData.email !== formData.confirmEmail) {
      newErrors.confirmEmail = "Emails do not match"
    }

    // Phone validation
    const phoneRegex = /^(\+234|0)[789][01]\d{8}$/
    if (!formData.phone) {
      newErrors.phone = "Phone number is required"
    } else if (!phoneRegex.test(formData.phone.replace(/\s/g, ""))) {
      newErrors.phone = "Please enter a valid Nigerian phone number"
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleInputChange = (field: keyof FormData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: undefined }))
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!validateForm()) {
      toast({
        title: "Validation Error",
        description: "Please fix the errors in the form",
        variant: "destructive",
      })
      return
    }

    setIsLoading(true)

    try {
      // This will be implemented in the next task (Paystack integration)
      const response = await fetch("/api/purchase-pin", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: formData.email,
          phone: formData.phone,
          amount: 50000, // 500 NGN in kobo
        }),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || "Failed to initiate payment")
      }

      // Redirect to Paystack payment page
      if (data.authorization_url) {
        window.location.href = data.authorization_url
      }
    } catch (error) {
      console.error("Purchase error:", error)
      toast({
        title: "Purchase Failed",
        description: error instanceof Error ? error.message : "Something went wrong. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <CreditCard className="h-5 w-5" />
          Purchase Pin
        </CardTitle>
        <CardDescription>Enter your details to purchase a BECE results checking pin</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Email Field */}
          <div className="space-y-2">
            <Label htmlFor="email" className="flex items-center gap-2">
              <Mail className="h-4 w-4" />
              Email Address
            </Label>
            <Input
              id="email"
              type="email"
              placeholder="your.email@example.com"
              value={formData.email}
              onChange={(e) => handleInputChange("email", e.target.value)}
              className={errors.email ? "border-destructive" : ""}
              disabled={isLoading}
            />
            {errors.email && <p className="text-sm text-destructive">{errors.email}</p>}
          </div>

          {/* Confirm Email Field */}
          <div className="space-y-2">
            <Label htmlFor="confirmEmail">Confirm Email Address</Label>
            <Input
              id="confirmEmail"
              type="email"
              placeholder="Confirm your email address"
              value={formData.confirmEmail}
              onChange={(e) => handleInputChange("confirmEmail", e.target.value)}
              className={errors.confirmEmail ? "border-destructive" : ""}
              disabled={isLoading}
            />
            {errors.confirmEmail && <p className="text-sm text-destructive">{errors.confirmEmail}</p>}
          </div>

          {/* Phone Field */}
          <div className="space-y-2">
            <Label htmlFor="phone" className="flex items-center gap-2">
              <Phone className="h-4 w-4" />
              Phone Number
            </Label>
            <Input
              id="phone"
              type="tel"
              placeholder="08012345678 or +2348012345678"
              value={formData.phone}
              onChange={(e) => handleInputChange("phone", e.target.value)}
              className={errors.phone ? "border-destructive" : ""}
              disabled={isLoading}
            />
            {errors.phone && <p className="text-sm text-destructive">{errors.phone}</p>}
            <p className="text-xs text-muted-foreground">Your pin will be sent to this number via SMS</p>
          </div>

          {/* Submit Button */}
          <Button type="submit" className="w-full" disabled={isLoading} size="lg">
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Processing...
              </>
            ) : (
              <>
                <CreditCard className="mr-2 h-4 w-4" />
                Pay ₦500 - Get Pin Now
              </>
            )}
          </Button>

          <div className="text-xs text-muted-foreground text-center space-y-1">
            <p>By clicking "Pay", you agree to our terms of service.</p>
            <p>Your payment is secured by Paystack.</p>
          </div>
        </form>
      </CardContent>
    </Card>
  )
}
