import type { Issue } from "@/services/issues";
import { History } from "lucide-react";
import { useMemo } from "react";
import { Button } from "./ui/button";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./ui/card";

type IssueCardProps = Issue & {
  onDismiss?: () => void;
};

export function IssueCard({
  value,
  detectedAt,
  context,
  dismissedUntil,
  onDismiss,
}: IssueCardProps) {
  const isDismissed = useMemo(
    () => dismissedUntil && dismissedUntil > new Date().getTime(),
    [dismissedUntil]
  );

  return (
    <Card className="w-full hover:shadow-md transition-shadow duration-300">
      <CardHeader>
        <CardTitle>{value}</CardTitle>
        <CardDescription className="text-xs">
          {new Date(detectedAt).toLocaleString()}
        </CardDescription>

        {onDismiss && (
          <CardAction>
            <Button variant="outline" onClick={onDismiss}>
              <History /> Dismiss
            </Button>
          </CardAction>
        )}

        {context && <CardContent className="p-0">{context}</CardContent>}

        {isDismissed && (
          <CardFooter className="pl-0">
            <div className="text-xs text-muted-foreground">
              Dismissed until{" "}
              {dismissedUntil
                ? new Date(dismissedUntil).toLocaleString()
                : "never"}
            </div>
          </CardFooter>
        )}
      </CardHeader>
    </Card>
  );
}
