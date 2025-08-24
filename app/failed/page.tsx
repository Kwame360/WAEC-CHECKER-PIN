import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { XCircle, RefreshCw } from "lucide-react"
import Link from "next/link"

export default function FailedPage() {
  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <div className="max-w-md w-full">
        <Card>
          <CardHeader className="text-center">
            <div className="mx-auto w-12 h-12 bg-red-100 rounded-full flex items-center justify-center mb-4">
              <XCircle className="h-6 w-6 text-red-600" />
            </div>
            <CardTitle className="text-xl text-red-600">Payment Failed</CardTitle>
            <CardDescription>Your payment could not be processed. Please try again.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="bg-red-50 p-4 rounded-lg">
              <p className="text-sm text-red-800">Your payment was not successful. This could be due to:</p>
              <ul className="text-sm text-red-700 mt-2 space-y-1 list-disc list-inside">
                <li>Insufficient funds</li>
                <li>Network connectivity issues</li>
                <li>Card declined by bank</li>
                <li>Transaction timeout</li>
              </ul>
            </div>

            <div className="space-y-3">
              <Button asChild className="w-full">
                <Link href="/">
                  <RefreshCw className="mr-2 h-4 w-4" />
                  Try Again
                </Link>
              </Button>

              <div className="text-center">
                <p className="text-xs text-muted-foreground">
                  Still having issues? Contact support at support@beceresults.com
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
