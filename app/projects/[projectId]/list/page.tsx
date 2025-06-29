import IssueList from "@/src/components/dashboard/list/IssueList";
import { Task } from "@/src/type";

export default async function Page({ params }: { params: { projectId: string } }) {
  const { projectId } = params;

  const res = await fetch(
    `http://localhost:3001/api/projects/${projectId}/issues`,
    {
      cache: "no-store", // 최신 데이터 가져오기
    }
  );

  if (!res.ok) {
    throw new Error("이슈 데이터를 가져오지 못했습니다.");
  }

  const issues: Task[] = await res.json();

  return <IssueList issues={issues} />;
}
