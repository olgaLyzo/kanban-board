import { TaskContext } from "../contexts/task-context";
import { useContext} from "react";

export const useTasks = ()=> useContext(TaskContext);
