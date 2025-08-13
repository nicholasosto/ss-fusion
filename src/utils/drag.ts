/**
 * @file utils/drag.ts
 * Centralized drag-and-drop state management for UI (2D) using UIDragDetector as a source.
 */
import { Value } from "@rbxts/fusion";

export interface DragPayload {
  type: string;
  data?: unknown;
  source?: Instance;
}

export interface DragState {
  active: boolean;
  position?: Vector2;
  payload?: DragPayload;
  source?: Instance;
}

const state = Value<DragState>({ active: false });
const changed = new Instance("BindableEvent");
const ended = new Instance("BindableEvent");

export function getState(): DragState {
  return state.get();
}

export function onChanged(handler: (s: DragState) => void): RBXScriptConnection {
  return changed.Event.Connect(() => handler(state.get()));
}

export function onEnded(handler: (s: DragState) => void): RBXScriptConnection {
  return ended.Event.Connect(() => handler(state.get()));
}

export function startDrag(payload: DragPayload, position: Vector2, source?: Instance) {
  state.set({ active: true, payload, position, source: source ?? payload.source });
  changed.Fire();
}

export function update(position: Vector2) {
  const curr = state.get();
  if (!curr.active) return;
  state.set({ ...curr, position });
  changed.Fire();
}

export function endDrag() {
  const curr = state.get();
  if (!curr.active) return;
  state.set({ active: false });
  ended.Fire();
  changed.Fire();
}
