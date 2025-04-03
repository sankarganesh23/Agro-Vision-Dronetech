
import { useState } from 'react';
import { Calendar } from '@/components/ui/calendar';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { CalendarIcon, Clock, Loader2 } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { format } from 'date-fns';
import { useToast } from '@/hooks/use-toast';

// Mock appointments data
const mockAppointments = [
  {
    id: 1,
    name: 'Field Inspection',
    date: new Date(2023, 10, 15),
    time: '10:00 AM',
    type: 'In person',
    status: 'Confirmed'
  },
  {
    id: 2,
    name: 'Crop Health Assessment',
    date: new Date(2023, 10, 20),
    time: '2:30 PM',
    type: 'In person',
    status: 'Pending'
  }
];

const Appointments = () => {
  const [appointments, setAppointments] = useState(mockAppointments);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [time, setTime] = useState('');
  const [appointmentType, setAppointmentType] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const handleCreateAppointment = () => {
    if (!date || !time || !appointmentType) {
      toast({
        title: "Missing information",
        description: "Please fill in all fields for the appointment",
        variant: "destructive"
      });
      return;
    }

    setIsSubmitting(true);

    // Mock API call
    setTimeout(() => {
      const newAppointment = {
        id: appointments.length + 1,
        name: appointmentType,
        date: date,
        time: time,
        type: 'In person',
        status: 'Pending'
      };

      setAppointments([...appointments, newAppointment]);
      setIsDialogOpen(false);
      setIsSubmitting(false);
      setTime('');
      setAppointmentType('');

      toast({
        title: "Appointment created",
        description: "Your appointment has been scheduled successfully",
      });
    }, 1500);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold">Upcoming Appointments</h2>
        
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button className="bg-rice-600 hover:bg-rice-700">
              + New Appointment
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Schedule New Appointment</DialogTitle>
              <DialogDescription>
                Create a new appointment for field visit or crop inspection.
              </DialogDescription>
            </DialogHeader>
            
            <div className="grid gap-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="appointment-type">Appointment Type</Label>
                <Input
                  id="appointment-type"
                  placeholder="e.g., Field Inspection, Crop Assessment"
                  value={appointmentType}
                  onChange={(e) => setAppointmentType(e.target.value)}
                />
              </div>
              
              <div className="space-y-2">
                <Label>Date</Label>
                <div className="border rounded-md p-2">
                  <Calendar
                    mode="single"
                    selected={date}
                    onSelect={setDate}
                    className="mx-auto p-3 pointer-events-auto"
                    disabled={(date) => {
                      // Disable past dates
                      const today = new Date();
                      today.setHours(0, 0, 0, 0);
                      return date < today;
                    }}
                  />
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="time">Time</Label>
                <div className="flex">
                  <Input
                    id="time"
                    type="time"
                    value={time}
                    onChange={(e) => setTime(e.target.value)}
                    className="flex-1"
                  />
                </div>
              </div>
            </div>
            
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsDialogOpen(false)}>Cancel</Button>
              <Button 
                onClick={handleCreateAppointment}
                className="bg-rice-600 hover:bg-rice-700"
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                    Creating...
                  </>
                ) : (
                  "Create Appointment"
                )}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
      
      {appointments.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {appointments.map((appointment) => (
            <Card key={appointment.id} className="p-4 hover:shadow-md transition-shadow">
              <div className="flex justify-between">
                <h3 className="font-medium">{appointment.name}</h3>
                <span className={`px-2 py-1 rounded-full text-xs ${
                  appointment.status === 'Confirmed' 
                    ? 'bg-green-100 text-green-800' 
                    : 'bg-yellow-100 text-yellow-800'
                }`}>
                  {appointment.status}
                </span>
              </div>
              
              <div className="mt-3 space-y-1 text-sm text-gray-600">
                <div className="flex items-center">
                  <CalendarIcon className="h-4 w-4 mr-2" />
                  <span>{format(appointment.date, 'PPP')}</span>
                </div>
                <div className="flex items-center">
                  <Clock className="h-4 w-4 mr-2" />
                  <span>{appointment.time}</span>
                </div>
              </div>
              
              <div className="mt-4 flex justify-end space-x-2">
                <Button variant="outline" size="sm">Reschedule</Button>
                <Button variant="outline" size="sm" className="text-red-600 hover:bg-red-50">Cancel</Button>
              </div>
            </Card>
          ))}
        </div>
      ) : (
        <div className="text-center py-8 border rounded-md bg-gray-50">
          <p className="text-gray-500">No appointments scheduled yet</p>
          <Button 
            className="mt-4 bg-rice-600 hover:bg-rice-700"
            onClick={() => setIsDialogOpen(true)}
          >
            Schedule Your First Appointment
          </Button>
        </div>
      )}
    </div>
  );
};

export default Appointments;
