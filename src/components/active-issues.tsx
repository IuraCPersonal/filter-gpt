import { issues } from "@/services/issues";
import { HistoryIcon } from "lucide-react";
import { useObservableState } from "observable-hooks";
import { IssueCard } from "./issue-card";
import {
  Empty,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "./ui/empty";

export function ActiveIssues() {
  const activeIssues$ = useObservableState(issues.activeIssues$);

  if (!activeIssues$ || activeIssues$.length === 0)
    return (
      <div className="flex justify-center items-center h-full mt-20">
        <Empty>
          <EmptyHeader>
            <EmptyMedia variant="icon">
              <HistoryIcon />
            </EmptyMedia>
            <EmptyTitle>No active issues</EmptyTitle>
            <EmptyDescription>No active issues found</EmptyDescription>
          </EmptyHeader>
        </Empty>
      </div>
    );

  return (
    <div className="flex flex-col gap-4">
      {activeIssues$.map((issue) => (
        <IssueCard key={issue.id} {...issue} onDismiss={() => {}} />
      ))}
    </div>
  );
}
