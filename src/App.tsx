import { Tabs, TabsContent, TabsList, TabsTrigger } from "./components/ui/tabs";

export function App() {
  return (
    <div className="flex flex-col min-w-[405px] min-h-[600px] p-4">
      <Tabs defaultValue="currentIssues" className="w-full">
        <TabsList>
          <TabsTrigger value="currentIssues">Current Issues</TabsTrigger>
          <TabsTrigger value="history">History Logs</TabsTrigger>
        </TabsList>
        <TabsContent value="currentIssues">Current Issues Content</TabsContent>
        <TabsContent value="history">History Logs Content</TabsContent>
      </Tabs>
    </div>
  );
}
