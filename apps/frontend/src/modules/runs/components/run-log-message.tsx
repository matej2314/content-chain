import { parseVerifierLogMessage } from '@/modules/runs/components/parse-verifier-log-message';

type RunLogMessageProps = {
  readonly message: string;
};

type IssueGroupProps = {
  readonly label: string;
  readonly issues: readonly string[];
};

function IssueGroup({ label, issues }: IssueGroupProps) {
  return (
    <div className="flex flex-col gap-1">
      <p className="text-xs font-medium">{label}</p>
      <ul className="flex list-disc flex-col gap-1 pl-4">
        {issues.map((issue, index) => (
          <li key={`${index}:${issue}`} className="wrap-break-word">
            {issue}
          </li>
        ))}
      </ul>
    </div>
  );
}

export function RunLogMessage({ message }: RunLogMessageProps) {
  const view = parseVerifierLogMessage(message);
  if (view.kind === 'plain') {
    return <p>{view.text}</p>;
  }
  return (
    <div className="flex flex-col gap-2">
      <p>{view.headline}</p>
      {view.contextIssues.length > 0 ? (
        <IssueGroup label="Kontekst" issues={view.contextIssues} />
      ) : null}
      {view.languageIssues.length > 0 ? (
        <IssueGroup label="Język" issues={view.languageIssues} />
      ) : null}
    </div>
  );
}
