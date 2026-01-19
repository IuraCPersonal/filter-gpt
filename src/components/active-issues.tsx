import { issues } from "@/services/issues";
import { useObservableState } from "observable-hooks";
import { IssueCard } from "./issue-card";

export function ActiveIssues() {
  const activeIssues$ = useObservableState(issues.activeIssues$);

  if (!activeIssues$ || activeIssues$.length === 0)
    return (
      <div className="text-center text-sm text-gray-500">No active issues</div>
    );

  return (
    <div className="flex flex-col gap-4">
      {activeIssues$.map((issue) => (
        <IssueCard key={issue.id} {...issue} onDismiss={() => {}} />
      ))}
    </div>
  );
}
