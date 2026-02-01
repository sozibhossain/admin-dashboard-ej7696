'use client';

import { useState } from 'react';
import { useQuery } from 'react-query';
import { dashboardAPI, userAPI } from '@/lib/api';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import { toast } from 'sonner';
import {
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';
import { Users, DollarSign, Filter, ChevronLeft, ChevronRight } from 'lucide-react';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';

/**
 * FIXED DESIGN: StatCard Component
 * Features: Light background, circular icon, and colored bottom border
 */
const StatCard = ({ icon: Icon, title, value, isLoading, accentColor, bgColor, borderColor, isCurrency }: any) => (
  <Card className={`p-5 border-none ${bgColor} border-b-4 ${borderColor} rounded-xl shadow-sm flex items-center justify-between`}>
    <div>
      <h3 className="text-2xl font-bold text-slate-800 mb-0.5">
        {isLoading ? (
          <Skeleton className="h-8 w-16 bg-slate-200" />
        ) : (
          isCurrency ? `$${value}` : value
        )}
      </h3>
      <p className="text-[13px] text-slate-500 font-medium">{title}</p>
    </div>
    <div className={`p-2.5 rounded-full ${accentColor} text-white shadow-md flex items-center justify-center`}>
      <Icon size={20} strokeWidth={2.5} />
    </div>
  </Card>
);

const PIE_COLORS = ['#1E3A8A', '#22D3EE'];

export default function AdminDashboard() {
  const [selectedUserId, setSelectedUserId] = useState<string | null>(null);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);

  const { data: dashboardData, isLoading: isDashboardLoading, refetch } = useQuery(
    'dashboard-overview',
    dashboardAPI.getOverview,
    {
      onError: () => toast.error('Failed to load dashboard data'),
    }
  );

  const handleDeleteUser = async () => {
    if (!selectedUserId) return;
    try {
      await userAPI.deleteUser(selectedUserId);
      toast.success('User deleted successfully');
      setIsDeleteDialogOpen(false);
      setSelectedUserId(null);
      refetch();
    } catch (error) {
      toast.error('Failed to delete user');
    }
  };

  // Data mapping from payload
  const payload = dashboardData?.data?.data;
  const totals = payload?.totals;
  const recentUsers = payload?.recentUsers || [
    { id: '1', name: 'Annette Black', email: 'bill.sanders@example.com', joinedAt: '9-10-2025', payable: '00.00', plan: 'Free', status: 'active', avatar: 'https://i.pravatar.cc/150?u=1' },
    { id: '2', name: 'Jenny Wilson', email: 'sara.cruz@example.com', joinedAt: '9-10-2025', payable: '3.99', plan: 'Premium', status: 'active', avatar: 'https://i.pravatar.cc/150?u=2' },
    { id: '3', name: 'Esther Howard', email: 'tanya.hill@example.com', joinedAt: '9-10-2025', payable: '00.00', plan: 'Free', status: 'active', avatar: 'https://i.pravatar.cc/150?u=3' },
    { id: '4', name: 'Leslie Alexander', email: 'debra.holt@example.com', joinedAt: '9-10-2025', payable: '3.99', plan: 'Premium', status: 'active', avatar: 'https://i.pravatar.cc/150?u=4' },
    { id: '5', name: 'Bessie Cooper', email: 'kenzi.lawson@example.com', joinedAt: '9-10-2025', payable: '3.99', plan: 'Premium', status: 'active', avatar: 'https://i.pravatar.cc/150?u=5' },
  ];

  const chartData = [
    { name: '1 D', val: 35 }, { name: '2 D', val: 65 }, { name: '3 D', val: 50 },
    { name: '4 D', val: 105 }, { name: '5 D', val: 65 }, { name: '6 D', val: 105 }, { name: '7 D', val: 70 }
  ];

  const subscriptionData = [
    { name: 'Starter Package', value: 180 },
    { name: 'Professional', value: 172 },
  ];

  return (
    <div className="min-h-screen bg-slate-50/50 p-8">
      {/* Header Section */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-[#1E3A8A]">Dashboard</h1>
          <p className="text-slate-500 text-sm mt-1">Welcome back to your admin panel</p>
        </div>
        <Button variant="outline" className="border-slate-200 bg-white text-slate-600 gap-2 hover:bg-slate-50">
          <Filter className="w-4 h-4" />
          Filter
        </Button>
      </div>

      {/* FIXED: Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <StatCard
          title="Total User"
          value={totals?.totalUsers ?? 220}
          bgColor="bg-red-50/50"
          accentColor="bg-red-500"
          borderColor="border-red-500"
          icon={Users}
          isLoading={isDashboardLoading}
        />
        <StatCard
          title="Total Starter User"
          value={totals?.totalStarter ?? 220}
          bgColor="bg-blue-50/50"
          accentColor="bg-blue-600"
          borderColor="border-blue-600"
          icon={Users}
          isLoading={isDashboardLoading}
        />
        <StatCard
          title="Total Professional user"
          value={totals?.totalProfessional ?? 220}
          bgColor="bg-green-50/50"
          accentColor="bg-green-600"
          borderColor="border-green-600"
          icon={Users}
          isLoading={isDashboardLoading}
        />
        <StatCard
          title="Total Revenue"
          value={totals?.totalRevenue?.toLocaleString() ?? "11,00"}
          bgColor="bg-cyan-50/50"
          accentColor="bg-cyan-400"
          borderColor="border-cyan-400"
          icon={DollarSign}
          isCurrency
          isLoading={isDashboardLoading}
        />
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        <Card className="lg:col-span-2 p-6 border-none bg-white shadow-sm">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-xl font-bold text-slate-800">Analytics & Reports</h2>
            <div className="bg-slate-100 p-1 rounded-full flex gap-1">
              {['Day', 'Week', 'Month'].map((t) => (
                <button key={t} className={`px-5 py-1.5 rounded-full text-xs font-bold transition-all ${t === 'Day' ? 'bg-[#1E3A8A] text-white shadow-sm' : 'text-slate-400 hover:text-slate-600'}`}>
                  {t}
                </button>
              ))}
            </div>
          </div>
          <ResponsiveContainer width="100%" height={320}>
            <BarChart data={chartData}>
              <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 12}} dy={10} />
              <YAxis axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 12}} />
              <Bar dataKey="val" fill="#1E3A8A" radius={[4, 4, 0, 0]} barSize={45} />
            </BarChart>
          </ResponsiveContainer>
        </Card>

        <Card className="p-6 border-none bg-white shadow-sm">
          <h2 className="text-xl font-bold text-slate-800 mb-6">Survey for Subscription</h2>
          <div className="relative flex justify-center">
            <ResponsiveContainer width="100%" height={250}>
              <PieChart>
                <Pie data={subscriptionData} innerRadius={70} outerRadius={100} paddingAngle={0} dataKey="value">
                  {subscriptionData.map((_, index) => <Cell key={index} fill={PIE_COLORS[index]} stroke="none" />)}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
            <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                <div className="absolute top-[30%] left-[20%] text-[10px] text-center font-bold text-slate-700">Professional<br/>172</div>
                <div className="absolute top-[45%] right-[10%] text-[10px] text-center font-bold text-white">Starter Package<br/>180</div>
            </div>
          </div>
          <div className="mt-8 space-y-3">
            <div className="flex items-center gap-3 text-sm font-bold text-slate-700">
              <div className="w-4 h-4 rounded-full bg-[#1E3A8A]" /> (Starter Package) Free: 60%
            </div>
            <div className="flex items-center gap-3 text-sm font-bold text-slate-700">
              <div className="w-4 h-4 rounded-full bg-[#22D3EE]" /> Professional: 40%
            </div>
          </div>
        </Card>
      </div>

      {/* Recent User Table */}
      <h2 className="text-xl font-bold mb-4 text-slate-800">Recent User</h2>
      <Card className="border-none bg-white rounded-xl shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="text-slate-400 text-[13px] font-semibold border-b border-slate-50 uppercase tracking-wider">
              <tr>
                <th className="px-8 py-5">User Name</th>
                <th className="px-8 py-5 text-center">Email</th>
                <th className="px-8 py-5 text-center">Joined Date</th>
                <th className="px-8 py-5 text-center">Payable</th>
                <th className="px-8 py-5 text-center">Plan Name</th>
                <th className="px-8 py-5 text-center">Actions Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {recentUsers.map((user: any) => (
                <tr key={user.id} className="text-slate-600 hover:bg-slate-50/50 transition-colors">
                  <td className="px-8 py-4">
                    <div className="flex items-center gap-3">
                      <img src={user.avatar} alt="" className="w-10 h-10 rounded-lg object-cover bg-slate-100" />
                      <span className="font-semibold text-slate-700">{user.name}</span>
                    </div>
                  </td>
                  <td className="px-8 py-4 text-center text-[13px]">{user.email}</td>
                  <td className="px-8 py-4 text-center text-[13px]">{user.joinedAt}</td>
                  <td className="px-8 py-4 text-center font-bold text-slate-800">$ {user.payable}</td>
                  <td className="px-8 py-4 text-center text-[13px] font-medium">{user.plan}</td>
                  <td className="px-8 py-4">
                    <div className="flex items-center justify-center gap-2">
                      <Button variant="outline" size="sm" className="h-8 text-[11px] border-slate-200 text-slate-500 px-4 hover:bg-red-50 hover:text-red-600 hover:border-red-200" onClick={() => { setSelectedUserId(user.id); setIsDeleteDialogOpen(true); }}>Delete</Button>
                      <Button size="sm" className="h-8 text-[11px] bg-[#1E3A8A] hover:bg-[#152a61] text-white px-5 rounded-lg shadow-sm">Active</Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        
        {/* Pagination bar */}
        <div className="p-4 flex items-center justify-between border-t border-slate-50 text-slate-500 text-xs">
          <span>Showing 1 to {recentUsers.length} of 10 results</span>
          <div className="flex gap-1.5">
            <Button variant="outline" size="icon" className="w-8 h-8 rounded-lg border-slate-200 text-slate-400"><ChevronLeft className="w-4 h-4"/></Button>
            <Button variant="outline" size="icon" className="w-8 h-8 rounded-lg bg-white border-slate-200 text-[#1E3A8A] font-bold shadow-sm">1</Button>
            <Button variant="outline" size="icon" className="w-8 h-8 rounded-lg border-slate-200 text-slate-400">2</Button>
            <Button variant="outline" size="icon" className="w-8 h-8 rounded-lg border-slate-200 text-slate-400"><ChevronRight className="w-4 h-4"/></Button>
          </div>
        </div>
      </Card>

      {/* Delete Dialog */}
      <AlertDialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <AlertDialogContent className="bg-white rounded-2xl border-none">
          <AlertDialogHeader>
            <AlertDialogTitle className="text-slate-900">Are you absolutely sure?</AlertDialogTitle>
            <AlertDialogDescription className="text-slate-500">
              This action will permanently delete the user account. This cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <div className="flex gap-3 justify-end mt-4">
            <AlertDialogCancel className="rounded-xl border-slate-200">Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleDeleteUser} className="bg-red-600 hover:bg-red-700 text-white rounded-xl px-6">Yes, Delete</AlertDialogAction>
          </div>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}