import { PinPurchaseForm } from "@/components/pin-purchase-form"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export default function HomePage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b">
        <div className="container mx-auto px-4 py-6">
          <div className="text-center">
            <h1 className="text-2xl md:text-3xl font-bold text-foreground">BECE Results Checker</h1>
            <p className="text-muted-foreground mt-2">Purchase your pin to check BECE results instantly</p>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        <div className="max-w-md mx-auto space-y-6">
          {/* Info Card */}
          <Card>
            <CardHeader className="text-center">
              <CardTitle className="text-xl">Get Your BECE Pin</CardTitle>
              <CardDescription>Secure and instant access to check your BECE results</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between p-3 bg-muted rounded-lg">
                <span className="font-medium">Pin Price:</span>
                <span className="text-lg font-bold">₦500</span>
              </div>
              <div className="text-sm text-muted-foreground space-y-2">
                <p>• Instant pin delivery via email</p>
                <p>• Valid for one-time result checking</p>
                <p>• Secure payment with Paystack</p>
                <p>• 24/7 customer support</p>
              </div>
            </CardContent>
          </Card>

          {/* Purchase Form */}
          <PinPurchaseForm />
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t mt-12">
        <div className="container mx-auto px-4 py-6">
          <div className="text-center text-sm text-muted-foreground">
            <p>© 2024 BECE Results Checker. All rights reserved.</p>
            <p className="mt-1">Secure payments powered by Paystack</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
