"use client";

import { useCallback, useState } from "react";
import { useWorkflow } from "@/hooks/useWorkflow";
import { nodeSchemas, getRequiredFields } from "@/lib/types/schema";
import { NodeType } from "@/lib/types/workflow";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface CustomField {
  key: string;
  value: string;
}

export default function NodeConfigPanel() {
  const { state, dispatch } = useWorkflow();
  const [customFields, setCustomFields] = useState<CustomField[]>([]);

  const node = state.nodes.find((n) => n.id === state.selectedNodeId);

  // Define all hooks BEFORE any conditional returns (Rules of Hooks)
  const handleFieldChange = useCallback(
    (fieldName: string, value: any) => {
      if (!node) return;
      dispatch({
        type: "UPDATE_NODE",
        payload: { id: node.id, data: { [fieldName]: value } },
      });
    },
    [node, dispatch],
  );

  const handleAddCustomField = useCallback(() => {
    const newField: CustomField = { key: "", value: "" };
    setCustomFields([...customFields, newField]);
  }, [customFields]);

  const handleCustomFieldChange = useCallback(
    (index: number, key: "key" | "value", newValue: string) => {
      if (!node) return;
      const updated = [...customFields];
      updated[index][key] = newValue;
      setCustomFields(updated);

      // Sync custom fields to node data
      const customFieldsObj = Object.fromEntries(
        updated.filter((f) => f.key).map((f) => [f.key, f.value]),
      );

      dispatch({
        type: "UPDATE_NODE",
        payload: { id: node.id, data: { customFields: customFieldsObj } },
      });
    },
    [node, customFields, dispatch],
  );

  const handleRemoveCustomField = useCallback(
    (index: number) => {
      if (!node) return;
      const updated = customFields.filter((_, i) => i !== index);
      setCustomFields(updated);

      const customFieldsObj = Object.fromEntries(
        updated.filter((f) => f.key).map((f) => [f.key, f.value]),
      );

      dispatch({
        type: "UPDATE_NODE",
        payload: { id: node.id, data: { customFields: customFieldsObj } },
      });
    },
    [node, customFields, dispatch],
  );

  // Early return AFTER all hooks are defined
  if (!node) {
    return (
      <div className="text-center py-12 flex flex-col items-center justify-center">
        <div className="w-12 h-12 bg-slate-100 rounded-full flex items-center justify-center mb-3">
          <span className="text-xl">📋</span>
        </div>
        <p className="text-sm text-slate-500 font-medium">
          Select a node to configure
        </p>
        <p className="text-xs text-slate-400 mt-1">
          Click any node on the canvas
        </p>
      </div>
    );
  }

  const schema = nodeSchemas[node.type as NodeType] || [];
  const requiredFields = getRequiredFields(node.type as NodeType);

  return (
    <div className="space-y-5">
      {/* Node Type Badge */}
      <div className="bg-gradient-to-r from-blue-50 to-teal-50 p-4 rounded-lg border border-blue-200">
        <p className="text-xs font-bold text-slate-600 uppercase tracking-wider">
          Node Type
        </p>
        <p className="text-lg font-bold text-slate-800 capitalize mt-2">
          {node.type}
        </p>
      </div>

      {/* Dynamic Form Fields */}
      <div className="space-y-4">
        <h3 className="text-xs font-bold text-slate-700 uppercase tracking-wider flex items-center gap-2">
          <span className="w-1.5 h-1.5 bg-blue-600 rounded-full"></span>
          Properties
        </h3>

        {schema.map((field) => {
          const fieldValue =
            (node.data as Record<string, any>)[field.name] || "";
          const isRequired = requiredFields.includes(field.name);
          const hasError = isRequired && !fieldValue;

          return (
            <div key={field.name} className="space-y-2">
              <label className="text-xs font-semibold text-slate-700 flex gap-1">
                {field.label}
                {isRequired && <span className="text-red-500">*</span>}
              </label>

              {field.type === "text" && (
                <Input
                  type="text"
                  placeholder={field.placeholder}
                  value={fieldValue}
                  onChange={(e) =>
                    handleFieldChange(field.name, e.target.value)
                  }
                  className={`text-xs border-2 focus:ring-2 focus:ring-blue-400 ${
                    hasError
                      ? "border-red-300 bg-red-50 focus:ring-red-300"
                      : "border-slate-200 hover:border-slate-300 focus:border-blue-400"
                  }`}
                />
              )}

              {field.type === "textarea" && (
                <textarea
                  placeholder={field.placeholder}
                  value={fieldValue}
                  onChange={(e) =>
                    handleFieldChange(field.name, e.target.value)
                  }
                  rows={3}
                  className={`w-full px-3 py-2 text-xs border-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 ${
                    hasError
                      ? "border-red-300 bg-red-50 focus:ring-red-300"
                      : "border-slate-200 hover:border-slate-300 focus:border-blue-400"
                  }`}
                />
              )}

              {field.type === "date" && (
                <Input
                  type="date"
                  value={fieldValue}
                  onChange={(e) =>
                    handleFieldChange(field.name, e.target.value)
                  }
                  className={`text-xs border-2 focus:ring-2 focus:ring-blue-400 ${
                    hasError
                      ? "border-red-300 bg-red-50 focus:ring-red-300"
                      : "border-slate-200 hover:border-slate-300 focus:border-blue-400"
                  }`}
                />
              )}

              {field.type === "number" && (
                <Input
                  type="number"
                  placeholder={field.placeholder}
                  value={fieldValue}
                  onChange={(e) =>
                    handleFieldChange(field.name, e.target.value)
                  }
                  className={`text-xs border-2 focus:ring-2 focus:ring-blue-400 ${
                    hasError
                      ? "border-red-300 bg-red-50 focus:ring-red-300"
                      : "border-slate-200 hover:border-slate-300 focus:border-blue-400"
                  }`}
                />
              )}

              {field.type === "checkbox" && (
                <label className="flex items-center gap-3 cursor-pointer p-2 hover:bg-slate-50 rounded-lg transition-colors">
                  <input
                    type="checkbox"
                    checked={fieldValue === true}
                    onChange={(e) =>
                      handleFieldChange(field.name, e.target.checked)
                    }
                    className="w-4 h-4"
                  />
                  <span className="text-xs text-gray-600">
                    {field.helperText || "Enable"}
                  </span>
                </label>
              )}

              {field.type === "select" && field.options && (
                <Select
                  value={fieldValue}
                  onValueChange={(val) => handleFieldChange(field.name, val)}
                >
                  <SelectTrigger className="text-xs">
                    <SelectValue placeholder="Select an option" />
                  </SelectTrigger>
                  <SelectContent>
                    {field.options.map((opt) => (
                      <SelectItem key={opt.value} value={opt.value}>
                        {opt.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              )}

              {field.helperText && (
                <p className="text-xs text-gray-500">{field.helperText}</p>
              )}

              {hasError && (
                <p className="text-xs text-red-600">This field is required</p>
              )}
            </div>
          );
        })}
      </div>

      {/* Custom Fields (for Task Node) */}
      {node.type === "task" && (
        <div className="space-y-3 border-t pt-4">
          <div className="flex justify-between items-center">
            <h3 className="text-sm font-semibold text-gray-700">
              Custom Fields
            </h3>
            <Button size="sm" variant="outline" onClick={handleAddCustomField}>
              + Add Field
            </Button>
          </div>

          {customFields.map((field, index) => (
            <div key={index} className="flex gap-2 items-start">
              <Input
                placeholder="Field name"
                value={field.key}
                onChange={(e) =>
                  handleCustomFieldChange(index, "key", e.target.value)
                }
                className="text-xs flex-1"
              />
              <Input
                placeholder="Field value"
                value={field.value}
                onChange={(e) =>
                  handleCustomFieldChange(index, "value", e.target.value)
                }
                className="text-xs flex-1"
              />
              <Button
                size="sm"
                variant="ghost"
                onClick={() => handleRemoveCustomField(index)}
              >
                ✕
              </Button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
