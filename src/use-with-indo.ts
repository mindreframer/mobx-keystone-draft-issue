import { observable } from "mobx";
import { Draft, draft, model, Model, modelAction, prop } from "mobx-keystone";

@model("myApp/Tag")
export class Tag extends Model({ label: prop<string>("").withSetter() }) {}
@model("myApp/Settings")
export class Settings extends Model({
  name: prop<string>("").withSetter(),
  tags: prop<Tag[]>(() => []),
}) {
  @modelAction deleteTag(index: number) {
    this.tags.splice(index, 1);
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
