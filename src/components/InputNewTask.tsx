import { PlusCircle } from "@phosphor-icons/react";
import styles from "./InputNewTask.module.css";
import { ChangeEvent, useState } from "react";

interface Task {
  id: string;
  description: string;
  isCompleted: boolean;
}

interface NewTaskProps {
  sendTaskList: (taskList: Task) => void;
}

export function InputNewTask({ sendTaskList }: NewTaskProps) {
  const [task, setNewTask] = useState("");

  const isNewTaskEmpty = task.length === 0;

  function handleNewTaskChange(event: ChangeEvent<HTMLInputElement>) {
    setNewTask(event.target.value);
  }

  function hancleCreateNewTask() {
    const newTask: Task = {
      id: Date.now().toString(36),
      description: task,
      isCompleted: false,
    };

    sendTaskList(newTask);
    setNewTask("");
  }

  return (
    <div className={styles.inputNewTask}>
      <input
        type="text"
        placeholder="Adicione uma nova tarefa"
        onChange={handleNewTaskChange}
        value={task}
      />
      <button onClick={hancleCreateNewTask} disabled={isNewTaskEmpty}>
        <strong>Criar</strong>
        <PlusCircle size={20} color="#FFF" />
      </button>
    </div>
  );
}
