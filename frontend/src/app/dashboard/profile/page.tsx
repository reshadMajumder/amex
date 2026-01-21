
'use client';

import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Globe, Mail, Phone, User, Building, MapPin, FileText, Users } from 'lucide-react';

const companyProfile = {
  companyName: 'Amex International Logistics',
  addresses: [
    { type: 'Head Office', address: '456 Enterprise Way, Suite 200, Metropolis, USA 54321' },
    { type: 'Warehouse', address: '123 Logistics Ave, Industrial Park, Metropolis, USA 54322' },
  ],
  email: 'corporate@amex-logistics.com',
  documents: {
    tradeLicense: 'https://images.pexels.com/photos/8524958/pexels-photo-8524958.jpeg',
    binImage: 'https://images.pexels.com/photos/8524958/pexels-photo-8524958.jpeg',
    tinImage: 'https://images.pexels.com/photos/8524958/pexels-photo-8524958.jpeg',
    nidCard: 'https://images.pexels.com/photos/8524958/pexels-photo-8524958.jpeg',
    signature: 'https://images.pexels.com/photos/8524958/pexels-photo-8524958.jpeg',
  },
  contacts: [
    { role: 'Managing Director', name: 'John D. Rockefeller', phone: '+1-202-555-0174', email: 'j.rockefeller@amex.com' },
    { role: 'Finance Head', name: 'Jane M. Smith', phone: '+1-202-555-0198', email: 'j.smith@amex.com' },
    { role: 'Contact Person', name: 'Kenji Tanaka', phone: '+1-202-555-0121', email: 'k.tanaka@amex.com' },
  ],
};


export default function ProfilePage() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-gray-800">Company Profile</h1>
        <p className="text-gray-500">Manage your organization's information and contacts.</p>
      </div>

      <div className="grid gap-8 lg:grid-cols-3">
        {/* Left Column */}
        <div className="lg:col-span-2 space-y-8">
          <Card className="shadow-md">
            <CardHeader className="flex flex-row items-start justify-between">
                <div>
                    <CardTitle className='flex items-center'><Building className="mr-2 h-5 w-5 text-primary" /> Company Information</CardTitle>
                    <CardDescription>Official details of your organization.</CardDescription>
                </div>
                <Button variant="outline" size="sm">Edit</Button>
            </CardHeader>
            <CardContent className="space-y-6">
                <div>
                    <p className="text-sm font-medium text-gray-500">Company Name</p>
                    <p className="text-lg font-semibold">{companyProfile.companyName}</p>
                </div>
                <Separator/>
                <div>
                    <p className="text-sm font-medium text-gray-500 mb-2">Registered Addresses</p>
                    <div className="space-y-4">
                    {companyProfile.addresses.map((addr, index) => (
                        <div key={index} className="flex items-start gap-3">
                        <MapPin className="h-5 w-5 text-gray-400 mt-1" />
                        <div>
                            <p className="font-semibold">{addr.type}</p>
                            <p className="text-gray-700">{addr.address}</p>
                        </div>
                        </div>
                    ))}
                    </div>
                </div>
                 <Separator/>
                 <div>
                    <p className="text-sm font-medium text-gray-500">Corporate Email</p>
                    <a href={`mailto:${companyProfile.email}`} className="flex items-center gap-2 text-primary hover:underline">
                        <Mail className="h-4 w-4" />
                        {companyProfile.email}
                    </a>
                </div>
            </CardContent>
          </Card>

          <Card className="shadow-md">
            <CardHeader>
                <CardTitle className='flex items-center'><FileText className="mr-2 h-5 w-5 text-primary" /> Uploaded Documents</CardTitle>
                <CardDescription>Legal and identification documents.</CardDescription>
            </CardHeader>
            <CardContent className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {Object.entries(companyProfile.documents).map(([key, src]) => (
                    <div key={key} className="space-y-2 text-center">
                        <p className="text-sm font-medium capitalize text-gray-600">{key.replace(/([A-Z])/g, ' $1').trim()}</p>
                        <div className="relative w-full aspect-video rounded-lg overflow-hidden border">
                             <Image src={src} alt={`${key} image`} layout="fill" objectFit="cover" />
                        </div>
                        <Button variant="link" size="sm" className='text-xs'>View/Replace</Button>
                    </div>
                ))}
            </CardContent>
          </Card>
        </div>

        {/* Right Column */}
        <div className="lg:col-span-1">
          <Card className="shadow-md">
            <CardHeader>
              <CardTitle className='flex items-center'><Users className="mr-2 h-5 w-5 text-primary" /> Key Contacts</CardTitle>
              <CardDescription>Primary points of contact.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {companyProfile.contacts.map((contact, index) => (
                <div key={index}>
                  <p className="text-sm font-medium text-gray-500">{contact.role}</p>
                  <p className="text-base font-semibold flex items-center gap-2 mt-1"><User className="h-4 w-4" /> {contact.name}</p>
                  <div className="text-sm text-gray-700 mt-2 space-y-1">
                     <p className="flex items-center gap-2"><Phone className="h-4 w-4" /> {contact.phone}</p>
                     <p className="flex items-center gap-2"><Mail className="h-4 w-4" /> {contact.email}</p>
                  </div>
                  {index < companyProfile.contacts.length - 1 && <Separator className="mt-6"/>}
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
