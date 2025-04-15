// import React from 'react'
// import TabsMenu from '../tabs/intex'
// import { SideSheet } from '../sheet'
// import { Plus } from 'lucide-react'
// import { CreateProductForm } from './product-form'
// import { TabsContent } from '../ui/tabs'
// import { DataTable } from '../table'
// import { TableCell, TableRow } from '../ui/table'
// import Image from 'next/image'
// import { getMonthName } from '@/lib/utils'

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import HelpDesk from "./HelpDesk";

const TABS = [
  {
    label: "All Products",
    value: "all_products",
    component: HelpDesk,
  },
  {
    label: "Live",
    value: "live",
    component: HelpDesk,
  },
  {
    label: "Deactivated",
    value: "deactivated",
    component: HelpDesk,
  },
];

const Products = ({ id, products }) => {
  return (
    <div className="py-5 mb-10 flex flex-col gap-5 items-start">
      <div className="flex flex-col gap-2">
        <h2 className="font-bold text-2xl">Products</h2>

        <p className="text-sm font-light">
          Add products to your store and set them live to accept payments from
          customers.
        </p>
      </div>

      <Tabs defaultValue="all_products" className="w-full mt-2">
        <TabsList>
          {TABS.map(({ label, value }) => {
            return (
              <TabsTrigger key={value} value={value}>
                {label}
              </TabsTrigger>
            );
          })}
        </TabsList>

        {TABS.map(({ component: Component, value }) => {
          return (
            <TabsContent key={value} value={value}>
              <div className="mt-6 w-full">
                <Component id={id} />
              </div>
            </TabsContent>
          );
        })}
      </Tabs>
    </div>
  );
};

export default Products;
