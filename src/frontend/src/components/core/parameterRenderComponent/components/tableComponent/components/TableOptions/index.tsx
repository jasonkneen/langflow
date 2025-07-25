import IconComponent from "@/components/common/genericIconComponent";
import ShadTooltip from "@/components/common/shadTooltipComponent";
import { Button } from "@/components/ui/button";
import type { TableOptionsTypeAPI } from "@/types/api";
import { cn } from "@/utils/utils";

export default function TableOptions({
  resetGrid,
  duplicateRow,
  deleteRow,
  hasSelection,
  stateChange,
  paginationInfo,
  addRow,
  tableOptions,
}: {
  resetGrid: () => void;
  duplicateRow?: () => void;
  deleteRow?: () => void;
  addRow?: () => void;
  hasSelection: boolean;
  stateChange: boolean;
  tableOptions?: TableOptionsTypeAPI;
  paginationInfo?: string;
}): JSX.Element {
  return (
    <div className={cn("absolute bottom-3 left-6")}>
      <div className="flex items-center gap-3">
        {addRow && !tableOptions?.block_add && (
          <div>
            <ShadTooltip content={"Add a new row"}>
              <Button data-testid="add-row-button" unstyled onClick={addRow}>
                <IconComponent
                  name="Plus"
                  className={cn("h-5 w-5 text-primary transition-all")}
                />
              </Button>
            </ShadTooltip>
          </div>
        )}
        {duplicateRow && (
          <div>
            <ShadTooltip
              content={
                !hasSelection ? (
                  <span>Select items to duplicate</span>
                ) : (
                  <span>Duplicate selected items</span>
                )
              }
            >
              <Button
                data-testid="duplicate-row-button"
                unstyled
                onClick={duplicateRow}
                disabled={!hasSelection}
              >
                <IconComponent
                  name="Copy"
                  className={cn(
                    "h-5 w-5 transition-all",
                    hasSelection
                      ? "text-primary"
                      : "cursor-not-allowed text-placeholder-foreground",
                  )}
                />
              </Button>
            </ShadTooltip>
          </div>
        )}
        {deleteRow && (
          <div>
            <ShadTooltip
              content={
                !hasSelection ? (
                  <span>Select items to delete</span>
                ) : (
                  <span>Delete selected items</span>
                )
              }
            >
              <Button
                data-testid="delete-row-button"
                unstyled
                onClick={deleteRow}
                disabled={!hasSelection}
              >
                <IconComponent
                  name="Trash2"
                  className={cn(
                    "h-5 w-5 transition-all",
                    !hasSelection
                      ? "cursor-not-allowed text-placeholder-foreground"
                      : "text-primary hover:text-status-red",
                  )}
                />
              </Button>
            </ShadTooltip>
          </div>
        )}{" "}
        <div>
          <ShadTooltip content="Reset Columns">
            <Button
              data-testid="reset-columns-button"
              unstyled
              onClick={() => {
                resetGrid();
              }}
              disabled={!stateChange}
            >
              <IconComponent
                name="RotateCcw"
                strokeWidth={2}
                className={cn(
                  "h-5 w-5 transition-all",
                  !stateChange
                    ? "cursor-not-allowed text-placeholder-foreground"
                    : "text-primary",
                )}
              />
            </Button>
          </ShadTooltip>
        </div>
        {paginationInfo && (
          <div className="ml-2 text-xs text-muted-foreground">
            <ShadTooltip content="Pagination Info">
              <span>{paginationInfo}</span>
            </ShadTooltip>
          </div>
        )}
      </div>
    </div>
  );
}
