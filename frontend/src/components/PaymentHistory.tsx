
'use client';

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { MoreHorizontal } from 'lucide-react';
import { Button } from './ui/button';
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuLabel, DropdownMenuItem } from './ui/dropdown-menu';

type Payment = {
  invoiceId: string;
  amount: number;
  status: 'Paid' | 'Pending' | 'Failed';
  date: string;
  method: string;
};

const payments: Payment[] = [
  {
    invoiceId: 'INV-2024-001',
    amount: 250.0,
    status: 'Paid',
    date: '2024-07-15',
    method: 'Credit Card',
  },
  {
    invoiceId: 'INV-2024-002',
    amount: 150.5,
    status: 'Paid',
    date: '2024-07-18',
    method: 'PayPal',
  },
  {
    invoiceId: 'INV-2024-003',
    amount: 350.0,
    status: 'Pending',
    date: '2024-07-20',
    method: 'Bank Transfer',
  },
    {
    invoiceId: 'INV-2024-004',
    amount: 45.0,
    status: 'Paid',
    date: '2024-07-22',
    method: 'Credit Card',
  },
  {
    invoiceId: 'INV-2024-005',
    amount: 550.0,
    status: 'Failed',
    date: '2024-07-23',
    method: 'Credit Card',
  },
];

const statusStyles = {
  'Paid': 'border-green-500/50 bg-green-500/10 text-green-700',
  'Pending': 'border-yellow-500/50 bg-yellow-500/10 text-yellow-700',
  'Failed': 'border-red-500/50 bg-red-500/10 text-red-700',
};

export function PaymentHistory() {
  return (
    <Card className="shadow-md">
      <CardHeader>
        <CardTitle>Payment History</CardTitle>
        <CardDescription>A list of your recent payments.</CardDescription>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Invoice ID</TableHead>
              <TableHead>Amount</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Date</TableHead>
              <TableHead className="text-right">Method</TableHead>
              <TableHead>
                <span className="sr-only">Actions</span>
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {payments.map((payment) => (
              <TableRow key={payment.invoiceId}>
                <TableCell className="font-medium">{payment.invoiceId}</TableCell>
                <TableCell>${payment.amount.toFixed(2)}</TableCell>
                <TableCell>
                  <Badge variant="outline" className={statusStyles[payment.status]}>
                    {payment.status}
                  </Badge>
                </TableCell>
                <TableCell>{payment.date}</TableCell>
                <TableCell className="text-right">{payment.method}</TableCell>
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
                      <DropdownMenuItem>View Invoice</DropdownMenuItem>
                      <DropdownMenuItem>Download PDF</DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
