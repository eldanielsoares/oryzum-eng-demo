
import React, { useState } from 'react';
import { SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar';
import { AppSidebar } from '@/components/Sidebar';
import { DashboardCard } from '@/components/DashboardCard';
import { VehicleCard } from '@/components/VehicleCard';
import { Input } from '@/components/ui/input';
import { Car, Zap, AlertTriangle, Square } from 'lucide-react';
import { Search } from 'lucide-react';

const Index = () => {
  const vehicles = [
    {
      id: '1',
      model: 'Honda Civic',
      year: 2020,
      sensor: 'OBD001',
      status: 'operational' as const,
      mileage: '45,230km',
      temperature: '89°C',
      battery: '87% (12.4V)',
      fuel: '75%',
      dtcs: 0,
      driver: 'John Silva',
      driverInitials: 'JS'
    },
    {
      id: '2', 
      model: 'Toyota Corolla',
      year: 2019,
      sensor: 'OBD002',
      status: 'alert' as const,
      mileage: '67,890km',
      temperature: '92°C',
      battery: '72% (11.9V)',
      fuel: '45%',
      dtcs: 2,
      driver: 'Maria Santos', 
      driverInitials: 'MS'
    },
    {
      id: '3',
      model: 'Ford Focus',
      year: 2021,
      sensor: 'OBD003', 
      status: 'stopped' as const,
      mileage: '23,450km',
      temperature: '75°C',
      battery: '45% (11.2V)',
      fuel: '12%',
      dtcs: 1,
      driver: 'Pedro Costa',
      driverInitials: 'PC'
    },
    {
      id: '4',
      model: 'Volkswagen Jetta',
      year: 2022,
      sensor: 'OBD004',
      status: 'operational' as const,
      mileage: '12,000km',
      temperature: '80°C', 
      battery: '91% (12.6V)',
      fuel: '68%',
      dtcs: 0,
      driver: 'Ana Oliveira',
      driverInitials: 'AO'
    }
  ];

  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<"operational" | "alert" | "stopped" | "">("");

  const filteredVehicles = vehicles.filter((v) => {
    const search = searchTerm.toLowerCase();
    const matchesSearch =
      v.sensor.toLowerCase().includes(search) ||
      v.model.toLowerCase().includes(search) ||
      v.driver.toLowerCase().includes(search);

    const matchesStatus = statusFilter === "" || v.status === statusFilter;

    return matchesSearch && matchesStatus;
  });



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
          
          <div className="space-y-6">
            <div>
              <h1 className="text-3xl font-bold">Fleet Dashboard</h1>
              <p className="text-muted-foreground">Real-time monitoring and operational management</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <DashboardCard
                title="All Vehicles"
                value={4}
                icon={Car}
                color="blue"
                onClick={() => setStatusFilter("")}
              />
              <DashboardCard
                title="Operational"
                value={2}
                icon={Zap}
                color="green"
                onClick={() => setStatusFilter("operational")}
                isSelected={statusFilter === 'operational'}
              />
              <DashboardCard
                title="Alerts"
                value={1}
                icon={AlertTriangle}
                color="orange"
                onClick={() => setStatusFilter("alert")}
                isSelected={statusFilter === 'alert'}
              />
              <DashboardCard
                title="Stopped"
                value={1}
                icon={Square}
                color="red"
                onClick={() => setStatusFilter("stopped")}
                isSelected={statusFilter === 'stopped'}
              />
            </div>
            
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input 
                placeholder="Search by license plate, driver, car or sensor..." 
                className="pl-10"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {filteredVehicles.map((vehicle) => (
                <VehicleCard key={vehicle.id} {...vehicle} />
              ))}
            </div>
          </div>
        </main>
      </div>
    </SidebarProvider>
  );
};

export default Index;
