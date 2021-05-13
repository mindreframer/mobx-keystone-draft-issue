import { Draft, draft, model, Model, modelAction, prop } from "mobx-keystone";

@model("myApp/Tag")
export class Tag extends Model({ label: prop<string>("").withSetter() }) {}
@model("myApp/Settings")
export class Settings extends Model({
  name: prop<string>().withSetter(),
  tags: prop<Tag[]>(() => []),
}) {}
@model("myApp/Root")
export class Root extends Model({
  settings: prop<Settings | undefined>(),
  settingsDraft: prop<Draft<Settings> | undefined>(),
}) {
  onInit() {
    if (this.settings) {
      this.setSettings(this.settings);
    }
  }
  @modelAction setSettings(val: Settings) {
    this.settings = val;
    this.settingsDraft = draft(this.settings);
  }
}
