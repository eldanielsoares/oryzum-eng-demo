
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Car, Battery, Thermometer, AlertTriangle, Calendar } from 'lucide-react';
import { Link } from 'react-router-dom';

interface VehicleCardProps {
  id: string;
  model: string;
  year: number;
  sensor: string;
  status: 'operational' | 'alert' | 'stopped';
  mileage: string;
  temperature: string;
  battery: string;
  fuel: string;
  dtcs: number;
  driver: string;
  driverInitials: string;
}

const statusConfig = {
  operational: { label: 'Operational', color: 'bg-green-500', textColor: 'text-green-600' },
  alert: { label: 'Alert', color: 'bg-orange-500', textColor: 'text-orange-600' },
  stopped: { label: 'Stopped', color: 'bg-red-500', textColor: 'text-red-600' },
};

export function VehicleCard({ 
  model, 
  year, 
  sensor, 
  status, 
  mileage, 
  temperature, 
  battery, 
  fuel, 
  dtcs, 
  driver, 
  driverInitials 
}: VehicleCardProps) {
  const statusInfo = statusConfig[status];
  
  return (
    <Card className="w-full">
      <CardHeader className="pb-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Car className="w-6 h-6 text-muted-foreground" />
            <div>
              <CardTitle className="text-lg font-semibold">{model} {year}</CardTitle>
              <p className="text-sm text-muted-foreground">Sensor: {sensor}</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <div className={`w-3 h-3 rounded-full ${statusInfo.color}`}></div>
            <span className={`text-sm font-medium ${statusInfo.textColor}`}>
              {statusInfo.label}
            </span>
          </div>
        </div>
      </CardHeader>
      
      <CardContent className="space-y-4">
        <div className="grid grid-cols-2 gap-4 text-sm">
          <div>
            <span className="text-muted-foreground">Mileage: </span>
            <span className="font-medium">{mileage}</span>
          </div>
          <div className="flex items-center gap-1">
            <Thermometer className="w-4 h-4 text-orange-500" />
            <span className="font-medium">{temperature}</span>
          </div>
          <div className="flex items-center gap-1">
            <Battery className="w-4 h-4 text-blue-500" />
            <span className="font-medium">{battery}</span>
          </div>
          <div>
            <span className="text-muted-foreground">Fuel: </span>
            <span className="font-medium">{fuel}</span>
          </div>
        </div>
        
        {dtcs > 0 && (
          <div className="flex items-center gap-2">
            <AlertTriangle className="w-4 h-4 text-orange-500" />
            <span className="text-sm font-medium text-orange-600">{dtcs} DTCs</span>
          </div>
        )}
        
        <div className="flex items-center justify-between pt-2 border-t">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center">
              <span className="text-primary-foreground text-xs font-bold">{driverInitials}</span>
            </div>
            <span className="text-sm font-medium">{driver}</span>
          </div>
          
          <div className="flex gap-2">
            <Link to='/alerts'>
            <Button variant="outline" size="sm">
              <AlertTriangle className="w-4 h-4 mr-1" />
              Alert
            </Button>
            </Link>
            <Link to='/appointments'>
            <Button variant="outline" size="sm">
              <Calendar className="w-4 h-4 mr-1" />
              Schedule
            </Button>
            </Link>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
