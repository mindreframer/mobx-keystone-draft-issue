import { observable } from "mobx";
import {
  Draft,
  draft,
  findParentPath,
  model,
  Model,
  modelAction,
  prop,
  resolvePath,
  UndoManager,
  undoMiddleware,
} from "mobx-keystone";

export interface ITag {
  label: string;
}

export interface IForm1 {
  name: string;
  tags: ITag[];
}

export interface IForm2 {
  name: string;
  tags: ITag[];
}

export namespace SettingsUtils {
  /**
   * pathFromChild
   * @param child
   * @returns list of path segments for the given child under Settings
   */
  export const pathFromChild = (child: any) => {
    const res = findParentPath(
      child,
      (parent) => parent instanceof Settings,
      5 // how deep?
    );
    return res?.path;
  };

  /**
   *
   * @param path list of path segments
   * @param instance settings instance to resolve the path on
   * @returns found child instance / undefined
   */
  export const childFromPath = (path: Path | undefined, instance: Settings) => {
    if (!path) {
      return;
    }
    return resolvePath(instance, path);
  };
}

@model("myApp/Settings")
export class Settings extends Model({
  name: prop<string>("").withSetter(),
  form1List: prop<IForm1[]>(() => []).withSetter(),
  form2List: prop<IForm2[]>(() => []).withSetter(),
  tags: prop<ITag[]>(() => []),
}) {
  @modelAction arrayRemoveAt(array: any[], index: number) {
    array.splice(index, 1);
  }

  @modelAction arrayPush(array: any[], item: any) {
    array.push(item);
  }

  @modelAction addForm1() {
    this.form1List.push({ name: "", tags: [] });
  }

  @modelAction addForm2() {
    this.form2List.push({ name: "", tags: [] });
  }
}

type Path = ReadonlyArray<string | number>;

@model("myApp/Root")
export class Root extends Model({
  settings: prop<Settings | undefined>(),
  selectionPath: prop<Path | undefined>(),
}) {
  @observable.ref settingsDraft: Draft<Settings> | undefined;
  @observable.ref selectedChild: any;
  undoManager: UndoManager | undefined;
  onInit() {
    if (this.settings) {
      this.setSettings(this.settings);
    }
  }
  @modelAction setSettings(val: Settings) {
    this.settings = val;
    this.settingsDraft = draft(this.settings);
    this.undoManager = undoMiddleware(this.settingsDraft.data); // maybe reuse, if present to keep the undo events (?)
    this.setChildFromSelectionPath();
  }
  @modelAction commit() {
    this.settingsDraft?.commit();
  }

  @modelAction setSelectionPath(child: any) {
    this.selectedChild = child;
    this.selectionPath = SettingsUtils.pathFromChild(child);
  }

  @modelAction setChildFromSelectionPath() {
    if (!this.selectionPath) {
      return;
    }
    const res = SettingsUtils.childFromPath(
      this.selectionPath,
      this.settingsDraft?.data!
    );
    if (res?.resolved) {
      this.selectedChild = res.value;
    } else {
      this.selectedChild = undefined;
    }
  }
}
