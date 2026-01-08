
'use client';

import { useState } from 'react';
import Link from 'next/link';
import { MoreHorizontal, FileDown, PlusCircle } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

type Shipment = {
  id: string;
  trackingId: string;
  destination: string;
  status: 'In Transit' | 'Delivered' | 'Pending' | 'Delayed';
  date: string;
  weight: number;
};

const initialShipments: Shipment[] = [
  {
    id: '1',
    trackingId: 'AMEX-123456789',
    destination: 'New York, USA',
    status: 'In Transit',
    date: '2024-07-28',
    weight: 5.2,
  },
  {
    id: '2',
    trackingId: 'AMEX-987654321',
    destination: 'London, UK',
    status: 'Delivered',
    date: '2024-07-25',
    weight: 2.1,
  },
  {
    id: '3',
    trackingId: 'AMEX-555555555',
    destination: 'Tokyo, Japan',
    status: 'Pending',
    date: '2024-07-29',
    weight: 10.0,
  },
  {
    id: '4',
    trackingId: 'AMEX-112233445',
    destination: 'Sydney, Australia',
    status: 'Delayed',
    date: '2024-07-26',
    weight: 1.5,
  },
];

const statusStyles = {
  'In Transit': 'border-blue-500/50 bg-blue-500/10 text-blue-700',
  'Delivered': 'border-green-500/50 bg-green-500/10 text-green-700',
  'Pending': 'border-yellow-500/50 bg-yellow-500/10 text-yellow-700',
  'Delayed': 'border-red-500/50 bg-red-500/10 text-red-700',
};

export default function ShipmentsPage() {
  const [shipments, setShipments] = useState<Shipment[]>(initialShipments);

  return (
    <>
      <div className="flex items-center justify-between space-y-2">
        <div>
            <h1 className="text-3xl font-bold text-gray-800">Shipments</h1>
            <p className="text-gray-500">Manage and track all your shipments in one place.</p>
        </div>
        <div className="flex items-center space-x-2">
          <Button asChild>
            <Link href="/dashboard/shipments/new">
              <PlusCircle className="mr-2 h-5 w-5" />
              New Shipment
            </Link>
          </Button>
        </div>
      </div>
      <Card className="mt-8 shadow-md">
        <CardHeader>
          <CardTitle>Active Shipments</CardTitle>
          <CardDescription>A list of your recent shipments.</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Tracking ID</TableHead>
                <TableHead>Destination</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Date</TableHead>
                <TableHead className="text-right">Weight (kg)</TableHead>
                <TableHead>
                  <span className="sr-only">Actions</span>
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {shipments.map((shipment) => (
                <TableRow key={shipment.id}>
                  <TableCell className="font-medium">{shipment.trackingId}</TableCell>
                  <TableCell>{shipment.destination}</TableCell>
                  <TableCell>
                    <Badge variant="outline" className={statusStyles[shipment.status]}>
                      {shipment.status}
                    </Badge>
                  </TableCell>
                  <TableCell>{shipment.date}</TableCell>
                  <TableCell className="text-right">{shipment.weight.toFixed(1)}</TableCell>
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
                        <DropdownMenuItem>View Details</DropdownMenuItem>
                        <DropdownMenuItem>
                          <FileDown className="mr-2 h-4 w-4" />
                          Download Receipt
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem>Track</DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem className='text-red-600'>Cancel</DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </>
  );
}
