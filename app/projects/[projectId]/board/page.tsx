import KanbanBoard from "@/src/components/dashboard/board/KanbanBoard";
import { Task } from "@/src/type";
import "./page.css";

export default async function Page({ params }: { params: { projectId: string } }) {
    const { projectId } = params; // ← 여기 await 제거

    console.log("projectId:", projectId);

    const res = await fetch(
        `http://localhost:3001/api/projects/${projectId}/issues`,
        { next: { revalidate: 60 } } // ISR 옵션 굿!
    );

    if (!res.ok) {
        console.error(res); // ← 콘솔도 error 쪽이 더 낫다!
        throw new Error("Failed to fetch issues");
    }

    const issues: Task[] = await res.json();

    return (
        <div className="min-h-screen p-8">
            <h1 className="text-2xl font-bold text-slate-800">프로젝트 Demo</h1>
            <div className="text-slate-600 mt-2">
                <KanbanBoard issues={issues} projectId={projectId} />
            </div>
        </div>
    );
}
