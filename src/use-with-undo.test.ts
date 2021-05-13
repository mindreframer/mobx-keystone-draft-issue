import { expect } from "@jest/globals";
import { Root, Settings } from "./use-with-indo";

describe("Root", () => {
  it("should support drafts wrapped in undo/redo middleware ", () => {
    // const root = new Root({ settings: new Settings({}) });
    const root = new Root({});
    root.setSettings(new Settings({ name: "setting 1" }));

    // const root = new Root({ settings: new Settings({}) });
    // const root = new Root({});
    // const undoManagerRoot = undoMiddleware(root)
    // const Settings = new Settings({ tags: [new Tag({ label: 'tag1' }), new Tag({ label: 'tag2' })] })
    // root.setSettings(Settings)
    // const SettingsForm = root.SettingsForm
    // const SettingsDraft = SettingsForm?.SettingsDraft
    // const undoManagerSettingsForm = undoMiddleware(SettingsForm!)
    // SettingsForm?.deleteTag(SettingsDraft!.data.tags, 1)
    // toJS(root.Settings?.tags.length) // we have 2 tags on the origin
    // toJS(SettingsDraft?.data.tags.length) // we have 1 tag on the draft
    // SettingsDraft?.commit()
    // toJS(root.Settings?.tags.length) // now we have 1 tag also on the origin
    // // console.log(toJS(undoManagerRoot.store.undoEvents))
    // console.log(toJS(undoManagerSettingsForm.store.undoEvents))
  });
});
