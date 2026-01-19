import { issues } from "@/services/issues";
import { useObservableState } from "observable-hooks";
import { IssueCard } from "./issue-card";

export function HistoryIssues() {
  const historyIssues$ = useObservableState(issues.historyIssues$);

  if (!historyIssues$ || historyIssues$.length === 0)
    return (
      <div className="text-center text-sm text-gray-500">No history issues</div>
    );

  return (
    <div className="flex flex-col gap-4">
      {historyIssues$.map((issue) => (
        <IssueCard key={issue.id} {...issue} />
      ))}
    </div>
  );
}
