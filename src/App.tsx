import { useEffect } from "react";
import { ActiveIssues } from "./components/active-issues";
import { HistoryIssues } from "./components/history-issues";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./components/ui/tabs";
import { issues } from "./services/issues";

export function App() {
  useEffect(() => {
    issues.init();
  }, []);

  return (
    <div className="flex flex-col min-w-[405px] min-h-[600px] p-4 gap-4">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-mono font-bold">Filter GPT</h1>
      </div>

      <Tabs defaultValue="currentIssues" className="w-full">
        <TabsList>
          <TabsTrigger value="currentIssues">Current Issues</TabsTrigger>
          <TabsTrigger value="history">History Logs</TabsTrigger>
        </TabsList>
        <TabsContent value="currentIssues">
          <ActiveIssues />
        </TabsContent>
        <TabsContent value="history">
          <HistoryIssues />
        </TabsContent>
      </Tabs>
    </div>
  );
}
