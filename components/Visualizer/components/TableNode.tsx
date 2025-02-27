import { useState, FC } from "react";
import { Handle, Position, NodeProps } from "reactflow";

import { KeyIcon } from "../components";
import { markdown } from "../helpers";

export const TableNode: FC<NodeProps> = ({ data }) => {
  const [selectedColumn, setSelectedColumn] = useState("");
  const [showDescription, setshowDescription] = useState(false);

  return (
    <div className="table">
      <div
        style={{ backgroundColor: data.schemaColor }}
        className="table__name"
        onMouseEnter={() => {
          setshowDescription(true);
        }}
        onMouseLeave={() => setshowDescription(false)}
      >
        {data.name}

        <div
          className={
            showDescription
              ? "table__description table__description--active"
              : "table__description"
          }
          dangerouslySetInnerHTML={{
            __html: markdown(data.description || "No description."),
          }}
        />
      </div>

      <div className="table__columns">
        {data.columns.map((column: any, index: any) => (
          <div
            key={index}
            className={
              selectedColumn === column.name
                ? "column-name column-name--selected"
                : "column-name"
            }
            onMouseEnter={() => {
              setSelectedColumn(column.name);
            }}
            onMouseLeave={() => setSelectedColumn("")}
          >
            {column.handleType && (
              <Handle
                type={column.handleType}
                position={Position.Right}
                id={`${column.name}-right`}
                className={
                  column.handleType === "source"
                    ? "right-handle source-handle"
                    : "right-handle target-handle"
                }
              />
            )}
            {column.handleType && (
              <Handle
                type={column.handleType}
                position={Position.Left}
                id={`${column.name}-left`}
                className={
                  column.handleType === "source"
                    ? "left-handle source-handle"
                    : "left-handle target-handle"
                }
              />
            )}

            <div className="column-name__inner">
              <div className="column-name__name">
                {column.key && <KeyIcon />}
                {column.name}
              </div>
              <div className="column-name__type">{column.type}</div>

              <div
                className="column-name__description"
                dangerouslySetInnerHTML={{
                  __html: markdown(column.description || "No description."),
                }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export const nodeTypes = {
  table: TableNode,
};
