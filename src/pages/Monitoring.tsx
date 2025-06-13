
import React from 'react';
import { SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar';
import { AppSidebar } from '@/components/Sidebar';
import { MonitoringMetrics } from '@/components/MonitoringMetrics';
import { AlertTriangle } from 'lucide-react';

const Monitoring = () => {
  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full">
        <AppSidebar />
        <main className="flex-1 p-6">
          <div className="flex items-center justify-between mb-6">
            <SidebarTrigger />
            <div className="flex items-center gap-4">
              <span className="text-sm text-muted-foreground">Manager Admin</span>
            </div>
          </div>
          
          <MonitoringMetrics />
        </main>
      </div>
    </SidebarProvider>
  );
};

export default Monitoring;
