import DataTable from "@/common/components/Table";
import { TableCell, TableRow } from "../ui/table";
import { formatAMPM, getMonthName } from "@/lib/utils";

const APPOINTMENT_TABLE_HEADER = [
  "Email",
  "Appointed Time",
  "Created On",
  "Domain",
];

const getHour = (hour) => {
  if (hour > 12) {
    return hour % 12;
  }
  return hour;
};

const AllAppointments = ({ bookings = [] }) => {
  return (
    <DataTable headers={APPOINTMENT_TABLE_HEADER}>
      {bookings.map((booking) => (
        <TableRow key={booking.id}>
          <TableCell>{booking.email}</TableCell>

          <TableCell>
            <div>
              {getMonthName(booking.date.getMonth())?.short_label}{" "}
              {booking.date.getDate()} {booking.date.getFullYear()}
            </div>

            <div className="uppercase">{booking.slot}</div>
          </TableCell>

          <TableCell>
            <div>
              {getMonthName(booking.createdAt.getMonth())?.short_label}{" "}
              {booking.createdAt.getDate()} {booking.createdAt.getFullYear()}
            </div>

            <div>{formatAMPM(booking.createdAt)}</div>
          </TableCell>

          <TableCell className="text-right">
            {booking.Customer?.Domain?.name}
          </TableCell>
        </TableRow>
      ))}
    </DataTable>
  );
};

export default AllAppointments;
