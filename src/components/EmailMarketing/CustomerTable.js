"use client";

import DataTable from "@/common/components/Table";
import { TableCell, TableRow } from "../ui/table";
import { Card } from "../ui/card";
import SideSheet from "@/common/components/SideSheet";
import Answers from "./Answers";
import { cn } from "@/lib/utils";

const EMAIL_MARKETING_HEADER = [" ", "Email", "Answers", "Domain"];

const CustomerTable = ({
  domains,
  onSelect = () => {},
  select = [],
  onId = () => {},
  id,
}) => {
  if (!domains?.length) {
    return null;
  }

  return (
    <DataTable headers={EMAIL_MARKETING_HEADER}>
      {domains.map((domain) =>
        domain.customer.map((c) => (
          <TableRow key={c.id}>
            <TableCell>
              <div
                onClick={() => onSelect(c.email)}
                className={cn(
                  "rounded-full !w-5 !h-5 border-4 cursor-pointer",
                  select?.includes(c.email) ? "bg-orange-500" : "bg-orange-200"
                )}
              />
            </TableCell>

            <TableCell>{c.email}</TableCell>

            <TableCell>
              <SideSheet
                title="Answers"
                description="Customer answers are stored by the bot when your customers respond back to the questions asked by the bot."
                trigger={
                  <Card
                    className="bg-grandis py-2 px-4 cursor-pointer text-foreground hover:bg-orange-400 transition-colors rounded-lg"
                    onClick={() => onId(c.id)}
                  >
                    View
                  </Card>
                }
              >
                <Answers id={id} />
              </SideSheet>
            </TableCell>

            <TableCell className="text-right">{c.Domain?.name}</TableCell>
          </TableRow>
        ))
      )}
    </DataTable>
  );
};
export default CustomerTable;
