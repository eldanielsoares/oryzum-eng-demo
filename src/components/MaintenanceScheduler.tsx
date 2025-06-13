
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Car, Calendar, Clock, Plus, Edit, Trash } from 'lucide-react';

interface Appointment {
  id: string;
  vehicle: string;
  type: string;
  description: string;
  date: string;
  time: string;
  status: 'scheduled' | 'completed';
}

export function MaintenanceScheduler() {
  const [showNewForm, setShowNewForm] = useState(false);
  const [appointments, setAppointments] = useState<Appointment[]>([
    {
      id: '1',
      vehicle: 'Honda Civic 2020',
      type: 'Oil Change',
      description: 'Scheduled oil change at 10,000 km',
      date: '19/01/2024',
      time: '09:00',
      status: 'scheduled'
    },
    {
      id: '2',
      vehicle: 'Toyota Corolla 2019',
      type: 'Preventive Maintenance',
      description: 'Complete preventive maintenance',
      date: '17/01/2024',
      time: '14:00',
      status: 'completed'
    }
  ]);

  const [newAppointment, setNewAppointment] = useState({
    vehicle: '',
    type: '',
    date: '06/06/2025',
    time: '00:00',
    observations: ''
  });

  const handleSubmit = () => {
    const appointment: Appointment = {
      id: Date.now().toString(),
      vehicle: newAppointment.vehicle,
      type: newAppointment.type,
      description: newAppointment.observations,
      date: newAppointment.date,
      time: newAppointment.time,
      status: 'scheduled'
    };
    
    setAppointments([appointment, ...appointments]);
    setNewAppointment({ vehicle: '', type: '', date: '06/06/2025', time: '00:00', observations: '' });
    setShowNewForm(false);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">Maintenance Appointments</h2>
          <p className="text-muted-foreground">Manage scheduled fleet maintenance</p>
        </div>
        <Button onClick={() => setShowNewForm(!showNewForm)} className="bg-green-500 hover:bg-green-600">
          <Plus className="w-4 h-4 mr-2" />
          New Appointment
        </Button>
      </div>

      {showNewForm && (
        <Card>
          <CardHeader>
            <CardTitle>New Appointment</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="vehicle">Vehicle</Label>
                <Select value={newAppointment.vehicle} onValueChange={(value) => setNewAppointment({...newAppointment, vehicle: value})}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select vehicle" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Honda Civic 2020">Honda Civic 2020</SelectItem>
                    <SelectItem value="Toyota Corolla 2019">Toyota Corolla 2019</SelectItem>
                    <SelectItem value="Ford Focus 2021">Ford Focus 2021</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div>
                <Label htmlFor="type">Maintenance Type</Label>
                <Select value={newAppointment.type} onValueChange={(value) => setNewAppointment({...newAppointment, type: value})}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select maintenance type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Oil Change">Oil Change</SelectItem>
                    <SelectItem value="Brake Service">Brake Service</SelectItem>
                    <SelectItem value="Tire Rotation">Tire Rotation</SelectItem>
                    <SelectItem value="Preventive Maintenance">Preventive Maintenance</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div>
                <Label htmlFor="date">Date</Label>
                <Input
                  type="date"
                  value="2025-06-06"
                  onChange={(e) => setNewAppointment({...newAppointment, date: e.target.value})}
                />
              </div>
              
              <div>
                <Label htmlFor="time">Time</Label>
                <Input
                  type="time"
                  value={newAppointment.time}
                  onChange={(e) => setNewAppointment({...newAppointment, time: e.target.value})}
                />
              </div>
            </div>
            
            <div>
              <Label htmlFor="observations">Observations (optional)</Label>
              <Textarea
                placeholder="Additional details about the maintenance..."
                value={newAppointment.observations}
                onChange={(e) => setNewAppointment({...newAppointment, observations: e.target.value})}
              />
            </div>
            
            <div className="flex gap-2">
              <Button onClick={handleSubmit} className="bg-green-500 hover:bg-green-600">
                Confirm Appointment
              </Button>
              <Button variant="outline" onClick={() => setShowNewForm(false)}>
                Cancel
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Calendar className="w-5 h-5" />
            Appointments
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {appointments.map((appointment) => (
            <div key={appointment.id} className="flex items-center justify-between p-4 border rounded-lg">
              <div className="flex items-center gap-4">
                <Car className="w-6 h-6 text-muted-foreground" />
                <div>
                  <h4 className="font-medium">{appointment.vehicle}</h4>
                  <p className="text-sm text-muted-foreground">{appointment.type}</p>
                  <p className="text-sm text-muted-foreground">{appointment.description}</p>
                </div>
              </div>
              
              <div className="flex items-center gap-4">
                <div className="text-right">
                  <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4" />
                    <span className="text-sm">{appointment.date}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="w-4 h-4" />
                    <span className="text-sm">{appointment.time}</span>
                  </div>
                </div>
                
                <Badge 
                  variant={appointment.status === 'completed' ? 'default' : 'secondary'}
                  className={appointment.status === 'completed' ? 'bg-green-500' : 'bg-blue-500'}
                >
                  {appointment.status === 'completed' ? 'Completed' : 'Scheduled'}
                </Badge>
                
                <div className="flex gap-2">
                  <Button variant="outline" size="sm">
                    <Edit className="w-4 h-4" />
                  </Button>
                  <Button variant="outline" size="sm">
                    <Trash className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
}
