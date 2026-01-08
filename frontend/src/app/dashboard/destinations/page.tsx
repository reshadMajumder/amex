
'use client';

import { useState } from 'react';
import { PlusCircle, MoreHorizontal, FileText, UserPlus, XCircle } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { CreateCustomerDialog } from '@/components/CreateCustomerDialog';
import { Badge } from '@/components/ui/badge';

type Destination = {
  id: string;
  name: string;
  email: string;
  phone: string;
  address: string;
  shipmentCount: number;
};

type Shipment = {
    id: string;
    trackingId: string;
    destination: string;
    status: 'In Transit' | 'Delivered' | 'Pending' | 'Delayed';
    date: string;
    weight: number;
    customerId: string;
};

const initialCustomers: Destination[] = [
  {
    id: '1',
    name: 'John Doe',
    email: 'john.doe@example.com',
    phone: '+1 (123) 456-7890',
    address: '123 Main St, New York, NY 10001',
    shipmentCount: 2,
  },
  {
    id: '2',
    name: 'Jane Smith',
    email: 'jane.smith@example.com',
    phone: '+44 20 7946 0958',
    address: '456 High St, London, UK SW1A 0AA',
    shipmentCount: 1,
  },
  {
    id: '3',
    name: 'Kenji Tanaka',
    email: 'kenji.tanaka@example.jp',
    phone: '+81 3-1234-5678',
    address: '789 Sakura Ave, Tokyo, Japan 100-0001',
    shipmentCount: 0,
  },
];

const shipmentHistory: Shipment[] = [
    { id: 'sh1', trackingId: 'AMEX-ABCDE123', destination: '123 Main St, New York, NY 10001', status: 'Delivered', date: '2024-07-10', weight: 2.5, customerId: '1'},
    { id: 'sh2', trackingId: 'AMEX-FGHIJ456', destination: '123 Main St, New York, NY 10001', status: 'Delivered', date: '2024-06-22', weight: 1.8, customerId: '1'},
    { id: 'sh3', trackingId: 'AMEX-KLMNO789', destination: '456 High St, London, UK SW1A 0AA', status: 'Delivered', date: '2024-07-15', weight: 5.0, customerId: '2'},
];

const statusStyles = {
  'In Transit': 'border-blue-500/50 bg-blue-500/10 text-blue-700',
  'Delivered': 'border-green-500/50 bg-green-500/10 text-green-700',
  'Pending': 'border-yellow-500/50 bg-yellow-500/10 text-yellow-700',
  'Delayed': 'border-red-500/50 bg-red-500/10 text-red-700',
};


export default function DestinationsPage() {
  const [customers, setCustomers] = useState<Destination[]>(initialCustomers);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [selectedCustomer, setSelectedCustomer] = useState<Destination | null>(null);

  const addCustomer = (newCustomer: Omit<Destination, 'id' | 'shipmentCount'>) => {
    const customerWithId: Destination = {
      ...newCustomer,
      id: (customers.length + 1).toString(),
      shipmentCount: 0,
    };
    setCustomers([customerWithId, ...customers]);
  };
  
  const customerShipments = selectedCustomer ? shipmentHistory.filter(s => s.customerId === selectedCustomer.id) : [];

  return (
    <>
      <div className="flex items-center justify-between space-y-2">
        <div>
          <h1 className="text-3xl font-bold text-gray-800">Destinations</h1>
          <p className="text-gray-500">Manage your frequent recipients.</p>
        </div>
        <div className="flex items-center space-x-2">
          <Button onClick={() => setIsDialogOpen(true)}>
            <UserPlus className="mr-2 h-5 w-5" />
            New Destination
          </Button>
        </div>
      </div>
      <Card className="mt-8 shadow-md">
        <CardHeader>
          <CardTitle>Destination List</CardTitle>
          <CardDescription>A list of your saved destinations for frequent shipments.</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Contact</TableHead>
                <TableHead>Address</TableHead>
                <TableHead className="text-center">Shipments</TableHead>
                <TableHead>
                  <span className="sr-only">Actions</span>
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {customers.map((customer) => (
                <TableRow key={customer.id} className={selectedCustomer?.id === customer.id ? 'bg-gray-100' : ''}>
                  <TableCell className="font-medium">{customer.name}</TableCell>
                  <TableCell>
                    <div>{customer.email}</div>
                    <div className="text-sm text-gray-500">{customer.phone}</div>
                  </TableCell>
                  <TableCell>{customer.address}</TableCell>
                  <TableCell className="text-center">{customer.shipmentCount}</TableCell>
                  <TableCell>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button aria-haspopup="true" size="icon" variant="ghost">
                          <MoreHorizontal className="h-4 w-4" />
                          <span className="sr-only">Toggle menu</span>
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuLabel>Actions</DropdownMenuLabel>
                        <DropdownMenuItem onSelect={() => setSelectedCustomer(customer)}>
                          <FileText className="mr-2 h-4 w-4" />
                          View History
                        </DropdownMenuItem>
                        <DropdownMenuItem>Edit</DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem className='text-red-600'>Remove</DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
      
      {selectedCustomer && (
        <Card className="mt-8 shadow-md">
            <CardHeader className='flex flex-row justify-between items-start'>
                <div>
                    <CardTitle>Shipment History for {selectedCustomer.name}</CardTitle>
                    <CardDescription>A list of past shipments sent to this destination.</CardDescription>
                </div>
                <Button variant="ghost" size="icon" onClick={() => setSelectedCustomer(null)}>
                    <XCircle className="h-5 w-5 text-gray-500" />
                </Button>
            </CardHeader>
            <CardContent>
                {customerShipments.length > 0 ? (
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Tracking ID</TableHead>
                                <TableHead>Status</TableHead>
                                <TableHead>Date</TableHead>
                                <TableHead className="text-right">Weight (kg)</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {customerShipments.map(shipment => (
                                <TableRow key={shipment.id}>
                                    <TableCell className="font-medium">{shipment.trackingId}</TableCell>
                                    <TableCell>
                                        <Badge variant="outline" className={statusStyles[shipment.status]}>
                                        {shipment.status}
                                        </Badge>
                                    </TableCell>
                                    <TableCell>{shipment.date}</TableCell>
                                    <TableCell className="text-right">{shipment.weight.toFixed(1)}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                ) : (
                    <p className='text-sm text-gray-500 text-center py-8'>No shipment history found for this destination.</p>
                )}
            </CardContent>
        </Card>
      )}

      <CreateCustomerDialog
        isOpen={isDialogOpen}
        setIsOpen={setIsDialogOpen}
        onAddCustomer={addCustomer}
      />
    </>
  );
}
