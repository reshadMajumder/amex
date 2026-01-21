
'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Separator } from '@/components/ui/separator';
import { useToast } from '@/hooks/use-toast';

export default function SettingsPage() {
  const { toast } = useToast();

  const handleSaveChanges = () => {
    toast({
        title: "Settings Saved",
        description: "Your notification preferences have been updated."
    })
  }

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-gray-800">Settings</h1>
        <p className="text-gray-500">Manage your account and notification settings.</p>
      </div>

      <Card className="shadow-md">
        <CardHeader>
          <CardTitle>Notifications</CardTitle>
          <CardDescription>Choose how you want to be notified.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex items-center justify-between space-x-2 p-4 border rounded-lg">
            <div className="flex-grow">
              <Label htmlFor="email-notifications" className="font-semibold">Email Notifications</Label>
              <p className="text-sm text-gray-500">Receive emails for shipment updates, payment reminders, and promotions.</p>
            </div>
            <Switch id="email-notifications" defaultChecked />
          </div>

          <div className="flex items-center justify-between space-x-2 p-4 border rounded-lg">
            <div className="flex-grow">
                <Label htmlFor="sms-notifications" className="font-semibold">SMS Notifications</Label>
                <p className="text-sm text-gray-500">Get text messages for critical alerts like delivery exceptions and payment due dates.</p>
            </div>
            <Switch id="sms-notifications" />
          </div>
          
           <Separator />
           
          <div className="space-y-4">
             <h4 className="font-semibold">Payment Reminders</h4>
             <div className="flex items-center justify-between space-x-2 p-4 border rounded-lg bg-gray-50/50">
                <div className="flex-grow">
                    <Label htmlFor="reminder-7-days" className="font-medium">7 Days Before Due Date</Label>
                    <p className="text-xs text-gray-500">A friendly reminder that your payment is due soon.</p>
                </div>
                <Switch id="reminder-7-days" defaultChecked />
             </div>
             <div className="flex items-center justify-between space-x-2 p-4 border rounded-lg bg-gray-50/50">
                <div className="flex-grow">
                    <Label htmlFor="reminder-3-days" className="font-medium">3 Days Before Due Date</Label>
                     <p className="text-xs text-gray-500">A second reminder as the due date approaches.</p>
                </div>
                <Switch id="reminder-3-days" defaultChecked/>
             </div>
             <div className="flex items-center justify-between space-x-2 p-4 border rounded-lg bg-gray-50/50">
                <div className="flex-grow">
                    <Label htmlFor="reminder-overdue" className="font-medium">When Payment is Overdue</Label>
                    <p className="text-xs text-gray-500">An urgent notification if your payment becomes overdue.</p>
                </div>
                <Switch id="reminder-overdue" defaultChecked disabled />
             </div>
          </div>


        </CardContent>
        <div className="px-6 py-4 border-t">
            <Button onClick={handleSaveChanges}>Save Changes</Button>
        </div>
      </Card>
    </div>
  );
}

