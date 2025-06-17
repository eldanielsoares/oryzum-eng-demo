
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  Thermometer, 
  Gauge, 
  Battery, 
  Clock, 
  Zap, 
  Power,
  AlertTriangle
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { Label } from './ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';

interface MetricCardProps {
  icon: React.ReactNode;
  label: string;
  value: string;
  color?: string;
}

interface Vehicles {
  id: string;
  vehicle: string;
}

function MetricCard({ icon, label, value, color = "text-muted-foreground" }: MetricCardProps) {
  
  return (
    <div className="flex items-center gap-4 p-4 bg-muted/50 rounded-lg">
      <div className={color}>
        {icon}
      </div>
      <div>
        <p className="text-sm text-muted-foreground">{label}</p>
        <p className="text-xl font-bold">{value}</p>
      </div>
    </div>
  );
}

export function MonitoringMetrics() {
  const vehicles = [
    {
      id: "1",
      vehicle: "Honda Civic 2020",
      temperature: "85°C",
      rpm: "850",
      speed: "50 km/h",
      fuel: "75%",
      battery: "87% (12.4V)",
      engineTime: "2h 30m",
      ignition: "On",
      dtcs: ["P0301", "P0171"],
    },
    {
      id: "2",
      vehicle: "Toyota Corolla 2019",
      temperature: "92°C",
      rpm: "950",
      speed: "30 km/h",
      fuel: "45%",
      battery: "72% (11.9V)",
      engineTime: "1h 10m",
      ignition: "On",
      dtcs: ["P0420"],
    },
    {
      id: "3",
      vehicle: "Ford Focus 2021",
      temperature: "78°C",
      rpm: "800",
      speed: "0 km/h",
      fuel: "60%",
      battery: "80% (12.2V)",
      engineTime: "3h 05m",
      ignition: "Off",
      dtcs: [],
    },
    {
      id: "4",
      vehicle: "Volkswagen Jetta 2022",
      temperature: "88°C",
      rpm: "1000",
      speed: "70 km/h",
      fuel: "68%",
      battery: "91% (12.6V)",
      engineTime: "45m",
      ignition: "On",
      dtcs: ["P0135"],
    },
    {
      id: "5",
      vehicle: "Chevrolet Onix 2023",
      temperature: "81°C",
      rpm: "870",
      speed: "40 km/h",
      fuel: "52%",
      battery: "76% (12.1V)",
      engineTime: "1h 45m",
      ignition: "On",
      dtcs: ["P0172", "P0300"],
    },
  ];
  
  

  const [selectedVehicle, setSelectedVehicle] = useState(vehicles[0]);
  
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">Monitoring</h2>
          <p className="text-muted-foreground">Real-time vehicle data</p>
        </div>
        <div>
        <Select
          value={selectedVehicle.vehicle}
          onValueChange={(value) => {
            const vehicle = vehicles.find((v) => v.vehicle === value);
            if (vehicle) setSelectedVehicle(vehicle);
          }}
        >
        <SelectTrigger>
          <SelectValue placeholder="Select vehicle" />
        </SelectTrigger>
        <SelectContent>
        {vehicles.map((v) => (
          <SelectItem key={v.id} value={v.vehicle}>
          {v.vehicle}
         </SelectItem>
        ))}
        </SelectContent>
      </Select>
          </div>
      </div>
      
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <div className="w-3 h-3 bg-green-500 rounded-full"></div>
            Real-Time Data
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <MetricCard
          icon={<Thermometer className="w-6 h-6" />}
          label="Temperature"
          value={selectedVehicle.temperature}
          color="text-orange-500"
        />
        <MetricCard
          icon={<Gauge className="w-6 h-6" />}
          label="RPM"
          value={selectedVehicle.rpm}
          color="text-blue-500"
        />
        <MetricCard
          icon={<Zap className="w-6 h-6" />}
          label="Speed"
          value={selectedVehicle.speed}
          color="text-green-500"
        />
        <MetricCard
          icon={<Battery className="w-6 h-6" />}
          label="Fuel"
          value={selectedVehicle.fuel}
          color="text-purple-500"
        />
        <MetricCard
          icon={<Battery className="w-6 h-6" />}
          label="Battery"
          value={selectedVehicle.battery}
          color="text-yellow-500"
        />
        <MetricCard
          icon={<Clock className="w-6 h-6" />}
          label="Engine Time"
          value={selectedVehicle.engineTime}
        />
        <MetricCard
          icon={<Power className="w-6 h-6" />}
          label="Ignition"
          value={selectedVehicle.ignition}
          color="text-green-500"
        />
          </div>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <AlertTriangle className="w-5 h-5 text-orange-500" />
            Detected Errors (DTCs)
            <Badge variant="secondary">2</Badge>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
        <Link to={'/error-codes'}>
          <div className="flex items-center justify-between p-4 border rounded-lg">
            <div className="flex items-center gap-3">
              <Badge variant="outline" className="text-orange-600 border-orange-200">P0301</Badge>
              <div>
                <p className="font-medium">Cylinder 1 ignition failure</p>
                <p className="text-sm text-muted-foreground">2024-01-15 14:30</p>
              </div>
            </div>
          </div>
        </Link>
          
          <div className="flex items-center justify-between p-4 border rounded-lg">
            <div className="flex items-center gap-3">
              <Badge variant="outline" className="text-orange-600 border-orange-200">P0171</Badge>
              <div>
                <p className="font-medium">System too lean (Bank 1)</p>
                <p className="text-sm text-muted-foreground">2024-01-14 09:15</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
      
      <div className="bg-green-50 border border-green-200 rounded-lg p-4">
        <div className="flex items-center gap-2 text-green-600">
          <div className="w-2 h-2 bg-green-500 rounded-full"></div>
          <span className="font-medium">OBD2 Connection Status</span>
        </div>
        <p className="text-sm text-green-600 mt-1">Connected - Last sync: 2 minutes ago</p>
      </div>
    </div>
  );
}
