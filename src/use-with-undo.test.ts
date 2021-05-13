import { expect } from "@jest/globals";
import { toJS } from "mobx";
import { undoMiddleware } from "mobx-keystone";
import { Root, Settings, Tag } from "./use-with-indo";

const logAll = (v: any, label = "") => {
  console.log(label, JSON.stringify(toJS(v), null, 2));
};

describe("Root", () => {
  it("should support drafts wrapped in undo/redo middleware ", () => {
    const root = new Root({});
    root.setSettings(new Settings({}));
    const settings = new Settings({
      tags: [new Tag({ label: "tag1" }), new Tag({ label: "tag2" })],
    });
    root.setSettings(settings);
    const undoManagerSettingsDraft = undoMiddleware(root.settingsDraft!.data);
    const draftModel = root.settingsDraft!;

    root.deleteTag(0); // this is not recorded
    logAll(root.settingsDraft, "DRAFT after modification by root");

    draftModel.data.deleteTag(0); // this is recorded
    logAll(root.settingsDraft, "DRAFT after direct modification");

    root.settingsDraft?.data.setName("HELLO");
    logAll(undoManagerSettingsDraft.store.undoEvents, "UNDO EVENTS:");
    root.commit();
    logAll(root.settingsDraft, "DRAFT AFTER COMMIT");
  });
});
