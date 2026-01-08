
"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Bar, BarChart, CartesianGrid, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import { Package, DollarSign, AlertCircle, CheckCircle } from "lucide-react";
import { PaymentHistory } from "@/components/PaymentHistory";

const summaryData = [
  { title: "Total Shipments", value: "1,250", icon: Package, color: "text-blue-500" },
  { title: "Total Amount", value: "$180,500", icon: DollarSign, color: "text-green-500" },
  { title: "Total Due", value: "$12,300", icon: AlertCircle, color: "text-red-500" },
  { title: "Total Paid", value: "$168,200", icon: CheckCircle, color: "text-emerald-500" },
];

const chartData = [
    { month: 'Jan', shipments: 400 },
    { month: 'Feb', shipments: 300 },
    { month: 'Mar', shipments: 500 },
    { month: 'Apr', shipments: 450 },
    { month: 'May', shipments: 600 },
    { month: 'Jun', shipments: 800 },
];

export default function DashboardPage() {
  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-bold text-gray-800">Dashboard</h1>
      
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        {summaryData.map((item) => (
          <Card key={item.title} className="shadow-md hover:shadow-lg transition-shadow">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-500">{item.title}</CardTitle>
              <item.icon className={`h-5 w-5 ${item.color}`} />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">{item.value}</div>
              <p className="text-xs text-gray-500 mt-1">+20.1% from last month</p>
            </CardContent>
          </Card>
        ))}
      </div>

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
