
'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';

const user = {
  name: 'John Doe',
  email: 'john.doe@amex.com',
  phone: '+1 (555) 123-4567',
  role: 'Administrator',
};

const company = {
  name: 'Amex International Logistics',
  address: '456 Enterprise Way, Suite 200, Metropolis, USA 54321',
  website: 'www.amex-logistics.com',
  contactEmail: 'corporate@amex-logistics.com',
  tin: '123-456-789-000',
  bin: 'BIN-987654321',
};

export default function ProfilePage() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-gray-800">Profile</h1>
        <p className="text-gray-500">Manage your personal and company information.</p>
      </div>

      <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
        <Card className="lg:col-span-1 shadow-md">
          <CardHeader className="flex flex-row items-center justify-between">
            <div>
                <CardTitle>User Information</CardTitle>
                <CardDescription>Your personal account details.</CardDescription>
            </div>
            <Button variant="outline" size="sm">Edit</Button>
          </CardHeader>
          <CardContent className="space-y-4">
             <div>
                <p className="text-sm font-medium text-gray-500">Name</p>
                <p className="text-base font-semibold">{user.name}</p>
             </div>
             <div>
                <p className="text-sm font-medium text-gray-500">Email</p>
                <p className="text-base">{user.email}</p>
             </div>
             <div>
                <p className="text-sm font-medium text-gray-500">Phone Number</p>
                <p className="text-base">{user.phone}</p>
             </div>
             <div>
                <p className="text-sm font-medium text-gray-500">Role</p>
                <p className="text-base">{user.role}</p>
             </div>
          </CardContent>
        </Card>

        <Card className="lg:col-span-2 shadow-md">
           <CardHeader className="flex flex-row items-center justify-between">
             <div>
                <CardTitle>Company Information</CardTitle>
                <CardDescription>Details about your organization.</CardDescription>
            </div>
            <Button variant="outline" size="sm">Edit</Button>
          </CardHeader>
          <CardContent className="space-y-4">
             <div>
                <p className="text-sm font-medium text-gray-500">Company Name</p>
                <p className="text-base font-semibold">{company.name}</p>
             </div>
             <div>
                <p className="text-sm font-medium text-gray-500">Company Address</p>
                <p className="text-base">{company.address}</p>
             </div>
             <div className="grid grid-cols-2 gap-4 pt-2">
                 <div>
                    <p className="text-sm font-medium text-gray-500">TIN (Taxpayer Identification Number)</p>
                    <p className="text-base font-mono">{company.tin}</p>
                </div>
                <div>
                    <p className="text-sm font-medium text-gray-500">BIN (Business Identification Number)</p>
                    <p className="text-base font-mono">{company.bin}</p>
                </div>
             </div>
            <Separator />
             <div className='flex items-center justify-between'>
                <div>
                    <p className="text-sm font-medium text-gray-500">Website</p>
                    <a href={`https://${company.website}`} target="_blank" rel="noopener noreferrer" className="text-base text-primary hover:underline">{company.website}</a>
                </div>
                <div>
                    <p className="text-sm font-medium text-gray-500">Contact Email</p>
                    <a href={`mailto:${company.contactEmail}`} className="text-base text-primary hover:underline">{company.contactEmail}</a>
                </div>
             </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
