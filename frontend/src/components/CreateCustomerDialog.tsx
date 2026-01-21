
'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';

type NewCustomer = {
  name: string;
  email: string;
  phone: string;
  address: string;
};

type CreateCustomerDialogProps = {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  onAddCustomer: (customer: NewCustomer) => void;
};

export function CreateCustomerDialog({ isOpen, setIsOpen, onAddCustomer }: CreateCustomerDialogProps) {
  const [recipient, setRecipient] = useState('');
  const [contact, setContact] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [address, setAddress] = useState('');
  const [city, setCity] = useState('');
  const [zip, setZip] = useState('');
  const [country, setCountry] = useState('');
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!recipient || !contact || !phone || !address || !city || !zip || !country) {
      toast({
        variant: 'destructive',
        title: 'Missing Information',
        description: 'Please fill out all required fields. Email is optional.',
      });
      return;
    }
    
    const displayName = contact && contact !== recipient ? `${recipient} (${contact})` : recipient;
    const fullAddress = `${address}, ${city}, ${country} ${zip}`;

    onAddCustomer({ name: displayName, email, phone, address: fullAddress });
    
    toast({
      title: 'Destination Created',
      description: 'The new destination has been added to your list.',
    });
    
    setIsOpen(false);
    setRecipient('');
    setContact('');
    setPhone('');
    setEmail('');
    setAddress('');
    setCity('');
    setZip('');
    setCountry('');
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Create New Destination</DialogTitle>
          <DialogDescription>Enter the details for your new destination.</DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <div className="grid gap-4 py-4">
            <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                    <Label htmlFor="recipient">Recipient</Label>
                    <Input id="recipient" value={recipient} onChange={(e) => setRecipient(e.target.value)} placeholder="Rinkys Global yatra" />
                </div>
                <div className="space-y-1.5">
                    <Label htmlFor="contact">Contact Person</Label>
                    <Input id="contact" value={contact} onChange={(e) => setContact(e.target.value)} placeholder="Rinkys Global yatra" />
                </div>
            </div>
            <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                    <Label htmlFor="phone">Phone</Label>
                    <Input id="phone" type="tel" value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="+919810794318" />
                </div>
                <div className="space-y-1.5">
                    <Label htmlFor="email">Email (Optional)</Label>
                    <Input id="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="contact@example.com" />
                </div>
            </div>
            <div className="space-y-1.5">
                <Label htmlFor="address">Address</Label>
                <Input id="address" value={address} onChange={(e) => setAddress(e.target.value)} placeholder="116, first floor Pratap complex munirka" />
            </div>
            <div className="grid md:grid-cols-3 gap-4">
                <div className="space-y-1.5">
                    <Label htmlFor="city">City</Label>
                    <Input id="city" value={city} onChange={(e) => setCity(e.target.value)} placeholder="New Delhi" />
                </div>
                <div className="space-y-1.5">
                    <Label htmlFor="zip">ZIP</Label>
                    <Input id="zip" value={zip} onChange={(e) => setZip(e.target.value)} placeholder="110067" />
                </div>
                <div className="space-y-1.5">
                    <Label htmlFor="country">Country</Label>
                    <Input id="country" value={country} onChange={(e) => setCountry(e.target.value)} placeholder="IN" />
                </div>
            </div>
          </div>
          <DialogFooter>
            <Button type="submit">Create Destination</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
