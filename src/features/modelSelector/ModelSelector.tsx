import { Link } from "@tanstack/react-router";

interface Props {
  current: string;
}

const models = ["tree", "hamburger", "fly"];

export function ModelSelector({ current }: Props) {
  return (
    <div style={{ marginBottom: 12 }}>
      <span>Выбери модель: </span>
      {models.map((id) => (
        <Link
          key={id}
          to="/model/$modelId"
          params={{ modelId: id }}
          style={{
            marginRight: 10,
            fontWeight: current === id ? "bold" : "normal",
            textDecoration: "underline",
            cursor: "pointer",
          }}
        >
          {id}
        </Link>
      ))}
    </div>
  );
}
