"use client";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import HelpDesk from "./HelpDesk";
import { Plus } from "lucide-react";
import SideSheet from "@/common/components/SideSheet";

const TABS = [
  {
    label: "Active",
    value: "active",
    component: HelpDesk,
  },
  {
    label: "Inactive",
    value: "inactive",
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

      <div className="w-full mt-2 flex items-start justify-between">
        <Tabs defaultValue="active" className="w-[80%]">
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

        <SideSheet
          description="Add products to your store and set them live to accept payments from
          customers."
          title="Add a product"
          className="flex items-center gap-2 bg-foreground px-4 py-3 text-background transition-colors cursor-pointer font-medium rounded-lg text-sm"
          trigger={
            <>
              <Plus size={20} />
              Add Product
            </>
          }
        >
          {/* <CreateProductForm id={id} /> */}
          Hello
        </SideSheet>
      </div>
    </div>
  );
};

export default Products;
