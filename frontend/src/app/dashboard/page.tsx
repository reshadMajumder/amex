
"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Bar, BarChart, CartesianGrid, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import { Package, DollarSign, AlertCircle, CheckCircle, Clock } from "lucide-react";
import { PaymentHistory } from "@/components/PaymentHistory";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";

const lifetimeData = [
  { title: "Total Shipments", value: "1,250", icon: Package, color: "text-blue-500", change: "+20.1% from last month" },
  { title: "Total Amount", value: "$180,500", icon: DollarSign, color: "text-green-500", change: "+15.5% from last month" },
  { title: "Total Due", value: "$12,300", icon: AlertCircle, color: "text-red-500", change: "-5.2% from last month" },
  { title: "Total Paid", value: "$168,200", icon: CheckCircle, color: "text-emerald-500", change: "+22.0% from last month" },
];

const yearData = [
  { title: "Total Shipments (YTD)", value: "890", icon: Package, color: "text-blue-500", change: "+35.2% from last year" },
  { title: "Total Amount (YTD)", value: "$120,700", icon: DollarSign, color: "text-green-500", change: "+30.1% from last year" },
  { title: "Total Due (YTD)", value: "$8,100", icon: AlertCircle, color: "text-red-500", change: "+12.8% from last year" },
  { title: "Total Paid (YTD)", value: "$112,600", icon: CheckCircle, color: "text-emerald-500", change: "+32.4% from last year" },
];

const monthData = [
  { title: "Total Shipments (MTD)", value: "72", icon: Package, color: "text-blue-500", change: "+5.1% from last month" },
  { title: "Total Amount (MTD)", value: "$9,800", icon: DollarSign, color: "text-green-500", change: "+8.2% from last month" },
  { title: "Total Due (MTD)", value: "$1,200", icon: AlertCircle, color: "text-red-500", change: "-2.1% from last month" },
  { title: "Total Paid (MTD)", value: "$8,600", icon: CheckCircle, color: "text-emerald-500", change: "+10.3% from last month" },
];

const chartData = [
    { month: 'Jan', shipments: 400 },
    { month: 'Feb', shipments: 300 },
    { month: 'Mar', shipments: 500 },
    { month: 'Apr', shipments: 450 },
    { month: 'May', shipments: 600 },
    { month: 'Jun', shipments: 800 },
    { month: 'Jul', shipments: 750 },
    { month: 'Aug', shipments: 650 },
    { month: 'Sep', shipments: 700 },
    { month: 'Oct', shipments: 900 },
    { month: 'Nov', shipments: 1100 },
    { month: 'Dec', shipments: 1500 },
];

const overduePayment = {
    amount: 1200.00,
    dueDate: "2024-08-31",
    isOverdue: false
}

const renderSummaryCards = (data: typeof lifetimeData) => (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        {data.map((item) => (
          <Card key={item.title} className="shadow-md hover:shadow-lg transition-shadow">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-500">{item.title}</CardTitle>
              <item.icon className={`h-5 w-5 ${item.color}`} />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">{item.value}</div>
              <p className="text-xs text-gray-500 mt-1">{item.change}</p>
            </CardContent>
          </Card>
        ))}
    </div>
);

export default function DashboardPage() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-gray-800">Dashboard</h1>
        <p className="text-gray-500">A summary of your shipping activity.</p>
      </div>

       {overduePayment.isOverdue && (
          <Alert variant="destructive">
            <AlertCircle className="h-4 w-4" />
            <AlertTitle>Payment Overdue</AlertTitle>
            <div className="flex items-center justify-between">
              <AlertDescription>
                Your payment of ${overduePayment.amount.toFixed(2)} was due on {overduePayment.dueDate}. Please make a payment to continue creating new shipments.
              </AlertDescription>
              <Button>Pay Now</Button>
            </div>
          </Alert>
      )}

      <Tabs defaultValue="lifetime" className="w-full">
          <TabsList className="grid w-full grid-cols-3 md:w-auto md:inline-flex">
              <TabsTrigger value="month">This Month</TabsTrigger>
              <TabsTrigger value="year">This Year</TabsTrigger>
              <TabsTrigger value="lifetime">Lifetime</TabsTrigger>
          </TabsList>
          <TabsContent value="lifetime" className="mt-6">
              {renderSummaryCards(lifetimeData)}
          </TabsContent>
          <TabsContent value="year" className="mt-6">
              {renderSummaryCards(yearData)}
          </TabsContent>
          <TabsContent value="month" className="mt-6">
              {renderSummaryCards(monthData)}
          </TabsContent>
      </Tabs>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <Card className="shadow-md">
          <CardHeader>
            <CardTitle>Shipment Frequency</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[350px]">
                <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={chartData}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="month" />
                        <YAxis />
                        <Tooltip />
                        <Bar dataKey="shipments" fill="hsl(var(--primary))" radius={[4, 4, 0, 0]} />
                    </BarChart>
                </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
        <PaymentHistory />
      </div>
    </div>
  );
}
