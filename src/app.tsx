import { useSyncStorage } from "@/hooks";
import { Shield } from "lucide-react";

import { ActiveIssues } from "./components/active-issues";
import { HistoryIssues } from "./components/history-issues";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./components/ui/tabs";

export function App() {
  useSyncStorage();

  return (
    <div className="flex flex-col min-w-[405px] min-h-[600px] p-0 bg-[#f8fafc] border rounded-lg shadow">
      <div className="flex items-center gap-3 p-6 bg-white border-b rounded-t-lg">
        <div className="flex items-center justify-center w-12 h-12 rounded-full bg-blue-50 mr-3">
          <Shield className="w-7 h-7 text-blue-500" />
        </div>
        <div className="flex flex-col">
          <h1 className="text-xl font-mono font-extrabold text-gray-900 tracking-tight mb-0.5">
            Lasso Guard
          </h1>
          <p className="text-xs text-gray-500 font-medium">
            Email Detection &amp; Anonymization
          </p>
        </div>
      </div>

      <div className="flex-1 flex flex-col pt-2 pb-4 px-4">
        <Tabs defaultValue="currentIssues" className="w-full">
          <TabsList className="mb-3 bg-transparent gap-2 flex px-0">
            <TabsTrigger
              value="currentIssues"
              className="rounded-none px-3 py-1.5 text-sm data-[state=active]:border-b-2 data-[state=active]:border-blue-500 data-[state=active]:text-blue-600 font-mono"
            >
              Current Issues
            </TabsTrigger>
            <TabsTrigger
              value="history"
              className="rounded-none px-3 py-1.5 text-sm data-[state=active]:border-b-2 data-[state=active]:border-blue-500 data-[state=active]:text-blue-600 font-mono"
            >
              History Logs
            </TabsTrigger>
          </TabsList>
          <TabsContent value="currentIssues">
            <ActiveIssues />
          </TabsContent>
          <TabsContent value="history">
            <HistoryIssues />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
