"use client";

import { Task } from "@/src/type";
import React from "react";
import TaskDrawer from "../../common/TaskDrawer";
import { useState } from "react";

function IssueList({ issues, projectId }: { issues: Task[]; projectId: string }) {
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);
  const handleCloseDrawer = () => setSelectedTask(null);
   const handleClick = async (id: string) => {
    try {
      const res = await fetch(
        `http://localhost:3001/api/projects/${projectId}/${id}`, // ✨ 여기가 API 경로
        { cache: "no-store" } // 캐시 무효화
      );

      if (!res.ok) throw new Error("이슈 상세 조회 실패");

      const task: Task = await res.json();
      setSelectedTask(task);
    } catch (error) {
      console.error("에러 발생:", error);
    }
  };

  
  return (
    <div className="min-h-screen px-12 py-8">
      <h1 className="text-3xl font-bold text-slate-800 mb-6">📋 목록</h1>
      <div className="grid grid-cols-1 gap-4">
        {issues.length === 0 ? (
          <div className="text-gray-500">등록된 이슈가 없습니다.</div>
        ) : (
          issues.map((issue) => (
            <div
              key={issue.id}
              onClick={() => setSelectedTask(issue)}
              className="border rounded-lg p-4 shadow-sm hover:shadow-md transition bg-white"
            >
              <div className="flex justify-between items-center mb-2">
                <div className="text-lg font-semibold">{issue.title}</div>
                <span className="text-sm text-gray-500">{issue.status}</span>
              </div>
              <p className="text-sm text-gray-600 mb-1">
                {issue.description || "설명이 없습니다"}
              </p>
              <div className="text-xs text-gray-400">
                담당자: {issue.assignee_id || "-"}
              </div>
              <div className="text-xs text-gray-400">
                보고자: {issue.reporter_id || "-"}
              </div>
              <div className="text-xs text-gray-400 mt-1">
                시작: {issue.start_date || "-"}
              </div>
              <div className="text-xs text-gray-400 mt-1">
                마감: {issue.due_date || "-"}
              </div>
            </div>
          ))
        )}
      </div>
      {selectedTask && (
        <TaskDrawer task={selectedTask} onClose={handleCloseDrawer} />
      )}
    </div>
  );
}

export default IssueList;
