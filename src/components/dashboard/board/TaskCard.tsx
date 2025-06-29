import TrashIcon from "@/src/icons/TrashIcon";
import { Id, Task } from "@/src/type";
import { useSortable } from "@dnd-kit/sortable";
import React, { useState } from "react";
import { CSS } from "@dnd-kit/utilities";

interface Props {
    task: Task;
    deleteTask: (id: Id) => void;
    updateTask: (id: Id, content: string) => void;
    onTaskClick?: (task: Task) => void;
}

function TaskCard({ task, deleteTask, updateTask, onTaskClick }: Props) {
    const [mouseIsOver, setMouseIsOver] = useState(false);
    const [editMode, setEditMode] = useState(false);

    const {
        setNodeRef,
        attributes,
        listeners,
        transform,
        transition,
        isDragging,
    } = useSortable({
        id: task.id,
        data: {
            type: "Task",
            task,
        },
        disabled: editMode,
    });

    const style = {
        transition,
        transform: CSS.Transform.toString(transform),
    };

    const toggleEditMode = () => {
        setEditMode((prev) => !prev);
        setMouseIsOver(false);
    };

    const handleCardClick = (e: React.MouseEvent) => {
        // 삭제 버튼 클릭 시에는 드로어를 열지 않음
        if ((e.target as HTMLElement).closest('button')) {
            return;
        }
        
        // onTaskClick이 있으면 호출, 없으면 편집 모드 토글
        if (onTaskClick) {
            onTaskClick(task);
        } else {
            toggleEditMode();
        }
    };
  
    if (isDragging) {
        return (
            <div
                ref={setNodeRef}
                style={style}
                className="
        bg-white p-2.5 h-[100px] min-h-[100px] items-center flex test-left rounded-xl border-2 border-blue-500 cursor-grab relative opacity-30"
            />
        );
    }

    if (editMode) {
        return (
            <div ref={setNodeRef} style={style} {...attributes} {...listeners}
                className="bg-white p-2.5 h-[100px] min-h-[100px] items-center flex test-left rounded-xl 
      hover:ring-2 hover:ring-inset hover:ring-gray-30 cursor-grab relative"
            >
                <textarea
                    className="
                h-[90%]
                w-full
                resize-none
                roundedbg-transparent
                text-black
                focus:outline-none
                "
                    value={task.description}
                    autoFocus
                    placeholder="Enter a title for this task"
                    onBlur={toggleEditMode}
                    onKeyDown={(e) => {
                        if (e.key === "Enter" && e.shiftKey) toggleEditMode();
                    }}
                    onChange={(e) => updateTask(task.id, e.target.value)}
                ></textarea>
            </div>
        );
    }

    return (
        <div
            ref={setNodeRef}
            style={style}
            {...attributes}
            {...listeners}
            onClick={handleCardClick}
            className="bg-white p-2.5 h-[100px] min-h-[100px] items-center flex test-left rounded-xl 
  hover:ring-2 hover:ring-inset hover:ring-gray-30 cursor-pointer relative task"
            onMouseEnter={() => setMouseIsOver(true)}
            onMouseLeave={() => setMouseIsOver(false)}
        >
            <p className="my-auto h-[90%] w-full overflow-y-auto overflow-x-hidden whitespace-pre-wrap">
                {task.description}
            </p>
            {mouseIsOver && (
                <button
                    onClick={(e) => {
                        e.stopPropagation();
                        deleteTask(task.id);
                    }}
                    className="stroke-white absolute right-4 top-1/2 -translate-y-1/2 bg-gray-300 p-2 rounded opacity-60 hover:opacity-100"
                >
                    <TrashIcon />
                </button>
            )}
        </div>
    );
}

export default TaskCard;
