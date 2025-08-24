import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { CheckCircle, Mail, MessageSquare } from "lucide-react"
import Link from "next/link"

export default function SuccessPage() {
  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <div className="max-w-md w-full space-y-6">
        <Card>
          <CardHeader className="text-center">
            <div className="mx-auto w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mb-4">
              <CheckCircle className="h-6 w-6 text-green-600" />
            </div>
            <CardTitle className="text-xl text-green-600">Payment Successful!</CardTitle>
            <CardDescription>Your BECE pin has been generated and sent to your email and phone</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="bg-muted p-4 rounded-lg space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">Transaction ID:</span>
                <span className="text-sm font-mono">TXN123456789</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">Amount Paid:</span>
                <span className="text-sm font-bold">₦500</span>
              </div>
            </div>

            <div className="space-y-3">
              <div className="flex items-start gap-3 p-3 bg-blue-50 rounded-lg">
                <Mail className="h-5 w-5 text-blue-600 mt-0.5" />
                <div className="text-sm">
                  <p className="font-medium text-blue-900">Email Sent</p>
                  <p className="text-blue-700">Check your email for your pin and serial number</p>
                </div>
              </div>

              <div className="flex items-start gap-3 p-3 bg-green-50 rounded-lg">
                <MessageSquare className="h-5 w-5 text-green-600 mt-0.5" />
                <div className="text-sm">
                  <p className="font-medium text-green-900">SMS Sent</p>
                  <p className="text-green-700">Your pin has been sent to your phone number</p>
                </div>
              </div>
            </div>

            <div className="pt-4 space-y-3">
              <Button asChild className="w-full">
                <Link href="/">Purchase Another Pin</Link>
              </Button>

              <div className="text-center">
                <p className="text-xs text-muted-foreground">Need help? Contact support at support@beceresults.com</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
