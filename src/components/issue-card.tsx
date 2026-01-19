import type { Issue } from "@/services/issues";
import { History } from "lucide-react";
import { Button } from "./ui/button";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
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
  onDismiss,
}: IssueCardProps) {
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
      </CardHeader>
    </Card>
  );
}
