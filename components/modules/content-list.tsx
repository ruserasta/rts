import { contentItemsData, getClientName } from "@/lib/data/agency-data";

export function ContentList() {
  return (
    <div className="space-y-2">
      {contentItemsData.map((item) => (
        <div className="flex flex-wrap items-center justify-between gap-2 rounded-lg border border-border bg-muted p-3 text-sm" key={item.id}>
          <div>
            <p className="font-medium">{item.title}</p>
            <p className="text-xs text-muted-foreground">{getClientName(item.clientId)} · {item.platform} · {item.contentType}</p>
          </div>
          <div className="text-right text-xs">
            <p>{item.publishDate}</p>
            <p className={item.approvalStatus === "Approved" ? "text-success" : item.approvalStatus === "Needs Changes" ? "text-danger" : "text-muted-foreground"}>{item.approvalStatus}</p>
          </div>
        </div>
      ))}
    </div>
  );
}
