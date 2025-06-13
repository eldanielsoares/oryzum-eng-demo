import React, { useState } from 'react';
import { SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar';
import { AppSidebar } from '@/components/Sidebar';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Send, MessageSquare, Clock } from 'lucide-react';

const Alerts = () => {
  const [selectedVehicle, setSelectedVehicle] = useState('');
  const [selectedMessage, setSelectedMessage] = useState('');
  const [customMessage, setCustomMessage] = useState('');
  const [alertSent, setAlertSent] = useState(false);

  const vehicles = [
    { id: '1', name: 'Honda Civic 2020 - João Silva' },
    { id: '2', name: 'Toyota Corolla 2019 - Maria Santos' },
    { id: '3', name: 'Ford Focus 2021 - Pedro Costa' },
    { id: '4', name: 'Volkswagen Jetta 2022 - Ana Oliveira' }
  ];

  const suggestedMessages = [
    "Alert! We detected an error in your vehicle's sensor. We recommend a check as soon as possible.",
    "Attention: Your vehicle has maintenance alerts. Please contact us to schedule a check-up.",
    "Your car registered error codes that may affect performance. Let's schedule a review?",
    "System detected sensor changes. Please head to the workshop for an evaluation.",
    "Preventive maintenance required. Schedule your review to avoid major problems.",
    "High engine temperature detected. Check the cooling system."
  ];

  const recentAlerts = [
    {
      driver: 'João Silva - Honda Civic 2020',
      message: 'Preventive maintenance alert',
      time: '2 hours ago'
    },
    {
      driver: 'Maria Santos - Toyota Corolla 2019',
      message: 'Critical error detected in sensor',
      time: 'Yesterday at 2:30 PM'
    }
  ];

  const handleSendAlert = () => {
    if (selectedVehicle && (selectedMessage || customMessage)) {
      setAlertSent(true);
      setTimeout(() => setAlertSent(false), 5000);
      // Reset form
      setSelectedVehicle('');
      setSelectedMessage('');
      setCustomMessage('');
    }
  };

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
              <h1 className="text-3xl font-bold">WhatsApp Alerts</h1>
              <p className="text-muted-foreground">Send important notifications to drivers</p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* New Alert Form */}
              <div className="lg:col-span-2">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <MessageSquare className="w-5 h-5" />
                      New Alert
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <Label htmlFor="vehicle">Select Vehicle</Label>
                      <Select value={selectedVehicle} onValueChange={setSelectedVehicle}>
                        <SelectTrigger>
                          <SelectValue placeholder="Choose vehicle to send alert" />
                        </SelectTrigger>
                        <SelectContent>
                          {vehicles.map((vehicle) => (
                            <SelectItem key={vehicle.id} value={vehicle.id}>
                              {vehicle.name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    <div>
                      <Label>Suggested Messages</Label>
                      <div className="mt-2 space-y-2 max-h-40 overflow-y-auto border rounded-md p-3">
                        {suggestedMessages.map((message, index) => (
                          <div
                            key={index}
                            className={`p-2 text-sm border rounded cursor-pointer transition-colors ${
                              selectedMessage === message 
                                ? 'bg-blue-50 border-blue-200' 
                                : 'hover:bg-gray-50'
                            }`}
                            onClick={() => setSelectedMessage(message)}
                          >
                            {message}
                          </div>
                        ))}
                      </div>
                    </div>

                    <div>
                      <Label htmlFor="custom-message">Custom Message</Label>
                      <Textarea
                        id="custom-message"
                        placeholder="Type your custom message..."
                        value={customMessage}
                        onChange={(e) => setCustomMessage(e.target.value)}
                        className="min-h-[100px]"
                      />
                    </div>

                    {alertSent && (
                      <Alert className="bg-yellow-50 border-yellow-200">
                        <AlertDescription>
                          ⚠️ The message will be sent to the driver's registered WhatsApp number.
                        </AlertDescription>
                      </Alert>
                    )}

                    <Button 
                      onClick={handleSendAlert}
                      disabled={!selectedVehicle || (!selectedMessage && !customMessage)}
                      className="w-full"
                    >
                      <Send className="w-4 h-4 mr-2" />
                      Send Alert
                    </Button>
                  </CardContent>
                </Card>
              </div>

              {/* Recent Alerts */}
              <div>
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Clock className="w-5 h-5" />
                      Recent Alerts
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {recentAlerts.map((alert, index) => (
                        <div key={index} className="p-3 bg-gray-50 rounded-lg">
                          <div className="flex items-start gap-2">
                            <MessageSquare className="w-4 h-4 text-blue-600 mt-1 flex-shrink-0" />
                            <div className="flex-1 min-w-0">
                              <p className="text-sm font-medium text-gray-900 truncate">
                                {alert.driver}
                              </p>
                              <p className="text-sm text-gray-600 mt-1">
                                {alert.message}
                              </p>
                              <p className="text-xs text-gray-500 mt-2">
                                {alert.time}
                              </p>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </main>
      </div>
    </SidebarProvider>
  );
};

export default Alerts;
