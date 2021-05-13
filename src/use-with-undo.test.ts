import { expect } from "@jest/globals";
import { toJS } from "mobx";
import { undoMiddleware } from "mobx-keystone";
import { Root, Settings, Tag } from "./use-with-indo";
import "./commonSetup";

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
    draftModel.data.arrayRemoveAt(draftModel.data.tags, 0); // this is recorded
    expect(draftModel).toMatchSnapshot("DRAFT after direct modification");
    undoManagerSettingsDraft.undo();
    expect(draftModel.data.tags.length).toBe(2);
    undoManagerSettingsDraft.redo();
    expect(draftModel.data.tags.length).toBe(1);
    draftModel.data.setName("HELLO");

    expect(undoManagerSettingsDraft.store.undoEvents).toMatchSnapshot(
      "Undo Events"
    );
    root.commit();
    expect(draftModel).toMatchSnapshot("DRAFT AFTER COMMIT");

    draftModel.data.addForm1();
    draftModel.data.addForm1();
    draftModel.data.addForm2();
    draftModel.data.addForm2();

    expect(undoManagerSettingsDraft.store.undoEvents).toMatchSnapshot(
      "Undo Events with forms"
    );

    draftModel.data.arrayPush(
      draftModel.data.form1List[0].tags,
      new Tag({ label: "tag1" })
    );
    draftModel.data.arrayPush(
      draftModel.data.form1List[0].tags,
      new Tag({ label: "tag2" })
    );

    expect(draftModel.data.form1List[0].tags).toMatchSnapshot(
      "tags form1 - 0 - 2 tags added"
    );
    undoManagerSettingsDraft.undo();
    expect(draftModel.data.form1List[0].tags).toMatchSnapshot(
      "tags form1 - 0 - undo -> 1 tag left"
    );

    undoManagerSettingsDraft.redo();

    expect(draftModel.data.form1List[0].tags).toMatchSnapshot(
      "tags form1 - 0 - redo -> 2 tags again"
    );
  });
});
