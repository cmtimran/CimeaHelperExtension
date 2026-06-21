import { sql } from '@vercel/postgres';
import React from 'react';
import { Activity, Globe, Monitor, Clock } from 'lucide-react';
import Link from 'next/link';

export const dynamic = 'force-dynamic';

export default async function DashboardPage() {
  let logs: any[] = [];
  let error = null;

  try {
    const result = await sql`SELECT * FROM usage_logs ORDER BY created_at DESC LIMIT 100;`;
    logs = result.rows;
  } catch (e: any) {
    if (e.message.includes('relation "usage_logs" does not exist')) {
      error = "Database table hasn't been created yet. It will be created automatically on the first extension usage.";
    } else {
      error = "Error connecting to Vercel Postgres. Have you linked the database in Vercel Settings?";
    }
  }

  const successCount = logs.filter(log => log.event_type === 'payment_success').length;
  const uniqueUsers = new Set(logs.map(log => log.ip_address)).size;

  return (
    <div className="min-h-screen bg-slate-950 text-slate-50 font-sans p-6 md:p-12">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Owner Dashboard</h1>
            <p className="text-slate-400 mt-1">Live Tracking & Analytics for CIMEA Helper</p>
          </div>
          <Link href="/" className="px-4 py-2 bg-slate-800 hover:bg-slate-700 rounded-lg text-sm font-medium transition-colors">
            Back to Home
          </Link>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <StatCard icon={<Activity className="text-emerald-400" />} title="Total Events" value={logs.length} />
          <StatCard icon={<Globe className="text-cyan-400" />} title="Unique IPs" value={uniqueUsers} />
          <StatCard icon={<Monitor className="text-purple-400" />} title="Successful Payments" value={successCount} />
        </div>

        {/* Error State */}
        {error && (
          <div className="p-4 mb-8 rounded-lg bg-amber-500/10 border border-amber-500/20 text-amber-400 flex items-center gap-3">
            <span className="flex h-2 w-2 rounded-full bg-amber-400 animate-pulse"></span>
            {error}
          </div>
        )}

        {/* Logs Table */}
        <div className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm whitespace-nowrap">
              <thead className="bg-slate-800/50 text-slate-400 border-b border-slate-800">
                <tr>
                  <th className="px-6 py-4 font-medium">Event Type</th>
                  <th className="px-6 py-4 font-medium">Location</th>
                  <th className="px-6 py-4 font-medium">IP Address</th>
                  <th className="px-6 py-4 font-medium">Time</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/50">
                {logs.length === 0 && !error && (
                  <tr>
                    <td colSpan={4} className="px-6 py-8 text-center text-slate-500">
                      No logs recorded yet. Waiting for extension usage...
                    </td>
                  </tr>
                )}
                {logs.map((log) => (
                  <tr key={log.id} className="hover:bg-slate-800/30 transition-colors">
                    <td className="px-6 py-4">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${
                        log.event_type === 'payment_success' ? 'bg-emerald-500/10 border-emerald-500/20 text-emerald-400' :
                        log.event_type === 'payment_failed_retry' ? 'bg-rose-500/10 border-rose-500/20 text-rose-400' :
                        'bg-blue-500/10 border-blue-500/20 text-blue-400'
                      }`}>
                        {log.event_type.replace(/_/g, ' ').toUpperCase()}
                      </span>
                    </td>
                    <td className="px-6 py-4 flex items-center gap-2">
                      {log.city}, {log.country}
                    </td>
                    <td className="px-6 py-4 font-mono text-slate-400">{log.ip_address}</td>
                    <td className="px-6 py-4 text-slate-400 flex items-center gap-2">
                      <Clock className="w-4 h-4" />
                      {new Date(log.created_at).toLocaleString()}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

function StatCard({ icon, title, value }: { icon: React.ReactNode, title: string, value: number }) {
  return (
    <div className="bg-slate-900 border border-slate-800 p-6 rounded-2xl flex items-center gap-4">
      <div className="w-12 h-12 bg-slate-800 rounded-xl flex items-center justify-center border border-slate-700">
        {icon}
      </div>
      <div>
        <p className="text-slate-400 text-sm font-medium">{title}</p>
        <p className="text-2xl font-bold mt-1">{value}</p>
      </div>
    </div>
  );
}
