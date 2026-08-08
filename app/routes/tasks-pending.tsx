import Tasks from "~/pages/Tasks";

export default function TasksPending() {
  return <Tasks status="Todo" includeControlBar={false} />;
}
