import { issues } from "@/services/issues";
import { HistoryIcon } from "lucide-react";
import { useObservableEagerState } from "observable-hooks";
import { IssueCard } from "./issue-card";
import {
  Empty,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "./ui/empty";

export function ActiveIssues() {
  const activeIssues$ = useObservableEagerState(issues.activeIssues$);

  if (!activeIssues$ || activeIssues$.length === 0)
    return <EmptyActiveIssues />;

  const handleDismiss = (id: string) => {
    issues.dismissIssue(id);
  };

  return (
    <div className="flex flex-col gap-4">
      {activeIssues$.map((issue) => (
        <IssueCard
          key={issue.id}
          {...issue}
          onDismiss={() => handleDismiss(issue.id)}
        />
      ))}
    </div>
  );
}

export function EmptyActiveIssues() {
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
}
