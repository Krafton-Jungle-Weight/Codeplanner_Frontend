"use client";
import { Task } from "@/components/type";

{/* 이슈에 대한 카드 Drawer */}
export default function TaskDrawer({
  task,
  onClose,
}: {
  task: Task;
  onClose: () => void;
}) {
  return (
    <>
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-black bg-opacity-50 z-40 animate-in fade-in duration-300"
        onClick={onClose}
      />
      {/* Drawer */}
      <div className="fixed top-0 right-0 h-full w-full max-w-xl bg-white shadow-2xl z-50 flex flex-col">
        <div className="p-6 border-b border-gray-200 flex justify-between items-center bg-gray-50">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">{task.title || 'Task Details'}</h2>
            <p className="text-xs text-gray-500 mt-1">ID: {task.id}</p>
          </div>
          <button 
            onClick={onClose}
            className="p-2 hover:bg-gray-200 rounded-full transition-colors duration-200"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        <div className="p-6 space-y-6 overflow-y-auto flex-1">
          {/* Type & Status */}
          <div className="flex gap-4">
            <div className="space-y-1">
              <div className="text-sm font-medium text-gray-700">유형</div>
              <div className="px-3 py-1 bg-blue-50 text-blue-700 rounded-md inline-block text-xs">
                {task.issue_type || 'Task'}
              </div>
            </div>
            <div className="space-y-1">
              <div className="text-sm font-medium text-gray-700">상태</div>
              <div className="px-3 py-1 bg-green-50 text-green-700 rounded-md inline-block text-xs">
                {task.status || 'Active'}
              </div>
            </div>
          </div>
          {/* Description */}
          <div className="space-y-1">
            <div className="text-sm font-medium text-gray-700">설명</div>
            <div className="p-4 bg-gray-50 rounded-md border border-gray-200">
              <p className="text-gray-800 whitespace-pre-wrap text-sm">
                {task.description || 'No description provided'}
              </p>
            </div>
          </div>
          {/* Assignee & Reporter */}
          <div className="flex gap-4">
            <div className="space-y-1">
              <div className="text-sm font-medium text-gray-700">담당자</div>
              <div className="px-3 py-1 bg-gray-100 text-gray-700 rounded-md inline-block text-xs">
                {task.assignee_id || '-'}
              </div>
            </div>
            <div className="space-y-1">
              <div className="text-sm font-medium text-gray-700">보고자</div>
              <div className="px-3 py-1 bg-gray-100 text-gray-700 rounded-md inline-block text-xs">
                {task.reporter_id || '-'}
              </div>
            </div>
          </div>
          {/* Dates */}
          <div className="flex gap-4">
            <div className="space-y-1">
              <div className="text-sm font-medium text-gray-700">시작일</div>
              <div className="px-3 py-1 bg-gray-100 text-gray-700 rounded-md inline-block text-xs">
                {task.start_date || '-'}
              </div>
            </div>
            <div className="space-y-1">
              <div className="text-sm font-medium text-gray-700">마감일</div>
              <div className="px-3 py-1 bg-gray-100 text-gray-700 rounded-md inline-block text-xs">
                {task.due_date || '-'}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
} 