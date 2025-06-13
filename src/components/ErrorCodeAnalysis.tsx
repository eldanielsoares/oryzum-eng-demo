
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { ArrowLeft, Wrench, DollarSign, AlertTriangle, Info } from 'lucide-react';

export function ErrorCodeAnalysis() {
  const [selectedError, setSelectedError] = useState<string | null>(null);
  const [simulatorData, setSimulatorData] = useState({
    repairTime: '4',
    hourlyRate: '150',
    operationValue: '500'
  });

  const errorCode = {
    code: 'P0301',
    title: 'Cylinder 1 ignition failure',
    severity: 'Moderate',
    description: 'Detected ignition failure in cylinder 1, which may be caused by worn spark plug, faulty ignition coil or combustion problems.',
    recommendation: 'Check and replace spark plug, test ignition coil and injection system.',
    immediateCost: 350,
    projectedCost: 3200,
    impacts: [
      'Reduced engine power',
      'Increased fuel consumption', 
      'Possible catalytic converter damage',
      'Excessive engine vibrations'
    ]
  };

  const calculateCurrentCost = () => {
    const repair = parseFloat(simulatorData.hourlyRate) + 50; // Parts cost
    return repair;
  };

  const calculateProjectedCost = () => {
    const time = parseFloat(simulatorData.repairTime);
    const rate = parseFloat(simulatorData.hourlyRate);
    const operation = parseFloat(simulatorData.operationValue);
    return (time * rate) + operation + 1500; // Additional damage costs
  };

  if (!selectedError) {
    return (
      <div className="space-y-6">
        <div className="flex items-center gap-4">
          <Button variant="outline" size="sm" onClick={() => setSelectedError(null)}>
            <ArrowLeft className="w-4 h-4" />
          </Button>
          <div>
            <h2 className="text-2xl font-bold">Error Details</h2>
            <p className="text-muted-foreground">Technical and financial impact analysis</p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
            <Card>
              <CardHeader>
                <div className="flex items-center gap-3">
                  <Badge variant="outline" className="text-orange-600 border-orange-200 text-lg px-3 py-1">
                    {errorCode.code}
                  </Badge>
                  <div>
                    <CardTitle>{errorCode.title}</CardTitle>
                    <p className="text-sm text-muted-foreground">Severity: {errorCode.severity}</p>
                  </div>
                </div>
                <div className="flex gap-2 mt-4">
                  <Button variant="outline" size="sm">
                    <Wrench className="w-4 h-4 mr-2" />
                    Technical
                  </Button>
                  <Button variant="outline" size="sm">
                    <DollarSign className="w-4 h-4 mr-2" />
                    Financial
                  </Button>
                </div>
              </CardHeader>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Damage Simulator</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-3 gap-4">
                  <div>
                    <Label>Repair Time (hours)</Label>
                    <Input
                      type="number"
                      value={simulatorData.repairTime}
                      onChange={(e) => setSimulatorData({...simulatorData, repairTime: e.target.value})}
                    />
                  </div>
                  <div>
                    <Label>Hourly Rate (R$)</Label>
                    <Input  
                      type="number"
                      value={simulatorData.hourlyRate}
                      onChange={(e) => setSimulatorData({...simulatorData, hourlyRate: e.target.value})}
                    />
                  </div>
                  <div>
                    <Label>Operation Value/Hour (R$)</Label>
                    <Input
                      type="number" 
                      value={simulatorData.operationValue}
                      onChange={(e) => setSimulatorData({...simulatorData, operationValue: e.target.value})}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4 pt-4">
                  <Card className="border-blue-200 bg-blue-50">
                    <CardContent className="p-4">
                      <div className="flex items-center gap-2 text-blue-600 mb-2">
                        <Info className="w-4 h-4" />
                        <span className="font-medium">Current Cost</span>
                      </div>
                      <p className="text-2xl font-bold text-blue-600">R$ {calculateCurrentCost()}</p>
                      <p className="text-sm text-blue-600">Repair now</p>
                    </CardContent>
                  </Card>

                  <Card className="border-red-200 bg-red-50">
                    <CardContent className="p-4">
                      <div className="flex items-center gap-2 text-red-600 mb-2">
                        <AlertTriangle className="w-4 h-4" />
                        <span className="font-medium">Cost if Delayed</span>
                      </div>
                      <p className="text-2xl font-bold text-red-600">R$ {calculateProjectedCost()}</p>
                      <p className="text-sm text-red-600">Projection based on problem worsening</p>
                    </CardContent>
                  </Card>
                </div>
              </CardContent>
            </Card>

            <Card className="border-orange-200 bg-orange-50">
              <CardContent className="p-4">
                <div className="flex items-center gap-2 text-orange-600 mb-2">
                  <AlertTriangle className="w-4 h-4" />
                  <span className="font-medium">Predictive Insight</span>
                </div>
                <p className="text-orange-600">
                  Ignoring this error can cause damage of <strong>R$ 2,250</strong> within 48 hours.
                </p>
              </CardContent>
            </Card>
          </div>

          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Description</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">{errorCode.description}</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Repair Recommendation</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">{errorCode.recommendation}</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Operational Impacts</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {errorCode.impacts.map((impact, index) => (
                    <div key={index} className="flex items-center gap-2">
                      <AlertTriangle className="w-4 h-4 text-orange-500" />
                      <span className="text-sm">{impact}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold">Error Code Details</h2>
        <p className="text-muted-foreground">Technical and financial impact analysis</p>
      </div>

      <Card className="cursor-pointer hover:shadow-md transition-shadow" onClick={() => setSelectedError('P0301')}>
        <CardContent className="p-6">
          <div className="flex items-center gap-4">
            <Badge variant="outline" className="text-orange-600 border-orange-200 text-lg px-3 py-1">
              P0301
            </Badge>
            <div className="flex-1">
              <h3 className="font-semibold text-lg">{errorCode.title}</h3>
              <p className="text-muted-foreground">Severity: {errorCode.severity}</p>
            </div>
            <ArrowLeft className="w-5 h-5 rotate-180 text-muted-foreground" />
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
