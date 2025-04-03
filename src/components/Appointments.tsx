
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Calendar as CalendarIcon, User, MapPin } from 'lucide-react';
import { format } from 'date-fns';
import AppointmentBooking from './AppointmentBooking';

// Mock data for appointments
const mockAppointments = [
  {
    id: 'app-001',
    date: new Date('2023-11-15T10:00:00'),
    purpose: 'Disease Inspection',
    location: 'North Rice Field',
    status: 'Confirmed'
  },
  {
    id: 'app-002',
    date: new Date('2023-11-20T14:30:00'),
    purpose: 'Harvest Planning',
    location: 'Eastern Plantation',
    status: 'Pending'
  }
];

const Appointments = () => {
  const [appointments] = useState(mockAppointments);

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold">Upcoming Field Visits</h2>
        <AppointmentBooking />
      </div>
      
      {appointments.length === 0 ? (
        <div className="text-center py-8 bg-gray-50 rounded-lg border border-dashed">
          <CalendarIcon className="mx-auto h-12 w-12 text-gray-400" />
          <h3 className="mt-2 text-sm font-medium text-gray-900">No appointments</h3>
          <p className="mt-1 text-sm text-gray-500">Get started by scheduling a field visit.</p>
          <div className="mt-6">
            <AppointmentBooking />
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {appointments.map((appointment) => (
            <Card key={appointment.id} className="overflow-hidden hover:shadow-md transition-shadow">
              <CardHeader className="bg-rice-50 pb-2">
                <CardTitle className="text-md flex justify-between items-center">
                  <span>{appointment.purpose}</span>
                  <span className={`text-xs px-2 py-1 rounded-full ${
                    appointment.status === 'Confirmed' 
                      ? 'bg-green-100 text-green-800' 
                      : 'bg-yellow-100 text-yellow-800'
                  }`}>
                    {appointment.status}
                  </span>
                </CardTitle>
              </CardHeader>
              <CardContent className="pt-4">
                <div className="space-y-3 text-sm">
                  <div className="flex items-start">
                    <CalendarIcon className="h-4 w-4 mr-2 mt-0.5 text-rice-600" />
                    <span>{format(appointment.date, 'EEEE, MMMM d, yyyy')} at {format(appointment.date, 'h:mm a')}</span>
                  </div>
                  <div className="flex items-start">
                    <User className="h-4 w-4 mr-2 mt-0.5 text-rice-600" />
                    <span>Agricultural Expert Visit</span>
                  </div>
                  <div className="flex items-start">
                    <MapPin className="h-4 w-4 mr-2 mt-0.5 text-rice-600" />
                    <span>{appointment.location}</span>
                  </div>
                </div>
                
                <div className="mt-4 pt-4 border-t">
                  <Button variant="outline" className="w-full">
                    View Details
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};

export default Appointments;

// Missing import for Button component
import { Button } from '@/components/ui/button';
