import { toJS } from "mobx";
import { Draft, draft, model, Model, modelAction, prop } from "mobx-keystone";

/**
 * In this example we use a mobx - keystone instance for Settings
 * that is reused in the form as plain non-observable field
 */

@model("myApp/Tag")
export class Tag extends Model({ label: prop<string>("").withSetter() }) {}

/**
 * actual settings data
 */
@model("myApp/Settings")
export class Settings extends Model({
  name: prop<string>().withSetter(),
  tags: prop<Tag[]>(() => []),
}) {}

/**
 * Settings form, contains functions to manipulate settings / run validations
 * - we want to support undo/redo for it + editing on a detached node (drafts)
 * - that's why draft is a `prop`, and not just plain object field
 */
@model("myApp/SettingsForm")
export class SettingsForm extends Model({
  settingsDraft: prop<Draft<Settings> | undefined>(),
}) {
  @modelAction setSettings(val: Settings) {
    this.settingsDraft = draft<Settings>(val);
  }
  @modelAction deleteTag(tags: Tag[], index: number) {
    tags.splice(index, 1);
  }
}

/**
 * Top-level node
 */
@model("myApp/Root")
export class Root extends Model({
  settings: prop<Settings | undefined>(),
  settingsForm: prop<SettingsForm | undefined>(),
}) {
  onInit() {
    if (this.settings) {
      this.setSettings(this.settings);
    }
  }
  @modelAction setSettings(val: Settings) {
    this.settings = val;
    this.settingsForm = new SettingsForm({});
    this.settingsForm.setSettings(this.settings);
  }
}
