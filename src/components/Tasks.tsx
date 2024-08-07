import { Trash } from "@phosphor-icons/react";
import styles from "./Tasks.module.css";

import iconClipboard from "../assets/clipboard.svg";
import { InputNewTask } from "./InputNewTask";
import { useState } from "react";

interface Task {
  id: string;
  description: string;
  isCompleted: boolean;
}

const contentEmpty = () => {
  return (
    <main className={styles.emptyContent}>
      <div className={styles.iconTask}>
        <img src={iconClipboard} alt="icon-clipboard" />
      </div>
      <strong>Você ainda não tem tarefas cadastradas</strong>
      <p>Crie tarefas e organize seus itens a fazer</p>
    </main>
  );
};

const content = (
  taskList: Task[],
  setNewTaskList: React.Dispatch<React.SetStateAction<Task[]>>
) => {
  function handleCheckBox(id: string) {
    const newTaskList = taskList.map((task) =>
      task.id === id ? { ...task, isCompleted: true } : task
    );
    setNewTaskList(newTaskList);
  }

  function handleRemoverTask(id: string) {
    const newTaskList = taskList.filter((task) => task.id !== id);
    setNewTaskList(newTaskList);
  }

  return (
    <main>
      {taskList
        .sort(
          (taskA, taskB) =>
            Number(taskA.isCompleted) - Number(taskB.isCompleted)
        )
        .map((task) => {
          return (
            <div key={task.id} className={styles.contentTask}>
              <label className={styles.customCheckbox}>
                <input
                  type="checkbox"
                  onChange={() => handleCheckBox(task.id)}
                  checked={task.isCompleted}
                />
                <span className={styles.checkmark}></span>
              </label>
              <span
                className={
                  task.isCompleted
                    ? styles.taskIsCompleted
                    : styles.descriptionTask
                }
              >
                {task.description}
              </span>
              <button
                title="Remover tarefa"
                onClick={() => handleRemoverTask(task.id)}
              >
                <Trash size={18} />
              </button>
            </div>
          );
        })}
    </main>
  );
};

export function Tasks() {
  const [taskList, setNewTaskList] = useState<Task[]>([]);

  const countTasks = taskList.length;
  const countCompletedTasks =
    countTasks === 0
      ? 0
      : taskList.filter((task) => task.isCompleted).length +
        " de " +
        countTasks;

  function sendTaskList(task: Task) {
    setNewTaskList([task, ...taskList]);
  }

  return (
    <div>
      <InputNewTask sendTaskList={sendTaskList} />
      <article className={styles.tasks}>
        <header>
          <div className={styles.countTasks}>
            <strong>Tarefas criadas</strong>
            <span>{countTasks}</span>
          </div>
          <div className={styles.countCompletedTasks}>
            <strong>Concluídas</strong>
            <span>{countCompletedTasks}</span>
          </div>
        </header>

        {taskList.length ? content(taskList, setNewTaskList) : contentEmpty()}
      </article>
    </div>
  );
}
