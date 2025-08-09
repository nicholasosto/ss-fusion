/**
 * Grid.ts
 * UIGridLayout wrapper for simple uniform grids and optional responsive columns.
 */
import Fusion, { Children, Computed, New, Value } from "@rbxts/fusion";

export interface GridProps extends Fusion.PropertyTable<Frame> {
  cellSize: UDim2;
  cellPadding?: UDim2;
  fillDirectionMaxCells?: number; // for wrapping
  fillDirection?: Enum.FillDirection;
  sortOrder?: Enum.SortOrder;
  children?: Instance[];
}

export function Grid(props: GridProps) {
  const grid = New("UIGridLayout")({
    CellSize: props.cellSize,
    CellPadding: props.cellPadding ?? new UDim2(0, 8, 0, 8),
    FillDirectionMaxCells: props.fillDirectionMaxCells ?? 0,
    FillDirection: props.fillDirection ?? Enum.FillDirection.Horizontal,
    SortOrder: props.sortOrder ?? Enum.SortOrder.LayoutOrder,
  });

  const container = New("Frame")({
    Name: props.Name ?? "Grid",
    BackgroundTransparency: props.BackgroundTransparency ?? 1,
    BackgroundColor3: props.BackgroundColor3,
    BorderSizePixel: props.BorderSizePixel ?? 0,
    Size: props.Size ?? UDim2.fromScale(1, 1),
    Position: props.Position,
    AnchorPoint: props.AnchorPoint,
    ZIndex: props.ZIndex,
    LayoutOrder: props.LayoutOrder,
    Visible: props.Visible,
    [Children]: [grid, ...(props.children ?? [])],
  });

  return container;
}

export interface AutoGridProps extends Omit<GridProps, "cellSize"> {
  minCellPx?: number; // default 64
  maxCellPx?: number; // default 128
}

/** AutoGrid picks a column count based on container width and clamps cell size */
export function AutoGrid(props: AutoGridProps) {
  const minPx = props.minCellPx ?? 64;
  const maxPx = props.maxCellPx ?? 128;

  const widthState = Value(0);

  const cellSize = Computed(() => {
    const w = widthState.get();
    if (w <= 0) return new UDim2(0, minPx, 0, minPx);
    const pad = props.cellPadding ? props.cellPadding.X.Offset : 8;
    const cols = math.max(1, math.floor(w / (maxPx + pad)));
    const usable = math.max(1, w - pad * math.max(0, cols - 1));
    const px = math.clamp(math.floor(usable / cols), minPx, maxPx);
    return new UDim2(0, px, 0, px);
  });

  const container = Grid({ ...props, cellSize: cellSize.get() });

  // Track AbsoluteSize to recompute cell size
  container.GetPropertyChangedSignal("AbsoluteSize").Connect(() => {
    widthState.set(container.AbsoluteSize.X);
  });
  // Initialize
  widthState.set(container.AbsoluteSize.X);

  return container;
}
