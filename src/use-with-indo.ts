import { observable } from "mobx";
import {
  Draft,
  draft,
  model,
  Model,
  modelAction,
  prop,
  findParentPath,
  resolvePath,
} from "mobx-keystone";

@model("myApp/Tag")
export class Tag extends Model({ label: prop<string>("").withSetter() }) {}
@model("myApp/Form1")
export class Form1 extends Model({
  tags: prop<Tag[]>(() => []).withSetter(),
  name: prop<string>("").withSetter(),
}) {}

@model("myApp/Form2")
export class Form2 extends Model({
  tags: prop<Tag[]>(() => []).withSetter(),
  name: prop<string>("").withSetter(),
}) {}

export namespace SettingsUtils {
  /**
   * calculatePath -
   * @param child
   * @returns list of path segments for the given child under Settings
   */
  export const calculatePath = (child: any) => {
    const res = findParentPath(
      child,
      (parent) => parent instanceof Settings,
      5 // how deep?
    );
    return res?.path;
  };
}

@model("myApp/Settings")
export class Settings extends Model({
  name: prop<string>("").withSetter(),
  form1List: prop<Form1[]>(() => []).withSetter(),
  form2List: prop<Form2[]>(() => []).withSetter(),
  tags: prop<Tag[]>(() => []),
}) {
  @modelAction arrayRemoveAt(array: any[], index: number) {
    array.splice(index, 1);
  }

  @modelAction arrayPush(array: any[], item: any) {
    array.push(item);
  }

  @modelAction addForm1() {
    this.form1List.push(new Form1({}));
  }

  @modelAction addForm2() {
    this.form2List.push(new Form2({}));
  }

  resolvePath(path: string[]) {
    return resolvePath(this, path);
  }
}

@model("myApp/Root")
export class Root extends Model({
  settings: prop<Settings | undefined>(),
}) {
  @observable.ref settingsDraft: Draft<Settings> | undefined;
  onInit() {
    if (this.settings) {
      this.setSettings(this.settings);
    }
  }
  @modelAction setSettings(val: Settings) {
    this.settings = val;
    this.settingsDraft = draft(this.settings);
  }
  @modelAction commit() {
    this.settingsDraft?.commit();
  }

  @modelAction deleteTag(index: number) {
    this.settingsDraft?.data.tags.splice(index, 1);
  }
}
