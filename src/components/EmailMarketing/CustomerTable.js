"use client";

import DataTable from "@/common/components/Table";
import { TableCell, TableRow } from "../ui/table";
import SideSheet from "@/common/components/SideSheet";
import Answers from "./Answers";
import { cn } from "@/lib/utils";
import { useState } from "react";
import { buttonVariants } from "../ui/button";
import Button from "@/common/components/Button";
import useMapCustomers from "@/hooks/useMapCustomers";

const EMAIL_MARKETING_HEADER = [" ", "Email", "Answers"];

const CustomerTable = ({
  allCustomers = [],
  refetch,
  campaignId,
  customers = [],
}) => {
  const [selected, setSelected] = useState(() => customers || []);

  const { loading, mapCustomers } = useMapCustomers({
    customers: selected,
    refetch,
    campaignId,
  });

  if (!allCustomers.length) {
    return <h3>No customers exist for this domain</h3>;
  }

  return (
    <div className="h-full flex flex-col justify-between">
      <DataTable headers={EMAIL_MARKETING_HEADER}>
        {allCustomers.map((c) => {
          return (
            <TableRow key={c.id}>
              <TableCell>
                <div
                  onClick={() => {
                    setSelected((p) => {
                      if (p.includes(c.email)) {
                        return p.filter((x) => x !== c.email);
                      }

                      return [...p, c.email];
                    });
                  }}
                  className={cn(
                    "rounded-full !w-5 !h-5 border-4 cursor-pointer",
                    selected?.includes(c.email)
                      ? "bg-orange-500"
                      : "bg-orange-200"
                  )}
                />
              </TableCell>

              <TableCell>{c.email}</TableCell>

              <TableCell>
                <SideSheet
                  title="Answers"
                  description="Customer answers are stored by the bot when your customers respond back to the questions asked by the bot."
                  trigger={
                    <div
                      className={buttonVariants({
                        variant: "outline",
                        size: "sm",
                      })}
                    >
                      View
                    </div>
                  }
                >
                  <Answers customerId={c.id} />
                </SideSheet>
              </TableCell>
            </TableRow>
          );
        })}
      </DataTable>

      <Button
        disabled={!selected.length}
        loading={loading}
        onClick={mapCustomers}
      >
        Save
      </Button>
    </div>
  );
};
export default CustomerTable;
