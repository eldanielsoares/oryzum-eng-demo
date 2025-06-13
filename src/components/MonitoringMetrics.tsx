
import React from 'react';
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

interface MetricCardProps {
  icon: React.ReactNode;
  label: string;
  value: string;
  color?: string;
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
  const currentVehicle = "Honda Civic 2020 OBD001";
  
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">Monitoring</h2>
          <p className="text-muted-foreground">Real-time vehicle data</p>
        </div>
        <Badge variant="outline" className="text-green-600 border-green-200">
          <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
          {currentVehicle}
        </Badge>
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
              value="85°C"
              color="text-orange-500"
            />
            <MetricCard
              icon={<Gauge className="w-6 h-6" />}
              label="RPM"
              value="850"
              color="text-blue-500"
            />
            <MetricCard
              icon={<Zap className="w-6 h-6" />}
              label="Speed"
              value="0 km/h"
              color="text-green-500"
            />
            <MetricCard
              icon={<Battery className="w-6 h-6" />}
              label="Fuel"
              value="75%"
              color="text-purple-500"
            />
            <MetricCard
              icon={<Battery className="w-6 h-6" />}
              label="Battery"
              value="87% (12.4V)"
              color="text-yellow-500"
            />
            <MetricCard
              icon={<Clock className="w-6 h-6" />}
              label="Engine Time"
              value="2h 30m"
            />
            <MetricCard
              icon={<Power className="w-6 h-6" />}
              label="Ignition"
              value="On"
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
          <div className="flex items-center justify-between p-4 border rounded-lg">
            <div className="flex items-center gap-3">
              <Badge variant="outline" className="text-orange-600 border-orange-200">P0301</Badge>
              <div>
                <p className="font-medium">Cylinder 1 ignition failure</p>
                <p className="text-sm text-muted-foreground">2024-01-15 14:30</p>
              </div>
            </div>
          </div>
          
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
