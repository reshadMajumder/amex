
'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft, PackagePlus, Paperclip, Truck } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';
import { Textarea } from '@/components/ui/textarea';
import { Separator } from '@/components/ui/separator';

export default function NewShipmentPage() {
  const router = useRouter();
  const { toast } = useToast();

  // Using a single state object to hold all form data
  const [formData, setFormData] = useState({
    // Sender Info
    senderName: 'John Doe',
    senderCompany: 'Amex International Logistics',
    senderAddress: '456 Enterprise Way, Metropolis, USA',
    senderPhone: '+1 (555) 123-4567',
    senderEmail: 'john.doe@amex.com',
    
    // Recipient Info
    recipientName: '',
    recipientCompany: '',
    recipientAddress: '',
    recipientPhone: '',
    recipientEmail: '',

    // Package Details
    serviceType: 'express',
    weight: '',
    length: '',
    width: '',
    height: '',
    declaredValue: '',

    // Customs Info
    contentsDescription: '',
    hsCode: '',
    countryOfOrigin: 'USA',
    
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { id, value } = e.target;
    setFormData(prev => ({ ...prev, [id]: value }));
  };

  const handleSelectChange = (id: string, value: string) => {
    setFormData(prev => ({ ...prev, [id]: value }));
  };


  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const requiredFields: (keyof typeof formData)[] = [
        'recipientName', 'recipientAddress', 'recipientPhone', 'recipientEmail',
        'weight', 'length', 'width', 'height', 'declaredValue',
        'contentsDescription', 'countryOfOrigin'
    ];

    const missingField = requiredFields.find(field => !formData[field]);

    if (missingField) {
      toast({
        variant: 'destructive',
        title: 'Missing Information',
        description: `Please fill out the '${missingField.replace(/([A-Z])/g, ' $1')}' field.`,
      });
      return;
    }
    
    console.log("Shipment Data:", formData);

    toast({
      title: 'Shipment Created',
      description: 'Your new international shipment has been processed.',
    });
    
    router.push('/dashboard/shipments');
  };

  return (
    <div className="max-w-6xl mx-auto">
      <div className="mb-4">
        <Button variant="ghost" asChild>
          <Link href="/dashboard/shipments">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Shipments
          </Link>
        </Button>
      </div>
      
      <form onSubmit={handleSubmit} className="space-y-8">
        {/* Sender & Recipient */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Sender */}
            <Card>
                <CardHeader>
                    <CardTitle>Sender Details</CardTitle>
                    <CardDescription>This is pre-filled from your profile.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                    <p className="font-semibold">{formData.senderName} - {formData.senderCompany}</p>
                    <p className="text-sm text-gray-600">{formData.senderAddress}</p>
                    <p className="text-sm text-gray-600">{formData.senderEmail} | {formData.senderPhone}</p>
                </CardContent>
            </Card>

            {/* Recipient */}
            <Card>
                 <CardHeader>
                    <CardTitle>Recipient Details</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <Label htmlFor="recipientName">Full Name</Label>
                            <Input id="recipientName" value={formData.recipientName} onChange={handleChange} placeholder="Jane Smith" />
                        </div>
                         <div className="space-y-2">
                            <Label htmlFor="recipientCompany">Company (Optional)</Label>
                            <Input id="recipientCompany" value={formData.recipientCompany} onChange={handleChange} placeholder="Recipient Corp." />
                        </div>
                    </div>
                     <div className="space-y-2">
                        <Label htmlFor="recipientAddress">Full Address</Label>
                        <Textarea id="recipientAddress" value={formData.recipientAddress} onChange={handleChange} placeholder="123 International Blvd, London, UK, SW1A 0AA" />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <Label htmlFor="recipientPhone">Phone</Label>
                            <Input id="recipientPhone" type="tel" value={formData.recipientPhone} onChange={handleChange} placeholder="+44 20 7946 0958" />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="recipientEmail">Email</Label>
                            <Input id="recipientEmail" type="email" value={formData.recipientEmail} onChange={handleChange} placeholder="jane.s@example.co.uk" />
                        </div>
                    </div>
                </CardContent>
            </Card>
        </div>
        
        {/* Package & Customs */}
        <Card>
            <CardHeader>
                <CardTitle>Shipment Details</CardTitle>
                <CardDescription>Provide details about the package and its contents for customs.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {/* Package Details */}
                    <div className="space-y-4 p-6 border rounded-lg">
                        <h3 className="font-semibold text-lg flex items-center"><PackagePlus className="mr-2 h-5 w-5 text-primary" />Package Details</h3>
                        <div className="space-y-2">
                            <Label htmlFor="serviceType">Service Type</Label>
                            <Select onValueChange={(v) => handleSelectChange('serviceType', v)} defaultValue={formData.serviceType}>
                                <SelectTrigger id="serviceType"><SelectValue placeholder="Select service" /></SelectTrigger>
                                <SelectContent>
                                <SelectItem value="express">International Express</SelectItem>
                                <SelectItem value="standard">International Standard</SelectItem>
                                <SelectItem value="economy">International Economy</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <Label htmlFor="weight">Total Weight (kg)</Label>
                                <Input id="weight" type="number" value={formData.weight} onChange={handleChange} placeholder="2.5" />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="declaredValue">Declared Value ($)</Label>
                                <Input id="declaredValue" type="number" value={formData.declaredValue} onChange={handleChange} placeholder="150.00" />
                            </div>
                        </div>
                        <div className="space-y-2">
                             <Label>Dimensions (cm)</Label>
                             <div className="grid grid-cols-3 gap-4">
                                <Input id="length" type="number" value={formData.length} onChange={handleChange} placeholder="Length" />
                                <Input id="width" type="number" value={formData.width} onChange={handleChange} placeholder="Width" />
                                <Input id="height" type="number" value={formData.height} onChange={handleChange} placeholder="Height" />
                             </div>
                        </div>
                    </div>

                    {/* Customs Information */}
                     <div className="space-y-4 p-6 border rounded-lg">
                        <h3 className="font-semibold text-lg flex items-center"><Paperclip className="mr-2 h-5 w-5 text-primary" />Customs Information</h3>
                        <div className="space-y-2">
                            <Label htmlFor="contentsDescription">Detailed Description of Contents</Label>
                            <Textarea id="contentsDescription" value={formData.contentsDescription} onChange={handleChange} placeholder="e.g., 2 men's cotton t-shirts, 1 pair of leather shoes" />
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <Label htmlFor="hsCode">HS Code (Optional)</Label>
                                <Input id="hsCode" value={formData.hsCode} onChange={handleChange} placeholder="e.g., 610910" />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="countryOfOrigin">Country of Origin</Label>
                                <Select onValueChange={(v) => handleSelectChange('countryOfOrigin', v)} defaultValue={formData.countryOfOrigin}>
                                    <SelectTrigger id="countryOfOrigin"><SelectValue placeholder="Select country" /></SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="USA">USA</SelectItem>
                                        <SelectItem value="UK">United Kingdom</SelectItem>
                                        <SelectItem value="Japan">Japan</SelectItem>
                                        <SelectItem value="Germany">Germany</SelectItem>
                                        <SelectItem value="China">China</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                        </div>
                    </div>
                </div>

            </CardContent>
        </Card>

        <div className="flex justify-end gap-2 pt-4">
            <Button variant="outline" type="button" onClick={() => router.push('/dashboard/shipments')}>
                Cancel
            </Button>
            <Button type="submit" size="lg">
                <Truck className="mr-2 h-5 w-5" />
                Create & Ship
            </Button>
        </div>
      </form>
    </div>
  );
}
