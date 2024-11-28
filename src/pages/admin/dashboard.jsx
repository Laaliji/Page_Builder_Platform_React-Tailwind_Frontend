import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import Home from "./overview.jsx";
import Chart from "./chart.jsx";

export function Admin() {
  return (
    <>
      <div className="flex items-center justify-between space-y-2">
        <h2 className="text-3xl font-bold tracking-tight">Dashboard</h2>
        <div className="flex items-center space-x-2">
          <Button>Download</Button>
        </div>
      </div>
      {/* Tabs Content moved inside Tabs */}
      <Tabs defaultValue="overview" className="space-y-4">
        <TabsList>
          <TabsTrigger value="overview">Vue d'ensemble</TabsTrigger>
          <TabsTrigger value="analytics">Analytique</TabsTrigger>
          <TabsTrigger value="reports">Rapports</TabsTrigger>
          <TabsTrigger value="notifications">Notifications</TabsTrigger>
        </TabsList>
        <TabsContent value="overview" className="space-y-4">
          <Home />
        </TabsContent>
        <TabsContent value="analytics" className="space-y-4">
          <Chart />
        </TabsContent>
        <TabsContent value="reports" className="space-y-4">
          {/* Add content for reports */}
        </TabsContent>
        <TabsContent value="notifications" className="space-y-4">
          {/* Add content for notifications */}
        </TabsContent>
      </Tabs>
    </>
  );
}

export default Admin;
